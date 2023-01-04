# (Group 3) Anigy 流浪動物收養平台
## 基本介紹
1. Demo 影片連結：
2. 服務簡介：
3. Deploy 連結：https://anigy.netlify.app/
4. (如果有給 deployed 連結) 使用/操作方式 (含伺服器端以及使用者端)
5. Github link：https://github.com/jiacian0609/Anigy
6. 其他說明
7. 使用與參考之框架／模組／原始碼
	- 前端：
	- 後端：Node.js、Express.js、JSON Web Token、bcrypt、Babel、nodemon、CORS、Mongoose
	- 資料庫：MongoDB
	- 部屬：Netlify、Railway
8. 使用之第三方套件／框架／程式碼
9. 專題製作心得
	- B08705001 李書成 \
	這次的專案讓我除了能實作課堂所教的，因為同時撰寫前端和後端，讓我深入學習到很多東西，像是jwt的用法，還有前端一些實作上面的細節，和在後端如何和資料庫進行溝通。雖然一開始對這些東西不是很熟悉，因此花了許多時間去查很多資料和參考別人專案的寫法，但是到後來也漸漸可以快速的知道要怎麼寫可以完成我要的功能。而這次專案雖然不是第一次寫前後端，但是我第一次可以獨自負責不是登入/註冊的功能。
	- B08705003 楊佳芊 \
	<心得>
	- B08705049 陳亮瑜 \
	<心得>

## localhost 安裝與測試步驟
### 環境設置
#### 設定環境變數
1. 下載[環境變數壓縮檔](https://drive.google.com/file/d/1Kc9bn1kCnH_t9AmGpybCQsSSMzHE2M17/view?usp=sharing)
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
2. 若已有帳號，輸入使用者名稱、密碼，點擊 `登入`，登入成功後後回到首頁
3. 若尚未有帳號，點擊下方 `還沒有帳號嗎？註冊一個吧！`，跳轉到註冊頁面
4. 輸入使用者名稱、密碼、電子信箱、電話號碼，並且勾選同意公開聯絡資訊，完成後點擊 `註冊`，註冊成功後後回到首頁
#### 搜尋貼文
#### 新增貼文
#### 修改貼文
#### 刪除貼文
#### 修改個人資訊

## 組員負責項目
### B08705001 李書成
### B08705003 楊佳芊
### B08705049 陳亮瑜