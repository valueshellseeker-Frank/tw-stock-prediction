const runtimeURL = "https://cdn.jsdelivr.net/pyodide/v0.28.3/full/";

function readPublicJSON(url, body) {
  const req = new XMLHttpRequest();
  req.open(body ? "POST" : "GET", url, false);
  if (body) req.setRequestHeader("Content-Type", "application/json");
  req.send(body || null);
  if (req.status !== 200 || req.responseText.length > 16 * 1024 * 1024) {
    throw new Error(`${new URL(url).hostname} 回應未能讀取（HTTP ${req.status}）`);
  }
  return req.responseText;
}

function readArchiveBase64(url) {
  const req = new XMLHttpRequest();
  req.open("GET", url, false);
  req.responseType = "arraybuffer";
  req.send();
  if (req.status !== 200 || !req.response || req.response.byteLength > 107520) {
    throw new Error("公開備份無法讀取");
  }
  const bytes = new Uint8Array(req.response);
  let binary = "";
  for (let offset = 0; offset < bytes.length; offset += 16384) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 16384));
  }
  return btoa(binary);
}

async function localAsset(path) {
  const res = await fetch(new URL(path, self.location), {cache: "no-store"});
  if (!res.ok) throw new Error(`無法載入 ${path}`);
  return new Uint8Array(await res.arrayBuffer());
}

self.onmessage = async ({data}) => {
  const progress = (message) => self.postMessage({progress: message});
  try {
    progress("正在載入瀏覽器驗證器");
    importScripts(`${runtimeURL}pyodide.js`);
    const py = await loadPyodide({indexURL: runtimeURL});
    const [engine, protocol] = await Promise.all([
      localAsset("engine.zip"), localAsset("protocol.json"), py.loadPackage(["cryptography", "tzdata"]),
    ]);
    py.FS.writeFile("protocol.json", protocol);
    if (data.config.mode === "demo") {
      for (const name of ["registry.fixture.json", "demo-capsule.json"]) {
        py.FS.writeFile(name, await localAsset(name));
      }
    }
    py.unpackArchive(engine, "zip");
    py.globals.set("config_json", JSON.stringify(data.config));
    py.globals.set("session", data.session);
    py.globals.set("expected_digest", data.expectedDigest || "");
    py.globals.set("read_public_json", readPublicJSON);
    py.globals.set("read_archive_base64", readArchiveBase64);
    py.globals.set("report_progress", progress);
    const report = py.runPython(`
import json
from browser_verify import verify
json.dumps(verify(json.loads(config_json), session, read_public_json, report_progress,
                  expected_digest=expected_digest, read_archive=read_archive_base64), ensure_ascii=False)
`);
    self.postMessage({report: JSON.parse(report)});
  } catch (error) {
    const lastLine = String(error.message || error).trim().split("\n").at(-1);
    self.postMessage({error: lastLine});
  }
};
