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
