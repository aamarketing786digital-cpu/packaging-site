"use client";

import Link from "next/link";
import { useEffect } from "react";

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
        className="fixed inset-0 z-40 bg-surface-overlay"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <div className="fixed inset-y-0 left-0 z-50 w-full max-w-sm bg-bg-elevated shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-border-subtle">
            <span className="font-heading font-semibold text-lg">Menu</span>
            <button
              onClick={onClose}
              className="p-2 text-text-secondary hover:text-text-primary"
              aria-label="Close menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-4">
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
          <div className="px-4 py-6 border-t border-border-subtle">
            <a
              href="tel:+971XXXXXXXXX"
              className="flex items-center justify-center gap-2 py-3 px-4 bg-whatsapp text-white rounded-lg hover:bg-whatsapp-hover transition-colors"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52.075-.149.669-1.612.916-2.207.242-.579.487-.5.669-.438.173-.062.348-.025.523.149.174.149.371.347.571.545.198.198.397.407.595.616.198.199.396.41.594.637.198.226.396.497.594.637.198.139.348.223.523.149.174-.074.348-.298.523-.545.173-.248.346-.497.545-.746.198-.248.396-.497.594-.746.198-.248.348-.497.149-.746-.149-.248-.347-.497-.545-.746-.198-.248-.396-.497-.594-.746-.198-.248-.396-.497-.594-.746-.198-.248-.396-.497-.594-.746-.198-.248-.396-.497-.594-.746-.198-.248-.396-.497-.594-.746-.198-.248-.396-.497-.594-.746-.198-.248-.396-.497-.594-.746z" />
              </svg>
              <span className="font-medium">Call Now</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
