"use server";

import { revalidatePath } from "next/cache";
import { sanityClient } from "@/lib/sanity";
import slugify from "slugify";
import { nanoid } from "nanoid";

export async function createPost(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const author = formData.get("author") as string;
    const contentText = formData.get("content") as string;
    const coverImageFile = formData.get("coverImage") as File | null; // ✅ Ensure it's a File

    if (!title || !author || !contentText) {
      throw new Error("Missing required fields: title, author, or content.");
    }

    let coverImageRef = null;

    if (coverImageFile) {
      // ✅ Upload image to Sanity before saving post
      const imageUpload = await sanityClient.assets.upload(
        "image",
        coverImageFile
      );
      coverImageRef = {
        _type: "image",
        asset: { _type: "reference", _ref: imageUpload._id }, // ✅ Use uploaded image reference
      };
    }

    const newPost = {
      _type: "post",
      title,
      slug: { current: slugify(title, { lower: true, strict: true }) },
      author,
      content: [
        {
          _type: "block",
          _key: nanoid(),
          children: [{ _type: "span", text: contentText }],
        },
      ],
      publishedAt: new Date().toISOString(),
      coverImage: coverImageRef, // ✅ Store image reference, not a direct file
    };

    // ✅ Create post in Sanity
    const createdPost = await sanityClient.create(newPost);

    // ✅ Revalidate `/blogs` page
    revalidatePath("/blogs");

    return createdPost;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating post:", error.message); // ✅ Log only the message
      throw new Error(`Failed to create post: ${error.message}`);
    } else {
      console.error("Unexpected error:", error); // ✅ Log unknown errors
      throw new Error("Failed to create post: An unknown error occurred.");
    }
  }
}
