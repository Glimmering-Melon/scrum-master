import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { login } from "../api";

export default function Login() {
  const [params] = useSearchParams();
  const roleHint = params.get("role"); // "supervisor" | "employee" | null
  const [username, setUsername] = useState(roleHint === "supervisor" ? "manager" : "sarah.johnson");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const title =
    roleHint === "supervisor" ? "Đăng nhập (Supervisor)" :
    roleHint === "employee" ? "Đăng nhập (Employee)" :
    "Đăng nhập hệ thống";

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const { token, user } = await login(username, password);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      nav(user.role === "supervisor" ? "/supervisor" : "/me", { replace: true });
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "grid", placeItems: "center", minHeight: "100vh", background: "#f6f7fb" }}>
      <form onSubmit={onSubmit} style={{ width: 360, padding: 24, background: "#fff", borderRadius: 12, boxShadow: "0 10px 30px rgba(0,0,0,.06)" }}>
        <h3 style={{ marginBottom: 8 }}>{title}</h3>
        <p style={{ color: "#6b7280", marginBottom: 16 }}>Hệ thống Đánh giá Nhân viên</p>

        <label style={{ fontSize: 12, color: "#6b7280" }}>Tên đăng nhập</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #e5e7eb", marginTop: 6, marginBottom: 12 }}
        />

        <label style={{ fontSize: 12, color: "#6b7280" }}>Mật khẩu</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="******"
          style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #e5e7eb", marginTop: 6, marginBottom: 16 }}
        />

        {err && <div style={{ color: "#ef4444", marginBottom: 12 }}>{err}</div>}

        <button disabled={loading} style={{ width: "100%", padding: 12, borderRadius: 12, border: "none", background: "#0f172a", color: "white", cursor: "pointer" }}>
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>

        <div style={{ marginTop: 12, fontSize: 12, color: "#6b7280" }}>
          Mẹo: supervisor = <b>manager/123456</b> • employee = <b>sarah.johnson/123456</b>
        </div>
      </form>
    </div>
  );
}
