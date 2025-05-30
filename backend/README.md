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
  >   "user": {
  >     "id": "Jq3C0M0rkh3SbRRiwnJ7",
  >     "name": "Saber Alucard",
  >   }
  > }
  > ```

<br>

# Add New Transaction

- URL : ```/api/transactions```
- Method : ```POST```
- Headers :

  - ```x-user-id: "Jq3C0M0rkh3SbRRiwnJ7"```
  - ```x-user-name: "Saber Alucard"```

- Request Body :

  - ```amount```
  - ```type```, hanya bisa "income" atau "expense"
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