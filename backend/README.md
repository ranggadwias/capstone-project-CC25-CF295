# FinMate

Dokumentasi API FinMate

<br>

# Endpoint (dev)

http://localhost:4000

<br>

# Register

- URL : ```/api/auth/register```
- Method : ```POST```
- Request Body :

  - ```name```
  - ```email```, harus unik
  - ```password```, minimal 8 karakter

- Response :
  > ```
  > {
  >   "message": "Pengguna berhasil didaftarkan",
  >   "userId": "Jq3C0M0rkh3SbRRiwnJ7"
  > }
  > ```
  
<br>

# Login

- URL : ```/api/auth/login```
- Method : ```POST```
- Request Body :

  - ```email```
  - ```password```

- Response :
  > ```
  > {
  >   "message": "Login berhasil",
  >   "token": "<JWT Token>",
  >   "user": {
  >     "id": "Jq3C0M0rkh3SbRRiwnJ7",
  >     "name": "Saber Alucard",
  >   }
  > }
  > ```

<br>

# Get Dashboard Summary

- URL : ```/api/transactions/summary```
- Method : ```GET```
- Headers :

  - ```Authorization: Bearer <JWT Token dari login>```

- Response :
  > ```
  > {
  >   "message": "Data dashboard berhasil diambil",
  >   "data": {
  >     "availableBalance": 2000000,
  >     "totalIncome": 5000000,
  >     "totalExpense": -3000000
  >   }
  > }
  > ```

<br>

# Add New Transaction

- URL : ```/api/transactions```
- Method : ```POST```
- Headers :

  - ```Authorization: Bearer <JWT Token dari login>```

- Request Body :

  - ```amount```
  - ```type```, income | expense
  - ```description```
  - ```date```

- Response :
  > ```
  > {
  >   "message": "Transaksi berhasil ditambahkan",
  >   "transactionId": "hmbG9L00M8v31HHQq9aG"
  > }
  > ```

<br>

# Get All Transaction

- URL : ```/api/transactions```
- Method : ```GET```
- Headers :

  - ```Authorization: Bearer <JWT Token dari login>```

- Response :
  > ```
  > "message": "Data transaksi berhasil diambil",
  > "transactions": [
  >     {
  >         "transactionId": "hmbG9L00M8v31HHQq9aG",
  >         "userId": "Jq3C0M0rkh3SbRRiwnJ7",
  >         "type": "income | expense",
  >         "description": "Lorem Ipsum",
  >         "amount": 2000000,
  >         "date": "2025-05-31 (YYYY-MM-DD)"
  >     }
  > ]
  > ```

<br>