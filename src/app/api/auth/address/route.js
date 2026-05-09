import { db } from "@/lib/db";

// GET ALL ADDRESSES
export async function GET() {
  try {
    const [rows] = await db.execute(
      `SELECT address_id, user_id, city, street, postal_code, country
       FROM address
       ORDER BY address_id DESC`
    );

    return Response.json({
      success: true,
      addresses: rows
    });

  } catch (err) {
    console.error("ADDRESS GET ERROR:", err);

    return Response.json(
      { success: false, error: "Failed to fetch addresses" },
      { status: 500 }
    );
  }
}