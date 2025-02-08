// import React from "react";
// import { Post } from "@/types/Post";
// import { fetchPosts } from "@/lib/fetchPosts";
// import { ArrowRight, PenLine } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";
// import moment from "moment";

// const getExcerpt = (content: any[], length = 100): string => {
//   if (!content || !Array.isArray(content)) return "No content available.";

//   // Extract text from Portable Text blocks
//   const plainText = content
//     .map((block) =>
//       block.children
//         ? block.children.map((child: { text: string }) => child.text).join(" ")
//         : ""
//     )
//     .join(" ");

//   // Return truncated text as excerpt
//   return plainText.length > length
//     ? plainText.slice(0, length) + "..."
//     : plainText;
// };

// export default async function BlogList() {
//   const posts: Post[] = await fetchPosts();

//   return (
//     <>
//       <div className="max-w-[1200px] m-auto grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
//         {posts.map((blog) => {
//           // Ensure `coverImage` is always a string
//           const imageUrl =
//             typeof blog.coverImage === "string"
//               ? blog.coverImage // If it's already a string, use it
//               : blog.coverImage?.asset?.url || "/fallback-image.jpg"; // Extract URL if it's an object

//           return (
//             <div
//               key={blog._id}
//               className="bg-white rounded-md shadow-md w-full p-4"
//             >
//               <Link
//                 href={`/blog/${blog.slug.current}`}
//                 className="group flex gap-4 w-full"
//               >
//                 {/* Image Wrapper - Centered */}
//                 <div className="w-1/2 aspect-square overflow-hidden">
//                   <Image
//                     src={imageUrl}
//                     width={500}
//                     height={200}
//                     alt={blog.title}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform"
//                   />
//                 </div>

//                 {/* Blog Content - Centered */}
//                 <div className="w-1/2">
//                   <p className="text-gray-700 text-md">
//                     {moment(blog.publishedAt).format("DD/MM/YYYY")}
//                   </p>
//                   <h2 className="text-3xl font-bold mt-4">{blog.title}</h2>
//                   <p className="text-gray-500 text-lg">By {blog.author}</p>
//                   <p className="text-gray-700 text-2xl mt-4">
//                     {getExcerpt(blog.content, 120)}
//                   </p>
//                   <button className="text-xl text-[#111] mt-12 rounded-sm flex items-center gap-1 px-6 py-3 bg-gray-100">
//                     Read More <ArrowRight size={15} />
//                   </button>
//                 </div>
//               </Link>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// }
