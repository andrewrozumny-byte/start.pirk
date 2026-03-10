"use client";

import { motion } from "framer-motion";
import { Check, Phone, Sparkles, Shield } from "lucide-react";
import { trackInitiateCheckout } from "@/lib/tracking";

interface TierUpgradeCardsProps {
  matchId: string;
  clientEmail: string;
}

const discoveryFeatures = [
  "30-minute call with a Pirk advisor",
  "Walk through your procedure options",
  "Realistic cost guidance for your situation",
  "Know exactly what questions to ask surgeons",
  "No obligation — leads into full matching if you choose",
];

const matchingFeatures = [
  "Your top 3 independently vetted surgeon matches",
  "Full profiles — qualifications, costs, wait times",
  "Side-by-side comparison across your matches",
  "Consultation prep guide & what to ask",
  "Advisor call included to walk you through it",
  "6 months of support after your match",
];

export default function TierUpgradeCards({
  matchId,
  clientEmail,
}: TierUpgradeCardsProps) {
  function handleDiscovery() {
    trackInitiateCheckout("discovery");
    // Navigate to book-call for discovery (Stripe Payment Link or Calendly)
    window.location.href = "#"; // Replace with Stripe Payment Link for $59 discovery call
  }

  function handleMatching() {
    trackInitiateCheckout("guided");
    const params = new URLSearchParams({ tier: "guided", matchId, email: clientEmail });
    window.location.href = `/payment-options?${params.toString()}`;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="mt-12"
    >
      <div className="mb-8 text-center">
        <h2 className="text-pirk-heading text-3xl font-bold text-burgundy">
          Unlock Your Full Results
        </h2>
        <p className="mt-2 text-warm-grey">
          Two ways to get expert support — both include a call with your advisor.
        </p>
      </div>

      <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">

        {/* Discovery Call — $59 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.4 }}
          className="relative overflow-hidden rounded-2xl border-2 border-gray-100 bg-white shadow-sm"
        >
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-coral-light">
                <Phone className="h-4 w-4 text-coral" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-warm-grey">
                  Not sure where to start?
                </p>
                <h3 className="text-lg font-bold text-burgundy leading-tight">
                  Discovery Call
                </h3>
              </div>
            </div>

            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl font-extrabold text-near-black">$59</span>
              <span className="text-warm-grey text-sm">one-time</span>
            </div>
            <p className="text-xs text-warm-grey mb-5">
              30-minute call · Credited if you upgrade to Full Matching
            </p>

            <ul className="space-y-2.5 mb-8">
              {discoveryFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
                  <span className="text-sm text-near-black">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={handleDiscovery}
              className="w-full rounded-full border-2 border-coral bg-white px-6 py-3.5 text-center font-semibold text-coral transition-all hover:bg-coral hover:text-white"
            >
              Book a Discovery Call — $59
            </button>
          </div>
        </motion.div>

        {/* Full Matching — $149 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.4 }}
          className="relative overflow-hidden rounded-2xl border-2 border-coral bg-white shadow-lg"
        >
          <div className="absolute top-0 right-0 rounded-bl-xl bg-coral px-4 py-1.5">
            <span className="text-xs font-bold tracking-wide text-white uppercase">
              Most Popular
            </span>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-coral-light">
                <Sparkles className="h-4 w-4 text-coral" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-coral">
                  Ready to find your surgeon?
                </p>
                <h3 className="text-lg font-bold text-burgundy leading-tight">
                  Full Matching
                </h3>
              </div>
            </div>

            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl font-extrabold text-near-black">$0.82</span>
              <span className="text-warm-grey text-sm">/day</span>
            </div>
            <p className="text-xs text-warm-grey mb-1">
              $149 total · 6 months of support · less than a coffee a day
            </p>
            <p className="text-xs text-coral font-medium mb-5">
              or from $29/month · Full refund if we can&apos;t match you
            </p>

            <ul className="space-y-2.5 mb-8">
              {matchingFeatures.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
                  <span className="text-sm text-near-black">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={handleMatching}
              className="w-full rounded-full bg-coral px-6 py-3.5 text-center font-bold text-white shadow-md transition-all hover:shadow-lg hover:brightness-105"
            >
              Get Matched — $149
            </button>
          </div>
        </motion.div>
      </div>

      {/* Trust footer */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        <span className="inline-flex items-center gap-1.5 text-xs text-warm-grey">
          <Shield className="h-3.5 w-3.5 text-coral" />
          Full refund if we can&apos;t match you
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-warm-grey">
          <Shield className="h-3.5 w-3.5 text-coral" />
          No lock-in
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-warm-grey">
          <Shield className="h-3.5 w-3.5 text-coral" />
          Secure payment
        </span>
      </div>
    </motion.div>
  );
}
