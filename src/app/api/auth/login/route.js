import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json({
        success: false,
        error: "Email and password required"
      });
    }

    const [users] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return Response.json({
        success: false,
        error: "User not found"
      });
    }

    const user = users[0];

    const match = password === user.password;

    if (!match) {
      return Response.json({
        success: false,
        error: "Invalid password"
      });
    }

    if (user.role !== "admin") {
    return Response.json({
    success: false,
    error: "Admin access only"
      });
    } 
    const token = jwt.sign(
      {
        user_id: user.user_id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return Response.json({
      success: true,
        token,
        user: {
        user_id: user.user_id,
        role: user.role
  }
    });

  } catch (error) {
    return Response.json({
      success: false,
      error: error.message
    });
  }
}