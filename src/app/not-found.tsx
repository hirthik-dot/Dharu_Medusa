import Link from "next/link";

export default function NotFound() {
  return (
    <main className="romantic-bg flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl border border-[#f0d8e3] bg-white/90 p-8 text-center shadow-sm">
        <h1 className="text-4xl text-[#5a3d49]">Bouquet not found</h1>
        <p className="mt-3 text-[#7f5f6f]">This bouquet may have wilted or the link is incorrect.</p>
        <Link
          href="/bouquet?mode=color"
          className="mt-6 inline-block rounded-full bg-[#d86895] px-5 py-2 text-sm font-semibold text-white"
        >
          Build a new bouquet 🌸
        </Link>
      </div>
    </main>
  );
}
