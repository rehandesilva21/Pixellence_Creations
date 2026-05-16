"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Portfolio } from "@/components/Portfolio";
import { About } from "@/components/About";
import { Reviews } from "@/components/Reviews";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ProjectForm } from "@/components/ProjectForm";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Pricing } from "@/components/Pricing";
export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white selection:bg-black selection:text-white">
      <Navbar onOpenForm={() => setIsFormOpen(true)} />
      <main>
        <Hero />
        <Portfolio />
        <Pricing onOpenForm={() => setIsFormOpen(true)} />
        <About />
        <Reviews />
        <Contact onOpenForm={() => setIsFormOpen(true)} />
      </main>
      <Footer />
      <ProjectForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      <WhatsAppButton />
    </div>
  );
}
