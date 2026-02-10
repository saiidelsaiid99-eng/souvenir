import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.error("GET /api/products error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch products" }),
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();

    const body = await request.json();

    // Validate required fields
    if (
      !body.name ||
      typeof body.price !== "number" ||
      !body.category ||
      !Array.isArray(body.images) ||
      body.images.length === 0
    ) {
      return new Response(
        JSON.stringify({ error: "Missing required fields or invalid data" }),
        { status: 400 }
      );
    }

    // Create new product
    const product = await Product.create(body);

    return new Response(JSON.stringify(product), { status: 201 });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create product", details: error.message }),
      { status: 500 }
    );
  }
}
