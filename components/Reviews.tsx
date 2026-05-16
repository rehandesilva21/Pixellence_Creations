"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star, ExternalLink } from "lucide-react";
import Image from "next/image";

// ─── Configure your Google Business details here ───────────────────────────
const GOOGLE_BUSINESS = {
  name: "Pixellence Creation",
  rating: 5.0,           // your overall star rating
  reviewCount: 24,       // total number of reviews
  profileUrl: "https://share.google/RFqvY7Ou52H44tcmg", // your share link
};
// ───────────────────────────────────────────────────────────────────────────

const TRUNCATE_LENGTH = 160; // characters before "See more" appears

const reviews = [
  {
    id: 1,
    name: "Chanuka Wijesundara",
    role: "Founder- Orange IT, Co founder - LankanSquare",
    stars: 5,
    image:
      "/Reviews/Chanuka.png",
    text: "Very professional and creative video editing service. They transformed our raw footage into a high-quality final video that looked amazing. Communication was smooth and revisions were handled quickly. Definitely recommended!",
  },
  {
    id: 2,
    name: "Chiranthaka Dilshan",
    role: "Director of Partnerships and Marketing - CeylonX",
    stars: 5,
    image:
      "/Reviews/Chiranthaka.jpg",
    text: "Pixelence Creation delivers high-quality graphic design and video editing with great attention to detail. They’re fast, responsive, and really understand the vision, turning raw ideas into clean, professional content. Reliable communication, smooth edits, and on-time delivery make working with them easy. Highly recommend for anyone needing polished visuals and videos.👌",
  },
  {
    id: 3,
    name: "Ihara IJ",
    role: "Internet Personality",
    stars: 5,
    image:
      "/Reviews/Ihara.jpg",
    text: "I had a great experience working with Pixellence Creations.They are extremely talented, creative, and very easy to work with. The quality of the final output exceeded my expectations, and they handled my previous project brilliantly.Their communication skills, creativity, and working capacity are excellent, which made the whole process smooth and comfortable. They understands ideas quickly and delivers high quality work with professionalism.Highly recommended. Wishing more success ✨",
  },
  {
    id: 4,
    name: "Aruja AJ",
    role: "Internet Personality",
    stars: 5,
    image:
      "/Reviews/Aruja.jpg",
    text: "Working with Pixellence is like having an in-house creative powerhouse. Their graphics for our seasonal campaign set a new standard for our brand's aesthetic. The team is responsive, deeply talented, and somehow always manages to deliver ahead of schedule without ever sacrificing quality. I genuinely can't imagine working with anyone else.",
  },
    {
    id: 4,
    name: "Kamaj Silva",
    role: "Founder - Milk Toronto, Reeljoy,Sneakertub, Co founder - LankanSquare | entrepreneur",
    stars: 5,
    image:
      "/Reviews/Kamaj.jpg",
    text: "Working with Pixellence is like having an in-house creative powerhouse. Their graphics for our seasonal campaign set a new standard for our brand's aesthetic. The team is responsive, deeply talented, and somehow always manages to deliver ahead of schedule without ever sacrificing quality. I genuinely can't imagine working with anyone else.",
  },
     {
    id: 5,
    name: "Rasanjalie Fernando",
    role: "Public Figure",
    stars: 5,
    image:
      "/Reviews/Rasanjalie.jpg",
    text: "Working with Pixellence is like having an in-house creative powerhouse. Their graphics for our seasonal campaign set a new standard for our brand's aesthetic. The team is responsive, deeply talented, and somehow always manages to deliver ahead of schedule without ever sacrificing quality. I genuinely can't imagine working with anyone else.",
  },
];

function StarRating({ count, size = 18 }: { count: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < count ? "text-[#FBBC04] fill-[#FBBC04]" : "text-neutral-200 fill-neutral-200"}
        />
      ))}
    </div>
  );
}


export function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const review = reviews[currentIndex];
  const isLong = review.text.length > TRUNCATE_LENGTH;
  const displayText =
    isLong && !expanded
      ? review.text.slice(0, TRUNCATE_LENGTH).trimEnd() + "…"
      : review.text;

  const goNext = () => {
    setExpanded(false);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };
  const goPrev = () => {
    setExpanded(false);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section id="reviews" className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
              Client Stories
            </h2>
            {/* Google badge sits right under the heading */}
         
          </div>

          <div className="hidden md:flex gap-4">
            <button
              onClick={goPrev}
              className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={goNext}
              className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>

        {/* Review card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start"
            >
              {/* Photo */}
              <div className="md:col-span-5 lg:col-span-4 h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden relative shrink-0">
                <Image
                  src={review.image}
                  alt={review.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
              </div>

              {/* Text */}
              <div className="md:col-span-7 lg:col-span-8 flex flex-col justify-center py-8">
                <Quote className="text-neutral-200 w-16 h-16 mb-6" />

                {/* Stars */}
                <div className="mb-6">
                  <StarRating count={review.stars} size={22} />
                </div>

                {/* Review text with expand/collapse */}
                <div className="mb-8">
                  <AnimatePresence initial={false} mode="wait">
                    <motion.p
                      key={`${currentIndex}-${expanded}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-2xl md:text-3xl font-display font-medium leading-snug tracking-tight text-neutral-900"
                    >
                      &ldquo;{displayText}&rdquo;
                    </motion.p>
                  </AnimatePresence>

                  {isLong && (
                    <button
                      onClick={() => setExpanded((e) => !e)}
                      className="mt-4 text-sm font-semibold text-neutral-400 hover:text-black transition-colors underline underline-offset-4"
                    >
                      {expanded ? "Show less" : "See more"}
                    </button>
                  )}
                </div>

                {/* Reviewer info */}
                <div>
                  <h4 className="text-xl font-bold text-black mb-1">{review.name}</h4>
                  <p className="text-neutral-500 font-medium uppercase tracking-wider text-sm">
                    {review.role}
                  </p>
                </div>

                {/* Dot indicators */}
                <div className="flex gap-2 mt-10">
                  {reviews.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setExpanded(false); setCurrentIndex(i); }}
                      className={`rounded-full transition-all duration-300 ${
                        i === currentIndex
                          ? "w-6 h-2 bg-black"
                          : "w-2 h-2 bg-neutral-200 hover:bg-neutral-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile nav */}
        <div className="flex md:hidden gap-4 mt-12 justify-center">
          <button
            onClick={goPrev}
            className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={goNext}
            className="w-12 h-12 rounded-full border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}