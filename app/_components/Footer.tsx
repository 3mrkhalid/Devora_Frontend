import {
  Camera,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";

import Link from "next/link";

function Footer(): React.JSX.Element {
  return (
    <footer className="bg-[#0B0B0F] text-zinc-100">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8 lg:pt-24">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold sm:text-5xl">
            Build. Connect. Collaborate.
          </h2>

          <p className="mx-auto mt-4 max-w-md text-zinc-400">
            Join Devora, connect with student developers, share ideas,
            and build meaningful projects together.
          </p>

          <Link
            href="/about_us"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-600 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
          >
            Discover Devora
            <ArrowRight size={18} />
          </Link>
        </div>

        
        <div className="mt-16 border-t border-white/10 pt-8 lg:mt-24">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <p className="text-center text-sm text-zinc-500">
              © 2026 Devora. All rights reserved.
            </p>
        
            <nav
              aria-label="Footer navigation"
              className="flex flex-wrap justify-center gap-6 md:mr-30"
            >
              <Link
                href="/privacy"
                className="text-sm text-zinc-400 transition-colors hover:text-violet-400"
              >
                Privacy Policy
              </Link>
        
              <Link
                href="/about_us"
                className="text-sm text-zinc-400 transition-colors hover:text-violet-400"
              >
                About Us
              </Link>
        
              <Link
                href="/contact_us"
                className="text-sm text-zinc-400 transition-colors hover:text-violet-400"
              >
                Contact Us
              </Link>
            </nav>
        
            <ul className="flex items-center justify-center gap-5">
              <li>
                <a
                  href="https://github.com"
                  aria-label="GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 transition-colors hover:text-violet-400"
                >
                  <FaGithub size={21} />
                </a>
              </li>
        
              <li>
                <a
                  href="https://www.instagram.com"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 transition-colors hover:text-violet-400"
                >
                  <Camera size={21} />
                </a>
              </li>
        
              <li>
                <a
                  href="https://www.facebook.com"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 transition-colors hover:text-violet-400"
                >
                  <MessageCircle size={21} />
                </a>
              </li>
            </ul>
          </div>
        </div>

      </div>
    
    
    </footer>
  );
}

export default Footer;