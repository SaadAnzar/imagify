"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export function ComparisonSlider({
  beforeImage,
  afterImage,
  beforeAlt,
  afterAlt,
  title,
}: {
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
  title?: string;
}) {
  const [isResizing, setIsResizing] = useState(false);
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseUp = () => setIsResizing(false);

    const handleMove = (event: MouseEvent | TouchEvent) => {
      if (!isResizing || !containerRef.current) return;

      event.preventDefault();
      const rect = containerRef.current.getBoundingClientRect();
      const x = "touches" in event ? event.touches[0].clientX : event.clientX;
      const position = ((x - rect.left) / rect.width) * 100;

      requestAnimationFrame(() => {
        setPosition(Math.min(Math.max(position, 0), 100));
      });
    };

    if (isResizing) {
      document.body.style.userSelect = "none";
      window.addEventListener("mousemove", handleMove, { passive: false });
      window.addEventListener("touchmove", handleMove, { passive: false });
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchend", handleMouseUp);
    } else {
      document.body.style.userSelect = "";
    }

    return () => {
      document.body.style.userSelect = "";
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isResizing]);

  return (
    <div className="space-y-1">
      <div
        ref={containerRef}
        className="relative w-full rounded-md overflow-hidden cursor-col-resize select-none aspect-square"
        onMouseDown={(e) => {
          e.preventDefault();
          setIsResizing(true);
        }}
        onTouchStart={(e) => {
          e.preventDefault();
          setIsResizing(true);
        }}
      >
        <div className="absolute inset-0 will-change-transform">
          <Image
            src={afterImage}
            alt={afterAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
            draggable={false}
          />
        </div>
        <div
          className="absolute inset-0 will-change-transform"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={beforeImage}
            alt={beforeAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
            draggable={false}
          />
        </div>
        <div className="absolute inset-y-0" style={{ left: `${position}%` }}>
          <div className="absolute inset-y-0 -ml-px w-1 bg-white/80" />
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
            <div className="text-gray-600 text-sm flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {title && (
        <p className="text-center text-gray-900 dark:text-gray-400 font-medium text-sm">
          {title}
        </p>
      )}
    </div>
  );
}
