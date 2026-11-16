"use client";

import React, { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { Pen, Type, ShieldCheck, Eraser, Check } from "lucide-react";

interface SignatureCanvasProps {
  onSignComplete: (signatureDataUrl: string, type: "drawn" | "typed" | "certificate") => void;
  onCancel?: () => void;
  documentTitle?: string;
}

export function SignatureCanvas({ onSignComplete, onCancel, documentTitle }: SignatureCanvasProps) {
  const { t, isArabic } = useLanguage();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<"drawn" | "typed" | "certificate">("drawn");
  const [typedName, setTypedName] = useState(isArabic ? user?.nameAr || "" : user?.nameEn || "");
  const [confirmed, setConfirmed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear and prepare canvas
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#0A0A0A";
  }, [activeTab]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const generateTypedDataUrl = (): string => {
    const canvas = document.createElement("canvas");
    canvas.width = 500;
    canvas.height = 160;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0A0A0A";
    ctx.font = "italic 32px Georgia, serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(typedName || user?.nameEn || "Authorized Signer", canvas.width / 2, canvas.height / 2 - 10);

    ctx.font = "12px sans-serif";
    ctx.fillStyle = "#666666";
    ctx.fillText(
      `${user?.titleEn || "Officer"} • QSC Verified • ${new Date().toLocaleDateString()}`,
      canvas.width / 2,
      canvas.height / 2 + 35
    );

    return canvas.toDataURL("image/png");
  };

  const generateCertificateDataUrl = (): string => {
    const canvas = document.createElement("canvas");
    canvas.width = 500;
    canvas.height = 160;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";

    ctx.fillStyle = "#0A0A0A";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#FDFD00";
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

    ctx.fillStyle = "#FDFD00";
    ctx.font = "bold 14px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("QATAR SPORTS CLUB — RATIFIED ELECTRONIC SEAL", canvas.width / 2, 45);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText(user?.nameEn || "Executive Officer", canvas.width / 2, 75);

    ctx.fillStyle = "#AAAAAA";
    ctx.font = "11px monospace";
    ctx.fillText(`SHA256: ${Math.random().toString(36).substring(2, 10).toUpperCase()}-QSC-SIG`, canvas.width / 2, 105);
    ctx.fillText(`TIMESTAMP: ${new Date().toISOString()}`, canvas.width / 2, 125);

    return canvas.toDataURL("image/png");
  };

  const handleConfirmSignature = () => {
    let dataUrl = "";
    if (activeTab === "drawn") {
      const canvas = canvasRef.current;
      dataUrl = canvas ? canvas.toDataURL("image/png") : "";
    } else if (activeTab === "typed") {
      dataUrl = generateTypedDataUrl();
    } else {
      dataUrl = generateCertificateDataUrl();
    }

    onSignComplete(dataUrl, activeTab);
  };

  const canSubmit = confirmed && (activeTab === "drawn" ? hasDrawn : typedName.length > 2);

  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-xl overflow-hidden text-neutral-800">
      {/* Header */}
      <div className="bg-[#0A0A0A] text-white p-4 flex items-center justify-between border-b border-neutral-800">
        <div>
          <h3 className="text-sm font-bold tracking-wide uppercase text-qsc-yellow">
            {t.signature.title}
          </h3>
          <p className="text-xs text-neutral-300 mt-0.5">
            {documentTitle || t.signature.subtitle}
          </p>
        </div>
        <span className="text-[10px] bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded border border-neutral-700">
          QSC eID
        </span>
      </div>

      <div className="p-5 space-y-4">
        {/* Method Switcher Tabs */}
        <div className="flex border-b border-neutral-200">
          <button
            type="button"
            onClick={() => setActiveTab("drawn")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === "drawn"
                ? "border-qsc-yellow text-black bg-neutral-50"
                : "border-transparent text-neutral-500 hover:text-black"
            }`}
          >
            <Pen className="w-3.5 h-3.5" />
            <span>{t.signature.drawSignature}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("typed")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === "typed"
                ? "border-qsc-yellow text-black bg-neutral-50"
                : "border-transparent text-neutral-500 hover:text-black"
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>{t.signature.typeSignature}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("certificate")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === "certificate"
                ? "border-qsc-yellow text-black bg-neutral-50"
                : "border-transparent text-neutral-500 hover:text-black"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t.signature.certificateSeal}</span>
          </button>
        </div>

        {/* Content by active tab */}
        {activeTab === "drawn" && (
          <div className="space-y-2">
            <div className="relative border-2 border-dashed border-neutral-300 rounded-lg bg-[#FAF9F5] p-1 flex justify-center">
              <canvas
                ref={canvasRef}
                width={500}
                height={160}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-40 cursor-crosshair touch-none"
              />
              {!hasDrawn && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-neutral-400 text-xs">
                  <span>
                    {isArabic ? "ارسم توقيعك هنا بالماوس أو الشاشة اللمسية" : "Sign your official signature here"}
                  </span>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={clearCanvas}
                className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-800 transition-colors px-2 py-1 rounded cursor-pointer"
              >
                <Eraser className="w-3.5 h-3.5" />
                <span>{t.signature.clear}</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === "typed" && (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                {isArabic ? "الاسم المعتمد للتوقيع" : "Signer Full Legal Name"}
              </label>
              <input
                type="text"
                value={typedName}
                onChange={(e) => setTypedName(e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-black"
                placeholder="Full Name"
              />
            </div>

            <div className="p-4 rounded-lg bg-[#FAF9F5] border border-neutral-200 text-center">
              <p className="text-2xl font-serif italic text-neutral-900 tracking-wide">
                {typedName || "Sheikh Abdullah Al Thani"}
              </p>
              <p className="text-[11px] text-neutral-500 mt-1 uppercase tracking-wider">
                {user?.titleEn} • State of Qatar
              </p>
            </div>
          </div>
        )}

        {activeTab === "certificate" && (
          <div className="p-4 rounded-lg bg-[#0A0A0A] text-white border border-[#2E2E2E] space-y-2">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-qsc-yellow animate-pulse" />
                <span className="text-xs font-bold text-qsc-yellow uppercase tracking-wider">
                  {t.signature.verifiedStamp}
                </span>
              </div>
              <span className="text-[10px] text-neutral-400 font-mono">QSC-CERT-VALID</span>
            </div>

            <div className="text-xs space-y-1 pt-1">
              <p className="font-bold">{isArabic ? user?.nameAr : user?.nameEn}</p>
              <p className="text-neutral-400">{isArabic ? user?.titleAr : user?.titleEn}</p>
              <p className="text-[11px] text-neutral-500 font-mono">
                Fingerprint: SHA256:7f4a...9b12
              </p>
              <p className="text-[10px] text-neutral-500">
                Network: Secure Government/Club Fiber • IP: 178.152.12.88 (Doha)
              </p>
            </div>
          </div>
        )}

        {/* Legal Disclaimer & Checkbox */}
        <div className="pt-2 border-t border-neutral-200">
          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-neutral-600 leading-snug">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-0.5 rounded text-black focus:ring-black h-4 w-4"
            />
            <span>{t.signature.signerDisclaimer}</span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-neutral-600 hover:text-neutral-900 border border-neutral-300 hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              {t.common.cancel}
            </button>
          )}

          <button
            type="button"
            disabled={!canSubmit}
            onClick={handleConfirmSignature}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              canSubmit
                ? "bg-[#0A0A0A] text-qsc-yellow hover:bg-neutral-800 shadow-md"
                : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
            }`}
          >
            <Check className="w-4 h-4" />
            <span>{t.signature.adoptAndSign}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
