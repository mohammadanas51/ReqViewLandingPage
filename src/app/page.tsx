import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { WaitlistForm } from "@/components/WaitlistForm";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background text-text-primary selection:bg-accent/30 selection:text-white relative">
      <Navbar />
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <Features />
      <WaitlistForm />
      <FAQ />
      <Footer />
    </main>
  );
}

