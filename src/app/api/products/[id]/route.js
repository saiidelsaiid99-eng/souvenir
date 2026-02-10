import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";

// GET single product
export async function GET(request, context) {
  const { id } = await context.params;  // <-- await here

  await connectToDatabase();
  const product = await Product.findById(id);

  if (!product) {
    return new Response(JSON.stringify({ error: "Product not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(product), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// UPDATE product
export async function PUT(request, context) {
  const { id } = await context.params;  // <-- await here
  const body = await request.json();

  await connectToDatabase();

  const updated = await Product.findByIdAndUpdate(id, body, {
    new: true,
  });

  if (!updated) {
    return new Response(JSON.stringify({ error: "Product not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(updated), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// DELETE product
export async function DELETE(request, context) {
  const { id } = await context.params;  // <-- await here

  await connectToDatabase();
  const deleted = await Product.findByIdAndDelete(id);

  if (!deleted) {
    return new Response(JSON.stringify({ error: "Product not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
