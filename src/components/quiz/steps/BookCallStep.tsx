"use client";

import { motion } from "framer-motion";
import type { StepProps } from "../types";
import {
  Phone,
  Clock,
  ShieldCheck,
  CheckCircle,
  Users,
} from "lucide-react";

interface BookCallStepProps extends StepProps {
  onSubmit: () => void;
  isSubmitting: boolean;
}

const benefits = [
  { icon: Users, text: "Matched with top 3 surgeons for your goals" },
  { icon: CheckCircle, text: "Side-by-side cost & experience comparison" },
  { icon: ShieldCheck, text: "Only FRACS-verified, independently vetted surgeons" },
  { icon: Clock, text: "15 minutes — zero pressure, zero obligation" },
];

export default function BookCallStep({
  data,
  onAnswer,
  onSubmit,
  isSubmitting,
}: BookCallStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.phone.trim()) return;
    onSubmit();
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <div className="w-16 h-16 rounded-full bg-coral-light flex items-center justify-center mx-auto mb-4">
          <Phone className="w-8 h-8 text-coral" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-burgundy mb-2 text-pirk-heading">
          Your matches are ready.
        </h2>
        <p className="text-warm-grey text-lg">
          Book a free matching call and we&apos;ll walk you through your top
          surgeon matches, answer every question, and help you decide next
          steps.
        </p>
      </motion.div>

      {/* Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="bg-white rounded-2xl border border-coral/10 p-5 mb-6 space-y-3"
      >
        {benefits.map((b, i) => (
          <div key={i} className="flex items-start gap-3">
            <b.icon className="w-4 h-4 mt-0.5 text-coral shrink-0" />
            <span className="text-sm text-near-black">{b.text}</span>
          </div>
        ))}
      </motion.div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        className="space-y-4"
      >
        <div>
          <label
            htmlFor="call-phone"
            className="block text-sm font-medium text-near-black mb-1.5"
          >
            Your phone number
          </label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-grey" />
            <input
              id="call-phone"
              type="tel"
              value={data.phone}
              onChange={(e) => onAnswer("phone", e.target.value)}
              placeholder="04XX XXX XXX"
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white
                text-near-black placeholder:text-warm-grey/50 focus:outline-none
                focus:border-coral transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !data.phone.trim()}
          className={`w-full py-4 rounded-xl text-lg font-semibold transition-all duration-200 cursor-pointer ${
            data.phone.trim()
              ? "bg-coral text-white shadow-lg hover:shadow-xl hover:brightness-105"
              : "bg-gray-100 text-warm-grey cursor-not-allowed"
          }`}
        >
          {isSubmitting ? "Booking..." : "Book My Free Matching Call"}
        </button>

        <div className="flex items-center justify-center gap-6 py-2 text-xs text-warm-grey">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            15 mins max
          </span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            100% free, no obligation
          </span>
        </div>
      </motion.form>
    </div>
  );
}
