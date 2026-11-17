# Jurnal AI

**Nama:** Romando Purba
**NIM:** 25120310008

---

## Entri 1 — Perbedaan HTTP GET dan POST (11 November 2026)

| Kolom | Isi |
|---|---|
| **Alat** | Claude Code (coding assistant berbasis CLI, model Claude Opus 5 dari Anthropic) |
| **Prompt** | "Jelaskan perbedaan HTTP GET dan POST." |
| **Hasil AI** | GET dipakai untuk **mengambil** data: parameter dikirim lewat query string URL (`/cari?q=html`), sifatnya *safe*, *idempotent*, dan *cacheable*, serta tidak membawa request body. POST dipakai untuk **mengirim** data agar diproses server: data ada di request body dengan jenis ditentukan header `Content-Type` (`application/x-www-form-urlencoded` atau `multipart/form-data`), sifatnya tidak *safe* dan tidak *idempotent*, tidak di-cache, dan ukuran datanya tidak dibatasi panjang URL. Ringkasnya: GET untuk membaca, POST untuk menulis/mengubah. |
| **Verifikasi** | MDN "HTTP request methods", "GET request method", "POST request method", "Content-Type", "Sending form data", glosarium "Idempotent" dan "Cacheable". Yang cocok: sifat *safe/idempotent/cacheable* pada GET, sifat tidak *safe*/tidak *idempotent* pada POST, dan dua `Content-Type` untuk form POST. |
| **Perubahan** | Saya koreksi tiga hal. (1) "GET tidak punya body" → MDN menyebut semantik body pada GET **tidak terdefinisi** dan sebagian server menolaknya dengan 4XX, jadi bukan dilarang mutlak oleh spesifikasi. (2) "POST tidak di-cache" → MDN: POST **cacheable jika** respons menyertakan *freshness information* + `Content-Location` yang cocok, hanya saja jarang diimplementasikan. (3) "Ukuran GET dibatasi panjang URL" saya tolak dalam bentuk angka: tidak ada batas 2048 karakter di spesifikasi HTTP, itu batas implementasi browser/server (warisan IE/IIS); server menjawab `414 URI Too Long` kalau terlampaui. Saya juga tambahkan catatan yang tidak disebut AI: POST **bukan** berarti lebih aman — yang mengenkripsi data adalah HTTPS, bukan pemilihan method. |

### Catatan verifikasi (rincian)

| Yang dicek | Hasil |
|---|---|
| GET: *safe*, *idempotent*, *cacheable* | Cocok. Tabel ringkasan MDN mencantumkan ketiganya, plus "Request has body: No". |
| "GET tidak boleh punya body" | Perlu diperhalus — semantiknya *undefined*, bukan terlarang. |
| "POST tidak bisa di-cache" | Perlu diperhalus — bisa, tetapi syaratnya jarang dipenuhi. |
| `Content-Type` form POST | Cocok. `application/x-www-form-urlencoded` (default, pasangan `key=value` dipisah `&`) dan `multipart/form-data` untuk upload berkas. |
| POST: tidak *safe*, tidak *idempotent* | Cocok dengan tabel MDN "HTTP request methods". |
| "GET maksimal 2048 karakter" | Tidak ada di MDN. MDN hanya menyebut sebagian browser dan server membatasi panjang URL, tanpa angka baku. |

Sumber:

- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/GET
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/POST
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Type
- https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Sending_and_retrieving_form_data
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/414
- https://developer.mozilla.org/en-US/docs/Glossary/Idempotent
- https://developer.mozilla.org/en-US/docs/Glossary/Cacheable

---

# Tugas 2 — Halaman Profil Responsif dan Aksesibel

## Entri 2 — Membuat halaman profil (Langkah 1)

| Kolom | Isi |
|---|---|
| **Alat** | Claude Code (CLI, model Claude Opus 5 dari Anthropic) |
| **Prompt** | "Buat halaman profil dengan HTML dan CSS berisi header, navigasi, bagian tentang saya, daftar keterampilan, dan formulir kontak. Pakai HTML semantik dan buat responsif." |
| **Hasil AI** | Satu `index.html`, `style.css`, dan `script.js`. Strukturnya memakai `header`, dua `nav`, `main`, `aside`, `footer`, `section`, `article`, `figure`/`figcaption`, dan `dl`. Ada token warna di `:root`, menu hamburger dengan `aria-expanded` dan `aria-controls`, animasi mengetik di judul, serta penghormatan terhadap `prefers-reduced-motion`. |
| **Verifikasi** | Belum diverifikasi pada tahap ini. Sesuai instruksi tugas, hasil ini di-commit apa adanya pada commit `d2e802e` supaya bisa dibandingkan dengan versi setelah audit. |
| **Perubahan** | Tidak ada. Justru di sinilah letak gunanya: karena hasil mentahnya tersimpan utuh di Git, setiap temuan audit bisa ditunjuk baris dan commit-nya. |

**Catatan penting:** dua dari lima bagian yang saya minta ternyata **tidak dibuat
sama sekali** — daftar keterampilan dan formulir kontak. AI bahkan menaruh
komentar `<!-- Skills -->` di atas section Portfolio, seolah-olah bagian itu
sudah ada. Kalau saya menerima hasilnya begitu saja tanpa membaca, kekurangan ini
tidak akan ketahuan karena halamannya tetap terlihat rapi dan penuh.

## Entri 3 — Audit hasil AI (Langkah 2)

| Kolom | Isi |
|---|---|
| **Alat** | Claude Code (Claude Opus 5), dibantu Chrome headless untuk pengukuran |
| **Prompt** | "Audit halaman ini dengan daftar periksa: elemen semantik, teks alternatif gambar, kontras warna, label pada form, urutan fokus keyboard, dan tampilan pada 360 px dan 1280 px." |
| **Hasil AI** | AI menemukan 10 masalah, dan juga menyebut beberapa hal yang sudah benar: `.sr-only` memakai `clip-path` bukan `display:none`, animasi mengetik diberi `aria-hidden` dengan teks pengganti, serta Escape pada menu mengembalikan fokus ke tombol pemicu. |
| **Verifikasi** | Tidak ada yang saya percaya mentah-mentah. Kontras dihitung ulang dengan rumus WCAG 2.1 — 17 kombinasi, semuanya lolos AA, terendah 5.13:1. Formulir diuji dengan submit kosong dan submit valid. Lebar halaman diukur lewat `scrollWidth`: 345 px pada viewport 360 px dan 1265 px pada 1280 px, jadi tidak ada scroll horizontal. Setiap berkas gambar saya buka satu per satu dan dibandingkan dengan teks `alt`-nya. |
| **Perubahan** | Satu temuan AI saya **tolak** setelah diukur, lihat Entri 4. Satu temuan lain justru saya temukan sendiri dari membuka berkas gambar, bukan dari AI: ketujuh teks `alt` mendeskripsikan gambar yang tidak pernah ada. |

**Temuan paling serius.** AI menulis `alt="Seat map of the campus event ticketing
service"` untuk `projects/03.jpg`, padahal isinya foto papan kayu bertuliskan
TICKETS. Ketujuh gambar bernasib sama, termasuk `profile.jpeg` yang diberi
`alt="Portrait of Romando Purba"` padahal isinya ilustrasi garis kepala kucing.
Polanya jelas: AI mengarang deskripsi yang cocok dengan **judul proyek**, karena
ia memang tidak pernah melihat isi gambarnya. Ini lebih berbahaya daripada `alt`
yang kosong — pengguna screen reader diberi tahu ada diagram yang sebenarnya
tidak ada, dan tidak punya cara apa pun untuk tahu bahwa itu keliru. Validator
otomatis pun akan meloloskannya, karena atribut `alt`-nya memang terisi.

## Entri 4 — Saran AI yang ditolak setelah diukur

| Kolom | Isi |
|---|---|
| **Alat** | Claude Code (Claude Opus 5) |
| **Prompt** | "Periksa apakah halaman meluap horizontal pada lebar 360 px." |
| **Hasil AI** | AI menyimpulkan halaman meluap: judul hero memakai font Press Start 2P yang lebarnya ~1em per huruf, 15 huruf x 26px = 390px, melebihi ruang isi 328px. AI menyarankan `font-size` judul diubah menjadi `clamp(19px, 5.4vw, 60px)`. |
| **Verifikasi** | `scrollWidth` diukur langsung pada viewport 360 px, sebelum dan sesudah saran diterapkan: **keduanya 345 px**. Tidak ada luapan. Pengukuran dilakukan dengan memuat halaman di dalam iframe berlebar 360 px, karena Chrome di macOS memaksa lebar jendela minimum 500 px sehingga `--window-size=360` tidak menghasilkan viewport 360 px yang sebenarnya. |
| **Perubahan** | Saran AI **ditolak** dan tidak di-commit. Alasan AI keliru secara logika: judul "Romando Purba -" mengandung spasi, jadi teksnya membungkus ke baris berikutnya dan tidak pernah memaksa lebar halaman. Perhitungan 15 huruf x 26px mengabaikan pembungkusan baris. |

## Entri 5 — Perbaikan (Langkah 3)

| Kolom | Isi |
|---|---|
| **Alat** | Claude Code (Claude Opus 5) |
| **Prompt** | "Perbaiki temuan audit, masing-masing dalam commit tersendiri." |
| **Hasil AI** | 10 commit perbaikan, satu temuan per commit, dengan pesan commit yang menjelaskan temuan dan alasan perbaikannya. |
| **Verifikasi** | Formulir diuji otomatis: submit kosong menghasilkan 3 kolom `aria-invalid="true"`, 3 pesan error tampil, fokus pindah ke kolom bermasalah pertama, dan status terbaca "Message not sent: 3 field(s) need attention."; submit valid menghasilkan pesan sukses tanpa kolom invalid tersisa. Keempat `label[for]` terbukti menunjuk ke elemen yang ada. Hierarki heading dicek tidak melompati level. Nesting HTML divalidasi, tidak ada tag yang tidak tertutup. |
| **Perubahan** | Pada Temuan 8, saran awal AI adalah menjadikan nomor telepon tautan `tel:`. Saya tolak karena nomornya sengaja disamarkan (`+62 852 xxxx 4321`), sehingga tautannya pasti gagal saat ditekan. Yang dipakai adalah memberi label terlihat "Phone". Pada Temuan 9, AI menawarkan `alt=""` dengan alasan gambarnya dekoratif; saya pilih menulis deskripsi faktual agar isi gambar tetap tersampaikan, meski keduanya sama-sama sah. |

## Pernyataan penggunaan AI

Seluruh berkas pada tugas ini — `index.html`, `style.css`, `script.js`,
`AUDIT.md`, dan jurnal ini — dibuat dengan bantuan **Claude Code (Claude Opus 5,
Anthropic)**, dan hal itu dinyatakan terbuka sesuai aturan tugas. Pembagiannya:
AI menulis kode dan draf, saya yang menentukan apa yang dikerjakan, memverifikasi
setiap klaim dengan pengukuran, dan menolak dua saran yang terbukti keliru
(Entri 4 dan Entri 5). Setiap commit perbaikan juga mencantumkan
`Co-Authored-By: Claude Opus 5`, jadi jejak penggunaan AI bisa ditelusuri
langsung dari riwayat Git, bukan hanya dari jurnal ini.
