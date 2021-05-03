# Crypto Collectable Wallet

## 初始想法

* 用類似 vue-virtual-scroller 等 library 來實現 DOM reuse
* 用 vue-router 換頁
* 玩玩看 windicss

## 實作中想法

* 比較大比較成熟的都只支援 vue2 不支援 composition API
  > 不要 DOM reuse 也可以利用 IntersectionObserver 來偵測 footer 來觸發 fetchNext()
* vue-router 換頁之前 load 的都會消失
  > 不要 router 了，用類似 page dialog 的方式來做
* windicss 在 vscode 的提示跟支援殘缺…
  > 換回 tailwindCSS

## 結果

看起來應該很像需求了…

還需要調整的部份：

* 因為把 router 拔掉了，沒辦法直接進入 details 頁面
* API 看起來丟回來的 assets 順序並沒有每次都一樣，但要看需求才能知道怎麼排序才是對的

~~感覺對 vite + Vue3 的開發環境還不熟阿…~~
