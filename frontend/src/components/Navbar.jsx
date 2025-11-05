export default function Navbar() {
  const me = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div style={{
      height: 60,
      background: "#fff",
      borderBottom: "1px solid #e5e7eb",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px"
    }}>
      <div style={{ fontWeight: 600, fontSize: 18 }}>Employee Performance System</div>
      <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
        <div style={{ textAlign: "right", fontSize: 14 }}>
          <div>{me.fullName}</div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>{me.position}</div>
        </div>
        <button 
          onClick={logout} 
          style={{
            border: "1px solid #d1d5db",
            padding: "6px 12px",
            borderRadius: 6,
            cursor: "pointer"
          }}
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
}
