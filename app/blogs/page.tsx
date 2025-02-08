"use client";

import { useEffect, useState, useOptimistic, startTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Post } from "@/types/Post";
import { createPost } from "@/app/actions/actions"; // ✅ Server action
import { fetchPosts } from "@/lib/fetchPosts";
import { ArrowRight } from "lucide-react";
import moment from "moment";
import CreatePostButton from "@/components/CreatePostButton";
import CreatePostModal from "@/components/CreatePostModal";
import slugify from "slugify"; // ✅ Slugify for generating slugs
import { nanoid } from "nanoid";
import Loading from "./loading";
import { urlForImage } from "@/lib/sanity";

const getExcerpt = (content: any[], length = 100): string => {
  if (!content || !Array.isArray(content)) return "No content available.";

  return (
    content
      .map((block) =>
        block.children
          ? block.children
              .map((child: { text: string }) => child.text)
              .join(" ")
          : ""
      )
      .join(" ")
      .slice(0, length) + "..."
  );
};

export default function Blogs() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [optimisticPosts, setOptimisticPosts] = useOptimistic<Post[]>([]);

  // ✅ Fetch posts on mount
  useEffect(() => {
    async function loadPosts() {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
      setLoading(false);
    }
    loadPosts();
  }, []);

  // ✅ Handle post creation with optimistic updates
  async function handleCreatePost(formData: FormData) {
    const title = formData.get("title") as string;
    const author = formData.get("author") as string;
    const contentText = formData.get("content") as string;
    const coverImageFile = formData.get("coverImage") as File | null;

    // ✅ Generate a unique temporary ID for optimistic UI
    const optimisticId = nanoid();

    // ✅ Optimistic UI Post
    const newPost: Post = {
      _id: optimisticId,
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
      coverImage: coverImageFile
        ? { _type: "image", asset: { _ref: "" } } // Placeholder for optimistic UI
        : undefined,
    };

    // ✅ Optimistic update inside `startTransition`
    startTransition(() => {
      setOptimisticPosts((prev) => {
        const existingIds = new Set(prev.map((post) => post._id));
        return existingIds.has(newPost._id) ? prev : [newPost, ...prev];
      });
    });

    try {
      // ✅ Create post on the server (actual Sanity API call)
      const createdPost = await createPost(formData);

      // ✅ Fetch updated posts and remove the optimistic duplicate
      const updatedPosts = await fetchPosts();
      startTransition(() => {
        setOptimisticPosts((prev) => {
          // ✅ Prevent duplicate optimistic entries
          return prev.some((post) => post._id === optimisticId)
            ? prev
            : [newPost, ...prev];
        });
      });
    } catch (error) {
      console.error("Failed to create post:", error);
      // ✅ Rollback: Remove optimistic post on failure
      startTransition(() => {
        setOptimisticPosts((prev) =>
          prev.filter((post) => post._id !== optimisticId)
        );
      });
    }
  }

  return (
    <main className="min-h-screen w-full bg-gray-100 pt-36 relative">
      <CreatePostButton />
      <CreatePostModal onSubmit={handleCreatePost} />

      <div className="max-w-[1200px] m-auto grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
        {loading ? (
          <Loading />
        ) : (
          [...optimisticPosts, ...posts].map((blog) => {
            // ✅ Properly handle `coverImage`
            const imageUrl =
              typeof blog.coverImage === "string"
                ? blog.coverImage // ✅ Already a URL
                : blog.coverImage && blog.coverImage.asset?._ref
                ? urlForImage(blog.coverImage) // ✅ Generate Sanity Image URL
                : "/images/fallback-image.jpg";

            console.log(blog.coverImage);

            return (
              <div
                key={blog._id}
                className="bg-white rounded-md shadow-md w-full p-4"
              >
                <Link
                  href={`/blog/${blog.slug.current}`}
                  className="group flex gap-4 w-full"
                >
                  <div className="w-1/2 aspect-square overflow-hidden">
                    <Image
                      src={imageUrl}
                      width={500}
                      height={200}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="w-1/2">
                    <p className="text-gray-700 text-md">
                      {moment(blog.publishedAt).fromNow()}
                    </p>
                    <h2 className="text-3xl font-bold mt-4">{blog.title}</h2>
                    <p className="text-gray-500 text-lg">By {blog.author}</p>
                    <p className="text-gray-700 text-2xl mt-4">
                      {getExcerpt(blog.content, 120)}
                    </p>
                    <button className="text-xl text-[#111] mt-12 rounded-sm flex items-center gap-1 px-6 py-3 bg-gray-100">
                      Read More <ArrowRight size={15} />
                    </button>
                  </div>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}
