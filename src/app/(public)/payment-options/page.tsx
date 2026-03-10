"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { Check, Shield, Calendar, CreditCard, Zap } from "lucide-react";

interface PaymentOption {
  id: string;
  label: string;
  frequency: string;
  amount: string;
  total: string;
  saving?: string;
  highlight?: boolean;
  stripeLink: string;
  icon: React.ElementType;
}

const guidedOptions: PaymentOption[] = [
  {
    id: "guided-full",
    label: "Pay in Full",
    frequency: "One-time payment",
    amount: "$149",
    total: "Total: $149",
    highlight: true,
    stripeLink: "#", // Replace with Stripe payment link
    icon: Zap,
  },
  {
    id: "guided-monthly",
    label: "Monthly",
    frequency: "6 monthly payments",
    amount: "$29",
    total: "Total: $174",
    stripeLink: "#", // Replace with Stripe payment link
    icon: Calendar,
  },
];

const conciergeOptions: PaymentOption[] = [
  {
    id: "concierge-full",
    label: "Pay in Full",
    frequency: "One-time payment — save $95",
    amount: "$599",
    total: "Total: $599",
    saving: "Save $95",
    highlight: true,
    stripeLink: "#", // Replace with Stripe payment link
    icon: Zap,
  },
  {
    id: "concierge-monthly",
    label: "Monthly",
    frequency: "6 monthly payments",
    amount: "$99",
    total: "Total: $594",
    stripeLink: "#", // Replace with Stripe payment link
    icon: Calendar,
  },
  {
    id: "concierge-fortnightly",
    label: "Fortnightly",
    frequency: "13 fortnightly payments",
    amount: "$49",
    total: "Total: $637",
    stripeLink: "#", // Replace with Stripe payment link
    icon: CreditCard,
  },
];

const tierConfig = {
  guided: {
    name: "Choose With Confidence",
    tagline: "Full surgeon profiles, costs, and guidance",
    options: guidedOptions,
    features: [
      "Full surgeon profiles unlocked",
      "Side-by-side cost breakdowns",
      "Wait times & current availability",
      "Payment plan comparisons",
      "Know exactly what to ask at your consult",
      "A real person who picks up the phone",
    ],
  },
  concierge: {
    name: "Fully Guided",
    tagline: "A dedicated advisor from shortlist to surgery day",
    options: conciergeOptions,
    features: [
      "Everything in Choose With Confidence",
      "Your own dedicated Pirk coordinator",
      "We book and manage your consultations",
      "We negotiate with surgeons on your behalf",
      "Post-surgery check-ins & ongoing support",
      "Completely personalised to your journey",
    ],
  },
};

function PaymentOptionsContent() {
  const searchParams = useSearchParams();
  const tier = (searchParams.get("tier") || "guided") as "guided" | "concierge";
  const matchId = searchParams.get("matchId") || "";

  const config = tierConfig[tier] || tierConfig.guided;

  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-4xl px-5 py-16 md:py-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-coral">
            {config.name}
          </p>
          <h1 className="text-pirk-heading mt-2 text-3xl font-extrabold text-burgundy md:text-4xl">
            Choose how you&apos;d like to pay
          </h1>
          <p className="mt-3 text-lg text-warm-grey">{config.tagline}</p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">

          {/* What's included */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="rounded-2xl border border-coral/10 bg-white p-8 shadow-sm"
          >
            <h2 className="text-lg font-bold text-burgundy">
              What&apos;s included
            </h2>
            <ul className="mt-6 space-y-3">
              {config.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
                  <span className="text-sm text-near-black">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-start gap-3 rounded-xl bg-cream p-4">
              <Shield className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
              <p className="text-xs text-warm-grey">
                Full refund if we can&apos;t find you a suitable surgeon match. No questions asked.
              </p>
            </div>
          </motion.div>

          {/* Payment options */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-bold text-burgundy">
              Select a payment plan
            </h2>

            {config.options.map((option, i) => (
              <motion.a
                key={option.id}
                href={option.stripeLink}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                className={`
                  group relative flex items-center justify-between rounded-2xl border-2 p-5
                  transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md
                  ${option.highlight
                    ? "border-coral bg-white shadow-md"
                    : "border-gray-100 bg-white hover:border-coral/40"
                  }
                `}
              >
                {option.highlight && (
                  <div className="absolute -top-3 left-5">
                    <span className="rounded-full bg-coral px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                      Recommended
                    </span>
                  </div>
                )}
                {option.saving && (
                  <div className="absolute -top-3 right-5">
                    <span className="rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white">
                      {option.saving}
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${option.highlight ? "bg-coral/10" : "bg-gray-50"}`}>
                    <option.icon className={`h-5 w-5 ${option.highlight ? "text-coral" : "text-warm-grey"}`} />
                  </div>
                  <div>
                    <p className="font-semibold text-near-black">{option.label}</p>
                    <p className="text-xs text-warm-grey">{option.frequency}</p>
                    <p className="mt-0.5 text-xs text-warm-grey">{option.total}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-extrabold text-burgundy">
                    {option.amount}
                  </p>
                  {option.id.includes("monthly") && (
                    <p className="text-xs text-warm-grey">/month</p>
                  )}
                  {option.id.includes("fortnightly") && (
                    <p className="text-xs text-warm-grey">/fortnight</p>
                  )}
                  {option.id.includes("full") && (
                    <p className="text-xs text-warm-grey">total</p>
                  )}
                </div>
              </motion.a>
            ))}

            <p className="pt-2 text-center text-xs text-warm-grey">
              Secure payment. Cancel anytime before your access period begins.
            </p>
          </motion.div>
        </div>

        {/* Back link */}
        {matchId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="mt-10 text-center"
          >
            <a
              href={`/results/${matchId}`}
              className="text-sm text-warm-grey underline underline-offset-2 hover:text-burgundy"
            >
              ← Back to my matches
            </a>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function PaymentOptionsPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-coral border-t-transparent" />
      </div>
    }>
      <PaymentOptionsContent />
    </Suspense>
  );
}
