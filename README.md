### :name_badge: Đồ án CNTT


---

### 🧑‍🤝‍🧑 My team (From HCMUTE):
- 🥇 Trần Duy Nhã 🆔 19110251 
- 🥇 Quản Minh Đức 🆔 19110015

--- 

### 📽️ About project:
<b>:fire: Describe:</b> This is an e-commerce website used to sell information technology products <br>
<b>:fire: Architecture:</b> Use MERN stack (<b>MongoDB</b> - <b>Express Express </b> - <b>ReactJS</b> -  <b>NodeJS</b>) <br>
<b>:fire: Features:</b>
- Admin:
```
- Manage User (Update information, set role,...).
- Manage Category (Creat, read, update, delete)
- Manage Product (Create, read, update, delete)
- Manage Order (Read, update - set status)
```
- User:
```
- Login/register
- Buy product with cart (filter by range of money, by brand)
- Manage Information
```

### 🪗 To use:
- Step 1: Clone this project (Installed NodeJS)
- Step 2: Go to path "DoAnCNTT/backend/" use command "npm install" or "npm add" to download dependency
- Step 3: Change file config.env path "/backend/config/"
```
MONGO_URIS : Link URL of Mongo Database
o EMAIL_PASSWORD: API KEY of SendGrid
o EMAIL_FROM: Your Email Address
o SMTP_FROM_EMAIL: Email address showing for user
o SMTP_FROM_NAME: Email name showing for user
Link register: sendgird https://app.sendgrid.com/guide/integrate/langs/nodejs
```
- Step 4: Go to path "DoAnCNTT/frontend/" use command "npm install" or "npm add" to download dependency
- Step 5: Change file .env path "/frontend/"
```
REACT_APP_FIREBASE_API_KEY = "YOUR-UNIQUE-CREDENTIALS"
REACT_APP_FIREBASE_AUTH_DOMAIN = "YOUR-PROJECT-NAME.firebaseapp.com"
REACT_APP_FIREBASE_DATABASE_URL = "https://YOUR-PROJECT-NAME.firebaseio.com"
REACT_APP_FIREBASE_PROJECT_ID = "YOUR-PROJECT-FIREBASE-PROJECT-ID"
REACT_APP_FIREBASE_STORAGE_BUCKET = "YOUR-PROJECT-NAME.appspot.com"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID = "YOUR-PROJECT-SENDER-ID"
REACT_APP_FIREBASE_APP_ID = "YOUR-PROJECT-APP-ID"
In this video "https://www.youtube.com/watch?v=L-kxXFtql4Q&ab_channel=DarwinTech" 0:00-3:40 will guide how to Create and get API KEY.
```
- Step 6: Run backend (api) go to backend path then use "npm run prod"
- Step 7: Run web application go to frontend path then use "npm run start"
