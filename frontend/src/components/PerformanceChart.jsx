import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

/**
 * props:
 *  - items: mảng assessments [{ cycleLabel, overall, createdAt }]
 *  - height: number (optional)
 */
export default function PerformanceChart({ items, height = 280 }) {
  // sort theo thời gian tăng dần (cũ -> mới)
  const data = [...(items || [])]
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .map((a, i) => ({
      idx: i + 1,
      label: a.cycleLabel || `#${i + 1}`,
      overall: Number(a.overall || 0)
    }));

  if (!data.length) {
    return (
      <div style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 10,
        padding: 16
      }}>
        Chưa có dữ liệu để vẽ biểu đồ.
      </div>
    );
  }

  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e5e7eb",
      borderRadius: 10,
      padding: 16
    }}>
      <div style={{ fontWeight: 600, marginBottom: 8 }}>Xu hướng điểm tổng</div>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" tick={{ fontSize: 12 }} />
          <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(v) => [`${v}/5`, "Điểm"]} labelFormatter={(l) => `Kỳ: ${l}`} />
          <Line
            type="monotone"
            dataKey="overall"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
