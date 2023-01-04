# (Group 3) Anigy 流浪動物收養平台
## 基本介紹
1. Demo 影片連結：
2. 服務簡介：
3. Deploy 連結：https://anigy.netlify.app/
4. (如果有給 deployed 連結) 使用/操作方式 (含伺服器端以及使用者端)
5. Github link：https://github.com/jiacian0609/Anigy
6. 其他說明
7. 使用與參考之框架／模組／原始碼
	- 前端：React.js、axios、styled-components、lodash
	- 後端：Node.js、Express.js、JSON Web Token、bcrypt、Babel、nodemon、CORS、Mongoose
	- 資料庫：MongoDB、Firebase Storage
	- 部屬：Netlify、Railway
8. 使用之第三方套件／框架／程式碼
	- 前端：react-toastify、antd
9. 專題製作心得
	- B08705001 李書成 \
	這次的專案讓我除了能實作課堂所教的，因為同時撰寫前端和後端，讓我深入學習到很多東西，像是jwt的用法，還有前端一些實作上面的細節，和在後端如何和資料庫進行溝通。雖然一開始對這些東西不是很熟悉，因此花了許多時間去查很多資料和參考別人專案的寫法，但是到後來也漸漸可以快速的知道要怎麼寫可以完成我要的功能。而這次專案雖然不是第一次寫前後端，但是我第一次可以獨自負責不是登入/註冊的功能。
	- B08705003 楊佳芊 \
	我這次主要負責的是前端，從這次的專案中學習到在串接別人寫的後端 API 時，一份好的文件可以省下許多心力，並且在開始開發前就應該確認前後端的需求以及格式等等的設計，以減少來回修改的次數。在以前的專案中我傾向於自己手刻所有的頁面和元件，這次我比較能靈活運用現成的套件，實作起來比較快速也不失美觀。
	- B08705049 陳亮瑜 \
	期末專案應用上課提及的技術以及套件與組員一同做出自己的成品很令人開心。在技術的部份，開發 API 以及與資料庫的串接，能應用上課所學的架構有很好的管理，部屬時接觸到了兩個之前沒有接觸過的服務，踩坑的過程也收穫良多。在與組員合作的部分，如何與前端有良好的串接溝通讓我反思很多，覺得多人開發仍是我需要學習的部分，應該縝密規劃所有的定義以及流程，包含每支 API 的參數或是開發進度管理，感謝組員們一同完成期末專案。

## localhost 安裝與測試步驟
### 環境設置
#### 設定環境變數
1. 下載環境變數壓縮檔（下載連結在繳交表單的備註欄）
2. 將兩個 `.env` 檔分別放到 `/frontend` 以及 `/backend` 底下
#### 啟動後端
1. 安裝所需套件
	```
	cd backend
	npm install
	```
	或
	```
	cd backend
	yarn
	```
2. 啟動伺服器
	```
	yarn server
	```
	或
	```
	npm run server
	```
#### 啟動前端
1. 安裝所需套件
	```
	cd frontend
	npm install
	```
	或
	```
	cd frontend
	yarn
	```
2. 開啟瀏覽器
	```
	yarn start
	```
	或
	```
	npm start
	```
### 功能測試
#### 註冊／登入
1. 進到首頁後，點擊右上角的 `登入`，進到登入頁面
2. 若已有帳號，輸入使用者名稱、密碼，點擊 `登入`，成功後會回到首頁
3. 若尚未有帳號，點擊下方 `還沒有帳號嗎？註冊一個吧！`，跳轉到註冊頁面
4. 輸入使用者名稱、密碼、電子信箱、電話號碼，並且勾選同意公開聯絡資訊，完成後點擊 `註冊`，成功後會回到首頁
#### 搜尋貼文
1. 進到首頁後，可以瀏覽所有的貼文資訊
2. 點擊右上角的 `搜尋`，可以依據動物、品種、性別、結紮與否、年齡、地區進行貼文搜尋
#### 查看貼文
1. 點擊每篇貼文，會進到個貼文的主頁，可以查看所有資訊
2. 若為自己發佈的貼文，右上角會有 <img src="./frontend/public/icons/edit.png" width="10"/> 以及 <img src="./frontend/public/icons/delete.png" width="10"/>，可以進行修改或是刪除
#### 新增貼文
1. 點擊右上角的 `我的貼文`，可以查看使用者發佈過的所有貼文
2. 點擊 `新增送養貼文`，進到新增貼文頁面
3. 上傳封面照片並選擇動物、品種、年齡、地區、性別、結紮與否、公開聯絡資訊，且可以自行決定增加其他照片以及填寫外觀特徵描述
4. 點擊 `新增貼文`，若新增成功則會回到我的貼文頁面，可以在最下面查看新增的貼文
#### 修改貼文
1. 在我的貼文頁面，選擇欲修改的貼文
2. 點擊貼文右上角的 <img src="./frontend/public/icons/edit.png" width="10"/>，進到編輯貼文頁面
3. 修改完資訊後，點擊 `編輯貼文`，若修改成功則會到該則貼文的主頁
#### 刪除貼文
1. 在我的貼文頁面，選擇欲刪除的貼文
2. 點擊貼文右上角的 <img src="./frontend/public/icons/delete.png" width="10"/>，完成刪除

#### 修改個人資訊

## 組員負責項目
### B08705001 李書成
* 設計 Figma prototype
* 登入、註冊、個人資訊相關之前端頁面及後端 API 開發
* 簡報製作
* 報告影片錄製
### B08705003 楊佳芊
* 資料庫設計
* 首頁、搜尋、貼文相關之前端頁面開發
* 介面 Demo 
### B08705049 陳亮瑜
* 資料庫設計
* 貼文相關後端 API 開發
* 服務部屬
* README 撰寫
