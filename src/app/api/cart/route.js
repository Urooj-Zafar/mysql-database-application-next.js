import { db } from "@/lib/db";

/* =======================
   GET CART BY USER
======================= */
export async function GET(req) {
  try {
    const user_id = req.nextUrl.searchParams.get("user_id");

    if (!user_id) {
      return Response.json(
        { success: false, error: "user_id is required" },
        { status: 400 }
      );
    }

    const [rows] = await db.execute(
      `SELECT cart_id, user_id, created_at
       FROM cart
       WHERE user_id = ?`,
      [user_id]
    );

    return Response.json({
      success: true,
      cart: rows
    });

  } catch (err) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

/* =======================
   CREATE CART
======================= */
export async function POST(req) {
  try {
    const { user_id } = await req.json();

    if (!user_id) {
      return Response.json(
        { success: false, error: "user_id required" },
        { status: 400 }
      );
    }

    await db.execute(
      `INSERT INTO cart (user_id, created_at)
       VALUES (?, NOW())`,
      [user_id]
    );

    return Response.json({ success: true });

  } catch (err) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}