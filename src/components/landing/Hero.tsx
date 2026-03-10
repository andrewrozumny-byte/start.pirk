"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Phone, Shield, CheckCircle, Star, Search, MapPin } from "lucide-react";

function AnimatedCounter({
  target,
  suffix = "",
  label,
}: {
  target: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl font-bold text-coral md:text-4xl">
        {count}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-warm-grey">{label}</p>
    </div>
  );
}

const locations = [
  "Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast",
];

const trustBadges = [
  { icon: Shield, label: "Every surgeon mystery-shopped" },
  { icon: CheckCircle, label: "Full refund if we can't match you" },
  { icon: Star, label: "5.0 from verified clients" },
  { icon: Search, label: "200+ surgeons independently vetted" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream pt-28 pb-0 md:pt-36">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cream via-cream to-coral-light/30" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-5 flex justify-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-coral/20 bg-white px-4 py-1.5 text-xs font-semibold text-coral shadow-sm">
            <Search className="h-3 w-3" />
            Australia&apos;s independent plastic surgeon matching service
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-center"
        >
          <h1 className="text-pirk-heading text-4xl font-extrabold leading-tight text-burgundy md:text-5xl lg:text-6xl">
            Find the Right Plastic Surgeon{" "}
            <span className="text-coral">for You — Not Just the Nearest One.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-warm-grey md:text-xl">
            We&apos;ve mystery-shopped and independently vetted 200+ FRACS-qualified
            plastic surgeons across Australia. Tell us your procedure, location, and
            what matters most — we&apos;ll match you to the right surgeon in minutes.
          </p>

          {/* Location strip */}
          <motion.div
            className="mt-5 flex flex-wrap items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <MapPin className="h-3.5 w-3.5 text-warm-grey" />
            {locations.map((city, i) => (
              <span key={city} className="text-xs text-warm-grey">
                {city}
                {i < locations.length - 1 && (
                  <span className="ml-2 text-coral/40">·</span>
                )}
              </span>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Link
              href="/quiz"
              className="w-full rounded-full bg-coral px-8 py-4 text-center text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:brightness-105 sm:w-auto"
            >
              Find My Surgeon — Free
            </Link>
            <Link
              href="tel:1800577017"
              className="inline-flex items-center justify-center gap-2 text-warm-grey transition-colors hover:text-coral"
            >
              <Phone className="h-4 w-4" />
              or call 1800 577 017
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {trustBadges.map((badge) => (
              <span
                key={badge.label}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-warm-grey"
              >
                <badge.icon className="h-3.5 w-3.5 text-coral" />
                {badge.label}
              </span>
            ))}
          </motion.div>

          {/* Mini testimonial */}
          <motion.div
            className="mx-auto mt-8 max-w-lg rounded-xl border border-coral/10 bg-white/70 px-5 py-4 text-left backdrop-blur-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="mt-2 text-sm italic text-near-black">
              &ldquo;Without Pirk I&apos;d still be staring at my vision board —
              now I&apos;m picking between excellent surgeons who actually match
              what I was looking for.&rdquo;
            </p>
            <p className="mt-1 text-xs font-semibold text-burgundy">
              — Audrey Isabella, Sydney
            </p>
          </motion.div>
        </motion.div>

        {/* Stat counters */}
        <motion.div
          className="mt-14 grid grid-cols-3 gap-6 rounded-xl border border-coral/5 bg-white/60 px-6 py-8 backdrop-blur-sm md:mt-16 md:gap-12 md:px-12 md:py-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <AnimatedCounter target={200} suffix="+" label="Plastic surgeons vetted across Australia" />
          <AnimatedCounter target={2500} suffix="+" label="Patients matched and guided" />
          <AnimatedCounter target={15} suffix="" label="Criteria checked per surgeon" />
        </motion.div>
      </div>
    </section>
  );
}
