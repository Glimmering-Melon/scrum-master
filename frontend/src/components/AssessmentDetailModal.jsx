export default function AssessmentDetailModal({ open, onClose, data }) {
  if (!open) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
      display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000
    }}>
      <div style={{
        width: 520, background: "#fff", borderRadius: 10, padding: 20,
        maxHeight: "80vh", overflowY: "auto"
      }}>
        <h3 style={{ marginBottom: 10 }}>{data.cycleLabel}</h3>
        <div style={{ marginBottom: 10, fontSize: 14 }}>
          Kỳ: <b>{data.period}</b>
        </div>
        <div style={{ marginBottom: 10 }}>
          <b>Điểm tổng:</b> {data.overall}/5
        </div>

        <h4>Chi tiết tiêu chí</h4>
        {data.criteria.map((c, i) => (
          <div key={i} style={{
            borderBottom: "1px solid #eee",
            paddingBottom: 8,
            marginBottom: 8
          }}>
            <div><b>{c.label}</b></div>
            <div>Điểm: {c.score}/5</div>
          </div>
        ))}

        <h4>Nhận xét</h4>
        <p>{data.comment || "Không có nhận xét"}</p>

        <h4>Mục tiêu kỳ sau</h4>
        <p>{data.nextGoals || "Không có mục tiêu"}</p>

        <div style={{ marginTop: 12, textAlign: "right" }}>
          <button
            onClick={onClose}
            style={{
              padding: "8px 14px",
              background: "#4f46e5",
              color: "#fff",
              borderRadius: 6
            }}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
