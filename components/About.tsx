"use client";

import { motion } from "framer-motion";

export function About() {
  const stats = [
    { value: "15+", label: "Celebrity Clients" },
    { value: "50+", label: "Projects Delivered" },
    { value: "3+", label: "Years of Excellence" },
    { value: "100%", label: "Client Satisfaction" },
  ];

  return (
    <section id="about" className="py-32 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-20"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center">
              <img src="/Images/Pixellence new logo.png" alt="Pixellence Creation" />
            </div>
            <span className="text-sm font-medium text-neutral-400 uppercase tracking-[0.2em]">
              Pixellence Creations™
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-8 leading-tight">
              We don&apos;t just make content. <br />
              <span className="text-neutral-400">We shape culture.</span>
            </h2>
            <div className="space-y-6 text-lg text-neutral-600 font-light leading-relaxed">
              <p>
                Pixellence Creation was born from a simple idea: that premium
                brands and high-profile individuals deserve content that matches
                their ambition.
              </p>
              <p>
                Our multidisciplinary team of designers, videographers, and
                strategists work seamlessly to craft visual narratives that
                captivate audiences and drive engagement. From pixel-perfect UI
                designs to cinematic reels, we handle every detail with
                obsessive precision.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 gap-6 md:gap-8"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-3xl shadow-sm border border-neutral-100 flex flex-col justify-center"
              >
                <div className="text-4xl md:text-5xl font-display font-bold text-black mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-neutral-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
