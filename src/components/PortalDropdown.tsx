"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

type PortalDropdownProps = {
  open: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement | null>;
  children: ReactNode;
  align?: "left" | "right";
};

export default function PortalDropdown({ open, onClose, anchorRef, children, align = "left" }: PortalDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  // Calculate position from anchor
  useEffect(() => {
    if (!open || !anchorRef.current) return;

    function updatePos() {
      if (!anchorRef.current) return;
      const rect = anchorRef.current.getBoundingClientRect();
      const dropdownWidth = dropdownRef.current?.offsetWidth || 140;
      let left = align === "right" ? rect.right - dropdownWidth : rect.left;

      // Clamp within viewport with 8px padding
      left = Math.max(8, Math.min(left, window.innerWidth - dropdownWidth - 8));

      // If dropdown would go below viewport, show above anchor
      const spaceBelow = window.innerHeight - rect.bottom - 6;
      const dropdownHeight = dropdownRef.current?.offsetHeight || 200;
      const top = spaceBelow < dropdownHeight && rect.top > dropdownHeight
        ? rect.top - dropdownHeight - 6
        : rect.bottom + 6;

      setPos({ top, left });
    }

    updatePos();
    window.addEventListener("scroll", updatePos, true);
    window.addEventListener("resize", updatePos);
    return () => {
      window.removeEventListener("scroll", updatePos, true);
      window.removeEventListener("resize", updatePos);
    };
  }, [open, anchorRef, align]);

  // Outside click
  useEffect(() => {
    if (!open) return;

    function handleMouseDown(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [open, onClose, anchorRef]);

  if (!open) return null;

  return createPortal(
    <div
      ref={dropdownRef}
      className="option-dropdown min-w-35 py-1 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1a1a22] shadow-xl shadow-black/10 dark:shadow-black/40 backdrop-blur-xl"
      style={{
        position: "fixed",
        top: pos.top,
        left: pos.left,
        zIndex: 99999,
        maxHeight: "60vh",
        overflowY: "auto",
      }}
    >
      {children}
    </div>,
    document.body
  );
}
