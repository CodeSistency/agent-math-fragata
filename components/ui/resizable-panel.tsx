"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ResizablePanelProps {
  children: React.ReactNode;
  minWidth?: number;
  maxWidth?: number | string;
  defaultWidth?: number;
  onResize?: (width: number) => void;
  className?: string;
}

export function ResizablePanel({
  children,
  minWidth = 300,
  maxWidth = "80%",
  defaultWidth = 50,
  onResize,
  className,
}: ResizablePanelProps) {
  const [width, setWidth] = useState(defaultWidth);
  const [isResizing, setIsResizing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number>(0);
  const startWidthRef = useRef<number>(0);

  // Load saved width from localStorage
  useEffect(() => {
    const savedWidth = localStorage.getItem("resizable-panel-width");
    if (savedWidth) {
      const parsed = parseFloat(savedWidth);
      if (!isNaN(parsed) && parsed >= minWidth) {
        setWidth(parsed);
      }
    } else {
      // Use defaultWidth if no saved width
      setWidth(defaultWidth);
    }
  }, [minWidth, defaultWidth]);

  // Calculate max width in pixels
  const getMaxWidthPx = useCallback(() => {
    if (typeof maxWidth === "string" && maxWidth.endsWith("%")) {
      const percent = parseFloat(maxWidth);
      return (window.innerWidth * percent) / 100;
    }
    return typeof maxWidth === "number" ? maxWidth : window.innerWidth * 0.8;
  }, [maxWidth]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const deltaX = startXRef.current - e.clientX; // Inverted because we're resizing from right
    const newWidth = startWidthRef.current + deltaX;
    const maxWidthPx = getMaxWidthPx();
    
    const clampedWidth = Math.max(minWidth, Math.min(newWidth, maxWidthPx));
    setWidth(clampedWidth);
    
    if (onResize) {
      onResize(clampedWidth);
    }
  }, [minWidth, getMaxWidthPx, onResize]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    startXRef.current = e.clientX;
    startWidthRef.current = width;
  }, [width]);

  useEffect(() => {
    if (!isResizing) return;

    const moveHandler = (e: MouseEvent) => handleMouseMove(e);
    const upHandler = () => {
      setIsResizing(false);
      // Save current width when mouse up
      const currentWidth = panelRef.current?.offsetWidth || width;
      localStorage.setItem("resizable-panel-width", currentWidth.toString());
    };

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", upHandler);

    return () => {
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", upHandler);
    };
  }, [isResizing, width, handleMouseMove]);


  return (
    <>
      {/* Resizer Handle */}
      <div
        className={cn(
          "w-1 bg-zinc-200 dark:bg-zinc-800 cursor-col-resize hover:bg-blue-500 dark:hover:bg-blue-600 transition-colors flex-shrink-0",
          isResizing && "bg-blue-500 dark:bg-blue-600"
        )}
        onMouseDown={handleMouseDown}
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize panel"
      />
      
      {/* Panel Content */}
      <div
        ref={panelRef}
        className={cn(
          "flex-shrink-0 transition-all duration-300 ease-out bg-white dark:bg-zinc-900 overflow-hidden",
          className
        )}
        style={{ width: `${width}px` }}
      >
        {children}
      </div>
    </>
  );
}

