import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

// GET ALL USERS
export async function GET() {
  try {
    const [rows] = await db.execute(
       "SELECT * FROM users ORDER BY user_id "
    );

    return Response.json({
      success: true,
      users: rows
    });

  } catch (error) {
    return Response.json({
      success: false,
      error: error.message
    });
  }
}


// CREATE USER
export async function POST(req) {
  try {
    const { name, email, password, phone, role } = await req.json();

    if (!name || !email || !password) {
      return Response.json({
        success: false,
        error: "Missing required fields"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.execute(
      `INSERT INTO users (name, email, password, phone, role)
       VALUES (?, ?, ?, ?, ?)`,
      [name, email, hashedPassword, phone || null, role || "customer"]
    );

    return Response.json({
      success: true,
      message: "User created"
    });

  } catch (error) {
    return Response.json({
      success: false,
      error: error.message
    });
  }
}