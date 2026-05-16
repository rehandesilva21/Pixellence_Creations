"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

const avatars = [
  "/Images/ArujaDp.png",
  "/Images/KamajDp.png",
  "/Images/IharaDp.png",
];

const rings = [
  { size: 320, duration: 18, delay: 0, opacity: 0.07 },
  { size: 520, duration: 24, delay: 2, opacity: 0.05 },
  { size: 720, duration: 30, delay: 4, opacity: 0.04 },
  { size: 920, duration: 38, delay: 6, opacity: 0.025 },
];

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  duration: Math.random() * 6 + 6,
  delay: Math.random() * 4,
}));

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-neutral-950 text-white overflow-hidden pt-20">

      {/* Animated rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {rings.map((ring, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-white"
            style={{
              width: ring.size,
              height: ring.size,
              opacity: ring.opacity,
            }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360, scale: [1, 1.04, 1] }}
            transition={{
              rotate: { duration: ring.duration, repeat: Infinity, ease: "linear" },
              scale: { duration: ring.duration / 2, repeat: Infinity, ease: "easeInOut", delay: ring.delay },
            }}
          />
        ))}
      </div>

      {/* Orbiting dot on outer ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="absolute"
          style={{ width: 920, height: 920 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/40" />
        </motion.div>
        <motion.div
          className="absolute"
          style={{ width: 520, height: 520 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/30" />
        </motion.div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              opacity: 0.15,
            }}
            animate={{ y: [-10, 10, -10], opacity: [0.1, 0.25, 0.1] }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Central glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[80px] pointer-events-none" />

      {/* Content — centered */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 w-full relative z-10 text-center flex flex-col items-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block py-1.5 px-4 rounded-full border border-white/15 text-xs font-medium tracking-wide uppercase mb-8 text-white/60">
            Premium Content Creation Agency
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl lg:text-[7rem] font-display font-bold tracking-tighter leading-[1.05] mb-8"
        >
          We Create What{" "}
<br className="hidden md:block" />
<span className="text-white/50 text-5xl md:text-6xl lg:text-[5rem]">Others Imagine.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-white/50 max-w-2xl font-light leading-relaxed mb-12"
        >
          Elevating brands and celebrities through world-class graphics,
          cinematic video production, and intuitive UI design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-6"
        >
          <a
            href="#portfolio"
            className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-neutral-200 transition-colors"
          >
            View Our Work
          </a>
          <div className="flex items-center gap-4 text-sm text-white/40">
            <div className="flex -space-x-2">
              {avatars.map((src, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-neutral-950 bg-neutral-800 overflow-hidden relative"
                >
                  <Image
                    src={src}
                    alt="Client"
                    fill
                    className="object-cover opacity-80"
                    sizes="32px"
                  />
                </div>
              ))}
            </div>
            <span>Trusted by 15+ top clients</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}