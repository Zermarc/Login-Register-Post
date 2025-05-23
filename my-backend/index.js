const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const app = express();

// สร้างการเชื่อมต่อฐานข้อมูล MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // เปลี่ยนเป็น username ของคุณ
    password: 'Phitakphon6493*',  // ใส่ password ของคุณ
    database: 'myapp'  // เปลี่ยนเป็นชื่อฐานข้อมูลของคุณ
});

// เชื่อมต่อฐานข้อมูล
db.connect((err) => {
    if (err) {
        console.error('Database connection error:', err);
        return;
    }
    console.log('Database connected!');
});

app.use(express.json());  // เพื่อให้ server อ่าน body ที่ส่งมาในรูปแบบ JSON

// Route สำหรับการสมัครสมาชิก
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // เข้ารหัสรหัสผ่าน
    const hashedPassword = bcrypt.hashSync(password, 10);

    // SQL Query สำหรับบันทึกข้อมูลผู้ใช้ใหม่
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(query, [username, email, hashedPassword], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Database error' });
        }
        res.status(200).json({ success: true, message: 'Registration successful' });
    });
});

// Route สำหรับการเข้าสู่ระบบ
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // SQL Query สำหรับดึงข้อมูลผู้ใช้ที่มีอีเมลตรงกัน
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ login: false, message: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ login: false, message: 'User not found' });
        }

        const user = results[0];

        // ตรวจสอบรหัสผ่าน
        if (bcrypt.compareSync(password, user.password)) {
            return res.status(200).json({ login: true, message: 'Login successful' });
        } else {
            return res.status(401).json({ login: false, message: 'Invalid password' });
        }
    });
});

// ตั้งค่าให้ server รันที่ port 3000
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

app.get('/', (req, res) => {
    res.send('Backend is running!');
});