// import Image from "next/image";
// import Link from "next/link";
// import { fetchPosts } from "@/lib/fetchPosts";
// import moment from "moment";
// import { ArrowRight } from "lucide-react";

// const getExcerpt = (content: any[], length = 100): string => {
//   if (!content || !Array.isArray(content)) return "No content available.";
//   return (
//     content
//       .map((block) => block.children?.map((child: any) => child.text).join(" "))
//       .join(" ")
//       .slice(0, length) + "..."
//   );
// };

// export default async function BlogList({ optimisticPosts = [] }) {
//   const posts = await fetchPosts();
//   const allPosts = [...optimisticPosts, ...posts]; // ✅ Merge optimistic & fetched posts

//   return (
//     <div className="max-w-[1200px] m-auto grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
//       {allPosts.length === 0 ? (
//         <p className="text-center text-gray-500">No posts available.</p>
//       ) : (
//         allPosts.map((blog) => {
//           const imageUrl = blog.coverImage || "/fallback-image.jpg";
//           return (
//             <div
//               key={blog._id}
//               className="bg-white rounded-md shadow-md w-full p-4 opacity-80"
//             >
//               <Link
//                 href={`/blog/${blog.slug?.current || "#"}`}
//                 className="group flex gap-4 w-full"
//               >
//                 <div className="w-1/2 aspect-square overflow-hidden">
//                   <Image
//                     src={imageUrl}
//                     width={500}
//                     height={200}
//                     alt={blog.title}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform"
//                   />
//                 </div>
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
//         })
//       )}
//     </div>
//   );
// }
