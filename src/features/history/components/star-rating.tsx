"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils"; // Hàm merge class của shadcn

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  max?: number;
  size?: "sm" | "md" | "lg";
  readOnly?: boolean;
}

export function StarRating({ 
  value, 
  onChange, 
  max = 5, 
  size = "md",
  readOnly = false 
}: StarRatingProps) {
  
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-10 h-10",    
  };

  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, index) => {
        const starValue = index + 1;
        const isActive = starValue <= value;

        return (
          <button
            key={index}
            type="button"
            disabled={readOnly}
            onClick={() => !readOnly && onChange?.(starValue)}
            className={cn(
              "transition-colors focus:outline-none",
              readOnly ? "cursor-default" : "cursor-pointer hover:scale-110",
              isActive ? "text-orange-500 fill-orange-500" : "text-gray-300 fill-gray-100"
            )}
          >
            <Star className={sizeClasses[size]} />
          </button>
        );
      })}
    </div>
  );
}