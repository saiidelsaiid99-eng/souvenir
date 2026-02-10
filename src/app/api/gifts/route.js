import connectToDatabase from "@/lib/mongodb";
import Gift from "@/models/Gift";

export async function GET() {
  try {
    await connectToDatabase();
    const gifts = await Gift.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(gifts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("GET /api/gifts error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch gifts" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const { name, price, images, description, category } = body;

    if (!name || !price || !category) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const gift = new Gift({
      name,
      price,
      images: images || [],
      description: description || "",
      category,
    });

    await gift.save();

    return new Response(
      JSON.stringify(gift),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("POST /api/gifts error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create gift" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function PUT(request, context) {
  try {
    const { id } = context.params;
    await connectToDatabase();
    const body = await request.json();

    const updatedGift = await Gift.findByIdAndUpdate(id, body, { new: true });

    if (!updatedGift) {
      return new Response(JSON.stringify({ error: "Gift not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(updatedGift), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("PUT /api/gifts error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update gift" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function DELETE(request, context) {
  try {
    const { id } = context.params;
    await connectToDatabase();
    const deleted = await Gift.findByIdAndDelete(id);

    if (!deleted) {
      return new Response(JSON.stringify({ error: "Gift not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ message: "Gift deleted" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("DELETE /api/gifts error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to delete gift" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
