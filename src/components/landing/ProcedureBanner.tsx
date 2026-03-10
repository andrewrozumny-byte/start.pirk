"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Procedure {
  name: string;
  shortName: string;
  emoji: string;
  category: "breast" | "face" | "body";
  quizValue: string;
  tagline: string;
  detail: string;
  surgeonCount: string;
}

const procedures: Procedure[] = [
  {
    name: "Breast Augmentation",
    shortName: "Augmentation",
    emoji: "✦",
    category: "breast",
    quizValue: "breast_augmentation",
    tagline: "Australia's most commonly performed cosmetic procedure",
    detail:
      "Implants or fat transfer to increase size and improve shape. We vet surgeons on technique, implant brand relationships, and revision rates.",
    surgeonCount: "80+",
  },
  {
    name: "Breast Lift",
    shortName: "Breast Lift",
    emoji: "✦",
    category: "breast",
    quizValue: "breast_lift",
    tagline: "Restore shape and position after pregnancy or weight loss",
    detail:
      "Mastopexy surgery to lift and reshape. Results vary significantly by surgeon — we match you to specialists with proven, natural-looking outcomes.",
    surgeonCount: "60+",
  },
  {
    name: "Breast Reduction",
    shortName: "Reduction",
    emoji: "✦",
    category: "breast",
    quizValue: "breast_reduction",
    tagline: "May be partially covered by Medicare",
    detail:
      "Reduces size and relieves physical discomfort. We help identify which surgeons can navigate Medicare rebates for eligible patients.",
    surgeonCount: "55+",
  },
  {
    name: "Rhinoplasty",
    shortName: "Nose Job",
    emoji: "◆",
    category: "face",
    quizValue: "rhinoplasty",
    tagline: "One of the most technically complex facial procedures",
    detail:
      "Reshaping the nose for aesthetic or functional reasons. Surgeon choice is critical — we only match you with FRACS specialists who perform rhinoplasty regularly.",
    surgeonCount: "40+",
  },
  {
    name: "Facelift",
    shortName: "Facelift",
    emoji: "◆",
    category: "face",
    quizValue: "facelift",
    tagline: "The gold standard for facial rejuvenation",
    detail:
      "Lifts and tightens facial tissue for a natural, rested appearance. Experience matters enormously — we filter for surgeons with 10+ years in facial work.",
    surgeonCount: "35+",
  },
  {
    name: "Blepharoplasty",
    shortName: "Eyelid Surgery",
    emoji: "◆",
    category: "face",
    quizValue: "blepharoplasty",
    tagline: "Upper or lower eyelid rejuvenation",
    detail:
      "Removes excess skin and fat for a more alert, youthful appearance. Often combined with brow lift. We match surgeons by volume and patient satisfaction.",
    surgeonCount: "45+",
  },
  {
    name: "Abdominoplasty",
    shortName: "Abdominoplasty",
    emoji: "●",
    category: "body",
    quizValue: "abdominoplasty",
    tagline: "Restore your core after pregnancy or weight loss",
    detail:
      "Removes loose skin and repairs separated abdominal muscles. Results vary dramatically by technique — we match you to specialists, not generalists.",
    surgeonCount: "50+",
  },
  {
    name: "Liposuction",
    shortName: "Liposuction",
    emoji: "●",
    category: "body",
    quizValue: "liposuction",
    tagline: "Targeted fat removal with precision",
    detail:
      "VASER, traditional, or laser — technique and surgeon skill determine results. We explain the difference and match you to the right specialist for your goals.",
    surgeonCount: "70+",
  },
  {
    name: "Combined Body Procedures",
    shortName: "Combined Body",
    emoji: "●",
    category: "body",
    quizValue: "combined_body",
    tagline: "Multiple procedures planned together for cohesive results",
    detail:
      "Typically combines breast surgery with abdominoplasty and/or liposuction. Requires a surgeon experienced in multi-procedure planning — we vet exactly for this.",
    surgeonCount: "45+",
  },
];

const categoryColours = {
  breast: "bg-pink-50 border-pink-200 text-pink-700",
  face: "bg-amber-50 border-amber-200 text-amber-700",
  body: "bg-teal-50 border-teal-200 text-teal-700",
};

export default function ProcedureBanner() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="border-y border-gray-100 bg-white py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-coral">
            Procedures We Cover
          </p>
          <h2 className="text-pirk-heading mt-2 text-2xl font-bold text-burgundy md:text-3xl">
            Australia&apos;s independently vetted plastic surgeons, matched to your procedure
          </h2>
          <p className="mt-2 text-warm-grey">
            Hover any procedure to learn what to look for in a surgeon.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9">
          {procedures.map((proc) => (
            <div
              key={proc.quizValue}
              className="relative"
              onMouseEnter={() => setHoveredId(proc.quizValue)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Link
                href={`/quiz?procedure=${proc.quizValue}`}
                className={`
                  group flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center
                  transition-all duration-200 hover:shadow-md hover:-translate-y-0.5
                  ${
                    hoveredId === proc.quizValue
                      ? "border-coral bg-coral-light"
                      : "border-gray-100 bg-gray-50 hover:border-coral/30"
                  }
                `}
              >
                <span className="text-xl text-coral">{proc.emoji}</span>
                <span
                  className={`text-xs font-semibold leading-tight ${
                    hoveredId === proc.quizValue
                      ? "text-burgundy"
                      : "text-near-black"
                  }`}
                >
                  {proc.shortName}
                </span>
                <span
                  className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${categoryColours[proc.category]}`}
                >
                  {proc.category.charAt(0).toUpperCase() +
                    proc.category.slice(1)}
                </span>
              </Link>

              {/* Hover tooltip */}
              <AnimatePresence>
                {hoveredId === proc.quizValue && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-full left-1/2 z-50 mb-3 w-64 -translate-x-1/2 rounded-xl border border-coral/20 bg-white p-4 shadow-xl"
                  >
                    {/* Arrow */}
                    <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-coral/20 bg-white" />

                    <p className="text-xs font-bold uppercase tracking-wider text-coral">
                      {proc.name}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-burgundy">
                      {proc.tagline}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-warm-grey">
                      {proc.detail}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs text-warm-grey">
                        <span className="font-bold text-coral">
                          {proc.surgeonCount}
                        </span>{" "}
                        surgeons in network
                      </span>
                      <span className="text-xs font-semibold text-coral">
                        Find mine →
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-warm-grey">
          Not sure which procedure?{" "}
          <Link
            href="/quiz"
            className="font-semibold text-coral underline underline-offset-2 hover:text-burgundy"
          >
            Start with our 2-minute quiz
          </Link>{" "}
          and we&apos;ll guide you.
        </p>
      </div>
    </section>
  );
}
