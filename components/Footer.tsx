import { Instagram, Twitter, Linkedin, Mail,Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white pb-12 pt-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <a href="#" className="text-2xl font-display font-bold tracking-tighter">
              Pixellence Creations<span className="text-neutral-500">.</span>™
            </a>
            <p className="text-neutral-500 text-sm">Premium Content Creation Agency.</p>
          </div>

          <div className="flex items-center gap-6">
            <a href="https://www.instagram.com/pixellencecreations/" className="text-neutral-400 hover:text-white transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://web.facebook.com/pixellencecreationslk" className="text-neutral-400 hover:text-white transition-colors">
              <Facebook size={20} />
            </a>
            <a href="https://www.linkedin.com/company/117265005" className="text-neutral-400 hover:text-white transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="mailto:pixelencecreatons@gmail.com" className="text-neutral-400 hover:text-white transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
          <p>© {new Date().getFullYear()} Pixellence Creations. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
