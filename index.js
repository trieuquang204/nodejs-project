const express = require("express");
const cors = require('cors');

require('dotenv').config()

const app = express()
app.use(cors({
  origin: process.env.CLIENT_URL, // Chỉ cho phép url này đc truy cập vào server
  // methods: ['GET']  // Chỉ cho phép phương thức get
  methods: ['GET', 'POST', 'PUT', 'DELETE'] // CRUD: Create: post, Read: Get, Update: Put, delete: DELETE
}))

// Convert data sang chuỗi json
app.use(express.json())
// Nếu client gửi lên kp là đoạn text hoặc đoạn json mà là mảng hoặc một Object thì urlencoded sẽ đọc đc những dữ liệu đó và convert sang dạng json 
app.use(express.urlencoded({extended: true}))


// Route (đường dẫn để client gọi tới )
// req: client gửi lên
// res: trả về data cho client 
app.use('/', (req, res) => { 
  return res.send('Server on...')
})


// Cho server chạy 
const PORT = process.env.PORT || 8888
const listener = app.listen(PORT, () => {
  console.log('app running...' + listener.address().port )
})