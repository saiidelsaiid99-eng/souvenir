import connectToDatabase from "@/lib/mongodb";  // Adjust path as needed
import CustomGift from "@/models/CustomGift";  // Adjust path as needed
import { ObjectId } from "mongodb";

export const runtime = "nodejs";

export async function GET(request, { params }) {
  if (typeof params.then === "function") {
    params = await params;
  }
  const { id } = params;

  await connectToDatabase();

  if (!ObjectId.isValid(id)) {
    return new Response(
      JSON.stringify({ error: "Invalid ID" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const customGift = await CustomGift.findById(id);

  if (!customGift) {
    return new Response(
      JSON.stringify({ error: "Custom gift not found" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify(customGift),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

export async function PUT(request, { params }) {
  if (typeof params.then === "function") {
    params = await params;
  }
  const { id } = params;

  await connectToDatabase();

  if (!ObjectId.isValid(id)) {
    return new Response(
      JSON.stringify({ error: "Invalid ID" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const body = await request.json();

  const updatedCustomGift = await CustomGift.findByIdAndUpdate(id, body, {
    new: true,
  });

  if (!updatedCustomGift) {
    return new Response(
      JSON.stringify({ error: "Custom gift not found" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify(updatedCustomGift),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

export async function DELETE(request, { params }) {
  if (typeof params.then === "function") {
    params = await params;
  }
  const { id } = params;

  await connectToDatabase();

  if (!ObjectId.isValid(id)) {
    return new Response(
      JSON.stringify({ error: "Invalid ID" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const deletedCustomGift = await CustomGift.findByIdAndDelete(id);

  if (!deletedCustomGift) {
    return new Response(
      JSON.stringify({ error: "Custom gift not found" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({ message: "Custom gift deleted successfully" }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
