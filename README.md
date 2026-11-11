# 台股 Top100 選股紀錄

這裡保存每天的選股名單，讓大家確認三件事：**08:30 前已經存證、當天只有一份正式名單、內容沒有被換過。**

快速入口：[每日名單](#每日紀錄) · [查核發布時間與正式版](https://valueshellseeker-frank.github.io/tw-stock-prediction/) · [策略績效](https://valueshellseeker-frank.github.io/tw-stock-prediction/performance.html)

正式紀錄從 **2026 年 11 月 11 日**開始。每兩週直接公開的第一期是 **11 月 16 日**，從前一天週日晚上 10 點起發布；其他交易日先公布加密檔。

## 每個服務能證明什麼？

| 服務 | 能查什麼？ | 怎麼確認？ |
| --- | --- | --- |
| **vBase** | 登記時間、當天的正式版 | 每次登記都會在區塊鏈留下時間和檔案指紋。查完當天全部紀錄，取 08:30 前最後一筆。 |
| **GitHub Releases** | 發布時間、封存的原始附件 | GitHub 記錄發布時間。標示 Immutable 的附件已鎖定，不能原地修改或換檔。 |
| **Turbo 簽收** | 服務商何時收到完整檔案 | 核對服務商簽名、簽收時間和檔案 ID，再確認收據對應的就是這份原檔。 |
| **Arweave** | 原檔已入鏈保存、內容是否一致 | 核對原檔、打包交易的簽名與包含證明，再向公開節點查區塊確認。 |
| **drand 時間鎖** | 到期後不用我配合，也能看到名單 | 解密資料會在到期後公開，任何人都能用來解開原本的加密檔。 |

「檔案指紋」就是用整份檔案算出的一串碼。改了內容，就對不上原本的指紋。首頁、標題與說明可以更新；真正封存、不能修改的是標示為 Immutable 的 Release 附件。

## 想查證，先看這三件事

開啟[驗證頁](https://valueshellseeker-frank.github.io/tw-stock-prediction/)，選日期後按「驗證」：

1. **08:30 前已存證**：核對鏈上登記、GitHub 發布時間和 Turbo 簽收，確認第三方在截止前已收到同一份原檔。08:30:00 就算逾時。
2. **唯一正式版**：查完公告位置的全部紀錄，只認截止前最後一筆；開盤前有更正，舊版也查得到。
3. **原檔沒有被換**：從第三方取回的檔案，要與當初登記的指紋相同，GitHub 原附件也要標示 Immutable。

「待確認」不算通過。加密期間可以先查時間、正式版和原檔指紋；30 天到期後，再核對解出的名單。預測準不準，請看[完整期間的績效](https://valueshellseeker-frank.github.io/tw-stock-prediction/performance.html)。想自行查證，也可以直接使用下方的第三方來源。

<!-- daily-records:start -->
## 每日紀錄

點日期就能開啟當天的 Release，查看封存附件。首頁在每日發布後更新；時間皆為台北時間。

**首頁方便找資料；不可變 Release 保存原檔。** 若當天有更正，日期連到最近發布的版本，前版連結也會保留；正式版仍以鏈上 08:30 前最後一筆為準。

| 日期 | 公開狀態 | 查看連結 |
| --- | --- | --- |
| [2026-11-11](https://github.com/valueshellseeker-Frank/tw-stock-prediction/releases/tag/commit-tw-stock-v2-2026-11-11-16353a1ddd83aff5) | 加密封存（2026-12-11 18:00 起可解密） | [存證附件](https://github.com/valueshellseeker-Frank/tw-stock-prediction/releases/tag/commit-tw-stock-v2-2026-11-11-16353a1ddd83aff5) · [查核](https://valueshellseeker-frank.github.io/tw-stock-prediction/?date=2026-11-11) |

### 上線測試（不列入正式績效）

| 日期 | 公開狀態 | 查看連結 |
| --- | --- | --- |
| [2026-11-10](https://github.com/valueshellseeker-Frank/tw-stock-prediction/releases/tag/deployment-check-2026-11-10) | 加密封存（2026-12-10 18:00 起可解密） | [存證附件](https://github.com/valueshellseeker-Frank/tw-stock-prediction/releases/tag/deployment-check-2026-11-10) |

[系列規則與驗證方式](https://github.com/valueshellseeker-Frank/tw-stock-prediction/releases/tag/series-policy-v2) · [查看全部 Releases](https://github.com/valueshellseeker-Frank/tw-stock-prediction/releases) · [策略績效](https://valueshellseeker-frank.github.io/tw-stock-prediction/performance.html) · [完整期間盤點 JSON](https://valueshellseeker-frank.github.io/tw-stock-prediction/verification-summary.json)

這份表格是查閱入口，不是完整性證明。缺交、逾時及所有更正，仍須從系列開始日逐日查核第三方登記紀錄。
<!-- daily-records:end -->

## 名單什麼時候公開？

每個交易日都要存證，分成兩種方式：

- **平常先公布加密檔，30 天後開放解密。** 以名單對應的交易日加 30 天，在當天晚上 6 點開放。這裡的 30 天包含週末和假日，不是 30 個交易日。
- **每兩週直接公開一次。** 隔週週日晚上 10 點左右，公開隔天週一的名單，不用等 30 天。週一休市就跳過，不順延到週二；公開週次事先寫在系列公告裡。

以上都是台北時間。時間鎖到期後，不必等我交密碼或另外公布名單，任何人都能從原本的加密檔解出內容。

到期後，更新流程也會自動另存一份「解密名單」Release，首頁會補上下載連結。**這是原檔解密後的名單，不是另一份預測。** 解密頁會連回原始存證，並列出對應的檔案指紋；判斷是否事前發布，仍看原始存證的時間，不看解密頁的時間。若自動更新暫時中斷，仍可從公開備份自行解密，之後的更新會補處理。

## 封存的檔案各有什麼用途？

**想看名單，找 `top100.csv`。** 一般期尚未到期時，名單加密放在 `capsule.json`，現在打開不會看到股號。到期後，首頁會連到另外發布的解密 CSV；直接公開期則在當期 Release 就能下載。

一般加密期的 Release 會看到以下 9 項。其中 `capsule.json` 裝的是名單，其餘檔案協助核對時間、正式版本與內容。

| 檔案 | 主要用途 |
| --- | --- |
| **`capsule.json`** | **加密名單本體**，連同適用日期、解密時間及簽名一起封存。 |
| `protocol.json` | 查核規則：去哪裡查登記、幾點截止、哪一份算正式版。 |
| `vbase-receipt.json` | 找到鏈上登記紀錄，再核對登記時間與檔案指紋。 |
| `arweave-receipt.json` | 找到放在 Arweave 的公開備份。 |
| `turbo-receipt.json` | Turbo 簽署的收據，證明它何時收到哪個檔案。 |
| `arweave-item.bin` | 當時送出的原始資料，讓查核程式比對內容、簽名與入鏈證據。 |
| `Source code (zip)` | GitHub 自動打包的公開網頁與驗證資料。 |
| `Source code (tar.gz)` | 同一份公開資料，另一種壓縮格式。 |
| `Release attestation (json)` | GitHub 簽發的證明，記錄這份 Release 的附件指紋。 |

一般讀者不用逐一下載：先看驗證頁的結果，名單公開後下載 CSV 即可。`Source code` 旁的日期可能是程式版本的時間，不能當成預測發布時間；是否事前存證，要看原始 Release、鏈上登記與 Turbo 簽收。

## 查核結果會自動更新嗎？

會。每次晚間更新時，會一併查核已過 08:30 截止時間的名單，確認正式版與 Arweave 入鏈狀態，再把結果更新到網頁。尚未入鏈或暫時查不到的項目會保留「待確認」，下次再查。網頁會顯示最近更新時間；判斷是否事前存證，仍看原始外部紀錄的時間，不看我們哪一天查核。

## 想看整體表現？

[策略績效總覽](https://valueshellseeker-frank.github.io/tw-stock-prediction/performance.html)只統計已公開、可核對的正式名單。尚無足夠資料時會留白，不把測試或未公開名單當成績效。圖表分成兩部分：每期名單與 0050、加權報酬指數的含息報酬比較，以及十份資金輪流投入、扣掉成本後的淨值走勢。也可下載逐期與個股明細重算。

交易模擬採 1,000 萬元、手續費 2.8 折且每筆最低 1 元；每邊滑價以 0.30% 和一個跳動檔位取較不利者，交易稅另外計算。漲停買不到的錢留給下一個交易日的清單；跌停賣不掉就繼續持有，直到能賣出，再投入成交當天的清單。這是開盤價模擬，沒有驗證零股實際成交與容量。

績效規則事先放在系列公告的 `performance-policy.json`，與選股存證一起固定，避免看完結果才換計算方式。完整假設和統計起點都列在總覽裡。

績效頁隨更新流程自動重算新增日期，並標示資料期間與更新狀態。已公開、持有期已結束的名單可先看單期報酬；十份輪動淨值則等待從系列開始日起的連續名單，不把零散日期接成一條績效。行情還沒齊或第三方紀錄暫時查不到時，會保留前次結果或停在可計算的日期，下次自動補上，不拿缺資料當作零報酬。

[完整期間查核紀錄 JSON](https://valueshellseeker-frank.github.io/tw-stock-prediction/verification-summary.json)列出每個交易日的狀態、原始發布時間與更正紀錄，方便第三方或 agent 批次查看。這是查核摘要；需要獨立確認時，仍請核對下方的第三方來源。

## 有更正時，哪一版才算數？

**以當天 08:30 前，最後一筆鏈上登記為準。08:30:00 就算逾時。**

例如 08:10 發布 A 版、08:22 更正成 B 版，當天就只認 B 版。A 版仍留在紀錄裡，但不能看完結果後，因為 A 比較準就改用 A。B 如果無法通過驗證，那天就記為驗證失敗，也不能換回 A。

這裡的「唯一」是指：**在事先公告的登記位置，每天只有一份正式結果。** 可以在截止前更正，但每次登記都查得到。

查核要從公告的開始日逐日檢查。漏交、逾時、檔案遺失或解密失敗，都要列出，不能只挑表現好的日期。

## 如果想事後挑名單，查得出來嗎？

**正式版由第三方登記紀錄決定，不由首頁、標題或發布者事後指定。** 查完同一天的全部紀錄，只認台北 08:30 前最後一筆；找不到這份檔案或驗證失敗，就不能算通過，也不能換回舊版。

| 如果發布者這樣做… | 為什麼不能通過查核？ |
| --- | --- |
| **先藏很多草稿，漲了才挑一份公開** | 沒有事前登記的檔案不算；事後才公開的 Release，發布時間也過不了。若多份都已登記，全部會留在鏈上，仍只認截止前最後一筆。 |
| **事前傳 A、再更正成 B，結果 A 比較準，就只放 A** | 查核會找到 B。首頁只放 A、把 A 標成「最新版」，都不會改變正式版。 |
| **把 B 刪掉，讓 A 重新變成正式版** | 刪不掉 B 已留下的鏈上登記。找不到 B 就記為無法驗證，不能退回 A。 |
| **刪除 Release，再上傳另一份** | GitHub 不允許重用不可變 Release 的原 tag；換個 tag 重發，也改不了原來的登記、時間和檔案指紋。 |
| **連 repo 都刪掉，再用同名重建** | GitHub 仍不允許重用原本的不可變 tag。固定公告或預測找不到時，就不能拿新檔冒充。[官方說明](https://docs.github.com/en/code-security/concepts/supply-chain-security/immutable-releases) |
| **改檔名、日期或電腦時間，假裝早就發布** | 查的是第三方記錄的時間和有效簽收，不是檔名、自填文字或本機時間。08:30:00 起就算逾時。 |
| **偷偷換檔，或拿另一份檔案的收據來證明** | 會重新計算整份原檔的指紋，並核對收據簽名與檔案 ID。改了內容、換了檔案，或自己做一張假收據，都對不上。 |
| **到期不交密碼，或另外給一份比較準的 CSV** | 時間鎖到期後，別人可用公開資料解密原檔，不必等發布者交密碼。另給的 CSV 也必須與解密結果一致；解不開就列為失敗。 |
| **只展示賺錢的日期，藏起虧損或漏交的日子** | 完整查核從公告起日逐日盤點，缺交、逾時和失敗都會留下。也要看報告查到哪一天，較早的一段通過，不代表後面的日期也通過。 |
| **直接把驗證頁或績效圖改成「通過」** | 網頁只是查詢工具。第三方可依固定公告，直接查登記紀錄、原檔及計算規則；網頁上的文字改不了那些證據。 |

**能刪頁面、停止更新，不代表能換掉正式名單。** 這些操作可能讓資料暫時查不到，但不能把另一份檔案變成合格的事前預測。若第三方服務暫時無法查詢，就顯示待確認，不把缺資料當成通過。

## 不透過本站，怎麼自行查證？

**不必事先來過本站，也不用事先保存程式。** 查核對象就是這個 repo 的每日名單。先到 GitHub 開啟固定的 [系列公告](https://github.com/valueshellseeker-Frank/tw-stock-prediction/releases/tag/series-policy-v2)，核對 Immutable 標記、事前發布時間及附件 `protocol.json`，再依附件中的登記位置查詢。本公告的 SHA-256 是：

`44f2ec481afcb0927d478c16c4db21d901e425799bb2d4345dea2bb952ba52f7`

[保存證據與查核版本](https://github.com/valueshellseeker-Frank/tw-stock-prediction/releases/tag/storage-evidence-v1)保留當時的查核程式及原始保存證據，供需要的人重驗。它是歷史版本，不是使用本站的必要條件。**本頁的文字與結果只是方便查詢，獨立查核應以第三方紀錄和原檔為準。**

接著查三件事：

1. **時間對不對？** 查看鏈上登記、GitHub 記錄的發布時間，以及有效 Turbo 簽收的時間，必須早於當天台北 08:30。簽收與完整檔案要對得上，不能只看一個時間欄位。
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

- `published_at`：GitHub 記錄的 Release 發布時間（無法單靠這欄知道 repo 當時是否公開）。結尾的 `Z` 代表 UTC，換成台北時間要加 8 小時，結果必須早於當天 08:30。
- `immutable`：必須是 `true`，表示這份 Release 的附件已鎖定。

有多頁時，把網址的 `page=1` 改成 2、3，繼續查看。請用 GitHub 記錄的時間，不要用檔名或說明文字裡填寫的日期。[GitHub API 說明](https://docs.github.com/en/rest/releases/releases#list-releases)

### 確認下載的附件就是原檔

GitHub 也會為不可變更的 Release 簽發附件證明。若已安裝 GitHub 官方 CLI，把 `TAG` 換成當天 Release 的 tag，執行：

```bash
gh release verify-asset TAG capsule.json -R valueshellseeker-Frank/tw-stock-prediction
```

同樣可以驗證事前公告的 `protocol.json`。這個指令查的是 GitHub 簽發的證明，不使用本站的驗證結果。[GitHub CLI 說明](https://cli.github.com/manual/gh_release_verify-asset)

Immutable 鎖定的是附件與 tag，標題和說明仍可修改。整筆 Release 雖然可以刪除，但 GitHub 不允許重用它原本的 tag；連刪除 repo 後用同名重建，也不能重用。**所以刪除不能把固定公告或原始預測換成另一份；找不到證據就列為無法驗證。** [GitHub 官方說明](https://docs.github.com/en/code-security/concepts/supply-chain-security/immutable-releases)

</details>

<details>
<summary>查外部收件時間與入鏈：Turbo／Arweave 的原始證據</summary>

新的預測 Release 會附上 `turbo-receipt.json`（完整簽收證據）及 `arweave-item.bin`（簽署後的原檔）。11/10 的原 Release 保持不動，收據另放在上面的「保存證據與查核版本」。補充檔的發布時間不是原始簽收時間。

**先驗簽名，再看時間。** 只讀 JSON 裡的 `timestamp` 或截圖，不能當作證明。可用 [Turbo 官方收據規格](https://docs.ar.io/build/upload/receipts/)和官方 SDK 驗簽；還要確認簽署者就是 [Turbo 公布的服務地址](https://upload.ardrive.io/info)，不是發布者自己產生的金鑰。本次固定的 Turbo Arweave 地址為 `JNC6vBhjHY1EPwV3pEeNmrsgFMxH5d38_LHsZ7jful8`。

給第三方或 agent 的核對順序：

1. 對收據的 RSA 公鑰計算 SHA-256，再轉成 base64url，必須等於上述服務地址。
2. 按官方 0.2.0 格式驗簽，核對被簽署的檔案 ID、時間和期限。`timestamp` 是 Unix 毫秒，轉成台北時間後必須嚴格早於 08:30。
3. 驗證 `arweave-item.bin` 的 ANS-104 簽名與 ID，解出內含檔案，與鏈上選定的 `capsule.json` 比對。這一步避免拿別的檔案的真收據來充數。
4. 從 `https://upload.ardrive.io/v1/tx/檔案ID/status` 找到 `bundleId`，再查 `https://arweave.net/tx/bundleId/status`。`FINALIZED` 只是查詢線索；完整查核還要驗打包交易簽名、資料包含證明及區塊紀錄。[官方驗證說明](https://docs.ar.io/learn/verification/claims-proofs-accountability/)

驗證頁的「重驗保存證據」會在讀者的瀏覽器執行這些查核；證據 JSON 也保留原始簽收和簽署檔案，方便 agent 自行驗證。要完全獨立於本站，可依上述官方規格使用其他工具驗簽，不必採信本站顯示的「通過」。

入鏈需要時間，會另外追蹤，不影響當天先完成存證。簽收證明的是第三方收到原檔的時間，並非歷史匿名下載紀錄；GitHub 的發布時間也不能單獨證明 repo 當時的可見性。

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

到期後不需要發布者提供密碼，但仍要能取得公開備份，而且 drand 必須正常運作。時間鎖決定何時可以解密；本站的更新程式會在後續執行時，把解出的 CSV 另存到 GitHub，方便直接下載。[時間鎖說明](https://docs.drand.love/docs/timelock-encryption/)

</details>

只要依公告查完完整紀錄，藏草稿、刪掉最後一版或事後另傳一份，都不能改變當天的正式名單。找不到必要證據就記為無法驗證，不能改挑比較準的舊版。績效也要逐日列出缺期與失敗，不能只展示表現好的日期。
