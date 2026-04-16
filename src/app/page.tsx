import Link from "next/link";
import { PetalBackground } from "@/components/PetalBackground";

export default function Home() {
  return (
    <main className="romantic-bg relative flex min-h-screen items-center justify-center px-6 py-12">
      <PetalBackground />
      <div className="relative z-10 w-full max-w-2xl rounded-[2rem] border border-[#f2dce5] bg-white/80 p-8 text-center shadow-xl backdrop-blur sm:p-12">
        <p className="mb-3 text-sm uppercase tracking-[0.35em] text-[#9f6b82]">Digital Flower Sender</p>
        <h1 className="text-5xl text-[#5f3b48] sm:text-6xl">SorryDharu 🌸</h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-[#7b5665] sm:text-lg">
          for when words aren&apos;t enough 💕
        </p>
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          <Link
            href="/bouquet?mode=color"
            className="rounded-full bg-[#d86895] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#c85f89]"
          >
            BUILD A BOUQUET 🌸
          </Link>
          <Link
            href="/bouquet?mode=mono"
            className="rounded-full border border-[#9f8790] bg-white px-6 py-3 text-sm font-semibold text-[#5b4450] transition hover:-translate-y-0.5 hover:bg-[#f7f2f4]"
          >
            BUILD IN BLACK &amp; WHITE
          </Link>
        </div>
      </div>
    </main>
  );
}
