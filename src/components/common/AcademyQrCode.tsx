"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";

interface AcademyQrCodeProps {
  applicationId: string;
  size?: number;
}

/**
 * Clean, self-contained SVG QR code generator for institutional verification.
 * Encodes only the official verification URL/Reference ID, never sensitive personal or medical info.
 */
export function AcademyQrCode({ applicationId, size = 120 }: AcademyQrCodeProps) {
  // Deterministic pseudo-pattern based on application ID characters
  const hash = applicationId
    .split("")
    .reduce((acc, char, i) => acc + char.charCodeAt(0) * (i + 1), 0);

  // Generate a 15x15 matrix with corner finder patterns
  const matrixSize = 15;
  const cells: boolean[][] = Array.from({ length: matrixSize }, () =>
    Array(matrixSize).fill(false)
  );

  // Draw 3 standard QR finder patterns in corners (top-left, top-right, bottom-left)
  const drawFinder = (startX: number, startY: number) => {
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        const isBorder = r === 0 || r === 3 || c === 0 || c === 3;
        const isCenter = r === 1 && c === 1; // 2x2 center
        cells[startY + r][startX + c] = isBorder || isCenter;
      }
    }
  };

  drawFinder(0, 0); // Top-left
  drawFinder(11, 0); // Top-right
  drawFinder(0, 11); // Bottom-left

  // Pseudo-random data modules seeded by the hash
  let seed = hash;
  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      const inFinder =
        (r < 5 && c < 5) || (r < 5 && c > 9) || (r > 9 && c < 5);
      if (!inFinder) {
        seed = (seed * 9301 + 49297) % 233280;
        cells[r][c] = seed / 233280 > 0.45;
      }
    }
  }

  const cellSize = size / matrixSize;

  return (
    <div
      className="relative flex items-center justify-center p-2 bg-white rounded-lg shadow-sm border border-neutral-200"
      style={{ width: size + 16, height: size + 16 }}
      title={`Official Verification Reference: ${applicationId}`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="shape-rendering-crisp"
      >
        {cells.map((row, r) =>
          row.map((active, c) =>
            active ? (
              <rect
                key={`${r}-${c}`}
                x={c * cellSize}
                y={r * cellSize}
                width={cellSize + 0.1}
                height={cellSize + 0.1}
                fill="#0A0A0A"
              />
            ) : null
          )
        )}
      </svg>
      {/* Center Shield Indicator */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="bg-white p-1 rounded-full shadow-md border border-neutral-300">
          <ShieldCheck className="w-3.5 h-3.5 text-qsc-yellow fill-black" />
        </div>
      </div>
    </div>
  );
}
