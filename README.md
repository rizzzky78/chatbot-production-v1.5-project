<div align="center">
<img src="https://telegra.ph/file/064adbf9eb6bd1760c3c7.png" width="200" height="200" border="0" alt="PFP">

# Chatbot Marketplace

<p align="center">
  
</p>

## [![JavaScript](https://img.shields.io/badge/JavaScript-d6cc0f?style=for-the-badge&logo=javascript&logoColor=white)](https://www.javascript.com) [![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/) [![MongoDB](https://img.shields.io/badge/MongoDB-43853D?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)

Lightweight WhatsApp Bot - For Production Use

</div>

## 📑 Highlights

-   Dikembangkan menggunakan Bahasa TypeScript & JavaScript
-   Menggunakan plugin, memudahkan akses module
-   Mudah di maintenance, tanpa harus di shut-down (hot reload)
-   Menggunakan Libary API WhatsApp Non Official [Baileys - Multi Device](https://github.com/adiwajshing/Baileys/).

---

## Requirements

- [Node.js](https://nodejs.org/en/)

- [Git](https://git-scm.com/downloads)

---

## 📌 Install Dependencies

-   Via NPM

```cmd
$ npm install
```

-   Intsall PM2 Module

```cmd
$ npm install pm2 - g
```

---

## 📕 Setup Databse

-   Kunjungi [MongoDB website](https://www.mongodb.com/) untuk mendapatkan link URI

-   Buat Akun jika tidak punya, ikuti step-by-step

-   Untuk Cloud Services pilih Amazon Web Servide, bisa juga bebas, pilih region Asia

-   Pada Main Page, klik tombol connect, pilih `connect your application`, driver yang digunakan adalah `Node.js` dan versi URI nya `v2.2.12`

-   Contoh link URI `mongodb://USERNAME_KAMU:PASSWORD_KAMU@ac-xtaqo4g-shard-00-00.w7oyxwa.mongodb.net:27017,ac-xtaqo4g-shard-00-01.w7oyxwa.mongodb.net:27017,ac-xtaqo4g-shard-00-02.w7oyxwa.mongodb.net:27017/?ssl=true&replicaSet=atlas-yds57g-shard-0&authSource=admin&retryWrites=true&w=majority`

-   Lanjut, buka folder `config`, buka file `global.js`

-   Edit value `ATLAS.URI`, paste-kan link URI (sudah include username & password)

---

## 📗 Setup PM2

-   Login/Buat Akun [PM2](pm2.io)

-   Connect, ambil APIKEY PM2

-   Integrasikan APIKEY PM2 ke server 

```cmd
$ pm2 link YOUR_APIKEY_1 YOUR_APIKEY_2
```

-   Jika sudah, maka bisa dilanjut untuk di `RUN`

---

## ▶️ Run

-   Production mode (Restart otomatis setiap 5 jam sekali)

```cmd
$ npm start
```

-   PM2 Mode

```cmd
$ pm2 start index.js
```

-   Regular / Development Mode (tanpa Nodemon)

```cmd
$ node index
```

-   Develelopment Mode (dengan Nodemon)

```cmd
$ npm i -g nodemon
$ nodemon
```

---

## Attention

WA API Baileys merupakan API NON-OFFICIAL, segala kemungkinan yang dapat terjadi:

-   `Akun whatsapp` dapat di banned oleh pihak `Whatsapp`, jika terindikasi melakukan spamming, dll

-   Segala hal yang terjadi pada pengguna module ini `bukan sepenuhnya tanggungjawab Developer`

-   Solusi agar tidak terbanned adalah dengan cara melakukan `limitasi` akses `user`, menambah cooldown command, dll

---

## 💪 Contributing

Hello, im Rizky
Im solo programmer, my stack only in NodeJS app (typeScript and javaScript)
My Majority is on Chatbot or Automation

Literaly this project is my second-project
And I barely completed it by myself, there is no help from anyone (except the internet :3)

Feel Free to Modificate or Continue this Project!

Mohon maaf jika segala-nya dikenan kurang rapih, baik module tree, sintaks, dsb.

---

## 🙏 Special Thanks To

-   Allah SWT
-   [Adiwajshing - Baileys](https://github.com/adiwajshing/Baileys)
