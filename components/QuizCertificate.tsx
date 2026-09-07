"use client";

import React, { useState } from "react";
import { Download, Award, CheckCircle2, Loader2 } from "lucide-react";

interface QuizCertificateProps {
  studentName: string;
  roleName?: string; // e.g. "AI/ML Intern", "Frontend Engineer", "Full Stack Intern"
  assessmentTitle?: string;
  certId?: string;
}

export default function QuizCertificate({
  studentName,
  roleName = "AI/ML Intern",
  assessmentTitle = "UPFORGE TECHNICAL ASSESSMENT",
  certId = `UF-${new Date().getFullYear()}-0108`,
}: QuizCertificateProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAndDownloadCertificate = async () => {
    setIsGenerating(true);
    try {
      const canvas = document.createElement("canvas");
      // Ultra-crisp print & retina 2x scaling (A4 Landscape: 1123 x 794)
      const scale = 2;
      const width = 1123 * scale;
      const height = 794 * scale;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // 1. Clean Premium Background
      ctx.fillStyle = "#FAFBFD";
      ctx.fillRect(0, 0, width, height);

      // Subtle Soft Center Glow
      const radialGlow = ctx.createRadialGradient(
        width / 2,
        height / 2,
        100 * scale,
        width / 2,
        height / 2,
        600 * scale
      );
      radialGlow.addColorStop(0, "rgba(238, 244, 255, 0.7)");
      radialGlow.addColorStop(1, "#FAFBFD");
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // 2. Luxury Modern Double Border
      ctx.strokeStyle = "#0F172A"; // Slate 900
      ctx.lineWidth = 5 * scale;
      ctx.strokeRect(32 * scale, 32 * scale, width - 64 * scale, height - 64 * scale);

      ctx.strokeStyle = "#D97706"; // Rich Gold Border
      ctx.lineWidth = 1.5 * scale;
      ctx.strokeRect(40 * scale, 40 * scale, width - 80 * scale, height - 80 * scale);

      // Corner Accents
      const drawCornerDot = (x: number, y: number) => {
        ctx.fillStyle = "#D97706";
        ctx.beginPath();
        ctx.arc(x, y, 4 * scale, 0, Math.PI * 2);
        ctx.fill();
      };
      drawCornerDot(50 * scale, 50 * scale);
      drawCornerDot(width - 50 * scale, 50 * scale);
      drawCornerDot(50 * scale, height - 50 * scale);
      drawCornerDot(width - 50 * scale, height - 50 * scale);

      // 3. Company Logo (/logo.jpg)
      try {
        const logoImg = new Image();
        logoImg.crossOrigin = "anonymous";
        logoImg.src = "/logo.jpg";
        await new Promise<void>((resolve) => {
          logoImg.onload = () => resolve();
          logoImg.onerror = () => resolve();
        });

        if (logoImg.complete && logoImg.naturalWidth !== 0) {
          const logoW = 130 * scale;
          const logoH = (logoImg.naturalHeight / logoImg.naturalWidth) * logoW;
          ctx.drawImage(logoImg, width / 2 - logoW / 2, 55 * scale, logoW, logoH);
        } else {
          ctx.fillStyle = "#0F172A";
          ctx.font = `bold ${26 * scale}px system-ui, -apple-system, sans-serif`;
          ctx.textAlign = "center";
          ctx.fillText("UPFORGE", width / 2, 85 * scale);
        }
      } catch {
        ctx.fillStyle = "#0F172A";
        ctx.font = `bold ${26 * scale}px system-ui, -apple-system, sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText("UPFORGE", width / 2, 85 * scale);
      }

      // 4. Header Titles & Category
      ctx.textAlign = "center";
      ctx.fillStyle = "#D97706";
      ctx.font = `600 ${11 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.letterSpacing = `${3 * scale}px`;
      ctx.fillText("UPFORGE GLOBAL FOUNDERS NETWORK", width / 2, 145 * scale);

      ctx.fillStyle = "#0F172A";
      ctx.font = `bold ${28 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.letterSpacing = `${1 * scale}px`;
      ctx.fillText("CERTIFICATE OF QUALIFICATION", width / 2, 185 * scale);

      // Horizontal subtle accent line
      ctx.strokeStyle = "#E2E8F0";
      ctx.lineWidth = 1 * scale;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 180 * scale, 202 * scale);
      ctx.lineTo(width / 2 + 180 * scale, 202 * scale);
      ctx.stroke();

      // 5. Presentational Sub-text
      ctx.fillStyle = "#475569";
      ctx.font = `500 ${11 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.letterSpacing = `${2 * scale}px`;
      ctx.fillText("WE PROUDLY PRESENT THIS TO", width / 2, 230 * scale);

      // 6. Student Candidate Name (Bold Luxury Serif Look)
      ctx.fillStyle = "#0F172A";
      ctx.font = `bold ${36 * scale}px "Times New Roman", Times, serif`;
      ctx.letterSpacing = "normal";
      ctx.fillText(studentName || "Candidate Name", width / 2, 280 * scale);

      // Name underline
      ctx.strokeStyle = "#F59E0B";
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 140 * scale, 292 * scale);
      ctx.lineTo(width / 2 + 140 * scale, 292 * scale);
      ctx.stroke();

      // 7. Assessment Qualification Text
      ctx.fillStyle = "#334155";
      ctx.font = `400 ${12 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.letterSpacing = "normal";

      const line1 = `FOR SUCCESSFULLY QUALIFYING IN THE ${assessmentTitle.toUpperCase()},`;
      const line2 = `CONDUCTED THROUGH THE INTERNADDA ASSESSMENT PLATFORM.`;
      ctx.fillText(line1, width / 2, 330 * scale);
      ctx.fillText(line2, width / 2, 348 * scale);

      // 8. Qualified Badge / Pill
      const badgeW = 200 * scale;
      const badgeH = 32 * scale;
      const badgeX = width / 2 - badgeW / 2;
      const badgeY = 375 * scale;

      ctx.fillStyle = "#F0FDF4";
      ctx.strokeStyle = "#86EFAC";
      ctx.lineWidth = 1.2 * scale;
      ctx.beginPath();
      ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 16 * scale);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#15803D";
      ctx.font = `bold ${11 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.fillText(`QUALIFIED ★ ${roleName.toUpperCase()}`, width / 2, badgeY + 20 * scale);

      // 9. Footer Section (Issuance Date, Verification URL, Director Signature)
      const footerY = height - 100 * scale;

      // Date Calculation (Current dynamic date)
      const now = new Date();
      const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"];
      const formattedDate = `${monthNames[now.getMonth()]} ${String(now.getDate()).padStart(2, "0")}, ${now.getFullYear()}`;

      // Left: Date
      ctx.textAlign = "left";
      ctx.fillStyle = "#64748B";
      ctx.font = `600 ${9 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.fillText("DATE OF ISSUANCE", 70 * scale, footerY);
      ctx.fillStyle = "#0F172A";
      ctx.font = `bold ${13 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.fillText(formattedDate, 70 * scale, footerY + 20 * scale);
      ctx.fillStyle = "#94A3B8";
      ctx.font = `400 ${8.5 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.fillText("Certified Registry Record", 70 * scale, footerY + 34 * scale);

      // Center: Verification Link & ID
      ctx.textAlign = "center";
      ctx.fillStyle = "#64748B";
      ctx.font = `600 ${9 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.fillText("CREDENTIAL VERIFICATION", width / 2, footerY);

      const verifyUrl = `https://verify.upforge.org/${certId}`;
      ctx.fillStyle = "#0284C7";
      ctx.font = `bold ${10.5 * scale}px monospace`;
      ctx.fillText(verifyUrl, width / 2, footerY + 20 * scale);

      ctx.fillStyle = "#64748B";
      ctx.font = `500 ${8.5 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.fillText(`Verify ID: ${certId}`, width / 2, footerY + 34 * scale);

      // Right: Signature
      ctx.textAlign = "right";
      ctx.fillStyle = "#0F172A";
      ctx.font = `italic bold ${18 * scale}px "Brush Script MT", cursive, serif`;
      ctx.fillText("Lucky Tiwari", width - 70 * scale, footerY + 6 * scale);

      ctx.strokeStyle = "#CBD5E1";
      ctx.lineWidth = 1.2 * scale;
      ctx.beginPath();
      ctx.moveTo(width - 210 * scale, footerY + 12 * scale);
      ctx.lineTo(width - 70 * scale, footerY + 12 * scale);
      ctx.stroke();

      ctx.fillStyle = "#0F172A";
      ctx.font = `bold ${10.5 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.fillText("Founder & Director", width - 70 * scale, footerY + 26 * scale);

      ctx.fillStyle = "#64748B";
      ctx.font = `400 ${8.5 * scale}px system-ui, -apple-system, sans-serif`;
      ctx.fillText("UpForge Global Ecosystem", width - 70 * scale, footerY + 38 * scale);

      // 10. Direct Download Trigger
      const imgData = canvas.toDataURL("image/png");
      const downloadAnchor = document.createElement("a");
      downloadAnchor.href = imgData;
      downloadAnchor.download = `${studentName.replace(/\s+/g, "_")}_UpForge_Certificate.png`;
      downloadAnchor.click();
    } catch (err) {
      console.error("Certificate generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto my-6 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm text-center">
      <div className="w-12 h-12 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
        <Award className="w-6 h-6" />
      </div>

      <h3 className="text-xl font-bold text-slate-900">Certificate of Qualification</h3>
      <p className="text-xs text-slate-500 mt-1 mb-4">
        Verified UpForge Assessment Credential
      </p>

      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-5 text-left text-xs space-y-1.5">
        <div className="flex justify-between">
          <span className="text-slate-500">Candidate:</span>
          <span className="font-semibold text-slate-800">{studentName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Role:</span>
          <span className="font-semibold text-slate-800">{roleName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Credential ID:</span>
          <span className="font-mono text-slate-700">{certId}</span>
        </div>
      </div>

      <button
        onClick={generateAndDownloadCertificate}
        disabled={isGenerating}
        className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-5 rounded-xl transition-all shadow-md active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed text-sm"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Generating Certificate...
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            Download Official Certificate
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-emerald-600 mt-3 font-medium">
        <CheckCircle2 className="w-3.5 h-3.5" />
        LinkedIn & Portfolio Ready • High-Res
      </div>
    </div>
  );
}
