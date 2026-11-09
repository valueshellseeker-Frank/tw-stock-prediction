# 台股 Top100 選股紀錄

這裡保存每天的選股名單，讓大家查證：**是不是事前發布、當天以哪一版為準，以及內容有沒有被換過。**

正式紀錄從 **2026 年 11 月 11 日**開始。每兩週直接公開的第一期是 **11 月 16 日**，從前一天週日晚上 10 點起發布；其他交易日先公布加密檔。

## 每個服務能證明什麼？

| 服務 | 能查什麼？ | 怎麼確認？ |
| --- | --- | --- |
| **vBase** | 登記時間、當天的正式版 | 每次登記都會在區塊鏈留下時間和檔案指紋。查完當天全部紀錄，取 08:30 前最後一筆。 |
| **GitHub Releases** | 檔案何時公開、附件有沒有被替換 | GitHub 記錄公開時間；標示為 Immutable 的 Release，附件發布後就不能修改或替換。 |
| **Arweave** | 原檔備份、內容是否一致 | 從第三方備份下載原檔，算出指紋，和鏈上紀錄比對。 |
| **drand 時間鎖** | 到期後不用我配合，也能看到名單 | 解密資料會在到期後公開，任何人都能用來解開原本的加密檔。 |

「檔案指紋」就是用整份檔案算出的一串碼。改了內容，就對不上原本的指紋。

## 名單什麼時候公開？

每個交易日都要存證，分成兩種方式：

- **平常先公布加密檔，30 天後開放解密。** 以名單對應的交易日加 30 天，在當天晚上 6 點開放。這裡的 30 天包含週末和假日，不是 30 個交易日。
- **每兩週直接公開一次。** 隔週週日晚上 10 點左右，公開隔天週一的名單，不用等 30 天。週一休市就跳過，不順延到週二；公開週次事先寫在系列公告裡。

以上都是台北時間。時間鎖到期後，不必等我交密碼或另外公布名單，任何人都能從原本的加密檔解出內容。

## 想看整體表現？

[策略績效總覽](https://valueshellseeker-frank.github.io/tw-stock-prediction/performance.html)會隨已公開的名單更新，提供兩張主要圖表：每期名單與 0050、加權報酬指數的含息報酬比較，以及十份資金輪流投入、扣掉成本後的淨值走勢。也可下載逐期與個股明細重算。

交易模擬採 1,000 萬元、手續費 2.8 折且每筆最低 1 元；每邊滑價以 0.30% 和一個跳動檔位取較不利者，交易稅另外計算。漲停買不到的錢留給下一個交易日的清單；跌停賣不掉就繼續持有，直到能賣出，再投入成交當天的清單。這是開盤價模擬，沒有驗證零股實際成交與容量。

績效規則事先放在系列公告的 `performance-policy.json`，與選股存證一起固定，避免看完結果才換計算方式。完整假設和統計起點都列在總覽裡。

## 有更正時，哪一版才算數？

**以當天 08:30 前，最後一筆鏈上登記為準。08:30:00 就算逾時。**

例如 08:10 發布 A 版、08:22 更正成 B 版，當天就只認 B 版。A 版仍留在紀錄裡，但不能看完結果後，因為 A 比較準就改用 A。B 如果無法通過驗證，那天就記為驗證失敗，也不能換回 A。

這裡的「唯一」是指：**在事先公告的登記位置，每天只有一份正式結果。** 可以在截止前更正，但每次登記都查得到。

查核要從公告的開始日逐日檢查。漏交、逾時、檔案遺失或解密失敗，都要列出，不能只挑表現好的日期。

## 怎麼查？

[開啟驗證頁](https://valueshellseeker-frank.github.io/tw-stock-prediction/)，選日期、按「驗證」，就能查看當天的結果和更正紀錄。

驗證頁是我提供的查詢工具。**想獨立確認，可以直接查下面的第三方紀錄，不必只相信這個頁面。**

## 不透過本站，怎麼自行查證？

先開啟 [系列公告](https://github.com/valueshellseeker-Frank/tw-stock-prediction/releases/tag/series-policy-v2)，確認事先固定的開始日、登記位置和規則，再查三件事：

1. **時間對不對？** 查看 GitHub 的公開時間和鏈上的登記時間，兩者都要早於當天台北時間 08:30。
2. **有沒有其他版本？** 查完指定位置當天的全部登記，包含更正紀錄，只取截止前最後一筆。只看單筆證明，還不能確認正式版。
3. **檔案有沒有被換？** 從 GitHub 和 Arweave 下載正式版，算出指紋，與鏈上紀錄比對。名單也必須從這份已核對的檔案解出。

查時間可看 [GitHub 官方紀錄](https://api.github.com/repos/valueshellseeker-Frank/tw-stock-prediction/releases?per_page=100&page=1)，查登記可用 [PolygonScan](https://polygonscan.com/)，算指紋可用 [CyberChef](https://gchq.github.io/CyberChef/)。實際操作放在下面，不需要安裝本專案的程式。

<details>
<summary>查發布時間：GitHub 的官方紀錄</summary>

### 先找到事前公告

到 Releases 找 tag 為 `series-policy-v2` 的公告，下載附件 `protocol.json`。這份檔案記錄開始日、登記位置、截止時間和解密規則。

確認這份 Release 已標示為 Immutable，而且公開時間早於第一期允許開始發布的時間。之後的查核都以這份附件為準；README 和網頁說明可以修改，不能拿來代替事前公告。

### 查 GitHub 記錄的發布時間

在 [GitHub 官方紀錄](https://api.github.com/repos/valueshellseeker-Frank/tw-stock-prediction/releases?per_page=100&page=1) 找到當天的 Release，查看兩個欄位：

- `published_at`：GitHub 記錄的公開時間。結尾的 `Z` 代表 UTC，換成台北時間要加 8 小時，結果必須早於當天 08:30。
- `immutable`：必須是 `true`，表示這份 Release 的附件已鎖定。

有多頁時，把網址的 `page=1` 改成 2、3，繼續查看。請用 GitHub 記錄的時間，不要用檔名或說明文字裡填寫的日期。[GitHub API 說明](https://docs.github.com/en/rest/releases/releases#list-releases)

### 確認下載的附件就是原檔

GitHub 也會為不可變更的 Release 簽發附件證明。若已安裝 GitHub 官方 CLI，把 `TAG` 換成當天 Release 的 tag，執行：

```bash
gh release verify-asset TAG capsule.json -R valueshellseeker-Frank/tw-stock-prediction
```

同樣可以驗證事前公告的 `protocol.json`。這個指令查的是 GitHub 簽發的證明，不使用本站的驗證結果。[GitHub CLI 說明](https://cli.github.com/manual/gh_release_verify-asset)

Immutable 鎖定的是附件與 tag。README、網頁和 Release 說明仍可修改，整筆 Release 也可能被刪除。找不到必要證據時，就應列為無法驗證。[GitHub 官方說明](https://docs.github.com/en/code-security/concepts/supply-chain-security/immutable-releases)

</details>

<details>
<summary>查正式版本：區塊鏈上的完整紀錄</summary>

### 先確認要查哪個位置

以事前公告 `protocol.json` 中的登記鏈、合約地址、發布者地址和當天集合為準，查出那段期間的全部紀錄。本系列使用 Polygon，可到 [PolygonScan](https://polygonscan.com/) 查詢。

「當天集合」就是同一個交易日的紀錄分組。它的名稱由公告檔案和日期決定，不是事後才挑選：

1. 對原始 `protocol.json` 計算 SHA-256。
2. 組成名稱 `ml-v2-<協議SHA-256>-<YYYY-MM-DD>`。
3. 對這個名稱的 UTF-8 文字計算 SHA3-256，再加上 `0x`，就是當天的集合 CID。

### 查完所有紀錄，再決定正式版

每筆都要核對交易是否成功、所屬區塊的時間，以及登記的檔案指紋。將紀錄依區塊、交易、事件的先後順序排列，只認台北 08:30 前的最後一筆。同一秒內有多筆時，也照這個順序決定。

單筆交易或一張 vBase 證明，只能證明那一筆存在。要確認沒有漏掉其他版本，必須查完該位置、該期間的全部紀錄。vBase 的公開證明可供核對，但部分 API 需要登入，不能假設訪客能直接從帳戶頁看到全部資料。[vBase 說明](https://docs.vbase.com/rest-api/rest-api-user-guide)

如果網站有顯示筆數上限，請改用完整事件查詢介面，並翻完所有頁。沒有查完，就不能認定已確認唯一正式版。

### 給熟悉 API 的讀者或 agent

可使用 [Etherscan V2 事件查詢介面](https://docs.etherscan.io/api-reference/endpoint/getlogs-address-topics)，或自行選擇公開鏈 RPC。Etherscan 需要查詢者自己的 API key，支援鏈與方案依服務當時規定；不需要發布者的帳號或私鑰。

篩選欄位如下，各條件以 AND 結合：

| 欄位 | 填入內容 |
| --- | --- |
| `chainid` | 公告的 `registration.chain_id` |
| `address` | 公告的 `registration.contract_address` |
| `topic0` | `0x38caddea36d4bb0fc2e9597e46fd18beb7d9b9508b4a997e438bdb877a17efa4` |
| `topic1` | 公告的 `producer_address`，去除 `0x`、左側補零至 64 字元，再加回 `0x` |
| `topic2` | 當天集合 CID |

`topic0` 對應 `AddSetObject(address,bytes32,bytes32,uint256)` 事件。查詢時不限制 `topic3`；回傳的 `topics[3]` 才是各份檔案的指紋。交易可能由服務商代送，因此不要拿交易的 `from` 取代事件中的發布者地址。

一般期從前一個交易日台北 16:00 開始查；直接公開期則與公告的週日開放時間（本系列為 22:00）比較，取較晚的時間。查到截止時間所在區塊，並另外列出逾時紀錄。

Etherscan 查詢使用 `module=logs`、`action=getLogs`、`topic0_1_opr=and`、`topic1_2_opr=and`。用 `fromBlock`／`toBlock` 指定區塊範圍，`page`／`offset` 翻頁，必要時分段查詢。查詢出錯或資料被截斷時，不能把結果當成完整紀錄。

若要更仔細確認，可再用另一個獨立來源比對：

- `eth_chainId`：確認查的是同一條鏈。
- `eth_getLogs`：查登記事件。
- `eth_getTransactionReceipt`：確認交易成功，並核對事件與所屬區塊。
- `eth_getBlockByNumber`：核對區塊時間與 `finalized` 狀態。最終確認的區塊必須已涵蓋截止時間。

依 `blockNumber`、`transactionIndex`、`logIndex` 排序，取區塊時間早於台北 08:30 的最後一筆。[標準 RPC 文件](https://ethereum.org/en/developers/docs/apis/json-rpc/)

</details>

<details>
<summary>查內容有沒有變：下載原檔，比對指紋</summary>

### 下載正式版的原檔

先依完整登記紀錄找出正式版，再從 GitHub 下載它的 `capsule.json`。這是存證檔，包含當時公開或加密的名單。

Release 中的 `arweave-receipt.json` 會提供備份 ID。把 ID 接在 `https://turbo-gateway.com/raw/` 或 `https://arweave.net/raw/` 後面，就能從第三方備份下載檔案。若是 gzip 檔，先解壓成原本的 `capsule.json`。[備份回讀說明](https://docs.ar.io/build/upload/upload-and-verify/)

備份 ID 只是取檔線索。下載的內容是否正確，仍要靠下一步的指紋比對。

### 用第三方工具比對

不想安裝程式，可以開啟 [CyberChef](https://gchq.github.io/CyberChef/)，載入下載的原檔，選擇 **SHA3**，將長度設為 **256**。若需解壓 gzip，也可用它的 Gunzip 功能。

GitHub 原檔與解壓後的 Arweave 備份，算出的指紋都必須和正式鏈上紀錄一致。比較時可忽略鏈上指紋開頭的 `0x`。請選 **SHA3-256**，不要選 Keccak-256，也不要先把原檔開啟重存。CyberChef 由 GCHQ 維護，與本專案無關。[工具來源](https://github.com/gchq/CyberChef)

也可以直接用標準 Python 函式庫計算：

```bash
python -c "from hashlib import sha256; from pathlib import Path; print(sha256(Path('protocol.json').read_bytes()).hexdigest())"
python -c "from hashlib import sha3_256; from pathlib import Path; print('0x'+sha3_256(Path('capsule.json').read_bytes()).hexdigest())"
```

第一行計算公告檔案的 SHA-256，第二行計算存證檔的 SHA3-256。GitHub 附件的 `digest` 也是 SHA-256，與 vBase 登記的 SHA3-256 不同，請分別核對。

### 從原檔解出名單

通過指紋核對後，將 `capsule.json` 裡的 `body_base64` 解碼：

- **直接公開的名單：** 解碼後會得到 JSON，其中的 `top100_csv` 就是原始名單。
- **延後公開的名單：** 解碼後會得到時間鎖密文。存成 `body.tlock`，到期後可用 [drand 官方 tle 工具](https://github.com/drand/tlock) 解密：

```bash
tle --decrypt --chain 52db9ba70e0cc0f6eaf7803dd07447a1f5477735fd3f661792ba94600c84e971 --output payload.gz body.tlock
```

解壓後讀取 JSON 的 `top100_csv`，存成 UTF-8 檔案，即可和另行下載的 CSV 比對。請使用新的輸出檔名，避免覆蓋自己的檔案。

名單必須從這份已核對過的存證檔解出，才能連回當初的登記。只檢查一份事後另外提供的 CSV，無法確認兩者是同一份內容。

到期後不需要發布者提供密碼，但仍要能取得公開備份，而且 drand 必須正常運作。時間鎖到期代表可以解密，不代表 GitHub 會自行新增明文附件。[時間鎖說明](https://docs.drand.love/docs/timelock-encryption/)

</details>

這些紀錄可以查證發布時間、正式版本和檔案內容。預測表現好不好，還是要用完整期間的名單，以一致的方式計算績效。
