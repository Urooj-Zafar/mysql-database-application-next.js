import { db } from "@/lib/db";

export async function POST(req) {
  try {
    const { user_id, product_id, rating, comment } = await req.json();

    if (!user_id || !product_id || !rating || !comment) {
      return Response.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    await db.execute(
      `INSERT INTO review (user_id, product_id, rating, comment, review_date)
       VALUES (?, ?, ?, ?, NOW())`,
      [user_id, product_id, rating, comment]
    );

    return Response.json({ success: true });

  } catch (err) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const [rows] = await db.execute(
      `SELECT review_id, user_id, product_id, rating, comment, review_date
       FROM review
       ORDER BY review_id DESC`
    );

    return Response.json({
      success: true,
      reviews: rows
    });

  } catch (err) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}