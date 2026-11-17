# Audit Aksesibilitas dan Responsivitas

**Nama:** Romando Purba
**NIM:** 25120310008
**Repositori:** https://github.com/MandoPurba/wad03-25120310008
**Berkas yang diaudit:** `Tugas 2 - Halaman Profil Responsif dan Aksesibel/`
**Commit hasil awal AI:** `d2e802e`
**Tanggal audit:** 17 November 2026

---

## 1. Cara audit dilakukan

Audit dijalankan terhadap commit `d2e802e`, yaitu keluaran AI yang di-commit apa
adanya tanpa perbaikan apa pun.

| Metode | Keterangan |
|---|---|
| Pembacaan kode | Menelusuri `index.html`, `style.css`, dan `script.js` baris per baris |
| Pengukuran otomatis | Chrome headless, halaman dimuat di dalam iframe berlebar tetap agar viewport CSS benar-benar 360 px dan 1280 px |
| Kontras warna | Dihitung dengan rumus WCAG 2.1, warna semi-transparan dikomposit dulu di atas latarnya sebelum dihitung |
| Urutan fokus | Mendaftar seluruh elemen fokusable sesuai urutan dokumen |
| Uji formulir | Submit kosong dan submit valid, memeriksa `aria-invalid`, pesan error, perpindahan fokus, dan pengumuman status |
| Pemeriksaan gambar | Membuka setiap berkas gambar dan membandingkan isinya dengan teks `alt` |

---

## 2. Daftar periksa

| # | Item daftar periksa | Status awal | Keterangan |
|---|---|---|---|
| 1 | Elemen semantik (header, nav, main, footer) | **Lulus** | `header` 1, `nav` 2, `main` 1, `footer` 1, `aside` 1, ditambah `section`, `article`, `figure`/`blockquote`, dan `dl` |
| 2 | Teks alternatif gambar | **Gagal** | Atribut `alt` ada pada ketujuh gambar, tetapi **ketujuh isinya salah** — lihat Temuan 9 |
| 3 | Kontras warna | **Lulus** | 17 kombinasi diukur, semuanya memenuhi WCAG AA, terendah 5.13:1 |
| 4 | Label pada form | **Gagal** | Tidak ada formulir sama sekali — lihat Temuan 2 |
| 5 | Urutan fokus keyboard | **Gagal sebagian** | Urutan sesuai DOM dan tidak ada jebakan fokus, tetapi tanpa skip link — lihat Temuan 5 |
| 6 | Tampilan 360 px | **Lulus** | `scrollWidth` 345 px pada viewport 360 px, tidak ada scroll horizontal |
| 7 | Tampilan 1280 px | **Lulus** | `scrollWidth` 1265 px, layout dua kolom utuh |

### Hasil pengukuran kontras

Seluruh kombinasi di bawah lolos ambang WCAG AA (4.5:1 untuk teks normal).

| Elemen | Rasio | Ukuran | Latar |
|---|---|---|---|
| `.hero-lead`, `.section-text` | 11.71:1 | 19px / 16px | putih |
| `.skill` | 11.41:1 | 14px | surface |
| `.contact-email` | 6.61:1 | 19px | surface |
| `.section-label`, `.footer-copy` | 5.32:1 | 12px | putih |
| `.post-meta`, `.fact-label`, `.field-hint`, `.quote-cite` | 5.26:1 | 11–13px | surface |
| `.nav-link`, `.brand-tagline` | 5.13:1 | 11–13px | header |
| `.nav-cta` (teks putih, latar hitam) | 21.00:1 | 13px | hitam |
| `.field-error` (ditambahkan saat perbaikan) | 8.37:1 | 13px | surface |

---

## 3. Tabel temuan dan perbaikan

| # | Temuan | Dampak | Perbaikan | Commit |
|---|---|---|---|---|
| 1 | Daftar keterampilan tidak ada. Komentar `<!-- Skills -->` justru menempel pada section Portfolio | Salah satu bagian yang diminta tidak terpenuhi | Section `#skills` baru berisi 4 grup, tiap grup `h3` + `ul` agar terbaca sebagai daftar; tautan Skills ditambahkan di kedua nav | `2f9c8b1` |
| 2 | Tidak ada formulir kontak. Section Contact hanya berisi tautan `mailto:` dan satu `span` nomor telepon | Item daftar periksa "label pada form" tidak bisa diaudit; pengunjung tidak punya cara mengirim pesan dari halaman | Formulir lengkap: tiap kolom punya `<label for>` eksplisit (bukan placeholder), `type="email"`, `autocomplete`, pesan error terhubung lewat `aria-describedby`, `aria-invalid` saat gagal, fokus pindah ke kolom bermasalah pertama, status diumumkan lewat `role="status"`, target sentuh 44px | `c21acac` |
| 3 | `<html lang="en">` tetapi empat teks antarmuka berbahasa Indonesia (Fokus, Hobi, Portofolio, Sosial Link) | Screen reader melafalkan kata Indonesia dengan fonem Inggris sehingga tidak dikenali | Keempatnya diterjemahkan ke bahasa Inggris, pesan status formulir diseragamkan, sehingga `lang="en"` benar untuk seluruh halaman | `c4533b2` |
| 4 | `<h1>` berada di luar `<main>`; hero adalah sibling dari main | Landmark main tidak punya heading utama; pengguna yang melompat ke main melewati judul halaman | `<main id="main">` dipindah keluar agar membungkus hero dan blok layout; kolom tengah menjadi `<div class="main">` sehingga CSS tidak berubah sama sekali | `c81eec4` |
| 5 | Tidak ada skip link | Pengguna keyboard harus menekan Tab melewati brand, 5 tautan nav, dan tombol hamburger setiap kali membuka halaman | Skip link sebagai elemen fokusable pertama, disembunyikan dengan `transform` (bukan `display:none` agar tetap bisa difokuskan), `z-index` di atas header sticky, `<main>` diberi `tabindex="-1"` agar fokus benar-benar pindah | `21245c8` |
| 6 | Dua tautan artikel memakai `target="_blank"` tanpa `rel="noopener noreferrer"`; keempat tautan eksternal berpindah tab tanpa pemberitahuan | Risiko keamanan `window.opener`, dan pengguna screen reader tidak tahu konteksnya berubah | `rel` ditambahkan, dan keempat tautan diberi `<span class="sr-only"> (opens in a new tab)</span>` | `1f19637` |
| 7 | Tiga deklarasi CSS tidak valid: `.fact-label` dan `.fact-value` memakai `font-style: 11px/15px`, `.hero-photo` memakai `overflow: auto` | Deklarasi diabaikan browser sehingga label kartu fakta mewarisi 16px, dan foto bulat berpotensi memunculkan scrollbar | Diubah menjadi `font-size` dan `overflow: hidden` | `a45c73e` |
| 8 | Nomor telepon hanya `span` tanpa label apa pun | Screen reader membacakan deretan angka tanpa menyebut itu nomor telepon | `.contact-info` menjadi `ul` dengan label terlihat (Email, Phone) di atas nilainya. Nomor sengaja dibiarkan tersamar, jadi tidak dijadikan tautan `tel:` yang pasti gagal. Gambar proyek diberi `loading="lazy"` | `6db00a0` |
| 9 | **Ketujuh teks `alt` mendeskripsikan gambar yang tidak pernah ada.** AI mengarang deskripsi yang mengikuti judul proyek, bukan isi berkas gambar | Paling berbahaya dari seluruh temuan: pengguna screen reader diberi tahu ada diagram atau tangkapan layar yang sebenarnya tidak ada, dan tidak punya cara mengetahui itu keliru. Alt yang salah lebih merugikan daripada alt yang kosong | Ketujuhnya ditulis ulang berdasarkan isi gambar yang sebenarnya | `f7a4c97` |
| 10 | Di bawah 720 px hero membungkus jadi satu kolom, tetapi foto profil tetap 240 px | Pada viewport 360 px ruang isi hanya 328 px, sehingga foto memakan hampir seluruh lebar layar dan mendorong bagian About me jauh ke bawah | `.hero-media` dibatasi `max-width: 140px` di dalam media query 720 px | `900d5b7` |

### Rincian Temuan 9

| Berkas | `alt` dari AI | Isi gambar sebenarnya |
|---|---|---|
| `profile.jpeg` | Portrait of Romando Purba | Ilustrasi garis hitam putih kepala kucing, bukan foto orang |
| `projects/01.jpg` | Kafka topics streaming change events into a ClickHouse table | Kata DATA pada kaca jendela berlubang-lubang |
| `projects/02.jpg` | Endpoint list of the campus library REST API | Mahasiswa berjalan di depan gedung kampus modern |
| `projects/03.jpg` | Seat map of the campus event ticketing service | Papan kayu lapuk bertuliskan TICKETS |
| `projects/04.jpg` | Queue monitor of the notification dispatch service | Layar ponsel menampilkan menu pengaturan resolusi layar |
| `projects/05.jpg` | Weather dashboard with a seven-day forecast chart | Pusaran tornado di atas ladang di tepi jalan desa |
| `projects/06.jpg` | Terminal session showing the log search CLI filtering service logs | Mug bertuliskan BUG di samping kacamata |

---

## 4. Hal yang sudah benar sejak keluaran awal AI

Tidak semua hasil AI bermasalah. Yang berikut sudah tepat dan tidak diubah:

- Struktur semantik lengkap, termasuk `figure`/`figcaption` untuk kutipan dan `dl`/`dt`/`dd` untuk kartu fakta
- Kelas `.sr-only` ditulis dengan `clip-path`, bukan `display: none`, sehingga tetap terbaca screen reader
- Animasi mengetik diberi `aria-hidden` dengan teks pengganti `.sr-only`, jadi screen reader membaca teks utuh, bukan huruf per huruf
- `prefers-reduced-motion` dihormati di CSS maupun di JavaScript
- Tombol hamburger memakai `aria-expanded`, `aria-controls`, dan tombol Escape mengembalikan fokus ke tombol pemicu
- `:focus-visible` dengan `outline` 2px dan `outline-offset` 3px
- Seluruh kontras warna sudah memenuhi WCAG AA sejak awal

---

## 5. Verifikasi setelah perbaikan

| Yang diuji | Hasil |
|---|---|
| Submit formulir kosong | 3 kolom ber-`aria-invalid="true"`, 3 pesan error tampil, fokus pindah ke `contact-name`, status berbunyi "Message not sent: 3 field(s) need attention." |
| Submit formulir terisi benar | Status berbunyi "Thanks, your message has been sent...", tidak ada kolom `aria-invalid` tersisa |
| Keterhubungan label | Keempat `label[for]` menunjuk ke elemen yang benar-benar ada |
| Elemen fokusable pertama | `<a class="skip-link" href="#main">Skip to main content</a>` |
| Jumlah elemen fokusable | 19, urutannya mengikuti urutan dokumen |
| Hierarki heading | H1 lalu H2/H3 tanpa ada level yang dilompati |
| Gambar tanpa `alt` | 0 dari 7 |
| Viewport 360 px | `scrollWidth` 345 px, tidak ada scroll horizontal |
| Viewport 1280 px | `scrollWidth` 1265 px, layout dua kolom utuh |
