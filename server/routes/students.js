const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// GET /api/students - Lấy danh sách sinh viên
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json({
      message: 'Lay danh sach sinh vien thanh cong',
      count: students.length,
      data: students
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/students - Thêm sinh viên mới
router.post('/', async (req, res) => {
  try {
    const { studentId, name, email } = req.body;
    const newStudent = await Student.create({ studentId, name, email });
    res.status(201).json({
      message: 'Them sinh vien thanh cong',
      data: newStudent
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/students/:id - Cập nhật sinh viên
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { studentId, name, email } = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { studentId, name, email },
      { new: true, runValidators: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Không tìm thấy sinh viên' });
    }

    res.json({
      message: 'Cap nhat sinh vien thanh cong',
      data: updatedStudent
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/students/:id - Xóa sinh viên
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: 'Không tìm thấy sinh viên' });
    }

    res.json({
      message: 'Xoa sinh vien thanh cong',
      data: deletedStudent
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;