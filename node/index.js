import express from "express";
import cors from "cors";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import mysql from 'mysql2/promise';
import axios from "axios";
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const JWT_SECRET = 'aaa';

// 数据库
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'mydatabaseforfakepoe'
};

// 创建数据库连接
const pool = mysql.createPool(dbConfig);

// 注册
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 10);
    try {
        const [rows] = await pool.query('SELECT * FROM uusseerrss WHERE username = ?', [username]);
        if (rows.length > 0) {
            res.status(409).json({ message: '用户已存在', code: 409 });
            return;
        }
        await pool.query('INSERT INTO uusseerrss (username, password) VALUES (?, ?)', [username, hashedPassword]);
        res.status(201).json({ message: '注册成功', code: 201 });
    } catch (error) {
        res.status(500).json({ message: '注册过程中出现错误', code: 500 });
    }
});

// 登录
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM uusseerrss WHERE username = ?', [username]);
        if (rows.length === 0) {
            res.status(401).json({ message: '用户不存在', code: 401 });
            return;
        }
        const user = rows[0];
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (isPasswordValid) {
            const token = jsonwebtoken.sign({ username: user.username }, JWT_SECRET, { expiresIn: '10h' });
            res.status(200).json({ message: '登录成功', token, code: 200, name: user.username });
        } else {
            res.status(401).json({ message: '密码错误', code: 401 });
        }
    } catch (error) {
        res.status(500).json({ message: '登录过程中出现错误', code: 500 });
    }
});
const API_KEY = 'sk-gVi9uSt36LTbxgwKF4016a753a324f7e9f7cCd7120Ba6a14';
const API_URL = 'https://api.gptapi.us/v1/chat/completions';
//chat聊天
app.post('/chat', async (req, res) => {
    console.log(req.body, 'chat接口接收到的信息');
    const config = {
        headers: { 'Authorization': `Bearer ${API_KEY}` },
    };
    axios.post(API_URL, req.body, config).then((apiRes) => {
        console.log(apiRes.data);
        res.status(200).json({ respones: apiRes.data })
    }).catch((error) => {
        console.log(error);
        res.status(500).json({ message: '服务器内部错误', code: 500 });
    })

})

app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});
