import { sanityClient } from "@/lib/sanity";
import { Post } from "@/types/Post";

export async function fetchPosts(): Promise<Post[]> {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    "author": author->name,
    publishedAt,
    content,
    "coverImage": coverImage.asset->url
  }`;

  try {
    return await sanityClient.fetch(query, {}, { cache: "no-store" });
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to fetch posts.");
  }
}
