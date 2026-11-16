import React from "react";
import Image from "next/image";

interface QscLogoProps {
  className?: string;
  variant?: "default" | "gold" | "monochrome-white" | "monochrome-dark";
  showText?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  isArabic?: boolean;
}

export function QscLogo({
  className = "",
  showText = false,
  size = "md",
  isArabic = false,
}: QscLogoProps) {
  const sizeMap = {
    sm: { width: 34, height: 46 },
    md: { width: 44, height: 60 },
    lg: { width: 62, height: 85 },
    xl: { width: 88, height: 120 },
  };

  const { width, height } = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div className="relative flex-shrink-0" style={{ width, height }}>
        <Image
          src="/QSC-Emblem-RGB.svg"
          alt="Qatar Sports Club Official Emblem"
          width={width}
          height={height}
          priority
          className="object-contain drop-shadow-sm transition-transform duration-300 hover:scale-105"
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-widest text-qsc-yellow font-bold font-sans">
            {isArabic ? "دولة قطر" : "State of Qatar"}
          </span>
          <span className="text-base md:text-lg font-black tracking-tight text-white leading-tight">
            {isArabic ? "نادي قطر الرياضي" : "Qatar Sports Club"}
          </span>
          <span className="text-[10px] tracking-wider text-neutral-400 font-medium uppercase">
            {isArabic ? "الملك — تأسس ١٩٥٩" : "The Kings — Est. 1959"}
          </span>
        </div>
      )}
    </div>
  );
}
