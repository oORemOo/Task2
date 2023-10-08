# Task2
วิธีใช้งาน
1. npm install
2. docker-compose up

## ทดสอบด้วย Postman

## 1 GET http://localhost:3000/users

## 2 DELETE http://localhost:3000/users/delete/ไอดีที่ต้องการลบ
  ใน Body Raw [JSON]
  {
  "id": 1
  }
  
## 3 POST http://localhost:3000/users/create
  ใน Body Raw [JSON]
  {
  "id": 2,
  "email": "example@example.com",
  "password": "password123",
  "username": "exampleuser",
  "nickname": "Example Nickname",
  "birthday": "2000-01-01",
  "address": "123 Example Street"
  }
  
## 4 POST http://localhost:3000/users/login
  ใน Body Raw [JSON]
  {
  "username": "exampleuser",
  "password": "password123"

  }
  
## 5 POST http://localhost:3000/users/logout


## 6 PUT http://localhost:3000/users/update
  ใน Body Raw [JSON]
  {
  "id": 2,
  "email": "G@example.com",
  "password": "password123",
  "username": "exampleuser",
  "nickname": "Example Nickname",
  "birthday": "2000-01-01",
  "address": "123 Example Street"
}
