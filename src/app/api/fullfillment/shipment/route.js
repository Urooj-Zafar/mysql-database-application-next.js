import { db } from "@/lib/db";

/* =======================
   CREATE SHIPMENT
======================= */
export async function POST(req) {
  try {
    const { order_id, shipment_status, courier_service, delivery_date } =
      await req.json();

    if (!order_id || !shipment_status || !courier_service) {
      return Response.json(
        { success: false, error: "Required fields missing" },
        { status: 400 }
      );
    }

    await db.execute(
      `INSERT INTO shipment
       (order_id, shipment_status, shipment_date, delivery_date, courier_service)
       VALUES (?, ?, NOW(), ?, ?)`,
      [
        order_id,
        shipment_status,
        delivery_date || null,
        courier_service
      ]
    );

    return Response.json({ success: true });

  } catch (err) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

/* =======================
   GET ALL SHIPMENTS
======================= */
export async function GET() {
  try {
    const [rows] = await db.execute(
      `SELECT shipment_id, order_id, shipment_status,
              shipment_date, delivery_date, courier_service
       FROM shipment
       ORDER BY shipment_id DESC`
    );

    return Response.json({
      success: true,
      shipments: rows
    });

  } catch (err) {
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}