"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Phone } from "lucide-react";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-surface-overlay"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <div className="fixed inset-y-0 left-0 z-[55] w-full max-w-sm bg-bg-elevated shadow-xl">
        <div className="flex flex-col h-full pt-20">
          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
            <Link
              href="/products"
              onClick={onClose}
              className="block py-3 px-4 text-base font-medium text-text-secondary hover:text-text-primary hover:bg-bg-subtle rounded-lg transition-colors"
            >
              Products
            </Link>
            <Link
              href="/blog"
              onClick={onClose}
              className="block py-3 px-4 text-base font-medium text-text-secondary hover:text-text-primary hover:bg-bg-subtle rounded-lg transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/about"
              onClick={onClose}
              className="block py-3 px-4 text-base font-medium text-text-secondary hover:text-text-primary hover:bg-bg-subtle rounded-lg transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={onClose}
              className="block py-3 px-4 text-base font-medium text-text-secondary hover:text-text-primary hover:bg-bg-subtle rounded-lg transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Contact CTA */}
          <div className="px-4 py-6 mt-auto pb-8 border-t border-border-subtle">
            <a
              href="tel:+971500000000"
              className="group relative flex w-full items-center justify-center gap-2 px-6 py-3.5 bg-brand-accent text-white hover:text-white rounded-full font-bold shadow-lg shadow-brand-accent/20 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-shimmer z-0" />
              <Phone className="w-5 h-5 relative z-10 text-white" />
              <span className="relative z-10 text-white text-lg">Call Us</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
