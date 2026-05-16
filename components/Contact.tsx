"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ContactProps {
  onOpenForm: () => void;
}

export function Contact({ onOpenForm }: ContactProps) {
  return (
    <section
      id="contact"
      className="py-32 bg-black text-white rounded-t-[3rem] mt-12"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto flex flex-col items-center"
        >
          <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-8 leading-tight">
            Let&apos;s Create Something <br className="hidden md:block" />
            <span className="text-neutral-500">Extraordinary.</span>
          </h2>
          <p className="text-xl text-neutral-400 mb-12 max-w-2xl font-light">
            Ready to elevate your brand&apos;s visual identity? We&apos;re
            currently accepting new projects for Q3.
          </p>

          <button
            onClick={onOpenForm}
            className="group flex items-center gap-4 px-8 py-5 bg-white text-black rounded-full text-lg font-medium hover:bg-neutral-200 transition-all duration-300"
          >
            Start a Conversation
            <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-neutral-800 transition-colors">
              <ArrowRight size={16} />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
