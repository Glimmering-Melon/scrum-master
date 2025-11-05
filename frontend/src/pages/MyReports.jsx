import { useEffect, useState } from "react"; 
import { authHeader } from "../api";
import Navbar from "../components/Navbar";
import AssessmentDetailModal from "../components/AssessmentDetailModal";

// 🟢 Import chart components
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function MyReports() {
  const [me] = useState(JSON.parse(localStorage.getItem("user") || "null"));
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/assessments/me", { headers: authHeader() })
      .then(r => r.json())
      .then(data => {
        setItems(data);
      });
  }, []);

  // 🟣 Format data cho chart
  const chartData = items.map(i => ({
    name: i.cycleLabel,
    score: i.overall
  }));

  return (
    <div style={{ background: "#f3f4f6", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ padding: 24, maxWidth: 900, margin: "auto" }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 10 }}>
          Kết quả đánh giá — {me.fullName}
        </h2>

        {/* 📈 Chart */}
        <div style={{
          background: "#fff",
          padding: 20,
          borderRadius: 12,
          border: "1px solid #e5e7eb",
          marginBottom: 20
        }}>
          <h3 style={{ marginBottom: 12 }}>Xu hướng hiệu suất theo thời gian</h3>

          {chartData.length === 0 ? (
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

        {/* 📝 List assessments */}
        {items.length === 0 && (
          <div style={{ marginTop: 20 }}>Chưa có đánh giá nào.</div>
        )}

        <div style={{ marginTop: 20 }}>
          {items.map(a => (
            <div
              key={a._id}
              onClick={() => setSelected(a)}
              style={{
                background: "#fff",
                padding: 15,
                border: "1px solid #e5e7eb",
                borderRadius: 10,
                marginBottom: 12,
                cursor: "pointer"
              }}
            >
              <div style={{ fontWeight: 600 }}>{a.cycleLabel}</div>
              <div style={{ fontSize: 14, color: "#6b7280" }}>
                Kỳ: {a.period} | Điểm TB: <b>{a.overall}/5</b>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <AssessmentDetailModal 
          open={true}
          data={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
