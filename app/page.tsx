import { NavBar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero";
import { LogoCloud } from "@/components/landing/logo-cloud";
import { StatsBar } from "@/components/landing/stats";
import { HowItWorks } from "@/components/landing/how-it-works";
import { UseCasesSection } from "@/components/landing/use-cases";
import { Footer } from "@/components/landing/footer";
import { FinalCTA } from "@/components/landing/final-cta";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/auth/core/getCurrentUser";

export default async function Home() {
  const user = await getCurrentUser({ withFullUser: true });

  return (
    <div className="flex flex-col relative bg-background">
      <div className="flex flex-col">
        <NavBar user={user} />
        <main className="relative flex flex-col items-center w-full z-20 bg-background overflow-hidden min-h-screen">
          {/* Background Ambient Glows */}
          <div
            id="hero"
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] pointer-events-none opacity-40 dark:opacity-20"
            style={{
              background:
                "radial-gradient(circle at center, rgba(37, 99, 235, 0.08) 0%, transparent 70%)",
            }}
          />

          <HeroSection user={user} />

          <LogoCloud />

          <StatsBar />
        </main>

        <HowItWorks />

        <UseCasesSection />

        {/* <TestimonialsSection /> */}

        <FinalCTA user={user} />

        <Footer />
      </div>
    </div>
  );
}
