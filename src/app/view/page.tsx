"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { BouquetVisual } from "@/components/BouquetVisual";
import { PetalBackground } from "@/components/PetalBackground";
import { FLOWERS, type BouquetMode, type FlowerName } from "@/lib/flowers";

const validFlowerNames = new Set<string>(FLOWERS.map((f) => f.name));

function ViewContent() {
  const searchParams = useSearchParams();

  const flowersParam = searchParams.get("flowers");
  const msgParam = searchParams.get("msg");
  const modeParam = searchParams.get("mode");

  // Parse and validate flowers
  const flowers: FlowerName[] = flowersParam
    ? (flowersParam.split(",").filter((f) => validFlowerNames.has(f)) as FlowerName[])
    : [];

  const message = msgParam ? decodeURIComponent(msgParam) : "";
  const mode: BouquetMode = modeParam === "mono" ? "mono" : "color";

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // No params → fallback
  if (flowers.length === 0 && !msgParam) {
    return (
      <main className="romantic-bg relative flex min-h-screen items-center justify-center px-6 py-12">
        <PetalBackground />
        <div className="relative z-10 w-full max-w-lg rounded-[2rem] border border-[#f2dce5] bg-white/85 p-10 text-center shadow-xl backdrop-blur">
          <h1 className="text-5xl text-[#5a3d49]">Someone loves you 💕</h1>
          <p className="mt-4 text-lg text-[#7d5f6d]">
            A bouquet was meant for you, but it seems the link is incomplete.
          </p>
          <Link
            href="/bouquet?mode=color"
            className="mt-8 inline-block rounded-full bg-[#d86895] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#c75f89]"
          >
            Build a Bouquet 🌸
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="romantic-bg relative min-h-screen px-4 py-8 sm:px-8">
      <PetalBackground />
      <section className="relative z-10 mx-auto w-full max-w-3xl">
        {/* Header */}
        <div className="rounded-t-3xl border border-b-0 border-[#f0d9e3] bg-white/85 p-6 text-center shadow-sm backdrop-blur sm:p-10">
          <p className="text-xs uppercase tracking-[0.28em] text-[#9f6b82]">Bouquet Received</p>
          <h1 className="mt-3 text-4xl text-[#5a3d49] sm:text-5xl">
            A bouquet, just for you 🌸
          </h1>
        </div>

        {/* Bouquet visual */}
        <div className="border-x border-[#f0d9e3] bg-white/90 px-6 py-6 sm:px-10">
          <BouquetVisual flowers={flowers} mode={mode} />
        </div>

        {/* Message card */}
        <div className="border-x border-[#f0d9e3] bg-white/90 px-6 pb-2 sm:px-10">
          <div className="rounded-2xl border border-[#f2dde6] bg-gradient-to-br from-[#fffafc] to-[#fff3f7] p-6 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-xl">💌</span>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b07a91]">
                A little note
              </span>
            </div>
            <p className="text-lg italic leading-relaxed text-[#5a3d49]" style={{ fontFamily: "var(--font-body)" }}>
              {message || "No words needed — just flowers and love."}
            </p>
            <p className="mt-4 text-xs text-[#a78999]">
              sent with love on {today}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="rounded-b-3xl border border-t-0 border-[#f0d9e3] bg-white/85 px-6 py-6 text-center backdrop-blur sm:px-10">
          <Link
            href="/bouquet?mode=color"
            className="inline-block rounded-full bg-[#d86895] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#c75f89]"
          >
            Send one back 💐
          </Link>
        </div>
      </section>
    </main>
  );
}

function ViewFallback() {
  return <main className="romantic-bg min-h-screen" />;
}

export default function ViewPage() {
  return (
    <Suspense fallback={<ViewFallback />}>
      <ViewContent />
    </Suspense>
  );
}
