const express = require("express");
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const { MongoClient } = require("mongodb");
const url = 'mongodb://admin:admin@mongodb:27017';

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.get('/users', async (req, res) => {
  const client = new MongoClient(url);
  await client.connect();
  const users = await client.db('database').collection('users').find({}).toArray();
  await client.close();
  res.status(200).send(users);
});

app.get('/users/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const client = new MongoClient(url);
  await client.connect();
  const user = await client.db('database').collection('users').findOne({ "id": id });
  await client.close();
  res.status(200).send({
      "status": "ok",
      "user": user
  });
});

app.post('/users/create', async (req, res) => {
    const user = req.body;
    const client = new MongoClient(url);
    await client.connect();
    console.log('เชื่อมต่อกับ MongoDB แล้ว');

    await client.db('database').collection('users').insertOne({
        id: parseInt(user.id),
        email: user.email,
        password: user.password,
        username: user.username,
        nickname: user.nickname,
        birthday: user.birthday,
        address: user.address
    });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "User with ID = " + user.id + " is created",
        "user": user
    });
});


app.put('/users/update', async (req, res) => {
    const user = req.body;
    const id = user.id;
    const client = new MongoClient(url);
    await client.connect();
    await client.db('database').collection('users').updateOne({ 'id': id }, {
        "$set": {
            id: parseInt(user.id),
            email: user.email,
            password: user.password,
            username: user.username,
            nickname: user.nickname,
            birthday: user.birthday,
            address: user.address
        }
    });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "User with ID = " + id + " is updated",
        "user": user
    });
});

app.delete('/users/delete/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const client = new MongoClient(url);
    await client.connect();
    const result = await client.db('database').collection('users').deleteOne({ 'id': id });
    await client.close();
    if (result.deletedCount === 1) {
        res.status(200).send({
            "status": "ok",
            "message": "User with ID = " + id + " is deleted"
        });
    } else {
        res.status(404).send({
            "status": "error",
            "message": "User with ID = " + id + " not found"
        });
    }
});

app.post('/users/login', async (req, res) => {
    const { username, password } = req.body;
    const client = new MongoClient(url);
    await client.connect();
    const user = await client.db('database').collection('users').findOne({ 'username': username, 'password': password });
    await client.close();
    if (user) {
        // สร้างเซสชันหรือตรวจสอบการล็อกอินที่นี่
        res.status(200).send({
            "status": "ok",
            "message": "Login successful",
            "user": user
        });
    } else {
        res.status(401).send({
            "status": "error",
            "message": "Login failed"
        });
    }
});

app.post('/users/logout', async (req, res) => {
    // ออกจากระบบหรือลบเซสชันที่นี่
    res.status(200).send({
        "status": "ok",
        "message": "Logout successful"
    });
});

app.put('/users/updateUsername', async (req, res) => {
    const { id, username } = req.body;
    const client = new MongoClient(url);
    await client.connect();
    await client.db('database').collection('users').updateOne({ 'id': id }, {
        "$set": {
            username: username
        }
    });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Username updated for user with ID = " + id
    });
});

app.put('/users/updateNickname', async (req, res) => {
    const { id, nickname } = req.body;
    const client = new MongoClient(url);
    await client.connect();
    await client.db('database').collection('users').updateOne({ 'id': id }, {
        "$set": {
            nickname: nickname
        }
    });
    await client.close();
    res.status(200).send({
        "status": "ok",
        "message": "Nickname updated for user with ID = " + id
    });
});
