/**
 * ***Message Handler***
 *
 * Bebas untuk memodifikasi pesan
 */
const message = {
  notOwner: "Kamu bukan Administrator/Owner dari marketplace ini!",
  notRegasAdmin:
    "Kamu bukan Admin marketplace ini!, silahkan hubungi Owner marketplace untuk info lebih lanjut.",
  hasRegasAdmin: "Nomor ini sudah terdaftar sebagai Admin sebelumnya",
  notValidIDAdmin: "ID admin tidak valid!",
  notRegasTrialUser:
    'Kamu belum membuat katalog, silahkan buat terlebih dahulu dengan cara:\nAkses menu "!dashboard" terlebih dahulu, kemudian ketuk tombol "Coba Demo/Trial" ikuti langkah selanjutnya.',
  alreadyRegistered: "Kamu sudah terdaftar Demo sebelumnya!.",
  noValidID:
    "ID Produk yang dimasukan tidak valid, salah atau produk sudah dihapus sebelumnya!",
  hasNoProducts:
    "\nKamu belum menambahkan produk ke katalog, silahkan download modul panduan untuk mengetahui tata cara menambahkan produk ke dalam katalog\n",
  hasNoDashboard:
    "Belum ada caption kata-kata promosi, Kamu dapat mengubahnya dengan cara:\n*!editdashboard Kata-kata promosimu ....*\n",
  wrongFormat: {
    upload:
      'Contoh Penggunaan:\nkirim foto/gambar produk dengan caption ".upload Nama produk # Harga produk (nomor/huruf) # Kategori produk # Deskripsi produk ... max 500 kata"\n\nGunakan tanda "#" sebagai pemisah dari tiap parameter, pastikan input sesuai aturan, jika tidak maka kemungkinan dapat terjadi Error.',
    delete: "Contoh Penggunaan:\n.hapusproduk ID Produk",
    edit: {
      all: 'Contoh Penggunaan:\nkirim foto/gambar produk dengan caption ".editproduk serial ID Produk # Nama produk # Harga produk (nomor/huruf) # Kategori produk # Deskripsi produk"\n\nGunakan tanda "#" sebagai pemisah dari tiap parameter, pastikan input sesuai aturan, jika tidak maka kemungkinan dapat terjadi Error.',
      name: "Contoh Penggunaan:\n.editnama serial ID Produk # Nama produk baru",
      price:
        "Contoh Penggunaan:\n.editharga serial ID Produk # Harga produk baru",
      category:
        "Contoh Penggunaan:\n.editkategori serial ID Produk # Kategori produk baru",
      stock:
        "Contoh Penggunaan:\n.editstok serial ID Produk # Stok produk baru",
      desc: "Contoh Penggunaan:\n.editdeskripsi serial ID Produk # Deskripsi produk baru",
    },
    unfullFilled: {
      ID: "ID Produk tidak dimasukan!",
      image: "Tidak ada gambar produk!",
      name: "Tidak ada Nama Produk!",
      price: "Harga produk belum dimasukan!",
      category: "Kategori produk belum ditentukan/kosong!",
      stock: "Stok produk belum dimasukan!",
      desc: "Deskripsi produk belum dimasukan!",
    },
  },
  hasError: "Maaf, spertinya terjadi Error",
  noProductsToRecap: "Tidak ada Produk untuk direkap Datanya!",
  noStatisticsToRecap: "Tidak ada Data Statistik untuk direkap!",
  howToAddAdmin:
    'Promosikan Admin baru dengan cara: "!adminbaru nomor admin baru"\nContoh: !adminbaru 62123456789\n\n*pastikan awalan nomor "62" atau menggunakan format negara.',
  cancelAddAdmin: "Penambahan Admin telah dibatalkan",
  cancelDeleteProduct: "Penghapusan Produk telah dibatalkan",
};

module.exports = message