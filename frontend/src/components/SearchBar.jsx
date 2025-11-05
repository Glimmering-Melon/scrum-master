export default function SearchBar({ search, setSearch, dept, setDept }) {
  return (
    <div style={{ display: "flex", gap: 12, marginBottom: 15 }}>
      <input
        placeholder="Tìm kiếm nhân viên..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          flex: 1,
          border: "1px solid #d1d5db",
          padding: "8px 12px",
          borderRadius: 8
        }}
      />

      <select
        value={dept}
        onChange={e => setDept(e.target.value)}
        style={{
          border: "1px solid #d1d5db",
          padding: "8px 12px",
          borderRadius: 8
        }}
      >
        <option value="">Tất cả phòng ban</option>
        <option value="Engineering">Engineering</option>
        <option value="Product">Product</option>
        <option value="Design">Design</option>
        <option value="Marketing">Marketing</option>
        <option value="HR">HR</option>
      </select>
    </div>
  );
}
