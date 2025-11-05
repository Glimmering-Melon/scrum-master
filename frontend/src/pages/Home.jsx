export default function Home() {
  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>Hệ thống Đánh giá Nhân viên</h1>
      <p>Trang Home đang hoạt động ✅</p>

      <a
        href="/login"
        style={{
          display: "inline-block",
          marginTop: 20,
          padding: "10px 20px",
          background: "#4f46e5",
          color: "#fff",
          borderRadius: 6,
          textDecoration: "none",
        }}
      >
        Đăng nhập vào hệ thống
      </a>
    </div>
  );
}
