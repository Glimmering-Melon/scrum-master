import { Link } from "react-router-dom";
import { performanceLabel } from "../utils/performanceLabel";

export default function EmployeeTable({ employees, onEvaluate }) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 10,
      border: "1px solid #e5e7eb",
      overflow: "hidden"
    }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ background: "#f9fafb", textAlign: "left" }}>
          <tr>
            <th style={{ padding: 12 }}>Nhân viên</th>
            <th>Phòng ban</th>
            <th>Vị trí</th>
            <th>Đánh giá</th>
            <th>Hiệu suất</th>
            <th style={{ width: 220 }}></th>
          </tr>
        </thead>

        <tbody>
          {employees.map(emp => (
            <tr key={emp._id} style={{ borderTop: "1px solid #e5e7eb" }}>
              <td style={{ padding: 12 }}>{emp.fullName}</td>
              <td>{emp.department}</td>
              <td>{emp.position}</td>
              <td>{emp.reviewCount || 0} đánh giá</td>  {/* ✅ thêm */}

              <td>
                <span style={{
                  padding: "4px 10px",
                  borderRadius: "9999px",
                  background: "#eef2ff",
                  color: "#4338ca",
                  fontSize: 13,
                  fontWeight: 500
                }}>
                  {performanceLabel(emp.avgScore)}
                </span>
              </td>

              <td style={{ display: "flex", gap: 8, padding: 12 }}>
                <Link
                  to={`/employee/${emp._id}`}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 6,
                    border: "1px solid #111827",
                    textDecoration: "none",
                    color: "#111827",
                    background: "#fff"
                  }}
                >
                  Xem
                </Link>

                <button
                  onClick={() => onEvaluate(emp)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 6,
                    border: "1px solid #4f46e5",
                    background: "#4f46e5",
                    color: "#fff",
                    cursor: "pointer"
                  }}
                >
                  Đánh giá
                </button>
              </td>
            </tr>
          ))}

          {!employees.length && (
            <tr>
              <td colSpan={5} style={{ padding: 16, textAlign: "center", color: "#6b7280" }}>
                Không có nhân viên nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
