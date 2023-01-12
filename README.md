# Vue.js(前端) + Node.js(後端)
本範例教學為在實體機上，在內部區域網環境下，分別使用

* 以 Vue.js V2.9.6 運作的前端
* 以 Node.js v16.15.0 運作的後端 

**事前設置**

請先在設備上安裝下列套件
* Node.js
* Vue.js (需先安裝完Node.js)
* Git

**Node.js的安裝**
1. 從[Nodejs官網](https://nodejs.org/en/download/)下載安裝檔
2. 執行安裝檔，根據安裝檔的步驟調整設定(此步驟npm管理套件也會安裝完成)

**Vue.js的安裝**
1. 開啟CMD （命令提示字元）
2. 輸入 npm install vue

**Git的安裝**
1. 從[Git官網](https://git-scm.com/)下載安裝檔
2. 執行安裝檔，根據安裝檔的步驟調整設定
3. 輸入 git --version 確認安裝完成


# 使用步驟
* 執行時請勿關閉CMD
* 請先CMD上執行 git clone https://github.com/penny-LU/ros-application.git

**啟動前端的步驟**
1. 開啟CMD （命令提示字元）
2. 移動至 ros-application\client 的目錄下 (cd)
3. 在該目錄下，執行 "npm run dev"

**啟動後端的步驟**
1. 開啟CMD （命令提示字元）
2. 移動至 ros-application\server 的目錄下 (cd)
3. run "npm install". It will resolve the required dependencies from the package.json file.
4. 在該目錄下，執行 "npm start"

# 前端畫面
**Download Function Page**
![image](https://github.com/penny-LU/ros-application/blob/main/Download_page.JPG)
**Custom Function Page**
![image](https://github.com/penny-LU/ros-application/blob/main/Custom_Page.JPG)

# Reference
1. Node.js official documentation: https://nodejs.org/en/docs/
2. Express official documentation: https://expressjs.com/en/5x/api.html#req
3. Full-Stack Web Development : [https://kema221.gitbooks.io/vue-study-guide/content/vueyu-node-jie-he-kai-fa-bu-shu.html](https://medium.com/bb-tutorials-and-thoughts/how-to-develop-and-build-vue-js-app-with-nodejs-bd86feec1a20)
4. Vuetify Component: https://vuetifyjs.com/en/
