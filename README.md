# Portal penawaran Qazir × Tanda

Landing page statis untuk menunjukkan Qazir, Tanda, dan pilihan penggunaan terhubung kepada calon klien. Halaman tidak memerlukan instalasi paket, server aplikasi, atau database.

## Menjalankan lokal

Buka `index.html` langsung di browser, atau jalankan server statis dari folder ini:

```powershell
python -m http.server 8088
```

Lalu buka `http://127.0.0.1:8088`.

## Publikasi di Vercel

Proyek ini siap disajikan sebagai situs statis. `index.html` berada di akar folder bersama `styles.css`, `script.js`, dan `favicon.svg`. Tidak perlu `npm install`, perintah build, output `dist`, variabel lingkungan, atau database.

**Cara cepat:** unggah folder ini melalui [Vercel Drop](https://vercel.com/drop), pilih nama proyek, lalu deploy. Jika memakai Git, unggah folder ini ke repository, lalu impor repository tersebut sebagai proyek baru di Vercel. Pilih **Framework Preset: Other**, **Root Directory: folder yang berisi `index.html`**, dan **Build Command: kosong**. Biarkan Output Directory pada akar proyek (`.`). Jika repository hanya berisi isi folder portal, Root Directory tetap `./`.

Setelah terbit, buka URL produksi dan periksa tampilan desktop/ponsel, perpindahan tab contoh layar, serta tombol **Lanjutkan via WhatsApp**. Tautan demo membuka nomor `6285254099133` dengan pesan terisi; pengunjung sendiri yang menekan Kirim di WhatsApp.

Tidak ada `vercel.json` atau `package.json` karena konfigurasi dan proses build tambahan tidak diperlukan untuk halaman ini. Folder `.vercel/` dan berkas `.env` diabaikan jika proyek ditautkan ke Vercel melalui CLI.

## Materi dan kontak

Teks fitur merujuk ke README dan implementasi di `../sistem-kasir` (Qazir) serta `../sistem-point` (Tanda). Semua angka, nama, dan transaksi pada ilustrasi antarmuka adalah contoh, bukan data produksi. Tidak ada harga, testimoni, atau angka performa yang dikarang.

Form demo bekerja sepenuhnya di browser. Tombol **Lanjutkan via WhatsApp** membuka percakapan ke 085254099133 dengan pesan yang terisi dari formulir. Pengunjung tetap menekan Kirim sendiri di WhatsApp. Halaman tidak menyimpan isi formulir ke server.

Animasi memakai CSS dan JavaScript bawaan browser: bagian halaman muncul saat digulir, tab contoh layar berpindah dengan transisi singkat, dan menu ponsel membuka dengan fade/blur. Pengaturan sistem `prefers-reduced-motion` menonaktifkan gerakan dan blur transisi.

Ilustrasi hero berganti otomatis antara kasir dan poin, pembayaran QRIS, serta ringkasan multi outlet. Tombol angka di atas ilustrasi dapat memilih tampilan secara manual. Pergantian otomatis berhenti saat ilustrasi tidak terlihat, saat kursor berada di atasnya, saat kontrolnya mendapat fokus, dan saat reduced motion aktif.
