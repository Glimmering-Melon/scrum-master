import { useState } from "react";
import { authHeader } from "../api";

export default function AssessmentModal({ open, onClose, employee }) {
  if (!open) return null;

  const periods = [
    { value: "biweekly", label: "Bi-weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "quarterly", label: "Quarterly" },
    { value: "yearly", label: "Yearly" }
  ];

  const cycles = ["Q1 2025", "Q2 2025", "Q3 2025", "Q4 2025"];

  const criteriaTemplate = [
    { key: "technical", label: "Kỹ năng chuyên môn" },
    { key: "communication", label: "Giao tiếp" },
    { key: "teamwork", label: "Làm việc nhóm" },
    { key: "problem", label: "Giải quyết vấn đề" },
    { key: "initiative", label: "Chủ động sáng tạo" }
  ];

  const [period, setPeriod] = useState("quarterly");
  const [cycle, setCycle] = useState("Q1 2025");
  const [criteria, setCriteria] = useState(
    criteriaTemplate.map(c => ({ ...c, score: 3 }))
  );
  const [comment, setComment] = useState("");
  const [goals, setGoals] = useState("");
  const [loading, setLoading] = useState(false);
  const avg = (criteria.reduce((a,b)=>a+b.score,0) / criteria.length).toFixed(1);

  const changeScore = (key, score) => {
    setCriteria(prev => prev.map(c => c.key === key ? {...c, score: Number(score)} : c));
  };

  async function submit() {
    setLoading(true);
    try {
      await fetch("http://localhost:4000/api/assessments", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeader() },
        body: JSON.stringify({
          employee: employee._id,
          period,
          cycleLabel: cycle,
          criteria,
          comment,
          nextGoals: goals,
          overall: Number(avg)
        })
      });
      alert("✅ Đánh giá đã được lưu");
      onClose();
    } catch (err) {
      alert("❌ Lỗi khi gửi đánh giá");
    }
    setLoading(false);
  }

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
      display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000
    }}>
      <div style={{
        width: 520, background: "#fff", borderRadius: 10,
        padding: 20, maxHeight: "80vh", overflowY: "auto"
      }}>
        <h3 style={{ marginBottom: 10 }}>Tạo đánh giá mới cho {employee.fullName}</h3>

        <label>Kỳ đánh giá</label>
        <select value={period} onChange={e=>setPeriod(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}>
          {periods.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
        </select>

        <label>Chu kỳ</label>
        <select value={cycle} onChange={e=>setCycle(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 15 }}>
          {cycles.map(c => <option key={c}>{c}</option>)}
        </select>

        {criteria.map((c, i)=>(
          <div key={i} style={{ marginBottom: 15 }}>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <label>{c.label}</label>
              <b>{c.score}/5</b>
            </div>
            <input type="range" min="1" max="5" value={c.score}
              onChange={e=>changeScore(c.key, e.target.value)} style={{ width:"100%" }} />
          </div>
        ))}

        <label>Nhận xét</label>
        <textarea value={comment} onChange={e=>setComment(e.target.value)}
          rows={3} style={{ width:"100%", padding: 8, marginBottom: 10 }} />

        <label>Mục tiêu kỳ sau</label>
        <textarea value={goals} onChange={e=>setGoals(e.target.value)}
          rows={2} style={{ width:"100%", padding: 8, marginBottom: 10 }} />

        <div>Điểm trung bình: <b>{avg}/5</b></div>

        <div style={{ display:"flex", justifyContent:"flex-end", marginTop: 12, gap:10 }}>
          <button onClick={onClose} style={{ padding:"8px 14px" }}>Hủy</button>
          <button onClick={submit} disabled={loading}
            style={{ padding:"8px 14px", background:"#4f46e5", color:"#fff", borderRadius:6 }}>
            {loading ? "Đang lưu..." : "Gửi đánh giá"}
          </button>
        </div>
      </div>
    </div>
  );
}
