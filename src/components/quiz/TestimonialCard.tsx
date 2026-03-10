"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  location: string;
  initials: string;
}

export default function TestimonialCard({
  quote,
  name,
  location,
  initials,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center justify-center text-center p-10 bg-white rounded-2xl shadow-lg border border-coral-light max-w-md mx-auto"
    >
      {/* Stars */}
      <div className="flex gap-1 mb-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
        ))}
      </div>

      {/* Quote */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-near-black text-lg italic leading-relaxed mb-8"
      >
        &ldquo;{quote}&rdquo;
      </motion.p>

      {/* Avatar + name */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded-full bg-coral flex items-center justify-center shrink-0">
          <span className="text-white text-sm font-bold">{initials}</span>
        </div>
        <div className="text-left">
          <p className="font-semibold text-near-black text-sm">{name}</p>
          <p className="text-warm-grey text-xs">{location}</p>
        </div>
      </motion.div>

      {/* Auto-advance progress indicator */}
      <div className="w-full h-1 bg-coral-light rounded-full mt-8 overflow-hidden">
        <motion.div
          className="h-full bg-coral rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3.5, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}
