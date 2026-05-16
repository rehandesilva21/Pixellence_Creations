"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Play, ChevronDown, ZoomIn, Maximize2 } from "lucide-react";
import Image from "next/image";
import {
  projects,
  categories,
  INITIAL_COUNT,
  LOAD_MORE_COUNT,
  type Project,
} from "@/data/Portfoliodata";

function getYouTubeEmbedUrl(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0` : null;
}

function getFacebookReelEmbedUrl(url: string): string {
  const reelMatch = url.match(/facebook\.com\/reel\/(\d+)/);
  const reelId = reelMatch ? reelMatch[1] : "";
  const href = reelId ? `https://www.facebook.com/reel/${reelId}` : url;
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
    href
  )}&show_text=false&width=314&height=560&appId`;
}

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const filteredProjects = projects.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );
  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;
  const remaining = filteredProjects.length - visibleCount;

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(INITIAL_COUNT);
  };

  const isFacebookReel = selectedProject?.videoType === "facebook-reel";
  const isYouTube = selectedProject?.videoType === "youtube";
  const isImageProject = !selectedProject?.videoType;

  const openLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxOpen(true);
  };

  return (
    <section id="portfolio" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
              Selected Works
            </h2>
            <p className="text-neutral-500 text-lg">
              A glimpse into our collaborations with celebrities, brands, and visionaries.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-black text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>

        {/* ── Grid ── */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                onClick={() => setSelectedProject(project)}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-100 cursor-pointer"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {project.videoUrl && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Play size={24} className="text-black ml-1" fill="black" />
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white/80 text-sm font-medium uppercase tracking-wider">
                        {project.category}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                        <ArrowUpRight size={20} />
                      </div>
                    </div>
                    <h3 className="text-white text-2xl font-display font-bold mb-1">
                      {project.title}
                    </h3>
                    <p className="text-white/60 text-sm">Client: {project.client}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Load More ── */}
        <div className="flex flex-col items-center gap-4 mt-14">
          <p className="text-sm text-neutral-400 font-medium">
            Showing{" "}
            <span className="text-neutral-900 font-semibold">{visibleProjects.length}</span>
            {" "}of{" "}
            <span className="text-neutral-900 font-semibold">{filteredProjects.length}</span>
            {" "}projects
          </p>
          <div className="w-48 h-1 bg-neutral-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-black rounded-full"
              initial={false}
              animate={{ width: `${(visibleProjects.length / filteredProjects.length) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          {hasMore && (
            <motion.button
              onClick={() => setVisibleCount((c) => c + LOAD_MORE_COUNT)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-2 flex items-center gap-3 px-8 py-4 rounded-full border-2 border-neutral-200 text-neutral-700 font-medium hover:border-black hover:text-black transition-colors duration-200"
            >
              <span>Load {Math.min(remaining, LOAD_MORE_COUNT)} more</span>
              <motion.div
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown size={18} />
              </motion.div>
            </motion.button>
          )}
          {!hasMore && filteredProjects.length > INITIAL_COUNT && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setVisibleCount(INITIAL_COUNT)}
              className="mt-2 text-sm text-neutral-400 hover:text-black transition-colors underline underline-offset-4"
            >
              Show less
            </motion.button>
          )}
        </div>
      </div>

      {/* ── Project Detail Modal ── */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
            />

            {/* Centering shell — handles scroll on small screens */}
            <div className="fixed inset-0 z-[70] overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 md:p-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.93, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.93, y: 24 }}
                  transition={{ type: "spring", damping: 30, stiffness: 320 }}
                  className={`
                    relative bg-white rounded-2xl md:rounded-3xl shadow-2xl w-full overflow-hidden
                    flex flex-col md:flex-row
                    ${isFacebookReel ? "max-w-3xl" : "max-w-5xl"}
                  `}
                  // Stop backdrop click closing when clicking inside modal
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* ── LEFT: Media panel ── */}

                  {/* Facebook Reel — tall vertical */}
                  {isFacebookReel && (
                    <div className="w-full md:w-[300px] shrink-0 bg-black flex items-center justify-center">
                      <div className="w-full" style={{ aspectRatio: "9/16", maxHeight: "70vh" }}>
                        <iframe
                          src={getFacebookReelEmbedUrl(selectedProject.videoUrl!)}
                          title={selectedProject.title}
                          className="w-full h-full"
                          style={{ border: "none", display: "block" }}
                          scrolling="no"
                          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )}

                  {/* YouTube — 16:9 */}
                  {isYouTube && (
                    <div className="w-full md:w-1/2 shrink-0 bg-black self-stretch flex items-center">
                      <div className="w-full" style={{ aspectRatio: "16/9" }}>
                        <iframe
                          src={getYouTubeEmbedUrl(selectedProject.videoUrl!)!}
                          title={selectedProject.title}
                          className="w-full h-full"
                          style={{ border: "none", display: "block" }}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )}

                  {/* Image — full, no crop, dark bg */}
                  {isImageProject && (
                    <div
                      className="group/img relative w-full md:w-1/2 shrink-0 bg-neutral-950 cursor-zoom-in"
                      style={{ minHeight: 260, maxHeight: "70vh" }}
                      onClick={openLightbox}
                    >
                      <Image
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        fill
                        className="object-contain transition-transform duration-500 group-hover/img:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-transparent group-hover/img:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover/img:opacity-100 scale-90 group-hover/img:scale-100 transition-all duration-300 flex flex-col items-center gap-2">
                          <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl">
                            <Maximize2 size={20} className="text-black" />
                          </div>
                          <span className="text-white text-xs font-medium bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
                            View full image
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── RIGHT: Info panel ── */}
                  <div className="flex flex-col flex-1 min-w-0 p-6 md:p-10">

                    {/* Top row: category tag + action buttons */}
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <span className="inline-block px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs font-medium uppercase tracking-wider mt-0.5">
                        {selectedProject.category}
                      </span>
                      <div className="flex items-center gap-2 shrink-0">
                        {isImageProject && (
                          <button
                            onClick={openLightbox}
                            title="View full image"
                            className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-neutral-900 hover:text-white transition-colors"
                          >
                            <ZoomIn size={15} />
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedProject(null)}
                          className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-neutral-200 transition-colors"
                        >
                          <X size={17} />
                        </button>
                      </div>
                    </div>

                    {/* Title + client */}
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold tracking-tight leading-tight mb-2">
                      {selectedProject.title}
                    </h3>
                    <p className="text-neutral-500 font-medium text-sm md:text-base mb-6">
                      Client: {selectedProject.client}
                    </p>

                    <div className="w-full h-px bg-neutral-100 mb-6" />

                    {/* Description */}
                    <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-3">
                      About the Project
                    </h4>
                    <p className="text-neutral-600 text-sm md:text-base leading-relaxed flex-1">
                      {selectedProject.description}
                    </p>

                    {/* CTA */}
                    <button
                      onClick={() => {
                        setSelectedProject(null);
                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="mt-8 w-full py-4 bg-black text-white rounded-full font-semibold text-sm md:text-base hover:bg-neutral-800 transition-colors"
                    >
                      Start a Similar Project
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* ── Full Image Lightbox ── */}
      <AnimatePresence>
        {lightboxOpen && selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setLightboxOpen(false)}
              className="fixed inset-0 bg-black/96 backdrop-blur-lg z-[90]"
            />

            {/* Top bar */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.08 }}
              className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between gap-3 px-4 py-3 md:px-8 md:py-5"
            >
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-2 min-w-0 max-w-xs md:max-w-md overflow-hidden">
                <span className="text-white/50 text-[10px] uppercase tracking-widest shrink-0">
                  {selectedProject.category}
                </span>
                <span className="w-1 h-1 rounded-full bg-white/30 shrink-0" />
                <span className="text-white text-xs md:text-sm font-medium truncate">
                  {selectedProject.title}
                </span>
              </div>
              <button
                onClick={() => setLightboxOpen(false)}
                className="shrink-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-colors"
              >
                <X size={18} />
              </button>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed inset-0 z-[95] flex items-center justify-center p-6 pt-20 pb-14 pointer-events-none"
            >
              <div
                className="relative w-full h-full pointer-events-auto"
                onClick={() => setLightboxOpen(false)}
              >
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
            </motion.div>

            {/* Hint */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.2 }}
              className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] text-white/35 text-xs tracking-wider whitespace-nowrap"
            >
              Click anywhere to close
            </motion.p>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}