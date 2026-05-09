import { db } from "@/lib/db";

// GET PRODUCTS
export async function GET() {
  try {
    const [rows] = await db.execute(`
      SELECT 
        p.product_id,
        p.name,
        p.price,
        p.stock,
        c.category_name
      FROM product p
      JOIN category c ON p.category_id = c.category_id
      ORDER BY p.product_id DESC
    `);

    return Response.json({
      success: true,
      products: rows
    });

  } catch (error) {
    return Response.json({
      success: false,
      error: error.message
    });
  }
}

// CREATE PRODUCT
export async function POST(req) {
  try {
    const { name, price, stock, category_id } = await req.json();

    if (!name || !price || !stock || !category_id) {
      return Response.json({
        success: false,
        error: "All fields required"
      }, { status: 400 });
    }

    await db.execute(
      `INSERT INTO product (name, price, stock, category_id)
       VALUES (?, ?, ?, ?)`,
      [name, price, stock, category_id]
    );

    return Response.json({
      success: true,
      message: "Product created"
    });

  } catch (error) {
    return Response.json({
      success: false,
      error: error.message
    });
  }
}