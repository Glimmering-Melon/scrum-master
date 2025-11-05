import { useEffect, useState } from "react";
import { authHeader } from "../api";
import Navbar from "../components/Navbar";

export default function DashboardEmployee() {
  const [me, setMe] = useState(null);
  const [assessments, setAssessments] = useState([]);

  useEffect(() => {
    // Lấy thông tin nhân viên hiện tại
    fetch("http://localhost:4000/api/auth/me", { headers: authHeader() })
      .then(res => res.json())
      .then(data => setMe(data));

    // Lấy danh sách đánh giá
    fetch("http://localhost:4000/api/assessments/me", { headers: authHeader() })
      .then(res => res.json())
      .then(data => setAssessments(data));
  }, []);

  return (
    <div style={{ background: "#f3f4f6", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: 900, margin: "auto", padding: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 20 }}>
          Kết quả đánh giá của tôi
        </h2>

        {me && (
          <div style={{
            background: "#fff",
            padding: 20,
            borderRadius: 12,
            border: "1px solid #e5e7eb",
            marginBottom: 20
          }}>
            <h3 style={{ fontSize: 18, fontWeight: 600 }}>{me.fullName}</h3>
            <p style={{ marginTop: 6, color: "#6b7280" }}>{me.email}</p>
            <p style={{ color: "#6b7280" }}>Phòng ban: {me.department}</p>
            <p style={{ color: "#6b7280" }}>Vị trí: {me.position}</p>
          </div>
        )}

        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>
          Lịch sử đánh giá
        </h3>

        {assessments.length === 0 ? (
          <p style={{ color: "#6b7280" }}>Chưa có đánh giá nào.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {assessments.map(a => (
              <div key={a._id} style={{
                background: "#fff",
                padding: 16,
                borderRadius: 10,
                border: "1px solid #e5e7eb"
              }}>
                <strong>Kỳ đánh giá:</strong> {a.cycleLabel} <br />
                <strong>Điểm:</strong> {a.overall}/5 <br />
                <strong>Nhận xét:</strong> {a.comment || "Không có"} <br />
                <strong>Mục tiêu kỳ sau:</strong> {a.nextGoals || "Không có"}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
