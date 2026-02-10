import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image");

    if (!file || typeof file.arrayBuffer !== "function") {
      return new Response(
        JSON.stringify({ error: "No valid file uploaded" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const buffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(buffer);

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const ext = path.extname(file.name);
    const uniqueName = `${uuidv4()}${ext}`;
    const filePath = path.join(uploadDir, uniqueName);

    await fs.promises.writeFile(filePath, uint8Array);

    return new Response(
      JSON.stringify({ url: `/uploads/${uniqueName}` }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to upload file" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
