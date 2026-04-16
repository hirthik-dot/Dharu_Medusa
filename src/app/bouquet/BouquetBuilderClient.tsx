"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { BouquetVisual } from "@/components/BouquetVisual";
import { FLOWERS, type BouquetMode, type FlowerName, getFlowerImage } from "@/lib/flowers";

const MAX_FLOWERS = 10;
const MAX_MESSAGE = 200;

export function BouquetBuilderClient() {
  const searchParams = useSearchParams();

  const mode: BouquetMode = searchParams.get("mode") === "mono" ? "mono" : "color";
  const [flowers, setFlowers] = useState<FlowerName[]>([]);
  const [message, setMessage] = useState("");
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const remaining = MAX_FLOWERS - flowers.length;

  const helperText = useMemo(() => {
    if (remaining === 0) return "Bouquet full (10/10)";
    return `${remaining} flower${remaining === 1 ? "" : "s"} left`;
  }, [remaining]);

  const addFlower = (name: FlowerName) => {
    setFlowers((prev) => (prev.length >= MAX_FLOWERS ? prev : [...prev, name]));
  };

  const removeFlower = (index: number) => {
    setFlowers((prev) => prev.filter((_, i) => i !== index));
  };

  const submitBouquet = useCallback(() => {
    if (flowers.length === 0) return;

    const params = new URLSearchParams({
      flowers: flowers.join(","),
      msg: message.trim(),
      mode: mode,
    });
    const url = `${window.location.origin}/view?${params.toString()}`;
    setShareUrl(url);
    setCopied(false);
  }, [flowers, message, mode]);

  const copyToClipboard = useCallback(async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = shareUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }, [shareUrl]);

  const whatsappUrl = shareUrl
    ? `https://wa.me/?text=${encodeURIComponent(`I sent you a bouquet 💐 ${shareUrl}`)}`
    : "";

  return (
    <>
      <main className="romantic-bg min-h-screen px-4 py-8 sm:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
          <header className="rounded-3xl border border-[#f1d9e4] bg-white/80 p-6 shadow-sm backdrop-blur">
            <h1 className="text-4xl text-[#5a3d49]">Build a bouquet</h1>
            <p className="mt-2 text-[#7d5f6d]">
              Mode: <span className="font-semibold capitalize">{mode}</span>. Pick up to ten flowers and add an optional
              note.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              <Link className="rounded-full bg-[#f7d9e7] px-4 py-1 text-[#7a3f59]" href="/bouquet?mode=color">
                Color
              </Link>
              <Link className="rounded-full bg-[#ece7ea] px-4 py-1 text-[#514752]" href="/bouquet?mode=mono">
                Black & White
              </Link>
            </div>
          </header>

          <section className="grid gap-6 lg:grid-cols-[1fr_420px]">
            <div className="flex flex-col gap-6">
              {/* Flower picker */}
              <div className="rounded-3xl border border-[#f1d9e4] bg-white/85 p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl text-[#5a3d49]">Choose flowers</h2>
                  <p className="text-sm text-[#8b6778]">{helperText}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {FLOWERS.map((flower) => (
                    <button
                      key={flower.name}
                      type="button"
                      onClick={() => addFlower(flower.name)}
                      disabled={flowers.length >= MAX_FLOWERS}
                      className="group rounded-2xl border border-[#f1d9e4] bg-white p-3 text-left shadow-sm transition hover:-translate-y-1 hover:border-[#eaa9c4] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          src={getFlowerImage(flower.name, mode)}
                          alt={flower.label}
                          width={42}
                          height={42}
                          className="rounded-xl bg-[#fff5f8] p-1"
                        />
                        <span className="text-lg">{flower.emoji}</span>
                      </div>
                      <p className="mt-2 text-sm font-semibold text-[#5a3d49]">{flower.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Message field — prominent placement */}
              <div className="rounded-3xl border border-[#f1d9e4] bg-white/85 p-5 shadow-sm">
                <h2 className="text-2xl text-[#5a3d49]">Your message 💌</h2>
                <p className="mt-1 text-sm text-[#8b6778]">
                  Say what&apos;s in your heart — they&apos;ll see this with the bouquet.
                </p>
                <textarea
                  id="message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value.slice(0, MAX_MESSAGE))}
                  maxLength={MAX_MESSAGE}
                  rows={5}
                  className="mt-4 w-full rounded-2xl border-2 border-[#f3c4d8] bg-[#fffafc] px-5 py-4 text-base italic text-[#5a3d49] outline-none transition placeholder:text-[#c9a0b3] focus:border-[#d987ab] focus:shadow-[0_0_0_3px_rgba(216,104,149,0.12)]"
                  style={{ fontFamily: "var(--font-body)" }}
                  placeholder="Write your heart out... 💌"
                />
                <p className="mt-2 text-right text-sm text-[#977684]">
                  <span className={message.length >= MAX_MESSAGE ? "font-semibold text-[#d86895]" : ""}>
                    {message.length}
                  </span>{" "}
                  / {MAX_MESSAGE}
                </p>
              </div>
            </div>

            {/* Preview + send */}
            <div className="rounded-3xl border border-[#f1d9e4] bg-white/90 p-5 shadow-sm">
              <h2 className="text-2xl text-[#5a3d49]">Live preview</h2>
              <p className="mt-1 text-sm text-[#8b6778]">Tap a flower below to remove it from your bouquet.</p>
              <BouquetVisual flowers={flowers} mode={mode} className="mt-4" />

              <div className="mt-3 flex flex-wrap gap-2">
                {flowers.map((flower, index) => (
                  <button
                    type="button"
                    key={`${flower}-${index}`}
                    onClick={() => removeFlower(index)}
                    className="rounded-full bg-[#fae6ee] px-3 py-1 text-xs font-semibold text-[#854f68]"
                  >
                    {flower} ×
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={submitBouquet}
                disabled={flowers.length === 0}
                className="mt-6 w-full rounded-full bg-[#d86895] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#c75f89] disabled:cursor-not-allowed disabled:opacity-70"
              >
                SEND BOUQUET 💌
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Share Modal */}
      {shareUrl ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ backdropFilter: "blur(8px)", backgroundColor: "rgba(90, 61, 73, 0.35)" }}
        >
          <div className="w-full max-w-lg rounded-3xl border border-[#f2dce5] bg-white/95 p-8 shadow-2xl backdrop-blur-sm">
            <h2 className="text-center text-3xl text-[#5a3d49]">
              YOUR BOUQUET IS READY 💌
            </h2>
            <p className="mt-2 text-center text-sm text-[#8b6778]">
              Share this link with someone special
            </p>

            {/* Shareable URL */}
            <div className="mt-6">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="w-full rounded-xl border border-[#f1d9e4] bg-[#fff9fb] px-4 py-3 text-sm text-[#5a3d49] outline-none"
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
            </div>

            {/* Action buttons */}
            <div className="mt-5 flex flex-col gap-3">
              <button
                type="button"
                onClick={copyToClipboard}
                className="w-full rounded-full bg-[#d86895] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#c75f89]"
              >
                {copied ? "Copied! ✓" : "📋 Copy Link"}
              </button>

              <a
                href={shareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-full border border-[#e3b8ca] bg-white px-6 py-3 text-center text-sm font-semibold text-[#844f69] transition hover:bg-[#fff5f8]"
              >
                Preview Bouquet 👀
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-full bg-[#25D366] px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#1fb855]"
              >
                Send via WhatsApp 💬
              </a>
            </div>

            {/* Close */}
            <button
              type="button"
              onClick={() => setShareUrl(null)}
              className="mt-5 w-full text-center text-sm text-[#9f8790] transition hover:text-[#5a3d49]"
            >
              ← Back to builder
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
