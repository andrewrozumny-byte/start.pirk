"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Shield,
  Star,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  XCircle,
  Clock,
  DollarSign,
  AlertTriangle,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const testimonials = [
  {
    quote: "I was staring at my vision board for months. Pirk matched me in 2 minutes and I'm now actually planning dates.",
    name: "Audrey Isabella",
    location: "Sydney",
    initials: "AI",
  },
  {
    quote: "I wasted hundreds on consultations before Pirk. They took care of everything from start to finish.",
    name: "Lins",
    location: "Melbourne",
    initials: "L",
  },
  {
    quote: "As a nurse, I know good care when I see it. The communication and attention Pirk gave me was incredible.",
    name: "Jessica Connell",
    location: "Melbourne",
    initials: "JC",
  },
  {
    quote: "Ellie kept in contact throughout and even called to check up on me leading up to surgery. I never felt alone.",
    name: "Renee Brown",
    location: "Brisbane",
    initials: "RB",
  },
];

const feedItems = [
  "Sponsored · Dr. Smith Cosmetic Clinic — Book Now",
  "Ad · Thailand Medical Tourism — Save 60%",
  "Promoted · 200+ Before & After Photos",
  "Sponsored · Finance your surgery today",
  "Ad · Free consultation — limited spots",
  "Promoted · #plasticsurgery · 2.4M views",
  "Sponsored · Overseas surgery packages",
  "Ad · Compare surgeon prices near you",
];

const stats = [
  { value: "200+", label: "Surgeons independently vetted" },
  { value: "2,500+", label: "Patients guided" },
  { value: "15+", label: "Criteria checked per surgeon" },
];

const scaryFacts = [
  {
    icon: DollarSign,
    headline: "Surgeon costs vary by $5,000–$10,000",
    body: "For the exact same procedure. Most people have no idea what's fair — and clinics know that.",
  },
  {
    icon: Clock,
    headline: "50–70 hours of research",
    body: "That's what the average patient spends before choosing a surgeon. Most still aren't sure they got it right.",
  },
  {
    icon: AlertTriangle,
    headline: "Consultation fees: $100–$500. Each.",
    body: "And some are non-refundable. People book 3–5 before finding the right surgeon. That's up to $2,500 just to compare options.",
  },
  {
    icon: XCircle,
    headline: "Most surgeons advertise. None are vetted.",
    body: "Paid ads, sponsored posts, SEO rankings — none of it tells you about qualifications, revision rates, or hospital privileges.",
  },
];

const whatWeCheck = [
  "FRACS accreditation & specialist qualifications",
  "Hospital privileges & operating rights",
  "Procedure-specific experience & volume",
  "Real patient reviews (not paid testimonials)",
  "Current wait times & availability",
  "Transparent pricing & payment options",
  "Before & after results for your procedure",
  "Revision policies & complication rates",
];

const steps = [
  {
    num: "1",
    title: "Tell us what you need",
    desc: "2-minute quiz — procedure, location, what matters most to you.",
  },
  {
    num: "2",
    title: "We do the research",
    desc: "Our team has already vetted 200+ surgeons across Australia so you don't have to start from scratch.",
  },
  {
    num: "3",
    title: "We walk you through it",
    desc: "An advisor calls you to explain your matches, answer every question, and map out your next steps.",
  },
];

// ─── Components ───────────────────────────────────────────────────────────────

function QuizCTA({
  href,
  label,
  subtext,
  variant = "coral",
}: {
  href: string;
  label: string;
  subtext?: string;
  variant?: "coral" | "burgundy" | "white";
}) {
  const classes = {
    coral: "bg-coral text-white hover:brightness-105 shadow-lg hover:shadow-xl",
    burgundy: "bg-burgundy text-white hover:brightness-110 shadow-md hover:shadow-lg",
    white: "bg-white text-coral hover:brightness-95 shadow-lg hover:shadow-xl",
  }[variant];

  return (
    <div className="text-center">
      <Link
        href={href}
        className={`inline-flex items-center gap-2 rounded-full px-8 py-4 text-lg font-bold transition-all ${classes}`}
      >
        {label}
        <ArrowRight className="h-5 w-5" />
      </Link>
      {subtext && (
        <p className="mt-3 text-sm opacity-70">{subtext}</p>
      )}
    </div>
  );
}

function RotatingTestimonial({ quizUrl }: { quizUrl: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 4500);
    return () => clearInterval(t);
  }, []);

  const t = testimonials[index];

  return (
    <div>
      <div className="relative min-h-[160px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex gap-0.5 justify-center mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-lg italic leading-relaxed text-near-black md:text-xl">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-coral text-sm font-bold text-white">
                {t.initials}
              </div>
              <p className="font-semibold text-burgundy">
                {t.name} · <span className="font-normal text-warm-grey">{t.location}</span>
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="mt-5 flex justify-center gap-1.5">
        {testimonials.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-5 bg-coral" : "w-1.5 bg-warm-grey/30"}`}
          />
        ))}
      </div>

      <div className="mt-8">
        <QuizCTA href={quizUrl} label="I want this — Start the Quiz" subtext="Takes 2 minutes" />
      </div>
    </div>
  );
}

function FeedNoise() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-2 my-6">
      {feedItems.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: i * 0.07, duration: 0.3 }}
          className="flex items-center gap-3 rounded-lg bg-gray-100/80 px-4 py-2.5"
        >
          <div className="h-2 w-2 shrink-0 rounded-full bg-warm-grey/40" />
          <p className="text-sm text-warm-grey line-through decoration-warm-grey/40">{item}</p>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function SocialLandingContent() {
  const searchParams = useSearchParams();

  const buildQuizUrl = () => {
    const params = new URLSearchParams();
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "ttclid"].forEach((key) => {
      const val = searchParams.get(key);
      if (val) params.set(key, val);
    });
    const qs = params.toString();
    return `/quiz${qs ? `?${qs}` : ""}`;
  };

  const quizUrl = buildQuizUrl();

  return (
    <>
      {/* ── 1. HERO ───────────────────────────────────────────────── */}
      <section className="px-5 pt-4 pb-10 text-center md:pt-8 md:pb-14">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-coral/20 bg-white px-4 py-1.5 text-xs font-semibold text-coral shadow-sm">
            <Shield className="h-3 w-3" />
            Independent · Not a clinic · Not sponsored by surgeons
          </div>

          <h1 className="text-pirk-heading text-3xl font-extrabold leading-tight text-burgundy md:text-4xl lg:text-5xl">
            Every surgeon you&apos;ve seen today{" "}
            <span className="text-coral">paid to be in your feed.</span>
            <br className="hidden md:block" /> Ours didn&apos;t.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-warm-grey">
            Pirk independently vets and mystery-shops surgeons across Australia — then matches you to the ones that are genuinely right for your procedure, location, and budget.
          </p>

          <div className="mt-8">
            <QuizCTA
              href={quizUrl}
              label="Start My Match"
              subtext="2-minute quiz · No obligation"
              variant="coral"
            />
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2">
            {["Every surgeon mystery-shopped", "Full refund if we can't match you", "5.0 from verified clients"].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5 text-xs font-medium text-warm-grey">
                <CheckCircle className="h-3.5 w-3.5 text-coral" />
                {t}
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

      {/* ── 2. STATS STRIP ───────────────────────────────────────── */}
      <section className="bg-burgundy py-8">
        <div className="mx-auto max-w-xl px-5">
          <div className="grid grid-cols-3 gap-4 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-extrabold text-coral">{s.value}</p>
                <p className="mt-1 text-xs leading-tight text-cream/70">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. THE PROBLEM ────────────────────────────────────────── */}
      <section className="mx-auto max-w-xl px-5 py-12 md:py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="text-sm font-semibold uppercase tracking-widest text-coral">Sound familiar?</p>
          <h2 className="text-pirk-heading mt-2 text-2xl font-extrabold text-burgundy md:text-3xl">
            Here&apos;s what&apos;s in your feed right now.
          </h2>
          <p className="mt-2 text-warm-grey">
            Ads, sponsored posts, paid rankings. None of it tells you if the surgeon is actually right for you.
          </p>

          <FeedNoise />

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="rounded-2xl bg-burgundy px-6 py-6 text-center"
          >
            <p className="text-xl font-bold text-cream">Pirk isn&apos;t in any surgeon&apos;s marketing budget.</p>
            <p className="mt-1 text-sm text-cream/70">We work for you — not the clinics.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── 4. CTA #1 ────────────────────────────────────────────── */}
      <section className="bg-cream px-5 py-10 text-center">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-warm-grey">Seen enough?</p>
          <QuizCTA href={quizUrl} label="Find My Surgeon Match" subtext="Takes 2 minutes · Advisor call included" variant="coral" />
        </motion.div>
      </section>

      {/* ── 5. THE SCARY FACTS ───────────────────────────────────── */}
      <section className="mx-auto max-w-xl px-5 py-12 md:py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="text-sm font-semibold uppercase tracking-widest text-coral">What most people don&apos;t know</p>
          <h2 className="text-pirk-heading mt-2 text-2xl font-extrabold text-burgundy md:text-3xl">
            Choosing a surgeon is genuinely hard.
          </h2>
          <p className="mt-2 text-warm-grey">The information asymmetry is real — and clinics benefit from it.</p>
        </motion.div>

        <div className="mt-8 space-y-4">
          {scaryFacts.map((fact, i) => (
            <motion.div
              key={fact.headline}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-coral/10">
                <fact.icon className="h-5 w-5 text-coral" />
              </div>
              <div>
                <p className="font-bold text-burgundy">{fact.headline}</p>
                <p className="mt-1 text-sm leading-relaxed text-warm-grey">{fact.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 6. TESTIMONIAL BLOCK ─────────────────────────────────── */}
      <section className="bg-white px-5 py-12 md:py-16">
        <div className="mx-auto max-w-xl text-center">
          <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-warm-grey">Real people. Real results.</p>
          <RotatingTestimonial quizUrl={quizUrl} />
        </div>
      </section>

      {/* ── 7. WHAT WE CHECK ─────────────────────────────────────── */}
      <section className="mx-auto max-w-xl px-5 py-12 md:py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="text-sm font-semibold uppercase tracking-widest text-coral">Our vetting process</p>
          <h2 className="text-pirk-heading mt-2 text-2xl font-extrabold text-burgundy md:text-3xl">
            15+ things we check before a surgeon makes our network.
          </h2>
          <p className="mt-2 text-warm-grey">This is what 50–70 hours of research actually looks like. We do it so you don&apos;t have to.</p>
        </motion.div>

        <div className="mt-7 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {whatWeCheck.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
              className="flex items-start gap-2.5 rounded-xl bg-white px-4 py-3 shadow-sm"
            >
              <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
              <span className="text-sm text-near-black">{item}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 rounded-2xl border border-coral/10 bg-coral/5 px-6 py-5"
        >
          <p className="text-center text-sm font-semibold text-burgundy">
            Every surgeon in our network has passed every one of these checks — and we re-verify regularly.
          </p>
        </motion.div>
      </section>

      {/* ── 8. CTA #2 ────────────────────────────────────────────── */}
      <section className="bg-burgundy px-5 py-12 text-center">
        <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-cream/60">Stop doing this alone</p>
          <h2 className="text-pirk-heading text-2xl font-extrabold text-cream md:text-3xl">
            Tell us what you need.<br />We&apos;ll do the rest.
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-cream/70">
            Answer 10 quick questions. Get matched with independently vetted surgeons. Talk to an advisor who explains everything.
          </p>
          <div className="mt-7">
            <QuizCTA href={quizUrl} label="Take the 2-min Quiz" variant="white" subtext="No credit card needed" />
          </div>
        </motion.div>
      </section>

      {/* ── 9. HOW IT WORKS ──────────────────────────────────────── */}
      <section className="mx-auto max-w-xl px-5 py-12 md:py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-coral text-center mb-8">How Pirk works</p>
        <div className="space-y-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.4 }}
              className="flex gap-5"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-coral text-base font-bold text-white">
                {step.num}
              </div>
              <div className="pt-1">
                <p className="font-bold text-burgundy">{step.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-warm-grey">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mt-10 text-center"
        >
          <QuizCTA href={quizUrl} label="Start the Quiz Now" subtext="Takes 2 minutes" variant="coral" />
        </motion.div>
      </section>

      {/* ── 10. SINGLE TESTIMONIAL PULL QUOTE ────────────────────── */}
      <section className="bg-cream px-5 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-xl"
        >
          <div className="rounded-2xl bg-white p-8 shadow-sm text-center">
            <div className="flex justify-center gap-0.5 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xl italic leading-relaxed text-near-black">
              &ldquo;I wasted hundreds on consultations before Pirk. They took care of everything from start to finish.&rdquo;
            </p>
            <p className="mt-5 font-semibold text-burgundy">Lins · Melbourne</p>
          </div>

          <div className="mt-8 text-center">
            <QuizCTA href={quizUrl} label="Get My Surgeon Shortlist" subtext="Advisor call included with every match" variant="burgundy" />
          </div>
        </motion.div>
      </section>

      {/* ── 11. FINAL CTA ─────────────────────────────────────────── */}
      <section className="bg-coral px-5 py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 className="text-pirk-heading text-2xl font-extrabold text-white md:text-4xl">
            Stop scrolling.<br />Start knowing.
          </h2>
          <p className="mx-auto mt-4 max-w-sm text-lg text-white/80">
            Your surgeon shortlist is 2 minutes away.
          </p>
          <div className="mt-8">
            <QuizCTA href={quizUrl} label="Start My Match" variant="white" subtext="No obligation · Full refund if we can't match you" />
          </div>
        </motion.div>
      </section>

      {/* ── Sticky mobile CTA ─────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-coral/10 bg-white/95 px-4 py-3 shadow-xl backdrop-blur-sm md:hidden">
        <Link
          href={quizUrl}
          className="flex items-center justify-center gap-2 rounded-full bg-coral py-3.5 text-center text-base font-bold text-white shadow-md"
        >
          Start the 2-min Quiz
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}

export default function SocialLandingPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-coral border-t-transparent" />
      </div>
    }>
      <SocialLandingContent />
    </Suspense>
  );
}
