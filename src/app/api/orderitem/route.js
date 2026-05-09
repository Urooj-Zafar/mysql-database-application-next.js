import { db } from "@/lib/db";

export async function GET(req) {
  try {
    const order_id = req.nextUrl.searchParams.get("order_id");

    if (!order_id) {
      return Response.json({
        success: false,
        error: "order_id is required"
      });
    }

    const [rows] = await db.execute(
      `SELECT 
        oi.order_item_id,
        oi.order_id,
        oi.product_id,
        COALESCE(p.name, 'Deleted Product') AS product_name,
        oi.quantity,
        oi.price,
        (oi.quantity * oi.price) AS total
       FROM orderitem oi
       LEFT JOIN product p ON p.product_id = oi.product_id
       WHERE oi.order_id = ?`,
      [order_id]
    );

    return Response.json({
      success: true,
      orderItems: rows
    });

  } catch (err) {
    return Response.json({
      success: false,
      error: err.message
    });
  }
}