const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const studentRoutes = require('./routes/students');

const app = express();

app.use(cors());
app.use(express.json());

// Kết nối MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Kết nối MongoDB Atlas thành công'))
  .catch(err => console.log('❌ Lỗi kết nối MongoDB:', err));

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Backend đang hoạt động!' });
});
app.use('/api/students', studentRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại port ${PORT}`);
});