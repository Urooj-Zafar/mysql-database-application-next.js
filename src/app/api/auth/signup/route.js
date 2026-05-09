import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password, phone } = await req.json();

    if (!name || !email || !password) {
      return Response.json({
        success: false,
        error: "Required fields missing"
      }, { status: 400 });
    }

    // check if user exists
    const [existing] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return Response.json({
        success: false,
        error: "User already exists"
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.execute(
      `INSERT INTO users (name, email, password, phone)
       VALUES (?, ?, ?, ?)`,
      [name, email, hashedPassword, phone]
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