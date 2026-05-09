import { db } from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.execute(
      `SELECT payment_id, order_id, payment_method, payment_status, amount
       FROM payment
       ORDER BY payment_id DESC`
    );

    return Response.json({
      success: true,
      payments: rows
    });

  } catch (err) {
    return Response.json({
      success: false,
      error: err.message
    });
  }
}
export async function POST(req) {
  try {
    const { order_id, payment_method, amount } = await req.json();

    await db.execute(
      `INSERT INTO payment (order_id, payment_method, payment_status, amount)
       VALUES (?, ?, ?, ?)`,
      [order_id, payment_method, "paid", amount]
    );

    return Response.json({ success: true });

  } catch (err) {
    return Response.json({ success: false, error: err.message });
  }
}