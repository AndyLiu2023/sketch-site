# project02

網站網址：https://project02.andysproject.cc

## 專案目的 ##

先前使用過人體速寫網站，有發現幾個問題，想自己寫一個看看，目前使用既有速寫網站遇到的問題有：

- 圖庫照片資源太少、重複高，需要增加圖庫資源，還有隨機性。
- 照片資源為隨機出現，有些照片想回頭練習使用會找不到，需要收藏功能。
- 會想練習特定主題，需要篩選功能。

## API 資源 ##

- 選定常使用的老牌創作網站 Devianrt Art，該網站有提供 API，可以用於存取資料，希望可以透過該 API 來實現網站功能。

    DA API 網址：https://www.deviantart.com/developers/


## 功能 ##

最終實現的功能有：

- 速寫模式
  - 倒數計時功能（30 / 60 / 90 / 120 秒）
  - 倒數提示音，最後三秒會響音提示
  - 暫停、重新計時功能
  - 全螢幕模式
- 自由模式
  - 不限時計時，可以停留單張照片 
  - 磚牆式版面，一次瀏覽複數張參考照片 
  - 收藏照片，收藏後的照片可在 已收藏 頁面瀏覽
  - 瀑布式瀏覽
- 狗狗模式
  
  考量到面試官或是想了解這個網站作法的人，操作過程可能不太想看到裸體的人，於是另外寫了狗狗模式，可以把圖片來源換成狗狗。

## 問題、如何解決 ##

   - 圖庫資源小、重複高
     1. 手動在 DA 尋找可用的創作者帳戶，找了超過 5 位攝影創作帳戶，這些帳戶累積攝影作品都超過百張。
     2. 先透過 API 取得帳戶相關資料，如資料夾id、使用者名稱、照片總數，先儲存成物件，供之後請求使用。
     3. JS寫一套流程來「隨機化」圖片，流程如下：
        
         1.  從事先收集的帳戶中，隨機抽 5 位
         2.  這 5 位帳戶各有 1 個指定資料夾，每個資料夾隨機決定起始位置，抽出 20 張照片。(如:起始位置為 5，從該資料夾的第 5 張起，抽接下來 19 張照片片)每個資料夾的起始位置都是亂數決定。
         3.  理想情況下，每個帳戶抽了 20 張，再從 20 張各隨機抽 5 張，因此現在會有 25 張。
         4.  這 25 張在丟給 html 前，會再亂數洗牌排序。
   
結果：產出的結果隨機性高、重複降低，但還是會受照片來源的帳戶本身資料夾內容管理方式影響。不過基本上已經解決先前遇到的問題。



- 收藏功能，想重複練習同張圖

  寫了自由模式，可以隨機瀏覽圖片，隨機機制參考上述。為了增加流暢度，採用無限瀑布式和磚牆版面呈現，能在短時間瀏覽大量照片，若看到有興趣的圖片，能點擊收藏按鈕，儲存功能是寫localstorage。

- 篩選功能

   閱讀官方 API 說明頁面後，發現無法針對特定內容請求，指定圖片標籤也只能指定 1 個標籤，表示回傳結果可能會不如預期，有太多雜訊，畢竟 DA 不只有照片內容，手繪電繪也會有。

   若是要做到篩選還是有辦法，但已經超過這次網站預期要實踐的範圍。所以先不考慮。


## 使用工具 ##

- 開發編輯器 - Visual Studio
- 前端語言 - Vue
- 前端語言 - HTML、CSS、Javascript
- 網站部屬 - linux 主機 (linode)
- 網頁伺服器設定 - nginx 


## 應用技能 ##

- ajax fetch 串接 API
- VUE 前端框架應用
- RWD
- 部屬網站，linux 虛擬主機設定


## 目前無法改善的問題 ##

- 篩選功能

## 還能實現的功能 ##

- 篩選已收藏內容
- 按鈕動畫特效