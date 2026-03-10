"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Star,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  Heart,
  AlertCircle,
  Clock,
  DollarSign,
  Zap,
  Search,
  BookOpen,
} from "lucide-react";

// ─── SVG Procedure Diagrams ────────────────────────────────────────────────

function AugmentationSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 60" className={className} fill="none">
      <path d="M10 45 Q10 20 25 18 Q40 16 40 16 Q40 16 55 18 Q70 20 70 45" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M15 45 Q15 22 28 20 Q40 18 40 18 Q40 18 52 20 Q65 22 65 45" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="none" opacity="0.3"/>
      <path d="M40 16 L40 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <text x="40" y="6" textAnchor="middle" fontSize="5" fill="currentColor">+</text>
    </svg>
  );
}

function LiftSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 60" className={className} fill="none">
      <path d="M12 48 Q14 30 28 26 Q36 24 36 38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" strokeDasharray="3 2"/>
      <path d="M68 48 Q66 30 52 26 Q44 24 44 38" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" strokeDasharray="3 2"/>
      <path d="M14 44 Q16 24 28 20 Q36 17 40 17 Q44 17 52 20 Q64 24 66 44" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="30" y1="32" x2="30" y2="25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <polyline points="27,27 30,23 33,27" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="50" y1="32" x2="50" y2="25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <polyline points="47,27 50,23 53,27" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function AugLiftSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 60" className={className} fill="none">
      <path d="M14 46 Q16 22 28 18 Q40 15 40 15 Q40 15 52 18 Q64 22 66 46" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="28" y1="30" x2="28" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <polyline points="25,25 28,21 31,25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="52" y1="30" x2="52" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <polyline points="49,25 52,21 55,25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <text x="40" y="13" textAnchor="middle" fontSize="5" fill="currentColor">+</text>
    </svg>
  );
}

function ReductionSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 60" className={className} fill="none">
      <path d="M8 46 Q8 18 26 14 Q40 12 40 12 Q40 12 54 14 Q72 18 72 46" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" strokeDasharray="3 2"/>
      <path d="M16 44 Q17 24 28 21 Q40 18 40 18 Q40 18 52 21 Q63 24 64 44" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="24" y1="28" x2="30" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <polyline points="28,25 32,28 28,31" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="56" y1="28" x2="50" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <polyline points="52,25 48,28 52,31" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function RevisionSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 60" className={className} fill="none">
      <path d="M14 44 Q16 22 28 19 Q40 16 40 16 Q40 16 52 19 Q64 22 66 44" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M34 26 Q40 21 46 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <polyline points="44,22 46,26 42,27" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M46 32 Q40 37 34 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <polyline points="36,36 34,32 38,31" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ReconstructionSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 60" className={className} fill="none">
      <path d="M14 44 Q16 22 28 19 Q40 16 40 16 Q40 16 52 19 Q64 22 66 44" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M36 24 Q38 21 40 23 Q42 21 44 24 Q44 28 40 31 Q36 28 36 24Z" fill="currentColor" opacity="0.6"/>
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const procedures = [
  {
    id: "augmentation",
    title: "Breast Augmentation",
    shortTitle: "Augmentation",
    Icon: AugmentationSVG,
    tagline: "Implants or fat transfer to enhance size and shape",
    detail: "Implant type, profile, placement, and incision — all vary, all matter. Surgeon experience with your specific preferences changes outcomes significantly.",
    keyQ: ["Which implant? Round or anatomical?", "Over or under the muscle?", "Silicone, saline, or MOTIVA?", "Inframammary, periareolar, or transaxillary?"],
    value: "breast_augmentation",
    color: "coral",
    hasImplantPrefs: true,
  },
  {
    id: "lift",
    title: "Mastopexy",
    shortTitle: "Breast Lift",
    Icon: LiftSVG,
    tagline: "Reshape and lift without changing size",
    detail: "Technique depends on how much lift is needed. Anchor, lollipop, or crescent — and the difference in scarring is real. Not every surgeon does all techniques well.",
    keyQ: ["What degree of ptosis (droop)?", "Anchor vs. lollipop technique?", "Nipple position and size", "Combining with implants later?"],
    value: "breast_lift",
    hasImplantPrefs: false,
  },
  {
    id: "aug-lift",
    title: "Augmentation + Lift",
    shortTitle: "Aug + Lift",
    Icon: AugLiftSVG,
    tagline: "The most technically demanding combination",
    detail: "Doing both simultaneously requires specific expertise. Not all surgeons offer this — and staged procedures aren't always the answer. Know the difference before you book.",
    keyQ: ["Simultaneous or staged?", "Sizing with a lift applied", "Higher complication risk", "Long-term implant-lift interaction"],
    value: "aug_lift",
    highlight: true,
    hasImplantPrefs: true,
  },
  {
    id: "reduction",
    title: "Breast Reduction",
    shortTitle: "Reduction",
    Icon: ReductionSVG,
    tagline: "Relief, proportion, and a procedure you deserve",
    detail: "Many women wait years. When you're ready, you deserve a surgeon who treats this with the clinical precision and empathy it requires — and knows the Medicare pathway.",
    keyQ: ["Medicare rebate eligibility?", "Nipple sensation preservation", "Scarring patterns by technique", "Ideal final size/weight"],
    value: "breast_reduction",
    hasImplantPrefs: false,
  },
  {
    id: "revision",
    title: "Implant Revision",
    shortTitle: "Revision / Removal",
    Icon: RevisionSVG,
    tagline: "Correcting or removing previous implants",
    detail: "This is one of the most technically specialised areas in breast surgery. Not all surgeons take revision cases — and fewer do them well. We only refer to those who do.",
    keyQ: ["Capsular contracture grade?", "En bloc vs. standard removal?", "Implant exchange or explant?", "Surgeon revision case volume"],
    value: "implant_revision",
    hasImplantPrefs: false,
  },
  {
    id: "reconstruction",
    title: "Reconstruction",
    shortTitle: "Reconstruction",
    Icon: ReconstructionSVG,
    tagline: "Rebuilding after mastectomy or lumpectomy",
    detail: "An intensely personal journey. We work to match you with a reconstructive specialist who coordinates with your oncology team and supports you through every stage.",
    keyQ: ["Implant vs. flap reconstruction?", "Immediate or delayed?", "Nipple reconstruction options", "Oncology team coordination"],
    value: "breast_reconstruction",
    hasImplantPrefs: false,
  },
];

const sizeGoals = [
  { label: "Natural / subtle", sub: "Small change, still me", value: "natural", before: [14, 14], after: [14, 14] },
  { label: "Noticeably fuller", sub: "A cup size or two up", value: "fuller", before: [14, 14], after: [14, 22] },
  { label: "Significantly larger", sub: "Obvious, intentional change", value: "larger", before: [14, 14], after: [14, 30] },
  { label: "Smaller & lighter", sub: "Relief, proportion, comfort", value: "reduction", before: [28, 28], after: [18, 18] },
];

const profileOptions = [
  { label: "Low", sub: "Sits flatter, wider base", value: "low", arc: "M5 30 Q5 10 20 8 Q28 7 28 20" },
  { label: "Moderate", sub: "Balanced projection", value: "moderate", arc: "M5 30 Q5 8 20 5 Q30 4 30 18" },
  { label: "Mod Plus", sub: "Fuller projection", value: "mod_plus", arc: "M5 30 Q4 6 20 3 Q32 2 32 16" },
  { label: "High", sub: "Maximum projection", value: "high", arc: "M5 30 Q3 4 20 1 Q34 0 34 14" },
];

const shapeOptions = [
  { label: "Round", sub: "Fullness top & bottom", value: "round" },
  { label: "Anatomical", sub: "Teardrop — more natural slope", value: "anatomical" },
];

const researchLevels = [
  { icon: BookOpen, label: "Just starting out", sub: "I know I want something done but haven't done much research yet", value: "starting" },
  { icon: Search, label: "I've been researching", sub: "I've looked into it but still not sure which surgeon or technique is right", value: "researching" },
  { icon: Zap, label: "I know what I want", sub: "I've done my research — I just need to find the right surgeon", value: "specific" },
];

const testimonials = [
  { quote: "I'd been researching augmentation surgeons for 8 months and still felt lost. Pirk matched me in days and my advisor actually understood exactly what I was asking for.", name: "Sophie T.", location: "Brisbane", initials: "ST", procedure: "Breast Augmentation" },
  { quote: "I knew I wanted Motiva implants, moderate plus profile, under the muscle. Pirk found me a surgeon who actually specialised in that — not just any breast surgeon.", name: "Jade K.", location: "Sydney", initials: "JK", procedure: "Specific Augmentation" },
  { quote: "I was so embarrassed to talk about my reduction — like I had to justify it. My Pirk advisor just got it immediately. No judgment, just help.", name: "Mel R.", location: "Sydney", initials: "MR", procedure: "Breast Reduction" },
  { quote: "I needed revision surgery after a bad experience elsewhere. Pirk found me a surgeon who actually specialised in revision cases — not just someone who would take the job.", name: "Carla D.", location: "Melbourne", initials: "CD", procedure: "Implant Revision" },
];

const whatWeCheck = [
  "FRACS accreditation & specialist registration",
  "Procedure-specific case volume (volume matters)",
  "Implant brand training & technique range",
  "Before & after results for your exact procedure",
  "Complication & revision rates",
  "Medicare eligibility (reductions & reconstruction)",
  "Wait times & current availability in your state",
  "Transparent fee structures — no hidden costs",
];

// ─── Components ───────────────────────────────────────────────────────────────

function QuizCTA({ href, label, subtext, variant = "coral" }: {
  href: string; label: string; subtext?: string; variant?: "coral" | "burgundy" | "white";
}) {
  const classes = {
    coral: "bg-coral text-white hover:brightness-105 shadow-lg hover:shadow-xl",
    burgundy: "bg-burgundy text-white hover:brightness-110 shadow-md hover:shadow-lg",
    white: "bg-white text-coral hover:brightness-95 shadow-lg hover:shadow-xl",
  }[variant];
  return (
    <div className="text-center">
      <Link href={href} className={`inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-bold transition-all ${classes}`}>
        {label}<ArrowRight className="h-5 w-5" />
      </Link>
      {subtext && <p className="mt-3 text-sm opacity-60">{subtext}</p>}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function BreastSurgeryContent() {
  const searchParams = useSearchParams();
  const [selectedProcedure, setSelectedProcedure] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);
  const [selectedShape, setSelectedShape] = useState<string | null>(null);
  const [researchLevel, setResearchLevel] = useState<string | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const prefsRef = useRef<HTMLDivElement>(null);
  const researchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => setTestimonialIndex((i) => (i + 1) % testimonials.length), 4500);
    return () => clearInterval(t);
  }, []);

  // Scroll into view when inline sections appear
  useEffect(() => {
    if (!selectedProcedure) return;
    const proc = procedures.find((p) => p.value === selectedProcedure);
    if (proc?.hasImplantPrefs) {
      setTimeout(() => prefsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } else {
      setTimeout(() => researchRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  }, [selectedProcedure]);

  useEffect(() => {
    if (selectedSize !== null && !showImplantProfile) {
      setTimeout(() => researchRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSize]);

  const buildQuizUrl = () => {
    const params = new URLSearchParams();
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "ttclid"].forEach((key) => {
      const val = searchParams.get(key);
      if (val) params.set(key, val);
    });
    if (selectedProcedure) params.set("procedure", selectedProcedure);
    if (selectedSize) params.set("size_goal", selectedSize);
    if (selectedProfile) params.set("profile", selectedProfile);
    if (selectedShape) params.set("shape", selectedShape);
    if (researchLevel) params.set("research_level", researchLevel);
    return `/quiz?${params.toString()}`;
  };

  const quizUrl = buildQuizUrl();
  const selectedProc = procedures.find((p) => p.value === selectedProcedure);
  const showImplantPrefs = selectedProc?.hasImplantPrefs ?? false;
  const showImplantProfile = selectedProcedure === "breast_augmentation" || selectedProcedure === "aug_lift";
  // Show research level once size is chosen (or immediately for non-aug procedures)
  const showResearch = selectedProcedure !== null && (!showImplantPrefs || selectedSize !== null);

  return (
    <>
      {/* ── 1. HERO ───────────────────────────────────────────────── */}
      <section className="px-5 pt-6 pb-10 text-center md:pt-10 md:pb-14">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-coral/20 bg-white px-4 py-1.5 text-xs font-semibold text-coral shadow-sm">
            <Shield className="h-3 w-3" />
            Independent · Not a clinic · Not sponsored by surgeons
          </div>
          <h1 className="text-pirk-heading text-3xl font-extrabold leading-tight text-burgundy md:text-4xl lg:text-5xl">
            Breast surgery is one of the most{" "}
            <span className="text-coral">personal decisions you&apos;ll ever make.</span>
            <br className="hidden md:block" /> Get it right.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-warm-grey">
            Pirk independently vets breast surgeons across Australia and matches you with someone who has specific experience in <em>your</em> procedure — not just a surgeon who says they do everything.
          </p>
          <div className="mt-8">
            <QuizCTA href={quizUrl} label="Find My Surgeon" subtext="2-minute quiz · No obligation" variant="coral" />
          </div>
          <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2">
            {["Every surgeon independently vetted", "Full refund if we can't match you", "5.0 from verified clients"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 text-xs font-medium text-warm-grey">
                <CheckCircle className="h-3.5 w-3.5 text-coral" />{t}
              </span>
            ))}
          </div>
        </motion.div>
        <motion.div className="mt-10 flex justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}>
            <ChevronDown className="h-5 w-5 text-warm-grey/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── 2. INTERACTIVE FUNNEL (procedure → preferences → research → CTA) ── */}
      <section className="bg-white px-5 py-12 md:py-16">
        <div className="mx-auto max-w-4xl">

          {/* Step 1: Procedure */}
          <div className="text-center mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-coral">Step 1</p>
            <h2 className="text-pirk-heading mt-2 text-2xl font-extrabold text-burgundy md:text-3xl">
              Which procedure are you considering?
            </h2>
            <p className="mt-2 text-warm-grey">Each one requires different expertise. Tap yours to learn more.</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {procedures.map((proc) => {
              const isSelected = selectedProcedure === proc.value;
              return (
                <motion.button
                  key={proc.id}
                  onClick={() => {
                    setSelectedProcedure(isSelected ? null : proc.value);
                    setSelectedSize(null);
                    setSelectedProfile(null);
                    setSelectedShape(null);
                    setResearchLevel(null);
                  }}
                  whileTap={{ scale: 0.97 }}
                  className={`text-left rounded-2xl border-2 p-5 transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "border-coral bg-coral/5 shadow-md"
                      : "border-gray-100 bg-cream hover:border-coral/40 hover:shadow-sm"
                  } ${proc.highlight ? "ring-1 ring-coral/20" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`h-14 w-14 shrink-0 rounded-xl flex items-center justify-center ${isSelected ? "bg-coral/10" : "bg-white"}`}>
                      <proc.Icon className={`h-10 w-10 ${isSelected ? "text-coral" : "text-warm-grey"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-burgundy text-sm leading-tight">{proc.title}</h3>
                        {proc.highlight && (
                          <span className="shrink-0 rounded-full bg-coral px-2 py-0.5 text-[10px] font-bold uppercase text-white">Popular</span>
                        )}
                      </div>
                      <p className="text-xs text-warm-grey mt-0.5 leading-snug">{proc.tagline}</p>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-sm text-near-black leading-relaxed border-t border-coral/10 pt-4">
                          {proc.detail}
                        </p>
                        <div className="mt-3 space-y-1.5">
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-coral">Key decisions for this procedure:</p>
                          {proc.keyQ.map((q) => (
                            <div key={q} className="flex items-start gap-2 text-xs text-warm-grey">
                              <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                              {q}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>

          {/* Step 2: Implant Preferences (inline, for aug procedures only) */}
          <AnimatePresence>
            {showImplantPrefs && (
              <motion.div
                ref={prefsRef}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="mt-10 rounded-3xl bg-cream p-6 md:p-8 border border-coral/10"
              >
                <div className="mb-7">
                  <p className="text-sm font-semibold uppercase tracking-widest text-coral">Step 2</p>
                  <h3 className="text-pirk-heading mt-1 text-xl font-extrabold text-burgundy md:text-2xl">
                    Tell us what you&apos;re hoping for
                  </h3>
                  <p className="mt-1 text-sm text-warm-grey">This helps us match you with a surgeon who specialises in your goals — not just breast surgery in general.</p>
                </div>

                {/* Size goal */}
                <div className="mb-7">
                  <p className="text-sm font-bold text-burgundy mb-3">What result are you looking for?</p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {sizeGoals.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setSelectedSize(opt.value)}
                        className={`rounded-xl border-2 p-4 text-center transition-all cursor-pointer ${
                          selectedSize === opt.value
                            ? "border-coral bg-white shadow-md"
                            : "border-gray-200 bg-white hover:border-coral/40"
                        }`}
                      >
                        {/* Visual size circles — before vs after */}
                        <div className="flex items-end justify-center gap-1.5 mb-3 h-10">
                          <div
                            className="rounded-full bg-warm-grey/20 shrink-0"
                            style={{ width: opt.before[0], height: opt.before[0] }}
                          />
                          <div
                            className={`rounded-full shrink-0 transition-colors ${selectedSize === opt.value ? "bg-coral" : "bg-coral/40"}`}
                            style={{ width: opt.after[0], height: opt.after[0] }}
                          />
                        </div>
                        <p className="text-sm font-semibold text-burgundy">{opt.label}</p>
                        <p className="text-xs text-warm-grey mt-0.5">{opt.sub}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Profile + Shape — only for pure augmentation, not aug+lift */}
                <AnimatePresence>
                  {showImplantProfile && selectedSize && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      {/* Profile */}
                      <div className="mb-7">
                        <p className="text-sm font-bold text-burgundy mb-1">Implant profile preference</p>
                        <p className="text-xs text-warm-grey mb-3">Profile controls how far the implant projects forward from the chest wall.</p>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                          {profileOptions.map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => setSelectedProfile(opt.value)}
                              className={`rounded-xl border-2 p-4 text-center transition-all cursor-pointer ${
                                selectedProfile === opt.value ? "border-coral bg-white shadow-md" : "border-gray-200 bg-white hover:border-coral/40"
                              }`}
                            >
                              <svg viewBox="0 0 40 32" className="w-full h-8 mb-2">
                                <line x1="5" y1="30" x2="35" y2="30" stroke="#d1d5db" strokeWidth="1.5"/>
                                <path
                                  d={opt.arc}
                                  stroke={selectedProfile === opt.value ? "#F2705C" : "#9CA3AF"}
                                  strokeWidth="2"
                                  fill="none"
                                  strokeLinecap="round"
                                />
                              </svg>
                              <p className="text-sm font-semibold text-burgundy">{opt.label}</p>
                              <p className="text-[10px] text-warm-grey mt-0.5 leading-tight">{opt.sub}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Shape */}
                      <div>
                        <p className="text-sm font-bold text-burgundy mb-1">Implant shape</p>
                        <p className="text-xs text-warm-grey mb-3">Round gives fullness at the top; anatomical follows a more natural slope.</p>
                        <div className="grid grid-cols-2 gap-3 max-w-xs">
                          {shapeOptions.map((opt) => (
                            <button
                              key={opt.value}
                              onClick={() => setSelectedShape(opt.value)}
                              className={`rounded-xl border-2 p-4 text-center transition-all cursor-pointer ${
                                selectedShape === opt.value ? "border-coral bg-white shadow-md" : "border-gray-200 bg-white hover:border-coral/40"
                              }`}
                            >
                              <svg viewBox="0 0 40 36" className="w-full h-8 mb-2">
                                {opt.value === "round" ? (
                                  <ellipse cx="20" cy="20" rx="14" ry="14"
                                    fill="none"
                                    stroke={selectedShape === opt.value ? "#F2705C" : "#9CA3AF"}
                                    strokeWidth="2"
                                  />
                                ) : (
                                  <path
                                    d="M6 32 Q6 10 20 6 Q34 10 34 32 Q27 28 20 28 Q13 28 6 32Z"
                                    fill="none"
                                    stroke={selectedShape === opt.value ? "#F2705C" : "#9CA3AF"}
                                    strokeWidth="2"
                                    strokeLinejoin="round"
                                  />
                                )}
                              </svg>
                              <p className="text-sm font-semibold text-burgundy">{opt.label}</p>
                              <p className="text-[10px] text-warm-grey mt-0.5 leading-tight">{opt.sub}</p>
                            </button>
                          ))}
                        </div>
                      </div>

                      <p className="mt-4 text-xs text-warm-grey italic">
                        Not sure? No problem — your advisor will walk you through each option on your call.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 3 (or Step 2): Research Level */}
          <AnimatePresence>
            {showResearch && (
              <motion.div
                ref={researchRef}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="mt-10 rounded-3xl bg-cream p-6 md:p-8 border border-coral/10"
              >
                <div className="mb-7">
                  <p className="text-sm font-semibold uppercase tracking-widest text-coral">
                    {showImplantPrefs ? "Step 3" : "Step 2"}
                  </p>
                  <h3 className="text-pirk-heading mt-1 text-xl font-extrabold text-burgundy md:text-2xl">
                    How far along are you?
                  </h3>
                  <p className="mt-1 text-sm text-warm-grey">We match you differently depending on where you&apos;re at. No wrong answer.</p>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  {researchLevels.map((level) => (
                    <button
                      key={level.value}
                      onClick={() => setResearchLevel(level.value)}
                      className={`text-left rounded-2xl border-2 p-5 transition-all cursor-pointer ${
                        researchLevel === level.value
                          ? "border-coral bg-white shadow-md"
                          : "border-gray-200 bg-white hover:border-coral/40"
                      }`}
                    >
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full mb-3 ${researchLevel === level.value ? "bg-coral" : "bg-coral/10"}`}>
                        <level.icon className={`h-5 w-5 ${researchLevel === level.value ? "text-white" : "text-coral"}`} />
                      </div>
                      <p className="font-bold text-burgundy text-sm">{level.label}</p>
                      <p className="text-xs text-warm-grey mt-1 leading-snug">{level.sub}</p>
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {researchLevel === "specific" && (
                    <motion.div key="specific" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="mt-5 rounded-2xl bg-burgundy px-6 py-5">
                      <p className="font-bold text-cream">You know what you want. We&apos;ll find who can deliver it.</p>
                      <p className="mt-1 text-sm text-cream/70">Tell us the specifics in the quiz — implant brand, technique, surgeon criteria — and we&apos;ll match based on that, not just geography.</p>
                    </motion.div>
                  )}
                  {researchLevel === "researching" && (
                    <motion.div key="researching" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="mt-5 rounded-2xl bg-coral/10 border border-coral/20 px-6 py-5">
                      <p className="font-bold text-burgundy">You&apos;re in the right place.</p>
                      <p className="mt-1 text-sm text-warm-grey">Our advisors help you translate your research into a shortlist of surgeons who match. We speak your language — implant profiles, technique differences, recovery timelines.</p>
                    </motion.div>
                  )}
                  {researchLevel === "starting" && (
                    <motion.div key="starting" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="mt-5 rounded-2xl bg-coral/10 border border-coral/20 px-6 py-5">
                      <p className="font-bold text-burgundy">That&apos;s exactly why Pirk exists.</p>
                      <p className="mt-1 text-sm text-warm-grey">We guide you through what to consider, what questions to ask, and which surgeons are worth consulting — before you spend a dollar on appointments.</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* CTA appears after research level is chosen */}
                <AnimatePresence>
                  {researchLevel && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="mt-7"
                    >
                      <QuizCTA href={quizUrl} label="Find My Surgeon Match" subtext="Takes 2 minutes · Advisor call included" variant="coral" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Always-visible CTA below the funnel */}
          {!selectedProcedure && (
            <div className="mt-10 text-center">
              <QuizCTA href={quizUrl} label="Find My Surgeon Match" subtext="Takes 2 minutes · No obligation" variant="coral" />
            </div>
          )}
        </div>
      </section>

      {/* ── 3. STATS STRIP ───────────────────────────────────────── */}
      <section className="bg-burgundy py-8">
        <div className="mx-auto max-w-xl px-5">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: "200+", label: "Surgeons vetted" },
              { value: "2,500+", label: "Patients guided" },
              { value: "5.0", label: "Verified reviews" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-extrabold text-coral">{s.value}</p>
                <p className="mt-1 text-xs leading-tight text-cream/70">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. WHY IT'S HARD ──────────────────────────────────────── */}
      <section className="mx-auto max-w-xl px-5 py-12 md:py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="text-sm font-semibold uppercase tracking-widest text-coral">The reality</p>
          <h2 className="text-pirk-heading mt-2 text-2xl font-extrabold text-burgundy md:text-3xl">
            Why this decision is genuinely complicated.
          </h2>
        </motion.div>
        <div className="mt-7 space-y-4">
          {[
            { icon: AlertCircle, headline: "Not all breast surgeons do all procedures", body: "A surgeon with 500 augmentations may rarely touch reductions or revisions. We match based on your procedure's specific case volume." },
            { icon: DollarSign, headline: "Costs vary by thousands for the same outcome", body: "Augmentation in Australia: $8,000–$20,000+. The difference isn't always quality. We know what fair looks like — and what's not." },
            { icon: Clock, headline: "Consultations cost $200–$500 each", body: "Most women book 3–5 before feeling confident. That's up to $2,500 just to compare options. We shortcut that." },
            { icon: Heart, headline: "This carries real emotional weight", body: "Whether it's a reduction you've wanted for a decade or reconstruction after cancer — you deserve guidance from someone who actually gets it." },
          ].map((item, i) => (
            <motion.div key={item.headline} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.4 }} className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-coral/10">
                <item.icon className="h-5 w-5 text-coral" />
              </div>
              <div>
                <p className="font-bold text-burgundy">{item.headline}</p>
                <p className="mt-1 text-sm leading-relaxed text-warm-grey">{item.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 5. WHAT WE CHECK ──────────────────────────────────────── */}
      <section className="bg-white px-5 py-12 md:py-14">
        <div className="mx-auto max-w-xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="text-sm font-semibold uppercase tracking-widest text-coral">Our vetting process</p>
            <h2 className="text-pirk-heading mt-2 text-2xl font-extrabold text-burgundy md:text-3xl">What we check before a surgeon joins our network.</h2>
            <p className="mt-2 text-warm-grey">This is what 50–70 hours of research actually looks like. We do it so you don&apos;t have to.</p>
          </motion.div>
          <div className="mt-7 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {whatWeCheck.map((item, i) => (
              <motion.div key={item} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.3 }} className="flex items-start gap-2.5 rounded-xl bg-cream px-4 py-3">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
                <span className="text-sm text-near-black">{item}</span>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="mt-8 rounded-2xl bg-burgundy px-6 py-5 text-center">
            <p className="font-bold text-cream">And we re-verify regularly.</p>
            <p className="mt-1 text-sm text-cream/70">Qualifications and patient outcomes are tracked over time — not just checked once.</p>
          </motion.div>
        </div>
      </section>

      {/* ── 6. CTA (burgundy) ────────────────────────────────────── */}
      <section className="bg-burgundy px-5 py-12 text-center">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-pirk-heading text-2xl font-extrabold text-cream md:text-3xl">
            Tell us what you&apos;re considering.<br />We&apos;ll handle the rest.
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-cream/70">
            Our advisors have guided thousands of women through every breast procedure. We understand what you need — and the questions you might not know to ask yet.
          </p>
          <div className="mt-7">
            <QuizCTA href={quizUrl} label="Take the 2-min Quiz" variant="white" subtext="No credit card needed" />
          </div>
        </motion.div>
      </section>

      {/* ── 7. TESTIMONIALS ──────────────────────────────────────── */}
      <section className="bg-cream px-5 py-12 md:py-14">
        <div className="mx-auto max-w-xl text-center">
          <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-warm-grey">From women who&apos;ve been where you are</p>

          <div className="relative min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div key={testimonialIndex} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4 }}>
                <span className="inline-block rounded-full bg-coral/10 px-3 py-1 text-xs font-semibold text-coral mb-4">
                  {testimonials[testimonialIndex].procedure}
                </span>
                <div className="flex gap-0.5 justify-center mb-3">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-lg italic leading-relaxed text-near-black">
                  &ldquo;{testimonials[testimonialIndex].quote}&rdquo;
                </p>
                <div className="mt-4 flex items-center justify-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-coral text-sm font-bold text-white">
                    {testimonials[testimonialIndex].initials}
                  </div>
                  <p className="font-semibold text-burgundy">
                    {testimonials[testimonialIndex].name} · <span className="font-normal text-warm-grey">{testimonials[testimonialIndex].location}</span>
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-5 flex justify-center gap-1.5 mb-8">
            {testimonials.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === testimonialIndex ? "w-5 bg-coral" : "w-1.5 bg-warm-grey/30"}`} />
            ))}
          </div>

          <QuizCTA href={quizUrl} label="Find My Surgeon" subtext="Takes 2 minutes" variant="coral" />
        </div>
      </section>

      {/* ── 8. FINAL CTA ────────────────────────────────────────── */}
      <section className="bg-coral px-5 py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-pirk-heading text-2xl font-extrabold text-white md:text-4xl">
            You&apos;ve been thinking about this long enough.
          </h2>
          <p className="mx-auto mt-4 max-w-sm text-lg text-white/80">
            Get matched with an independently vetted breast surgeon — and an advisor who walks you through every step.
          </p>
          <div className="mt-8">
            <QuizCTA href={quizUrl} label="Find My Surgeon" variant="white" subtext="Full refund if we can't match you" />
          </div>
        </motion.div>
      </section>

      {/* ── Sticky mobile CTA ─────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-coral/10 bg-white/95 px-4 py-3 shadow-xl backdrop-blur-sm md:hidden">
        <Link href={quizUrl} className="flex items-center justify-center gap-2 rounded-full bg-coral py-3.5 text-center text-base font-bold text-white shadow-md">
          Find My Surgeon <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}

export default function BreastSurgeryPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-coral border-t-transparent" />
      </div>
    }>
      <BreastSurgeryContent />
    </Suspense>
  );
}
