import { db } from "@/lib/db";

export async function GET(req) {
  try {
    const cart_id = req.nextUrl.searchParams.get("cart_id");

    if (!cart_id) {
      return Response.json({
        success: false,
        error: "cart_id is required"
      });
    }

    const [rows] = await db.execute(
      `SELECT 
        ci.cart_item_id,
        ci.cart_id,
        ci.product_id,
        p.name AS product_name,
        ci.quantity,
        p.price,
        (ci.quantity * p.price) AS total
       FROM cartitem ci
       LEFT JOIN product p ON p.product_id = ci.product_id
       WHERE ci.cart_id = ?`,
      [cart_id]
    );

    return Response.json({
      success: true,
      cartItems: rows
    });

  } catch (err) {
    return Response.json({
      success: false,
      error: err.message
    });
  }
}