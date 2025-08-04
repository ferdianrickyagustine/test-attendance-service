# Attendance Service Backend

Ini adalah backend untuk sisi **attendance-service**.

Attendance service ini dibangun menggunakan **NestJS** dan **Prisma ORM** sebagai database layer. Layanan ini bertanggung jawab untuk manajemen data kehadiran (absensi) karyawan, seperti check-in, check-out, melihat riwayat, dan rekap absensi.

Secara default, attendance-service berjalan di port **3002**.

---

## Cara Menjalankan

Pindah direktori ke folder attendance-service:
```
cd attendance-service
```
Install dependencies:
```
npm install
```
---

# Endpoint Utama

## POST /attendance/check-in

Melakukan check-in kehadiran (user login).

**Request Body** (JSON):

```json
{
  "notes": ""
}
```
Jika melakukan check-in lagi
```json
{
    "message": "Anda sudah melakukan check-in hari ini",
    "error": "Bad Request",
    "statusCode": 400
}

```

## POST /attendance/check-out
**Request Body** (JSON):

```json
{
  "notes": ""
}
```

Jika melakukan check-out lagi
```json
{
    "message": "Anda sudah melakukan check-out hari ini",
    "error": "Bad Request",
    "statusCode": 400
}

```

## GET /attendance/today
Mengambil data kehadiran hari ini untuk user yang sedang login.

## GET /attendance/summary
Mengambil rekap kehadiran user (login).

## GET /attendance/summary?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
Mengambil rekap kehadiran user (login) dalam rentang tanggal tertentu.

## GET /attendance/history
Mengambil seluruh riwayat kehadiran semua user dalam rentang tanggal tertentu.

## GET /attendance/history?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
Mengambil seluruh riwayat kehadiran semua user dalam rentang tanggal tertentu.