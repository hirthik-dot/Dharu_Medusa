export type BouquetMode = "color" | "mono";

export type FlowerName =
  | "rose"
  | "peony"
  | "sunflower"
  | "tulip"
  | "dahlia"
  | "lily"
  | "orchid"
  | "daisy"
  | "carnation"
  | "anemone"
  | "zinnia"
  | "ranunculus";

export type FlowerDefinition = {
  name: FlowerName;
  label: string;
  emoji: string;
};

const colorBase = "https://pub-4ac1b7f0da8c43e8983d7821a18a8c0d.r2.dev/color";
const monoBase = "https://pub-4ac1b7f0da8c43e8983d7821a18a8c0d.r2.dev/mono";

export const FLOWERS: FlowerDefinition[] = [
  { name: "rose", label: "Rose", emoji: "🌹" },
  { name: "peony", label: "Peony", emoji: "🌺" },
  { name: "sunflower", label: "Sunflower", emoji: "🌻" },
  { name: "tulip", label: "Tulip", emoji: "🌷" },
  { name: "dahlia", label: "Dahlia", emoji: "💮" },
  { name: "lily", label: "Lily", emoji: "🪷" },
  { name: "orchid", label: "Orchid", emoji: "🏵️" },
  { name: "daisy", label: "Daisy", emoji: "🌼" },
  { name: "carnation", label: "Carnation", emoji: "🌸" },
  { name: "anemone", label: "Anemone", emoji: "🌺" },
  { name: "zinnia", label: "Zinnia", emoji: "🌸" },
  { name: "ranunculus", label: "Ranunculus", emoji: "🌼" },
];

export function getFlowerImage(name: FlowerName, mode: BouquetMode) {
  const root = mode === "mono" ? monoBase : colorBase;
  return `${root}/flowers/${name}.webp`;
}

export const BUSH_VARIANTS = [1, 2, 3] as const;

export function getBushBase(variant: 1 | 2 | 3, mode: BouquetMode) {
  const root = mode === "mono" ? monoBase : colorBase;
  return `${root}/bush/bush-${variant}.png`;
}

export function getBushTop(variant: 1 | 2 | 3, mode: BouquetMode) {
  const root = mode === "mono" ? monoBase : colorBase;
  return `${root}/bush/bush-${variant}-top.png`;
}
