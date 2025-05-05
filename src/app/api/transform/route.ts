import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const style = formData.get("style") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    if (!style) {
      return NextResponse.json({ error: "No style provided" }, { status: 400 });
    }

    const client = new OpenAI();

    const prompt = `
Transform the image into a ${style} style.
`;

    const response = await client.images.edit({
      model: "gpt-image-1",
      image: file,
      prompt: prompt,
    });

    const image_base64 = response.data?.[0].b64_json as string;
    const image_bytes = Buffer.from(image_base64, "base64");

    const contentType = file.type || "image/png";
    const fileName = file.name || "output.png";

    return new NextResponse(image_bytes, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error("Something went wrong:", error);
    return NextResponse.json(
      { error: "Failed to transform image" },
      { status: 500 }
    );
  }
}
