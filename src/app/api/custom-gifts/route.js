import connectToDatabase from "../../../lib/mongodb";
import CustomGift from "../../../models/CustomGift";

export async function GET() {
  try {
    await connectToDatabase();
    const customGifts = await CustomGift.find({});
    return new Response(JSON.stringify(customGifts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching custom gifts:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const { name, price, description, customDetails, category, images } = body;

    if (!name || !price || !category) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const customGift = new CustomGift({
      name,
      price,
      description: description || "",
      customDetails: customDetails || "",
      category,
      images: images || [],
    });

    await customGift.save();

    return new Response(
      JSON.stringify({ message: "Custom gift created successfully" }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error creating custom gift:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
