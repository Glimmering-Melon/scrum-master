import { Router } from "express";
import User from "../models/User.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// GET /api/employees
router.get("/", requireAuth(["supervisor"]), async (req, res) => {
  const employees = await User.find({ role: "employee" })
    .select("-passwordHash")
    .lean();
  res.json(employees);
});

// POST /api/employees (future)
router.post("/", requireAuth(["supervisor"]), async (req, res) => {
  res.status(501).json({ message: "Implement create employee later" });
});

export default router;
