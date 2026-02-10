import connectToDatabase from "@/lib/mongodb";
import Gift from "@/models/Gift";

export async function GET(request, context) {
  // ADD "await" HERE ▼
  const { id } = await context.params;

  await connectToDatabase();

  const gift = await Gift.findById(id);

  if (!gift) {
    return new Response(
      JSON.stringify({ error: "Gift not found" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify(gift),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

export async function PUT(request, context) {
  // ADD "await" HERE ▼
  const { id } = await context.params;
  const body = await request.json();

  await connectToDatabase();

  const updatedGift = await Gift.findByIdAndUpdate(id, body, { new: true });

  if (!updatedGift) {
    return new Response(
      JSON.stringify({ error: "Gift not found" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify(updatedGift),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

export async function DELETE(request, context) {
  // ADD "await" HERE ▼
  const { id } = await context.params;

  await connectToDatabase();

  const deletedGift = await Gift.findByIdAndDelete(id);

  if (!deletedGift) {
    return new Response(
      JSON.stringify({ error: "Gift not found" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({ message: "Gift deleted successfully" }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}