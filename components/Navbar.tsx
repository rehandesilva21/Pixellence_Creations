"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenForm: () => void;
}

export function Navbar({ onOpenForm }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Portfolio", href: "#portfolio" },
    { name: "About", href: "#about" },
    { name: "Reviews", href: "#reviews" },
    { name: "Contact", href: "#contact" },
  ];

  const textColorClass = isScrolled ? "text-neutral-900" : "text-white";
  const linkColorClass = isScrolled
    ? "text-neutral-600 hover:text-black"
    : "text-white/80 hover:text-white";
  const logoDotClass = isScrolled ? "text-neutral-500" : "text-white/50";

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-neutral-200/50 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <a
          href="#"
          className={`text-xl font-display font-bold tracking-tighter z-50 transition-colors ${textColorClass}`}
        >
          Pixellence Creations<span className={logoDotClass}>.</span>™
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors ${linkColorClass}`}
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={onOpenForm}
            className={`px-5 py-2.5 text-sm font-medium rounded-full transition-colors ${
              isScrolled
                ? "bg-black text-white hover:bg-neutral-800"
                : "bg-white text-black hover:bg-neutral-200"
            }`}
          >
            Start a Project
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden z-50 p-2 -mr-2 transition-colors ${
            mobileMenuOpen ? "text-neutral-900" : textColorClass
          }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-0 left-0 right-0 h-screen bg-white pt-24 px-6 flex flex-col gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-3xl font-display font-medium tracking-tight text-neutral-900 border-b border-neutral-100 pb-4"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenForm();
              }}
              className="mt-4 py-4 bg-black text-white rounded-full text-lg font-medium"
            >
              Start a Project
            </button>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
