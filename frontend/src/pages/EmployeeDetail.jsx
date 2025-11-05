import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { authHeader } from "../api";

// ✅ Chart imports
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

function Stat({ label, value }) {
  return (
    <div style={{
      flex: 1, background: "#fff", border: "1px solid #e5e7eb",
      borderRadius: 10, padding: 16
    }}>
      <div style={{ fontSize: 13, color: "#6b7280" }}>{label}</div>
      <div style={{ fontWeight: 700, fontSize: 22 }}>{value}</div>
    </div>
  );
}

export default function EmployeeDetail() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch employee + assessments
  useEffect(() => {
    async function run() {
      try {
        const [empRes, assessRes] = await Promise.all([
          fetch("http://localhost:4000/api/employees", { headers: authHeader() }),
          fetch(`http://localhost:4000/api/assessments/employee/${id}`, { headers: authHeader() })
        ]);
        const empList = await empRes.json();
        setEmployee(empList.find(e => e._id === id) || null);

        const items = await assessRes.json();
        setAssessments(items);
      } finally {
        setLoading(false);
      }
    }
    run();
  }, [id]);

  const stats = useMemo(() => {
    if (!assessments.length) return { count: 0, avg: "—", last: "—" };
    const avg = (assessments.reduce((s, a) => s + (a.overall || 0), 0) / assessments.length).toFixed(1);
    const last = assessments[0]?.cycleLabel || "—";
    return { count: assessments.length, avg, last };
  }, [assessments]);

  const chartData = assessments.map(a => ({
    name: a.cycleLabel,
    score: a.overall
  }));

  if (loading) {
    return (
      <div style={{ background: "#f3f4f6", minHeight: "100vh" }}>
        <Navbar />
        <div style={{ padding: 24, maxWidth: 1100, margin: "auto" }}>Đang tải…</div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div style={{ background: "#f3f4f6", minHeight: "100vh" }}>
        <Navbar />
        <div style={{ padding: 24, maxWidth: 1100, margin: "auto" }}>
          Không tìm thấy nhân viên. <Link to="/supervisor">Quay lại danh sách</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#f3f4f6", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ padding: 24, maxWidth: 1100, margin: "auto" }}>
        
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 16, gap: 16 }}>
          <Link to="/supervisor" style={{ textDecoration: "none" }}>← Quay lại</Link>
          <h2 style={{ margin: 0 }}>Hồ sơ nhân viên</h2>
        </div>

        {/* Profile card */}
        <div style={{
          display: "grid", gridTemplateColumns: "240px 1fr", gap: 16,
          marginBottom: 16, alignItems: "stretch"
        }}>
          <div style={{
            background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 16
          }}>
            <div style={{ width: "100%", height: 160, background: "#f3f4f6", borderRadius: 8,
              display: "grid", placeItems: "center", marginBottom: 10, fontSize: 13, color: "#6b7280" }}>
              (Avatar)
            </div>
            <div style={{ fontWeight: 700, fontSize: 18 }}>{employee.fullName}</div>
            <div style={{ color: "#6b7280" }}>{employee.position}</div>
            <div style={{ marginTop: 8, fontSize: 14 }}>Phòng ban: <b>{employee.department || "—"}</b></div>
            <div style={{ fontSize: 14 }}>Email: <b>{employee.email || "—"}</b></div>
          </div>

          <div style={{ display: "flex", gap: 16 }}>
            <Stat label="Số lần đánh giá" value={stats.count} />
            <Stat label="Điểm trung bình" value={stats.avg} />
            <Stat label="Kỳ gần nhất" value={stats.last} />
          </div>
        </div>

        {/* ✅ Trend Chart */}
        <div style={{
          background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10,
          padding: 20, marginBottom: 20
        }}>
          <h3 style={{ marginBottom: 12 }}>Xu hướng hiệu suất nhân viên</h3>

          {!chartData.length ? (
            <div style={{ color: "#6b7280" }}>Chưa có dữ liệu đánh giá</div>
          ) : (
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#4f46e5" strokeWidth={3} dot />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Timeline đánh giá */}
        <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10 }}>
          <div style={{ padding: 16, borderBottom: "1px solid #e5e7eb", fontWeight: 600 }}>
            Lịch sử đánh giá
          </div>
          <div style={{ padding: 8 }}>
            {!assessments.length && (
              <div style={{ padding: 16, color: "#6b7280" }}>Chưa có đánh giá.</div>
            )}
            {assessments.map((a) => (
              <div key={a._id} style={{
                display: "grid",
                gridTemplateColumns: "160px 1fr 100px",
                alignItems: "center",
                gap: 12,
                padding: 12,
                borderBottom: "1px solid #f3f4f6"
              }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{a.cycleLabel}</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>{a.period}</div>
                </div>
                <div style={{ fontSize: 13, color: "#374151" }}>
                  {a.comment || "—"}
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{
                    padding: "4px 10px",
                    borderRadius: 999,
                    background: "#eff6ff",
                    color: "#1d4ed8",
                    fontSize: 12,
                    fontWeight: 600
                  }}>
                    {a.overall?.toFixed?.(1) || a.overall}/5
                  </span>
                </div>

                <div style={{ gridColumn: "1 / 4", paddingLeft: 8, paddingTop: 6 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {(a.criteria || []).map((c, idx) => (
                      <span key={idx} style={{
                        padding: "4px 8px",
                        border: "1px solid #e5e7eb",
                        borderRadius: 8,
                        fontSize: 12
                      }}>
                        {c.label}: <b>{c.score}/5</b>
                      </span>
                    ))}
                  </div>
                  {a.nextGoals && (
                    <div style={{ marginTop: 8, fontSize: 12, color: "#6b7280" }}>
                      🎯 Mục tiêu: {a.nextGoals}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
