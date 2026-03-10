"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, Clock, Shield, Star, ArrowRight } from "lucide-react";

// ─── Replace this with your actual Calendly event URL ────────────────────────
const CALENDLY_URL = "https://calendly.com/pirk/discovery";
// ─────────────────────────────────────────────────────────────────────────────

const tierLabels: Record<string, string> = {
  guided: "Choose With Confidence",
  concierge: "Fully Guided",
  discovery: "Discovery Call",
};

function BookCallContent() {
  const searchParams = useSearchParams();
  const paid = searchParams.get("paid") === "true";
  const tier = searchParams.get("tier") || "";
  const matchId = searchParams.get("matchId") || "";

  const tierName = tierLabels[tier] || "Pirk";

  return (
    <div className="min-h-screen bg-cream">

      {/* ── Payment confirmation banner ─────────────────────────── */}
      {paid && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-green-600 px-5 py-4 text-center text-white"
        >
          <div className="mx-auto flex max-w-2xl items-center justify-center gap-3">
            <CheckCircle className="h-5 w-5 shrink-0" />
            <p className="font-medium">
              Payment confirmed — {tierName} is active.{" "}
              <span className="font-bold">Book your call below to get started.</span>
            </p>
          </div>
        </motion.div>
      )}

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-cream via-cream to-coral-light/30 pt-14 pb-10 md:pt-20 md:pb-14">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {paid ? (
              <>
                <p className="text-sm font-semibold uppercase tracking-wider text-coral">
                  Step 2 of 2
                </p>
                <h1 className="text-pirk-heading mt-3 text-3xl font-extrabold text-burgundy md:text-4xl">
                  Book your call with a Pirk advisor
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-lg text-warm-grey">
                  Your advisor will walk you through your surgeon matches, answer every question, and map out your next steps — so you feel completely confident moving forward.
                </p>
              </>
            ) : (
              <>
                <p className="text-sm font-semibold uppercase tracking-wider text-coral">
                  Free Strategy Call
                </p>
                <h1 className="text-pirk-heading mt-3 text-3xl font-extrabold text-burgundy md:text-4xl">
                  Talk to a Pirk advisor — free
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-lg text-warm-grey">
                  A 15-minute call to understand your goals, answer your questions, and work out what support is right for you.
                </p>
              </>
            )}

            {/* Star rating trust signal */}
            <div className="mt-6 flex items-center justify-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm text-warm-grey">5.0 · Verified client reviews</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Main content ─────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-5 py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">

          {/* Left: Calendly embed (3/5 width on desktop) */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <div className="overflow-hidden rounded-2xl border border-coral/10 bg-white shadow-sm">
              {/* Calendly inline embed */}
              <iframe
                src={CALENDLY_URL}
                width="100%"
                height="700"
                style={{ border: "none" }}
                title="Book a call with Pirk"
              />
            </div>
          </motion.div>

          {/* Right: What to expect + trust (2/5 width on desktop) */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="space-y-4">
              {[
                {
                  icon: Clock,
                  title: "15 minutes",
                  desc: "Quick, focused — we respect your time.",
                },
                {
                  icon: Shield,
                  title: "No pressure, ever",
                  desc: "We're here to help you decide, not to sell.",
                },
                {
                  icon: CheckCircle,
                  title: "Leave with clarity",
                  desc: "Walk away knowing your next step.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-xl bg-white p-5 shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-coral-light">
                    <item.icon className="h-5 w-5 text-coral" />
                  </div>
                  <div>
                    <p className="font-semibold text-near-black">{item.title}</p>
                    <p className="mt-0.5 text-sm text-warm-grey">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="mt-6 rounded-xl border border-coral/10 bg-white p-5 shadow-sm">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm italic leading-relaxed text-near-black">
                &ldquo;Ellie kept in contact throughout and even called to check up on me leading up to surgery. I never felt alone in this process.&rdquo;
              </p>
              <p className="mt-3 text-xs font-semibold text-burgundy">
                — Renee Brown, Brisbane
              </p>
            </div>

            {/* Back to results link */}
            {matchId && (
              <div className="mt-6 text-center">
                <Link
                  href={`/results/${matchId}`}
                  className="inline-flex items-center gap-1.5 text-sm text-warm-grey underline underline-offset-2 hover:text-burgundy"
                >
                  View my surgeon matches
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function BookCallPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-cream">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-coral border-t-transparent" />
        </div>
      }
    >
      <BookCallContent />
    </Suspense>
  );
}
