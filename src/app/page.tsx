import { Features } from "@/components/home/features/features";
import { Hero } from "@/components/home/hero/hero";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Features />
    </main>
  );
}
