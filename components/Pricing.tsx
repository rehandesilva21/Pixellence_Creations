"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

// ─── Single content items ───────────────────────────────────────────────────
const singleItems = [
  { label: "Post",            price: "LKR 1,500" },
  { label: "Reel",            price: "LKR 2,500" },
  { label: "Podcast",         price: "LKR 14,500" },
  { label: "Motion Graphics", price: "LKR 6,500" },
  { label: "CV / Resume",     price: "LKR 2,000" },
];

// ─── Monthly packages ───────────────────────────────────────────────────────
const packages = [
  {
    id: "post",
    tag: "POST",
    name: "Post Package",
    subtitle: "10 posts per month",
    price: "LKR 30,000",
    period: "per month",
    features: [
      "10 posts @ LKR 1,500 each",
    ],
    highlight: false,
  },
  {
    id: "reels",
    tag: "REELS",
    name: "Reels Package",
    subtitle: "15 reels per month",
    price: "LKR 30,000",
    period: "per month",
    features: [
      "15 reels @ LKR 2,000 each",
    ],
    highlight: false,
  },
  {
    id: "combo",
    tag: "COMBO",
    name: "Reels + Posts",
    subtitle: "15 reels & 10 posts",
    price: "LKR 40,000",
    period: "per month",
    features: [
      "15 reels @ LKR 2,000 each",
      "10 posts @ LKR 1,000 each",
    ],
    highlight: true, // most popular
  },
  {
    id: "podcast",
    tag: "PODCAST",
    name: "Podcast Package",
    subtitle: "1 podcast + 10 reels",
    price: "LKR 27,500",
    period: "per month",
    features: [
      "1 podcast @ LKR 12,500",
      "10 reels @ LKR 1,500 each",
    ],
    highlight: false,
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export function Pricing({ onOpenForm }: { onOpenForm: () => void }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="pricing" className="py-32 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-neutral-500 text-lg max-w-xl mx-auto">
            Professional &amp; reasonable packages for your brand. All prices in Sri Lankan Rupees.
          </p>
        </motion.div>

        {/* ── Single Content Pricing ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-20"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-6 text-center">
            Single Content Pricing
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {singleItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex flex-col items-center gap-1 px-7 py-5 bg-white border border-neutral-200 rounded-2xl shadow-sm"
              >
                <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                  {item.label}
                </span>
                <span className="text-xl font-display font-bold text-neutral-900">
                  {item.price}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Monthly Packages ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredId(pkg.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`relative flex flex-col rounded-3xl border p-7 transition-all duration-300 cursor-default
                ${pkg.highlight
                  ? "bg-black border-black text-white shadow-2xl shadow-black/20 scale-[1.03]"
                  : hoveredId === pkg.id
                    ? "bg-white border-neutral-300 shadow-lg -translate-y-1"
                    : "bg-white border-neutral-200 shadow-sm"
                }`}
            >
              {/* Most popular badge */}
              {pkg.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white text-black text-xs font-bold rounded-full shadow-md">
                    <Sparkles size={12} />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Tag */}
              <span className={`self-start text-[10px] font-bold tracking-[0.2em] px-3 py-1 rounded-full mb-4
                ${pkg.highlight ? "bg-white/15 text-white" : "bg-neutral-100 text-neutral-500"}`}>
                {pkg.tag}
              </span>

              {/* Name & subtitle */}
              <h3 className={`text-xl font-display font-bold mb-1 ${pkg.highlight ? "text-white" : "text-neutral-900"}`}>
                {pkg.name}
              </h3>
              <p className={`text-sm mb-6 ${pkg.highlight ? "text-white/60" : "text-neutral-400"}`}>
                {pkg.subtitle}
              </p>

              {/* Divider */}
              <div className={`w-full h-px mb-6 ${pkg.highlight ? "bg-white/15" : "bg-neutral-100"}`} />

              {/* Features */}
              <ul className="flex flex-col gap-3 mb-8">
                {pkg.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0
                      ${pkg.highlight ? "bg-white/20" : "bg-neutral-100"}`}>
                      <Check size={10} className={pkg.highlight ? "text-white" : "text-neutral-600"} strokeWidth={3} />
                    </div>
                    <span className={`text-sm ${pkg.highlight ? "text-white/80" : "text-neutral-600"}`}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Price */}
              <div className="mt-auto">
                <div className={`text-3xl font-display font-bold mb-0.5 ${pkg.highlight ? "text-white" : "text-neutral-900"}`}>
                  {pkg.price}
                </div>
                <div className={`text-sm mb-6 ${pkg.highlight ? "text-white/50" : "text-neutral-400"}`}>
                  {pkg.period}
                </div>

                <button
                  onClick={onOpenForm}
                  className={`w-full py-3.5 rounded-full text-sm font-semibold transition-all duration-200
                    ${pkg.highlight
                      ? "bg-white text-black hover:bg-neutral-100"
                      : "bg-black text-white hover:bg-neutral-800"
                    }`}
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-sm text-neutral-400 mt-12"
        >
          Podcast reels are priced at LKR 1,500 each &nbsp;•&nbsp; Custom packages available &nbsp;•&nbsp; T&amp;C Apply
        </motion.p>
      </div>
    </section>
  );
}