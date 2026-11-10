const el = (id) => document.getElementById(id);
const dateInput = el("session-date");
const url = new URL(location.href);
const taipei = new Intl.DateTimeFormat("sv-SE", {
  timeZone: "Asia/Taipei", year: "numeric", month: "2-digit", day: "2-digit",
  hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23",
});
let config;
let worker;
let timer;
let report;

function storageText(value) {
  const label = part => ({pass:"通過", fail:"未通過", pending:"待確認"}[part?.status] || "待確認");
  const accepted = value.receipt?.accepted_at_utc;
  return `Turbo 簽收：${label(value.receipt)}${accepted ? `（台北 ${taipei.format(new Date(accepted))}）` : ""}；收據與原檔：${label(value.content)}；Arweave 入鏈：${label(value.settlement)}。`;
}

function renderAutomatic(inventory, storage, refresh) {
  const checked = refresh.checked_at_utc;
  text('automatic-updated', checked ? `最近更新：${taipei.format(new Date(checked))}（台北時間）` : '尚未取得自動更新時間');
  const periods = [...(inventory.periods || [])].sort((a,b) => a.date.localeCompare(b.date));
  const latest = periods[periods.length-1];
  const confirmed = latest?.all_required_checks_passed === true && latest?.official_selection_status === 'pass';
  text('automatic-official', latest ? `${latest.date} 正式版：${confirmed ? '已確認' : '尚待確認或有缺漏'}${latest.status === 'sealed_not_due' ? '；名單仍在加密期' : ''}。` : '尚無已截止交易日的查核結果。');
  const rows = [...(storage.rows || [])].filter(row => row.session_date).sort((a,b) => a.session_date.localeCompare(b.session_date));
  const recent = rows[rows.length-1];
  const state = recent?.verification?.settlement?.status;
  text('automatic-storage', recent ? `最近存證 ${recent.session_date}：Arweave ${state === 'pass' ? '已確認入鏈' : state === 'fail' ? '查核未通過' : '尚待確認入鏈'}。` : '尚無可顯示的保存紀錄。');
}

async function setupAutomatic() {
  const values = await Promise.all(['verification-summary.json','storage-summary.json','refresh-status.json'].map(async name => {
    const response = await fetch(`./${name}`, {cache:'no-store'});
    if (!response.ok) throw new Error('自動更新紀錄暫時無法讀取');
    return response.json();
  }));
  renderAutomatic(...values);
}

async function setupStorage() {
  const response = await fetch('./storage-summary.json', {cache:'no-store'});
  if (!response.ok) throw new Error('保存證據暫時無法載入');
  const records = await response.json();
  for (const row of records.rows || []) {
    const id = row.proof?.receipt?.id;
    if (!/^[A-Za-z0-9_-]{43}$/.test(id || '')) continue;
    const option = document.createElement('option');
    option.value = id;
    option.textContent = `${row.session_date} · ${row.original_tag}`;
    el('storage-select').append(option);
  }
  el('storage-check').disabled = !el('storage-select').options.length;
  text('storage-progress', el('storage-select').options.length ? '尚未重新查核。按鈕會直接讀取第三方資料。' : '目前沒有可重驗的簽收紀錄。');
}

el('storage-check').addEventListener('click', () => {
  el('storage-check').disabled = true;
  text('storage-detail', '');
  const audit = new Worker('./worker.js');
  const end = message => { audit.terminate(); clearTimeout(timeout); el('storage-check').disabled = false; text('storage-progress', message); };
  const timeout = setTimeout(() => end('第三方查詢逾時，入鏈狀態仍待確認，可稍後重試。'), 180000);
  audit.onmessage = ({data}) => {
    if (data.progress) text('storage-progress', data.progress);
    else if (data.storageReport) {
      text('storage-detail', JSON.stringify(data.storageReport, null, 2));
      end(storageText(data.storageReport));
    } else if (data.error) end(`未完成查核：${data.error}`);
  };
  audit.onerror = () => end('瀏覽器查核未完成，請稍後重試。');
  audit.postMessage({config: config || {mode:'live'}, storageOnly:el('storage-select').value});
});

function text(id, value) {
  el(id).textContent = value;
}

function finish(message, error = false) {
  if (worker) worker.terminate();
  worker = undefined;
  clearTimeout(timer);
  el("verify").disabled = !config;
  dateInput.disabled = false;
  el("cancel").hidden = true;
  el("progress").classList.toggle("error", error);
  text("progress", message);
}

function status(id, value, label) {
  el(id).className = value;
  text(id, label || {pass: "通過", fail: "未通過", pending: "待確認"}[value]);
}

function link(href, label) {
  const anchor = document.createElement("a");
  anchor.href = href;
  anchor.textContent = label;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  return anchor;
}

function render(data) {
  report = data;
  const row = data.period;
  const unique = row.checks.unique_official_revision;
  const time = row.checks.premarket_public_commitment;
  const file = row.checks.committed_capsule_unchanged;
  const announcement = data.announcement || {status: "pending"};
  const publication = file.github_publication || {status: "pending", reason: "需先取得正式存證包"};
  const combined = (...items) => items.some(x => x.status === "fail") ? "fail"
    : items.every(x => x.status === "pass") ? "pass" : "pending";
  const storage = row.checks.external_storage || {};
  const timeState = combined(time, publication, announcement,
    storage.receipt || {status:"pending"}, storage.content || {status:"pending"});
  const uniqueState = combined(unique, announcement);
  text("time-question", `${taipei.format(new Date(data.cutoff_utc)).slice(11, 16)} 前已定稿？`);
  status("time-status", timeState, timeState === "pass" ? "有" : undefined);
  status("unique-status", uniqueState, uniqueState === "pass" ? "已找到" : undefined);
  text("time-note", [
    time.registered_at_utc ? `鏈上：${taipei.format(new Date(time.registered_at_utc))}` : "鏈上：尚無可確認的登記",
    publication.published_at_utc ? `GitHub：${taipei.format(new Date(publication.published_at_utc))}` : `GitHub：${publication.reason}`,
    storage.receipt?.accepted_at_utc ? `Turbo 收件：${taipei.format(new Date(storage.receipt.accepted_at_utc))}` : "Turbo 收件：尚待核對簽收證據",
    announcement.status === "pass" ? "系列公告：已核對" : "系列公告：尚未通過查核",
  ].join("；"));
  text("unique-note", unique.official_cid ? `截止前共 ${unique.registered_revisions_before_cutoff} 筆，取最後一筆`
    : row.candidate ? "請展開下方紀錄查看候選版本" : "本期尚無正式版");
  status("file-status", file.status, file.status === "pass" ? (data.fixture_only ? "範例吻合" : "吻合") : undefined);
  text("file-note", file.reason);
  text("storage-note", storageText(storage));
  text("scan-window", `有效窗口 ${taipei.format(new Date(data.window_start_utc))} 起，至 ${taipei.format(new Date(data.cutoff_utc))} 前。截止前共 ${unique.registered_revisions_before_cutoff} 筆，另列出掃描到的逾時登記。`);

  const events = row.superseded.map((event) => [event, "已更新"]);
  if (row.candidate) events.push([row.candidate, uniqueState === "pass" ? "正式版" : "候選版"]);
  events.push(...row.late.map((event) => [event, "逾時"]));
  el("events").replaceChildren();
  if (!events.length) {
    const cell = el("events").insertRow().insertCell();
    cell.colSpan = 4;
    cell.textContent = "掃描範圍內沒有登記";
  }
  for (const [event, verdict] of events) {
    const tr = el("events").insertRow();
    tr.insertCell().textContent = taipei.format(new Date(event.block_time_utc));
    tr.insertCell().textContent = verdict;
    const cid = document.createElement("code");
    cid.textContent = event.object_cid;
    tr.insertCell().append(cid);
    const cell = tr.insertCell();
    const explorer = {8453: "https://basescan.org", 137: "https://polygonscan.com"}[event.chain_id];
    if (explorer && /^0x[0-9a-f]{64}$/i.test(event.transaction_hash || "")) {
      const tx = link(`${explorer}/tx/${event.transaction_hash}`, `區塊 ${event.block_number}`);
      tx.title = event.transaction_hash;
      cell.append(tx);
    } else {
      cell.textContent = `區塊 ${event.block_number}`;
    }
  }

  el("evidence").replaceChildren();
  el("publication-links").replaceChildren();
  if (publication.url) el("publication-links").append(link(publication.url, "查看 GitHub 原始發布紀錄"), "　");
  if (announcement.url) el("publication-links").append(link(announcement.url, "查看固定系列公告"), "　");
  const archiveId = file.archive?.object_id;
  if (/^[A-Za-z0-9_-]{43}$/.test(archiveId || "")) {
    el("publication-links").append(link(`https://turbo-gateway.com/raw/${archiveId}`, "下載第三方備份原檔"));
  }
  const entries = [
    ["系列 SHA-256", data.protocol_sha256],
    ["發布者地址", data.registry_location.producer_address],
    ["登記合約", data.registry_location.contract_address],
    ["當日集合", unique.collection_cid],
    ["公開 RPC", data.rpc_hosts.join("、") || "本機模擬資料"],
  ];
  for (const [i, scan] of (row.evidence.snapshots || []).entries()) {
    const range = scan.scan_from_block > scan.scan_to_block
      ? `本期尚無可查詢的區塊，最終確認至 ${scan.finalized_block}`
      : `${scan.scan_from_block} 至 ${scan.scan_to_block}，最終確認至 ${scan.finalized_block}`;
    entries.push([`來源 ${i + 1} 區塊範圍`, range]);
  }
  for (const [label, value] of entries) {
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = label;
    dd.textContent = value;
    el("evidence").append(dt, dd);
  }
  if (config.announcement && new URL(config.announcement).protocol === "https:") {
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = "系列公告";
    dd.append(link(config.announcement, "查看首期前公告"));
    el("evidence").append(dt, dd);
  }
  el("result").hidden = false;
}

function start() {
  if (worker || !dateInput.reportValidity()) return;
  const session = dateInput.value;
  report = undefined;
  el("result").hidden = true;
  el("verify").disabled = true;
  dateInput.disabled = true;
  el("cancel").hidden = false;
  el("progress").classList.remove("error");
  url.searchParams.set("date", session);
  history.replaceState(null, "", url);
  text("progress", "正在準備查核");
  worker = new Worker("./worker.js");
  timer = setTimeout(() => finish("待確認。公開查詢逾時，請稍後重試。", true), 240000);
  worker.onmessage = ({data}) => {
    if (data.progress) {
      text("progress", data.progress);
    } else if (data.error) {
      finish(`待確認。${data.error}`, true);
    } else {
      try {
        render(data.report);
        finish(data.report.fixture_only ? "已完成範例查核" : "已完成公開查詢");
      } catch (error) {
        finish(`待確認。${error.message}`, true);
      }
    }
  };
  worker.onerror = () => finish("待確認。瀏覽器驗證器載入失敗。", true);
  worker.postMessage({config, session, expectedDigest: url.searchParams.get("series")});
}

el("check-form").addEventListener("submit", (event) => { event.preventDefault(); start(); });
el("cancel").addEventListener("click", () => finish("查核已取消"));
el("json").addEventListener("click", () => {
  if (!report) return;
  const blob = new Blob([JSON.stringify(report, null, 2)], {type: "application/json"});
  const target = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = target;
  anchor.download = `${report.period.session_date}-verification.json`;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(target), 1000);
});

async function setup() {
  const response = await fetch("./site-config.json", {cache: "no-store"});
  if (!response.ok) throw new Error("公開系列設定無法載入");
  config = await response.json();
  if (config.mode === "pending") {
    text("mode", "公開紀錄");
    el("notice").hidden = false;
    text("notice", "尚未載入系列公告，暫時無法查核。 ");
    if (config.announcement && new URL(config.announcement).protocol === "https:") {
      el("notice").append(link(config.announcement, "查看系列公告"));
    }
    dateInput.disabled = true;
    el("verify").disabled = true;
    text("progress", "載入公告資料後，即可選擇交易日查詢。");
    config = undefined;
    return;
  }
  if (!["live", "demo"].includes(config.mode)) {
    config = undefined;
    throw new Error("公開系列設定無法辨識");
  }
  const demo = config.mode === "demo";
  text("mode", demo ? "操作範例" : "公開鏈查核");
  el("notice").hidden = false;
  el("launch-record").hidden = demo;
  if (demo) text("notice", "目前是操作範例。登記使用模擬資料，檔案比對使用範例檔。正式存證上線後才會查實際紀錄。");
  else text("notice", `正式紀錄從 ${config.initial_date} 開始。下方日期是要查核的交易日，不代表當天名單已發布；尚未登記或還沒截止時，會顯示「待確認」。`);
  dateInput.min = config.initial_date;
  if (demo) dateInput.max = config.initial_date;
  const selectedDate = url.searchParams.get("date");
  const today = taipei.format(new Date()).slice(0, 10);
  dateInput.value = selectedDate || (demo ? config.initial_date : (today > config.initial_date ? today : config.initial_date));
  el("verify").disabled = false;
  text("progress", "選擇交易日開始查核");
  if (demo || selectedDate) start();
}

setup().catch((error) => finish(`待確認。${error.message}`, true));
setupStorage().catch(error => text('storage-progress', error.message));
setupAutomatic().catch(() => text('automatic-updated', '自動更新紀錄暫時無法讀取；仍可使用下方的第三方查核。'));
