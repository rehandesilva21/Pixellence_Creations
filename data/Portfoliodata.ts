// ============================================================
//  PORTFOLIO DATA — edit this file to update your portfolio
//  No backend needed. Just save and the site updates instantly.
// ============================================================
//
//  THUMBNAIL GUIDE:
//
//  ✅ YouTube  → leave image empty, thumbnail is fetched automatically
//                just add videoUrl + videoType: "youtube"
//
//  📁 Facebook → save the thumbnail to /public/Images/filename.jpg
//                then set image: "/Images/filename.jpg"
//                (Facebook CDN URLs expire — local files never do)
//
//  🖼  Graphics  → use a URL or local file path as image
//
// ============================================================

export interface Project {
  id: number;
  title: string;
  category: "Graphics" | "Video & Reels" | "UI Design";
  client: string;
  image?: string;      // Optional for YouTube — auto-fetched. Required for others.
  description: string;
  videoUrl?: string;
  videoType?: "youtube" | "facebook-reel";
}

export function getYouTubeThumbnail(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/
  );
  if (!match) return null;
  return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
}

export function getYouTubeEmbedUrl(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0` : null;
}

export function getFacebookReelEmbedUrl(url: string): string {
  // Normalise web.facebook.com → www.facebook.com (web. subdomain breaks embeds)
  const normalised = url.replace("web.facebook.com", "www.facebook.com");
  const reelMatch  = normalised.match(/facebook\.com\/reel\/(\d+)/);
  const reelId     = reelMatch ? reelMatch[1] : "";
  const href       = reelId ? `https://www.facebook.com/reel/${reelId}` : normalised;
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
    href
  )}&show_text=false&width=314&height=560&appId`;
}

export function resolveCardImage(project: Project): string {
  if (project.image) return project.image;
  if (project.videoType === "youtube" && project.videoUrl) {
    return getYouTubeThumbnail(project.videoUrl) ?? "";
  }
  // Generic video placeholder — replace with your own if desired
  return "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1200&auto=format&fit=crop";
}

// ── Projects ──────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: 1,
    title: "Neon Nights Campaign",
    category: "Graphics",
    client: "Global Artist",
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/67342d203344805.6695e6778662b.jpg",
    description:
      "A comprehensive visual identity and promotional graphics package for a global artist's highly anticipated summer tour. The project included social media assets, billboard designs, and digital merchandise concepts, all centered around a vibrant, neon-drenched aesthetic that captured the energy of their new album.",
  },
  {
    id: 2,
    title: "Maple Nissan Vlog",
    category: "Video & Reels",
    client: "Kamaj Silva",
    image: "/Images/Thumbnail2.jpeg",   // saved locally in /public/Images/
    description:
      "Cinematic background visuals and promotional reels created for a massive stadium tour. We blended live-action footage with abstract 3D animations to create immersive backdrops that reacted dynamically to the live music, elevating the concert experience for over 500,000 attendees.",
    videoUrl: "https://www.facebook.com/reel/1190743865777532",  // fixed: www. not web.
    videoType: "facebook-reel",
  },
  {
    id: 3,
    title: "Fintech App Redesign",
    category: "UI Design",
    client: "Tech Startup",
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/d18290201338555.6672c18cc9946.jpg",
    description:
      "A complete overhaul of a leading fintech application, focusing on simplifying complex financial data into intuitive, beautiful interfaces. We introduced a new design system, streamlined the onboarding process, and created a dark mode that users loved, resulting in a 40% increase in daily active users.",
  },
  {
    id: 4,
    title: "Editorial Magazine Layout",
    category: "Graphics",
    client: "Fashion Brand",
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/971458200285671.665ffd88043ac.jpg",
    description:
      "A bespoke editorial design for a luxury fashion brand's quarterly print and digital magazine. The layout emphasized striking typography, generous whitespace, and high-impact photography, creating a premium reading experience that perfectly aligned with the brand's sophisticated image.",
  },
  {
    id: 5,
    title: "Eva Sri Lanka — Women's Day Campaign",
    category: "Video & Reels",
    client: "Ihara IJ",
    image: "/Images/Thumbnail1.jpg",    // saved locally in /public/Images/
    description:
      "A series of high-end, fast-paced promotional reels designed specifically for Instagram and TikTok. By combining lifestyle footage with kinetic typography and trending audio, we helped the luxury label reach a younger demographic, driving a significant spike in social engagement and direct sales.",
    videoUrl: "https://www.facebook.com/reel/945119381397324",   // fixed: www. not web.
    videoType: "facebook-reel",
  },
  {
    id: 6,
    title: "E-commerce Experience",
    category: "Graphics",
    client: "Retail Giant",
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/a3f819199490545.6652ac52e1306.jpg",
    description:
      "An innovative e-commerce platform redesign that prioritized mobile-first shopping. We implemented a seamless checkout flow, interactive product galleries, and personalized recommendation interfaces, ultimately reducing cart abandonment by 25% and boosting overall conversion rates.",
  },
  {
    id: 7,
    title: "Brand Identity Design",
    category: "Graphics",
    client: "Creative Studio",
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/c7bc07191561065.65cdbb8bdf2db.png",
    description:
      "A comprehensive brand identity system built from scratch for an emerging creative studio — including logo variants, color palette, typography system, and brand guidelines document.",
  },
  {
    id: 8,
    title: "Product Launch Campaign",
    category: "Graphics",
    client: "Lifestyle Brand",
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/754540191560717.65cdb7bf9fbfd.jpg",
    description:
      "Full visual campaign for a product launch spanning social media, print collateral, and digital ads. The campaign delivered a cohesive look and feel across every touchpoint.",
  },
  {
    id: 9,
    title: "Aruja AJ Campaign",
    category: "Video & Reels",
    client: "Aruja AJ",
    image: "/Images/Thumbnail1.jpg",    // replace with the correct thumbnail
    description:
      "A series of high-end, fast-paced promotional reels designed specifically for Instagram and TikTok. By combining lifestyle footage with kinetic typography and trending audio, we helped the luxury label reach a younger demographic, driving a significant spike in social engagement and direct sales.",
    videoUrl: "https://www.facebook.com/reel/1355566199930120",  // fixed: www. not web.
    videoType: "facebook-reel",
  },

  // ── ADD NEW PROJECTS BELOW ─────────────────────────────────────────────────
  //
  // YouTube (thumbnail auto-fetched — no image needed):
  // {
  //   id: 10,
  //   title: "Your Video Title",
  //   category: "Video & Reels",
  //   client: "Client Name",
  //   description: "...",
  //   videoUrl: "https://www.youtube.com/watch?v=XXXXXXXXX",
  //   videoType: "youtube",
  // },
  //
  // Facebook Reel (save thumbnail to /public/Images/ first):
  // {
  //   id: 11,
  //   title: "Your Reel Title",
  //   category: "Video & Reels",
  //   client: "Client Name",
  //   image: "/Images/your-thumbnail.jpg",
  //   description: "...",
  //   videoUrl: "https://www.facebook.com/reel/XXXXXXXXX",
  //   videoType: "facebook-reel",
  // },
  //
  // Image only:
  // {
  //   id: 12,
  //   title: "Project Title",
  //   category: "Graphics",
  //   client: "Client Name",
  //   image: "https://...",
  //   description: "...",
  // },
];

export const categories = ["All", "Graphics", "Video & Reels", "UI Design"] as const;
export const INITIAL_COUNT   = 6;
export const LOAD_MORE_COUNT = 3;