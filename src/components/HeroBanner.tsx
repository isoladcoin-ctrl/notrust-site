// src/components/HeroBanner.tsx
"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Upload, ImageIcon, X } from "lucide-react";

type HeroBannerProps = {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  /** Hosted image path (e.g. /media/hero-roadmap.jpg). */
  imageUrl?: string;
  /** Extra classes on the outer Card. */
  className?: string;
  /** Show upload controls/drag-drop (default true). */
  allowUpload?: boolean;
};

export default function HeroBanner({
  title = "NOTRUST",
  subtitle = "Utility-first. Meme-proof.",
  ctaText = "Join the Cult",
  onCtaClick,
  imageUrl,
  className = "",
  allowUpload = true,
}: HeroBannerProps) {
  // Local preview (only used when allowUpload = true)
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const src = useMemo(() => preview || imageUrl || "", [preview, imageUrl]);

  const chooseFile = useCallback(() => {
    if (!allowUpload) return;
    fileInputRef.current?.click();
  }, [allowUpload]);

  const handleFile = useCallback((file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(String(reader.result || ""));
    };
    reader.readAsDataURL(file);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      if (!allowUpload) return;
      e.preventDefault();
      const file = e.dataTransfer?.files?.[0];
      if (file) handleFile(file);
    },
    [allowUpload, handleFile]
  );

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    if (!allowUpload) return;
    e.preventDefault();
  }, [allowUpload]);

  const clearPreview = () => setPreview(null);

  return (
    <Card
      className={`rounded-3xl overflow-hidden border border-zinc-800 bg-gradient-to-r from-zinc-950 to-zinc-900 ${className}`}
    >
      <CardContent className="p-0">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-px"
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          {/* Left: copy + actions */}
          <div className="p-8 sm:p-12 flex flex-col justify-center">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-3 text-zinc-400 max-w-prose">{subtitle}</p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {ctaText && (
                <Button size="lg" className="rounded-2xl" onClick={onCtaClick}>
                  {ctaText}
                </Button>
              )}

              {allowUpload && (
                <>
                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-2xl"
                    onClick={chooseFile}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload banner
                  </Button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFile(e.target.files?.[0])}
                  />
                </>
              )}
            </div>

            {allowUpload && (
              <p className="mt-3 text-xs text-zinc-500">
                Local uploads are preview-only (not saved). For production, pass a
                hosted <code>imageUrl</code> (e.g. <code>/media/hero.jpg</code>).
              </p>
            )}
          </div>

          {/* Right: image panel */}
          <div className="relative min-h-[260px] lg:min-h-[360px] bg-zinc-950">
            {/* Image when provided (preview or url) */}
            {src ? (
              <>
                <Image
                  src={src}
                  alt={title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {allowUpload && preview && (
                  <button
                    type="button"
                    onClick={clearPreview}
                    className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-xl bg-zinc-900/70 px-3 py-1.5 text-xs text-zinc-200 backdrop-blur border border-zinc-800 hover:bg-zinc-800"
                    title="Remove preview"
                  >
                    <X className="h-3.5 w-3.5" />
                    Clear
                  </button>
                )}
              </>
            ) : allowUpload ? (
              // Drop helper (only when uploads are enabled and no image yet)
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-zinc-400">
                <ImageIcon className="h-8 w-8" />
                <p className="text-sm">Drop an image here or click “Upload banner”.</p>
              </div>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
