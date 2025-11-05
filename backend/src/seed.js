import "dotenv/config.js";
import bcrypt from "bcryptjs";
import { connectDB } from "./db.js";
import User from "./models/User.js";
import Assessment from "./models/Assessment.js";

(async () => {
  await connectDB(process.env.MONGO_URL);

  console.log("⏳ Reset DB...");
  await User.deleteMany({});
  await Assessment.deleteMany({});
  console.log("✅ Cleared old data");

  // === USERS ===
  const employeesData = [
    ["sarah.johnson", "Sarah Johnson", "Engineering", "Senior Software Engineer"],
    ["michael.chen", "Michael Chen", "Product", "Product Manager"],
    ["emma.nguyen", "Emma Nguyen", "HR", "HR Specialist"],
    ["minh.tran", "Minh Tran", "Marketing", "Marketing Executive"],
    ["david.pham", "David Pham", "Engineering", "Backend Developer"],
    ["anna.le", "Anna Le", "Engineering", "Frontend Developer"],
    ["peter.vo", "Peter Vo", "Sales", "Sales Executive"],
    ["lisa.ho", "Lisa Ho", "Finance", "Accountant"],
    ["kelly.bui", "Kelly Bui", "Marketing", "Content Specialist"],
    ["tommy.ngo", "Tommy Ngo", "IT", "System Support"],
    ["phuong.tran", "Phuong Tran", "Product", "Product Analyst"],
    ["vinh.do", "Vinh Do", "Engineering", "DevOps Engineer"]
  ];

  const users = [
    {
      username: "manager",
      passwordHash: await bcrypt.hash("123456", 10),
      role: "supervisor",
      fullName: "Quản lý Hệ thống",
      email: "manager@company.com",
      department: "Engineering",
      position: "Engineering Manager"
    },
    ...employeesData.map(([username, fullName, dept, position]) => ({
      username,
      passwordHash: bcrypt.hashSync("123456", 10),
      role: "employee",
      fullName,
      email: `${username}@company.com`,
      department: dept,
      position
    }))
  ];

  const createdUsers = await User.insertMany(users);
  const manager = createdUsers.find(u => u.role === "supervisor");
  const employees = createdUsers.filter(u => u.role === "employee");

  console.log(`✅ Created ${employees.length} employees`);

  // === ASSESSMENTS DATA ===
  const cycles = [
    "Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024",
    "Q1 2025", "Q2 2025", "Q3 2025", "Q4 2025"
  ];

  const criteriaTemplate = [
    { key: "technical", label: "Kỹ năng chuyên môn" },
    { key: "communication", label: "Giao tiếp" },
    { key: "teamwork", label: "Làm việc nhóm" },
    { key: "problem", label: "Giải quyết vấn đề" },
    { key: "initiative", label: "Chủ động sáng tạo" }
  ];

  const genCriteria = () =>
    criteriaTemplate.map(c => ({
      ...c,
      score: +(Math.random() * (5 - 2.5) + 2.5).toFixed(1)
    }));

  console.log("📊 Seeding assessments...");

  for (const emp of employees) {
    const count = cycles.length; 

    for (let i = 0; i < count; i++) {
      const overallScore = +(Math.random() * (5 - 2.6) + 2.6).toFixed(1);

      await Assessment.create({
        employee: emp._id,
        supervisor: manager._id,
        period: "quarterly",
        cycleLabel: cycles[i],     
        overall: overallScore,
        comment: "Nhân viên làm việc tốt, có tinh thần trách nhiệm.",
        criteria: genCriteria(),
        nextGoals: "Tiếp tục cải thiện kỹ năng và phát triển nghề nghiệp."
      });
    }
  }

  console.log("✅ Seed completed! Login: manager / 123456");
  process.exit(0);
})();
