# Portal penawaran Qazir × Tanda

Landing page statis untuk menunjukkan Qazir, Tanda, dan pilihan penggunaan terhubung kepada calon klien. Halaman tidak memerlukan instalasi paket, server aplikasi, atau database.

## Menjalankan lokal

Buka `index.html` langsung di browser, atau jalankan server statis dari folder ini:

```powershell
python -m http.server 8088
```

Lalu buka `http://127.0.0.1:8088`.

## Deploy otomatis ke server

Situs ini dapat disajikan langsung oleh Nginx atau Apache sebagai berkas statis. Workflow GitHub Actions di `.github/workflows/deploy.yml` menyalin isi situs setiap ada push ke `main` dan dapat dijalankan manual dari tab **Actions**. Tidak ada proses build.

Untuk subdomain `qazirxtanda.caradexa.my.id`, tambahkan record DNS tipe **A** dengan nama `qazirxtanda` dan nilai IP server `109.123.235.168` pada pengelola DNS `caradexa.my.id`. Setelah record aktif, siapkan direktori web di server, misalnya `/var/www/qazirxtanda`, dan atur Nginx/Apache untuk melayani domain tersebut dari direktori itu.

Tambahkan GitHub Actions secrets berikut di **Settings → Secrets and variables → Actions** pada repo `makbar666/qazir-tanda`:

| Secret | Isi |
| --- | --- |
| `DEPLOY_HOST` | IP atau hostname SSH server |
| `DEPLOY_PORT` | Port SSH, misalnya `20245` |
| `DEPLOY_USER` | User deploy khusus yang memiliki akses tulis ke direktori situs |
| `DEPLOY_SSH_KEY` | Private key SSH untuk user deploy; pasangkan public key di `authorized_keys` server |
| `DEPLOY_KNOWN_HOSTS` | Baris host key server untuk host dan port tersebut |
| `DEPLOY_PATH` | Path absolut direktori web, misalnya `/var/www/qazirxtanda` |

Gunakan SSH key khusus deploy, bukan kata sandi akun root. Ambil nilai `DEPLOY_KNOWN_HOSTS` dari host tepercaya setelah memverifikasi fingerprint SSH server. Setelah DNS domain diarahkan ke IP server, atur virtual host Nginx/Apache agar document root menunjuk ke `DEPLOY_PATH`, lalu aktifkan HTTPS.

Workflow memakai `rsync --delete`; hanya isi direktori yang ditetapkan di `DEPLOY_PATH` yang disinkronkan. Pastikan path itu khusus untuk berkas situs ini dan jangan gunakan direktori yang berisi data lain.

## Publikasi di Vercel

Proyek ini siap disajikan sebagai situs statis. `index.html` berada di akar folder bersama `styles.css`, `script.js`, dan `favicon.svg`. Tidak perlu `npm install`, perintah build, output `dist`, variabel lingkungan, atau database.

**Cara cepat:** unggah folder ini melalui [Vercel Drop](https://vercel.com/drop), pilih nama proyek, lalu deploy. Jika memakai Git, unggah folder ini ke repository, lalu impor repository tersebut sebagai proyek baru di Vercel. Pilih **Framework Preset: Other**, **Root Directory: folder yang berisi `index.html`**, dan **Build Command: kosong**. Biarkan Output Directory pada akar proyek (`.`). Jika repository hanya berisi isi folder portal, Root Directory tetap `./`.

Setelah terbit, buka URL produksi dan periksa tampilan desktop/ponsel, perpindahan tab contoh layar, serta tombol **Lanjutkan via WhatsApp**. Tautan demo membuka nomor `6285254099133` dengan pesan terisi; pengunjung sendiri yang menekan Kirim di WhatsApp.

Tidak ada `vercel.json` atau `package.json` karena konfigurasi dan proses build tambahan tidak diperlukan untuk halaman ini. Folder `.vercel/` dan berkas `.env` diabaikan jika proyek ditautkan ke Vercel melalui CLI.

## Materi dan kontak

Teks fitur merujuk ke README dan implementasi di `../sistem-kasir` (Qazir) serta `../sistem-point` (Tanda). Semua angka, nama, dan transaksi pada ilustrasi antarmuka adalah contoh, bukan data produksi. Tidak ada harga, testimoni, atau angka performa yang dikarang.

Harga pada portal mengikuti rincian pemilik produk: paket Qazir + Tanda Rp30.000 per bulan, biaya setup gratis, maintenance standar gratis, dan technical support standar gratis. Harga untuk penggunaan salah satu sistem belum dicantumkan.

Form demo bekerja sepenuhnya di browser. Tombol **Lanjutkan via WhatsApp** membuka percakapan ke 085254099133 dengan pesan yang terisi dari formulir. Pengunjung tetap menekan Kirim sendiri di WhatsApp. Halaman tidak menyimpan isi formulir ke server.

Animasi memakai CSS dan JavaScript bawaan browser: bagian halaman muncul saat digulir, tab contoh layar berpindah dengan transisi singkat, dan menu ponsel membuka dengan fade/blur. Pengaturan sistem `prefers-reduced-motion` menonaktifkan gerakan dan blur transisi.

Ilustrasi hero berganti otomatis antara kasir dan poin, pembayaran QRIS, serta ringkasan multi outlet. Tombol angka di atas ilustrasi dapat memilih tampilan secara manual. Pergantian otomatis berhenti saat ilustrasi tidak terlihat, saat kursor berada di atasnya, saat kontrolnya mendapat fokus, dan saat reduced motion aktif.
