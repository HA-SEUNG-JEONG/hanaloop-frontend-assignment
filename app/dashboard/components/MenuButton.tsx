"use client";

import { Menu } from "lucide-react";

interface MenuButtonProps {
  onClick: () => void;
  className?: string;
}

export default function MenuButton({
  onClick,
  className = ""
}: MenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 ${className}`}
      aria-label="메뉴 열기"
    >
      <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
    </button>
  );
}
