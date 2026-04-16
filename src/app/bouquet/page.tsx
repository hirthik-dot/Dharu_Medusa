import { Suspense } from "react";
import { BouquetBuilderClient } from "./BouquetBuilderClient";

function BuilderFallback() {
  return <main className="romantic-bg min-h-screen" />;
}

export default function BouquetBuilderPage() {
  return (
    <Suspense fallback={<BuilderFallback />}>
      <BouquetBuilderClient />
    </Suspense>
  );
}
