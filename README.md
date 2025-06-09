
FinMate

FinMate adalah aplikasi pengelolaan keuangan pribadi berbasis web yang ditujukan untuk membantu generasi muda Indonesia mengatur keuangannya secara efektif. FinMate menyediakan fitur pencatatan transaksi (manual dan otomatis), budgeting cerdas berbasis AI, pelacakan tujuan keuangan, dan laporan visual. Solusi ini hadir tidak hanya sebagai pencatat transaksi, tetapi juga sebagai asisten finansial yang mendidik, interaktif, dan mudah digunakan. Kami percaya bahwa pendekatan teknologi dan edukatif akan berdampak nyata pada peningkatan kesadaran finansial pengguna.

## Gambaran Umum Proyek

FinMate didesain sebagai Progressive Web App (PWA) untuk memberikan pengalaman pengguna yang mulus layaknya aplikasi native, dengan fokus pada responsivitas di berbagai ukuran layar perangkat. Aplikasi ini terbagi menjadi dua komponen utama: backend yang menyediakan API data dan frontend yang merupakan antarmuka interaktif bagi pengguna. Fitur AI/ML terintegrasi untuk mendukung kemampuan budgeting cerdas.

## Struktur Proyek

Proyek ini terorganisasi ke dalam dua direktori utama:

- `backend/`: Berisi kode untuk API server.
- `frontend/`: Berisi kode untuk aplikasi web client.

## Bagian Backend

### Teknologi Backend

- **Firebase Firestore**: Digunakan sebagai database NoSQL yang real-time dan scalable untuk menyimpan data transaksi dan pengguna.
- **Node.js/Express**: Struktur API menunjukkan penggunaan runtime Node.js dengan framework Express.js untuk membangun RESTful API.
- **Firebase Authentication**: Mengelola proses registrasi dan login pengguna, serta otorisasi akses ke endpoint API.

### Dokumentasi API

**Basis URL untuk pengembangan:** `http://localhost:4000`

#### Register

- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Request Body**:
  - `name` (string)
  - `email` (string, harus unik)
  - `password` (string, minimal 8 karakter)
- **Response**:
```json
{
  "message": "Pengguna berhasil didaftarkan",
  "userId": "Jq3C0M0rkh3SbRRiwnJ7"
}
```

#### Login

- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Request Body**:
  - `email` (string)
  - `password` (string)
- **Response**:
```json
{
  "message": "Login berhasil",
  "token": "<JWT Token>",
  "user": {
    "id": "Jq3C0M0rkh3SbRRiwnJ7",
    "name": "Saber Alucard"
  }
}
```

#### Get Dashboard Summary

- **URL**: `/api/transactions/summary`
- **Method**: `GET`
- **Headers**:
  - `Authorization: Bearer <JWT Token dari login>`
- **Response**:
```json
{
  "message": "Data dashboard berhasil diambil",
  "data": {
    "availableBalance": 2000000,
    "totalIncome": 5000000,
    "totalExpense": -3000000
  }
}
```

#### Add New Transaction

- **URL**: `/api/transactions`
- **Method**: `POST`
- **Headers**:
  - `Authorization: Bearer <JWT Token dari login>`
- **Request Body**:
  - `amount` (number)
  - `type` (string, "income" atau "expense")
  - `description` (string)
  - `date` (string, format YYYY-MM-DD atau Timestamp)
- **Response**:
```json
{
  "message": "Transaksi berhasil ditambahkan",
  "transactionId": "hmbG9L00M8v31HHQq9aG"
}
```

#### Get All Transactions

- **URL**: `/api/transactions`
- **Method**: `GET`
- **Headers**:
  - `Authorization: Bearer <JWT Token dari login>`
- **Response**:
```json
{
  "message": "Data transaksi berhasil diambil",
  "transactions": [
    {
      "transactionId": "hmbG9L00M8v31HHQq9aG",
      "userId": "Jq3C0M0rkh3SbRRiwnJ7",
      "type": "income | expense",
      "description": "Lorem Ipsum",
      "amount": 2000000,
      "date": "2025-05-31 (YYYY-MM-DD)"
    }
  ]
}
```

## Bagian Frontend

### Teknologi Frontend

- **HTML, CSS, JavaScript**: Fondasi utama untuk membangun antarmuka web.
- **Module Bundler** (Webpack, Vite, dll): Untuk mengkompilasi, mengoptimalkan, dan mengemas aset frontend.
- **Desain Responsif**: Memastikan tata letak aplikasi beradaptasi di berbagai ukuran layar (desktop, tablet, mobile).
- **PWA (Progressive Web App) Capabilities**: Web App Manifest & Service Worker untuk installable, offline, dan push notifications.

### Fitur Frontend

- Autentikasi Pengguna: Halaman Welcome/Login dan Registrasi.
- Dashboard Interaktif: Ringkasan keuangan pengguna & navigasi utama.
- Pengelolaan Transaksi: Add New Transaction (pemasukan/pengeluaran) dengan detail.
- Laporan Riwayat Transaksi: Report Transaction History dalam format tabel.
- Manajemen Akun: Halaman Account untuk melihat & edit profil pengguna.
- Notifikasi Modal: Modal pop-up untuk feedback visual (login sukses, transaksi sukses, dll).
- Desain Elegan & Simpel: Tata letak bersih, hierarki visual jelas, palet warna konsisten.

## Cara Menjalankan Proyek Secara Lokal

1. **Clone Repositori:**
   ```bash
   git clone https://github.com/ShotZ9/capstone-project-CC25-CF295.git
   cd capstone-project-CC25-CF295
   ```
2. **Instal Dependensi Backend:**
   ```bash
   cd backend
   npm install
   ```
3. **Konfigurasi Firebase (Backend):**
   - Buat file `.env` di dalam folder `backend/`.
   - Tambahkan variabel lingkungan yang diperlukan untuk koneksi Firebase dan kunci API.
4. **Jalankan Backend Server:**
   ```bash
   npm start
   ```
   Server backend akan berjalan di http://localhost:4000.
5. **Instal Dependensi Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```
6. **Konfigurasi Firebase (Frontend):**
   - Pastikan konfigurasi Firebase sudah diintegrasikan di frontend.
7. **Jalankan Frontend App:**
   ```bash
   npm start
   ```
   Aplikasi frontend biasanya akan berjalan di http://localhost:3000.

## Deployment

Aplikasi web FinMate dapat di-deploy ke berbagai platform hosting. Rekomendasi untuk hosting front-end:

- GitHub Pages
- Netlify
- Vercel

Untuk backend Node.js/Express, platform seperti Vercel (serverless functions), Heroku, atau Google Cloud Run bisa menjadi pilihan.
