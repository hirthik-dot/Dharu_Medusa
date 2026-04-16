import type { CSSProperties } from "react";

export function PetalBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className="petal"
          style={
            {
              "--left": `${(i + 1) * 5}%`,
              "--delay": `${(i % 6) * -1.4}s`,
              "--duration": `${12 + (i % 5) * 2}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
