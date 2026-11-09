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
  text("time-question", `${taipei.format(new Date(data.cutoff_utc)).slice(11, 16)} 前有存證嗎？`);
  status("time-status", time.status, time.status === "pass" ? "有" : undefined);
  status("unique-status", unique.status, unique.status === "pass" ? "已找到" : undefined);
  text("time-note", time.registered_at_utc
    ? `${data.fixture_only ? "範例時間 " : ""}${taipei.format(new Date(time.registered_at_utc))}`
    : "本期窗口內尚無候選登記");
  text("unique-note", unique.official_cid ? `截止前共 ${unique.registered_revisions_before_cutoff} 筆，取最後一筆`
    : row.candidate ? "請展開下方紀錄查看候選版本" : "本期尚無正式版");
  status("file-status", file.status, file.status === "pass" ? (data.fixture_only ? "範例吻合" : "吻合") : undefined);
  text("file-note", file.reason);
  text("scan-window", `有效窗口 ${taipei.format(new Date(data.window_start_utc))} 起，至 ${taipei.format(new Date(data.cutoff_utc))} 前。截止前共 ${unique.registered_revisions_before_cutoff} 筆，另列出掃描到的逾時登記。`);

  const events = row.superseded.map((event) => [event, "已更新"]);
  if (row.candidate) events.push([row.candidate, unique.status === "pass" ? "正式版" : "候選版"]);
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
  const entries = [
    ["系列 SHA-256", data.protocol_sha256],
    ["發布者地址", data.registry_location.producer_address],
    ["登記合約", data.registry_location.contract_address],
    ["當日集合", unique.collection_cid],
    ["公開 RPC", data.rpc_hosts.join("、") || "本機模擬資料"],
  ];
  for (const [i, scan] of (row.evidence.snapshots || []).entries()) {
    entries.push([`來源 ${i + 1} 區塊範圍`, `${scan.scan_from_block} 至 ${scan.scan_to_block}，最終確認至 ${scan.finalized_block}`]);
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
  el("notice").hidden = !demo;
  if (demo) text("notice", "目前是操作範例。登記使用模擬資料，檔案比對使用範例檔。正式存證上線後才會查實際紀錄。");
  dateInput.min = config.initial_date;
  if (demo) dateInput.max = config.initial_date;
  const selectedDate = url.searchParams.get("date");
  dateInput.value = selectedDate || config.initial_date;
  el("verify").disabled = false;
  text("progress", "選擇交易日開始查核");
  if (demo || selectedDate) start();
}

setup().catch((error) => finish(`待確認。${error.message}`, true));
