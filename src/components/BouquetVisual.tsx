import clsx from "clsx";
import Image from "next/image";
import { BUSH_VARIANTS, type BouquetMode, type FlowerName, getBushBase, getBushTop, getFlowerImage } from "@/lib/flowers";

type BouquetVisualProps = {
  flowers: FlowerName[];
  mode: BouquetMode;
  className?: string;
  compact?: boolean;
};

export function BouquetVisual({ flowers, mode, className, compact = false }: BouquetVisualProps) {
  const variant = BUSH_VARIANTS[flowers.length % BUSH_VARIANTS.length];
  const maxFlowers = flowers.slice(0, 10);

  const containerSize = compact ? 240 : 300;
  const flowerSize = compact ? 52 : 60;

  return (
    <div
      className={clsx(
        "relative mx-auto rounded-3xl border border-[#f1d8e3] bg-[#fff9fb] p-4 shadow-sm",
        className,
      )}
      style={{ width: containerSize, maxWidth: "100%" }}
    >
      <div className="relative mx-auto" style={{ width: "100%", height: containerSize }}>
        {maxFlowers.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-[#8f7480]">
            Add flowers to bloom your bouquet.
          </div>
        ) : null}

        {/* Layer 1 — Bush background */}
        <Image
          src={getBushBase(variant, mode)}
          alt="Bouquet base"
          width={520}
          height={200}
          className="absolute bottom-0 left-0 right-0 w-full object-contain"
          style={{ zIndex: 1 }}
        />

        {/* Layer 2 — Flowers (flex-wrap row in the center) */}
        <div
          className="absolute flex flex-wrap items-end justify-center gap-1"
          style={{
            bottom: compact ? "50px" : "60px",
            left: 0,
            right: 0,
            zIndex: 2,
            padding: "0 20px",
          }}
        >
          {maxFlowers.map((flower, index) => (
            <Image
              key={`${flower}-${index}`}
              src={getFlowerImage(flower, mode)}
              alt={flower}
              width={flowerSize}
              height={flowerSize}
              className="object-contain drop-shadow-sm"
              style={{ width: flowerSize, height: flowerSize }}
            />
          ))}
        </div>

        {/* Layer 3 — Bush top overlay */}
        <Image
          src={getBushTop(variant, mode)}
          alt="Bouquet overlay"
          width={520}
          height={220}
          className="pointer-events-none absolute bottom-0 left-0 right-0 w-full object-contain"
          style={{ zIndex: 3 }}
        />
      </div>
    </div>
  );
}
