"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Home, BarChart3, Users, FileText, Bell } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  { id: "dashboard", label: "대시보드", icon: Home, href: "/" },
  { id: "analytics", label: "분석", icon: BarChart3, href: "/analytics" },
  { id: "reports", label: "보고서", icon: FileText, href: "/reports" },
  { id: "users", label: "사용자", icon: Users, href: "/users" },
  { id: "notifications", label: "알림", icon: Bell, href: "/notifications" }
];

export default function NavigationDrawer({
  isOpen,
  onClose
}: NavigationDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleOverlayClick}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-background border-r border-border shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            메뉴
          </h2>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={handleClose}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label="메뉴 닫기"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="flex items-center px-4 py-3 text-foreground rounded-lg hover:bg-accent transition-colors group"
                    onClick={handleClose}
                  >
                    <Icon className="w-5 h-5 mr-3 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-semibold">H</span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                HanaLoop
              </p>
              <p className="text-xs text-muted-foreground">
                Frontend Assignment
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
