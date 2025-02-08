"use client";

import { useModal } from "@/context/ModalContext";
import { X } from "lucide-react";
import { useRef } from "react";

export default function CreatePostModal({
  onSubmit,
}: {
  onSubmit: (formData: FormData) => void;
}) {
  const { isOpen, closeModal } = useModal();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  if (!isOpen) return null;

  // ✅ Auto-adjust height when typing
  const handleInput = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto"; // Reset height
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`; // Adjust to content
    }
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSubmit(formData);
    closeModal();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-2/3 h-2/3 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[3rem] font-bold">Create a New Post</h2>
          <button onClick={closeModal}>
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 text-[16px] flex-grow flex flex-col"
        >
          <input
            name="title"
            type="text"
            placeholder="Title"
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
          <input
            name="author"
            type="text"
            placeholder="Author"
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
          {/* ✅ Auto-resizing textarea */}
          <input
            type="file"
            name="coverImage"
            accept="image/*"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />

          <textarea
            ref={textAreaRef}
            name="content"
            placeholder="Content"
            className="w-full p-3 border border-gray-300 rounded-md resize-none overflow-hidden flex-grow min-h-[100px]"
            rows={1}
            onInput={handleInput}
            required
          />
          <button
            type="submit"
            className="bg-[#111] text-white py-4 px-8 rounded-md text-[16px] hover:bg-[#333] transition-all duration-150 w-fit"
          >
            Submit Post
          </button>
        </form>
      </div>
    </div>
  );
}
