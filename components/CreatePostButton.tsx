"use client";

import { PenLine } from "lucide-react";
import { useModal } from "@/context/ModalContext";

const CreatePostButton = () => {
  const { openModal } = useModal(); // Use modal context

  return (
    <div
      onClick={openModal} // Open modal via context
      className="flex flex-col items-center justify-center w-24 h-24 bg-[#111] rounded-full 
      cursor-pointer hover:bg-[#333] transition-all duration-150 absolute top-12 right-12"
    >
      <PenLine color="white" size={21} />
      <p className="text-lg text-white">Create</p>
    </div>
  );
};

export default CreatePostButton;
