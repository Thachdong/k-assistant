import { writeFile } from "fs/promises";
import { join } from "path";

export async function writeUploadFile(
  file: File,
  filename: string
): Promise<string | null> {
  try {
    const arrayBuffer = await file.arrayBuffer();

    const buffer = Buffer.from(arrayBuffer);

    const uploadPath = join(process.cwd(), "public/uploads", filename);

    await writeFile(uploadPath, buffer);

    return `/uploads/${filename}`;
  } catch (error) {
    console.error(error);

    return null;
  }
}
