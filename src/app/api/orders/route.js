import { db } from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.execute(`
      SELECT * FROM orders ORDER BY order_id DESC
    `);

    return Response.json({ success: true, orders: rows });

  } catch (error) {
    return Response.json({ success: false, error: error.message });
  }
}


export async function POST(req) {
  try {
    const { user_id, total_amount, status } = await req.json();

    await db.execute(
      `INSERT INTO orders (user_id, order_date, total_amount, status)
       VALUES (?, NOW(), ?, ?)`,
      [user_id, total_amount, status || "pending"]
    );

    return Response.json({ success: true, message: "Order created" });

  } catch (error) {
    return Response.json({ success: false, error: error.message });
  }
}