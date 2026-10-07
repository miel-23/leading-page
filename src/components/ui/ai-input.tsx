"use client";

import React, { useState } from "react";
import { CornerRightUp, Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useAutoResizeTextarea } from "@/components/hooks/use-auto-resize-textarea";

export interface AIInputProps {
  id?: string;
  placeholder?: string;
  minHeight?: number;
  maxHeight?: number;
  onSubmit?: (value: string) => void;
  className?: string;
}

export function AIInput({
  id = "ai-input",
  placeholder = "Type your message...",
  minHeight = 52,
  maxHeight = 200,
  onSubmit,
  className,
}: AIInputProps) {
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight,
    maxHeight,
  });
  const [inputValue, setInputValue] = useState("");

  const handleReset = () => {
    if (!inputValue.trim()) return;
    onSubmit?.(inputValue);
    setInputValue("");
    adjustHeight(true);
  };

  return (
    <div className={cn("w-full py-2", className)}>
      <div className="relative w-full mx-auto">
        <Textarea
          id={id}
          placeholder={placeholder}
          className={cn(
            "w-full bg-white/5 dark:bg-white/5 rounded-2xl pl-5 pr-14 text-sm",
            "placeholder:text-white/40",
            "border border-white/10 ring-0",
            "text-white text-wrap",
            "overflow-y-auto resize-none",
            "focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary/50",
            "transition-[height] duration-100 ease-out",
            "leading-relaxed py-3.5",
            "[&::-webkit-resizer]:hidden"
          )}
          style={{ minHeight: `${minHeight}px`, maxHeight: `${maxHeight}px` }}
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            adjustHeight();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleReset();
            }
          }}
        />

        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 rounded-lg bg-white/5 py-1 px-1 transition-all duration-200",
            inputValue ? "right-10" : "right-3"
          )}
        >
          <Mic className="w-4 h-4 text-white/60 hover:text-white cursor-pointer" />
        </div>

        <button
          onClick={handleReset}
          type="button"
          aria-label="Send message"
          className={cn(
            "absolute top-1/2 -translate-y-1/2 right-3",
            "rounded-lg bg-primary text-neutral-950 p-1.5",
            "transition-all duration-200 cursor-pointer shadow-sm hover:scale-105 active:scale-95",
            inputValue
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          )}
        >
          <CornerRightUp className="w-3.5 h-3.5 text-neutral-950 font-bold" />
        </button>
      </div>
    </div>
  );
}
