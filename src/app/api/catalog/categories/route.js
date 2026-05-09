import { db } from "@/lib/db";


// GET ALL CATEGORIES
export async function GET() {

  try {

    const [rows] = await db.execute(
      "SELECT * FROM category ORDER BY category_id DESC"
    );

    return Response.json({
      success: true,
      categories: rows
    });

  } catch (error) {

    return Response.json({
      success: false,
      error: error.message
    });

  }

}


// CREATE CATEGORY
export async function POST(req) {

  try {

    const { category_name } = await req.json();

    if (!category_name) {

      return Response.json({
        success: false,
        error: "Category name required"
      });

    }

    await db.execute(
      "INSERT INTO category(category_name) VALUES(?)",
      [category_name]
    );

    return Response.json({
      success: true,
      message: "Category created"
    });

  } catch (error) {

    return Response.json({
      success: false,
      error: error.message
    });

  }

}