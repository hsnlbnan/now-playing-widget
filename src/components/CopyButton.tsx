"use client";

export default function CopyButton({ text, children }: { text: string; children?: React.ReactNode }) {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(text)}
      className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs hover:bg-white/10"
      type="button"
    >
      {children ?? "Kopyala"}
    </button>
  );
}

