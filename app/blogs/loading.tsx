export default function Loading() {
  return (
    <div className="flex items-center justify-center h-40">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
      <p className="ml-3 text-gray-500 text-lg">Loading posts...</p>
    </div>
  );
}
