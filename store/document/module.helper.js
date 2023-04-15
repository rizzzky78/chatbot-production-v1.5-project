/* Admin Helper */
const adminsKiat = `
Hi Admin!,

Berikut adalah hal yang dapat Kamu lakukan pada Chatbot ini untuk memanage Marketplace Online Kamu!
- Menambah Produk
- Mengedit Produk
- Menghapus Produk

Tidak hanya itu, Kamu dapat mengubah laman gambar/text dataImages dashboard Chatbot, serta membuat rekap data produk yang dikonversikan menjadi PDF, melihat data statistik, dll.

`;

const hintsFooter = `
*Note:*
ID Produk didapatkan dari data produk, yaitu dapat berupa: #AB3XXX
Dalam penggunaan perintah, karakter "#" wajib digunakan sebagai pemisah dari ID produk serta urutan pengisian form harus sesuai petunjuk, jika tidak sesuai maka akan terjadi error dan perintah yang dimasukan tidak valid.

_Untuk detailnya Kamu dapat meilhat pada modul panduan_
`;

/* Manage Product */
const editDashboard = `
*Cara Mengedit Dashboard*

_Hints Perintah:_
!editdashboard Text promosi / detail Marketplace / apapun itu, max jumlah kata 500 kata.

`;

const uploadProduct = `
*Cara Mengupload Produk*

_Hints Perintah:_
Upload gambar/foto produk dengan caption:
!uploadproduk Nama Produk # Harga Produk # Kategori Produk # Deskripsi Produk


_karakter '#' wajib digunakan sebagai pemisah, urutan pengisian form harus sesuai petunjuk, jika tidak maka akan terjadi error dan produk gagal ditambahkan_
_selebihnya Kamu dapat melihat gambar diatas untuk contohnya._
`;

const editProduct = `
*Cara Mengedit Produk*

Sebelum mengedit produk, Kamu harus tahu ID produk terlebih dahulu, ID produk terdapat pada tanda *#123ABC* disaat Kamu mengakses data produk, tanda "#" dihilangkan saat ingin mengedit produk.


_Hints Perintah:_
Upload gambar/foto produk dengan caption:
!editproduk ID Produk # Nama Produk baru # Harga Produk baru # Kategori Produk baru # Deskripsi Produk baru


_karakter '#' wajib digunakan sebagai pemisah, urutan pengisian form harus sesuai petunjuk, jika tidak maka akan terjadi error dan produk gagal ditambahkan_
_selebihnya Kamu dapat melihat gambar diatas untuk contohnya._
`;

const deleteProduct = `
*Cara Menghapus Produk*

Sebelum menghapus produk, Kamu harus tahu ID produk terlebih dahulu, ID produk terdapat pada tanda *#123ABC* disaat Kamu mengakses data produk, tanda "#" dihilangkan saat ingin menghapus produk.


_Hints Perintah:_
!hapusproduk ID Produk


_karakter '#' wajib digunakan sebagai pemisah, urutan pengisian form harus sesuai petunjuk, jika tidak maka akan terjadi error dan produk gagal ditambahkan_
_selebihnya Kamu dapat melihat gambar diatas untuk contohnya._
`;

/* Manage Produk by one parameters */
const editProductNames = `
*Cara Mengedit Nama Produk*

_Hints Perintah:_
!editnamaproduk ID produk # Nama produk yang diperbarui

${hintsFooter}
`;

const editProductPrices = `
*Cara Mengedit Harga Produk*

_Hints Perintah:_
!edithargaproduk ID Produk # Harga produk yang diperbarui

${hintsFooter}
`;

const editProductCategory = `
*Cara Mengedit Kategori Produk*

_Hints Perintah:_
!editkategoriproduk ID Produk # Kategori produk yang diperbarui

${hintsFooter}
`;

const editProductDesc = `
*Cara Mengedit Deskripsi Produk*

_Hints Perintah:_
!editdeskproduk ID Produk # Deskripsi produk yang diperbarui

${hintsFooter}
`;

const editProductImages = `
*Cara Mengedit Gambar/Foto Produk*

_Hints Perintah:_
Upload gambar/foto produk dengan caption:
!editgambarproduk ID Produk

${hintsFooter}
`;

/* FAQ */
const notRespon = `
_*FAQ*_


_*Chatbot Tidak Merespon*_
_*Terdapat Beberapa Faktor Penyebab Chatbot lama/tidak merespon, yaitu:*_

*Chatbot sedang restart*
Hal ini wajar, dikarenakan restart diperlukan untuk merefresh memori pada sistem agar tidak terjadi overload yang menyebabkan shutdown pada Chatbot.

*Overload & Antrian*
Jika terjadi overload pada Chatbot yang disebabkan banyak User yang mengakses, yang berakibat slowdown. Terdapat sistem antrian/cooldown pada Chatbot yang berfungsi untuk menghindari sapmming/request yang berlebihan, Chatbot akan tetap merespon sesuai antrian/cooldown.

*Query / Perintah yang dimasukan tidak valid*
Pastikan input perintah sesuai petunjuk aturan, Chatbot bukanlah AI yang dapat mengerti segala masukan perintah dari User, melainkan sebuah program yang dirancang dan akan bekerja sesuai instruksi/perintah yang berlaku.
`;

const hasError = `
_*FAQ*_


_*Terjadi Error Pada Chatbot*_
_*Terdapat Beberapa Faktor Penyebab Chatbot Error, yaitu:*_

*Error pada Sistem/Server*
Chatbot berjalan di Server Virtual, yang dimana berkemungkinan dapat terjadi down yang menyebabkan Error. Tidak luput dari Server, sistem pada Chatbot sendiri juga berkemungkinan terdapat Bug yang menyebabkan Error juga.

*Error pada Database Chatbot*
Seperti yang diketahui, sistem pada Chatbot tidak berdiri sendiri, melainkan memiliki relasi pada database yang digunakan. Jika terjadi Error pada Server Databse maka akan berakibat Error pada Chatbot dikarenakan tidak bisa mengakases Database.

*Query / Perintah yang dimasukan tidak valid*
Pastikan input perintah sesuai petunjuk aturan, Chatbot bukanlah AI yang dapat mengerti segala masukan perintah dari User, melainkan sebuah program yang dirancang dan akan bekerja sesuai instruksi/perintah yang berlaku.
`;

/* FAQ */
const benefit = `
*Chatbot memiliki fitur administrasi untuk Admin marketplace, seperti:*
Menambahkan produk ke database (cloud) katalog
Mengedit produk yang sudah ditambahkan sebelumnya
Menghapus produk
Melihat data statistik pengunjung

*Untuk sisi pengguna, fiturnya mencakup:*
Mengakses daftar produk yang tersedia
Melihat informasi produk yang dipilih
Menghubungi seller atau penjual

Semua fitur tersebut dapat diakses melalui platform aplikasi WhatsApp tanpa tambahan lain, hal ini memudahkan interaksi baik bagi admin maupun pengguna dengan Chatbot.
`;
const working = `
*Runtime Chatbot*
Chatbot dapat berjalan selama 24 jam tanpa berhenti, terkecuali server down/maintenance.
Chatbot berjalan di server sehingga memungkinkan respon dengan cepat tanpa ada hambatan.
`;
const banned = `
*Chatbot Banned?*
Chatbot memiliki fitur anti spam yang dimana jika ada user yang mengakses Chatbot dan melakukan spamming perintah maka perintah tersebut akan diabaikan sampai cooldown/rentang waktu pesan akan diterima sebagai perintah.
Hal ini membuat Chatbot membatasi aktivitas terhadap user sehingga terhindar dari banned oleh pihak WhatsApp.
`;
const gaptek = `
*Bingung karena awam terhadap teknologi?*
Tidak perlu khawaitr, Chatbot dilengkapi dengan modul panduan penggunaan.
Modul berisikan tata cara menggunakan Chatbot untuk keperluan Marketplace sebagaimana mestinya.
`;
/* Assister */
const aboutchatbot = `
*Info / About Chatbot*

Chatbot dibuat menggunakan bahasa pemrogaman JavaScript dan TypeScript.
Chatbot merupakan sebuah aplkasi yang berjalan di Server yang dimana menggunakan NodeJS sebagai Runtime-nya beserta modul NPM yang dugunakan sebagai pendukung pada sistem Chatbot.

Chatbot mudah di maintain, dikarenakan module tree yang sistematis serta syntax clean code beserta deskripsi JSDoc yang memudahkan untuk mengerti sebuah Function tanpa harus di definisikan menggunakan TypeScript.
Mudah di deploy, dikarenakan modul yang lightweight dan tersedia dua pilihan untuk mendeploy Chatbot, yaitu dengan cara:
> install via NPM, dan
> install via Docker (isolated environtment)

Chatbot kini sudah terintegrasi dengan website Process Manager PM2, dihubungkan menggunakan API baik dari internal maupun dari ENV.
Hal ini memudahkan untuk memanage aplikasi jika terjadi Error, dapat diatasi dengan cara merestart aplikasi secara remote via website pm2.io tanpa harus login ke VPS dan merestartnya secara manual.

QA & Pengembangan
Engine chatbot sebelumnya telah di uji 2 bulan 24 jam nonstop di server VPS dengan spesifikasi:
Intel Xeon 2 core
Ram 4gb

Testing Deployment sudah dilakukan dan menghasilkan zero bug/kendala, hanya restart. Hal ini (restart) normal dikarenakan sistem pada Chatbot memerlukan restart agar performa Chatbot tetap stabil tanpa adanya lagging response dikarenakan penggunaan memori yang berlebih.

Chatbot ini memerlukan waktu pembuatan kurang lebih:
4 bulan pengembangan (koding), 1 bulan testing (secara lokal), 2 bulan deploy (di server, untuk testing)


_Regards, happy to help :)_
`;

const dataImages = {
  adminsKiat: "https://telegra.ph/file/8f6577d378a943119c0c2.png",
  adminsDo: "https://telegra.ph/file/019a039f400b559d5fc1e.png",
  editDashboard: "https://telegra.ph/file/21ee76e6482e4875a50be.png",
  benefit: "https://telegra.ph/file/e60e7d63f52b3670b97b5.png",
  gaptek: "https://telegra.ph/file/4cbd4f28a8c06e4a9b854.png",
  banned: "https://telegra.ph/file/15301673b501b0eca542a.png",
  working: "https://telegra.ph/file/dd26eb818c7dae4668297.png",
  norError: "https://telegra.ph/file/0ab362b3b752a83412865.png",
};

/**
 * @param {string} queryArgs
 * @returns
 */
const adminHelperSelector = (queryArgs) => {
  let selections = null;
  switch (queryArgs) {
    case "kiat":
      selections = { caption: adminsKiat, imgUrl: dataImages.adminsKiat };
      break;

    case "dashboard":
      selections = { caption: editDashboard, imgUrl: dataImages.editDashboard };
      break;
    case "addproduct":
      selections = { caption: uploadProduct, imgUrl: dataImages.adminsDo };
      break;
    case "editproduct":
      selections = { caption: editProduct, imgUrl: dataImages.adminsDo };
      break;
    case "deleteproduct":
      selections = { caption: deleteProduct, imgUrl: dataImages.adminsDo };
      break;

    case "editnames":
      selections = { caption: editProductNames, imgUrl: dataImages.adminsDo };
      break;
    case "editprices":
      selections = { caption: editProductPrices, imgUrl: dataImages.adminsDo };
      break;
    case "editcategory":
      selections = {
        caption: editProductCategory,
        imgUrl: dataImages.adminsDo,
      };
      break;
    case "editdescription":
      selections = { caption: editProductDesc, imgUrl: dataImages.adminsDo };
      break;
    case "editpicture":
      selections = { caption: editProductImages, imgUrl: dataImages.adminsDo };
      break;

    case "notresponse":
      selections = { caption: notRespon, imgUrl: dataImages.norError };
      break;
    case "haserror":
      selections = { caption: hasError, imgUrl: dataImages.norError };
      break;
  }
  return selections;
};

/**
 * @param {string} queryArgs 
 * @returns
 */
const faqSelector = (queryArgs) => {
  let selections = null;
  switch (queryArgs) {
    case "benefit":
      selections = { caption: benefit, imgUrl: dataImages.benefit };
      break;
    case "working":
      selections = { caption: working, imgUrl: dataImages.working };
      break;
    case "banned":
      selections = { caption: banned, imgUrl: dataImages.banned };
      break;
    case "gaptek":
      selections = { caption: gaptek, imgUrl: dataImages.gaptek };
      break;
  }
  return selections;
};
/**
 * 
 * @param {string} queryArgs 
 * @returns 
 */
const assisterSelector = (queryArgs) => {
  let selections = null;
  switch (queryArgs) {
    case "aboutchatbot":
      selections = { caption: aboutchatbot, imgUrl: dataImages.working };
      break;
  }
  return selections;
};

module.exports = {
  adminHelperSelector,
  faqSelector,
  assisterSelector,
};
