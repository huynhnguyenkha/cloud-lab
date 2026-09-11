import { useState, useEffect } from 'react';
import './App.css';

const API_URL = 'https://silver-space-robot-g4xr96v4wggghvx6j-5000.app.github.dev/api/students';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ studentId: '', name: '', email: '' });
  const [editingId, setEditingId] = useState(null);

  // Câu 47: Lấy danh sách sinh viên khi trang load
const fetchStudents = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setStudents(data.data);   // ← SỬA: dùng đúng biến "data", lấy field "data" bên trong
    } catch (err) { 
      console.error('Lỗi khi lấy danh sách:', err);
    }
};

  useEffect(() => {
    fetchStudents();
  }, []);

  // Câu 48: Xử lý khi gõ vào Form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Câu 49: Gửi Form - Thêm mới hoặc Cập nhật
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Đang sửa -> gọi PUT
        await fetch(`${API_URL}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        setEditingId(null);
      } else {
        // Thêm mới -> gọi POST
        await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }
      setFormData({ studentId: '', name: '', email: '' });
      fetchStudents(); // Load lại danh sách sau khi thêm/sửa
    } catch (err) {
      console.error('Lỗi khi lưu sinh viên:', err);
    }
  };

  // Nhấn nút Sửa -> đổ dữ liệu vào Form
  const handleEdit = (student) => {
    setFormData({
      studentId: student.studentId,
      name: student.name,
      email: student.email,
    });
    setEditingId(student._id);
  };

  // Nhấn nút Xóa
  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa sinh viên này?')) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchStudents();
    } catch (err) {
      console.error('Lỗi khi xóa:', err);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ studentId: '', name: '', email: '' });
  };  

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', fontFamily: 'Arial' }}>
      <h1>Quản Lý Sinh Viên</h1>

      {/* Form thêm/sửa */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '30px' }}>
        <input
          type="text"
          name="studentId"
          placeholder="MSSV"
          value={formData.studentId}
          onChange={handleChange}
          required
          disabled={editingId !== null}
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <input
          type="text"
          name="name"
          placeholder="Họ tên"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>
          {editingId ? 'Cập nhật' : 'Thêm mới'}
        </button>
        {editingId && (
          <button type="button" onClick={handleCancelEdit} style={{ padding: '8px 16px', marginLeft: '10px' }}>
            Hủy
          </button>
        )}
      </form>

      {/* Bảng danh sách */}
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th>MSSV</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>Chưa có sinh viên nào</td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student._id}>
                <td>{student.studentId}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>
                  <button onClick={() => handleEdit(student)} style={{ marginRight: '5px' }}>
                    Sửa
                  </button>
                  <button onClick={() => handleDelete(student._id)}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;