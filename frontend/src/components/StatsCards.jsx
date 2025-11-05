export default function StatsCards({ stats }) {
  const cards = [
    { label: "Tổng nhân viên", value: stats.total },
    { label: "Đánh giá gần đây", value: stats.recent },
    { label: "Điểm trung bình", value: stats.avg },
    { label: "Nhân viên xuất sắc", value: stats.excellent }
  ];

  return (
    <div style={{ display: "flex", gap: 20, margin: "20px 0" }}>
      {cards.map((c, i) => (
        <div key={i} style={{
          flex: 1,
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 10,
          padding: 18
        }}>
          <div style={{ fontSize: 14, color: "#6b7280" }}>{c.label}</div>
          <div style={{ fontSize: 22, fontWeight: 700 }}>{c.value}</div>
        </div>
      ))}
    </div>
  );
}
