export function calcAvgScore(assessments) {
  if (!assessments || assessments.length === 0) return null;
  const avg = assessments.reduce((sum, a) => sum + (a.overall || 0), 0) / assessments.length;
  return Number(avg.toFixed(2));
}

export function performanceLabel(score) {
  if (score == null) return "—";
  if (score < 1) return "Không hoàn thành";
  if (score < 2) return "Hoàn thành kém";
  if (score < 3) return "Trung bình";
  if (score < 4) return "Tốt";
  if (score <= 5) return "Xuất sắc";
  return "—";
}
