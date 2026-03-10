"use client";

import { motion } from "framer-motion";
import type { StepProps } from "../types";

const goals = [
  {
    value: "natural",
    label: "Natural / subtle",
    sub: "Small change — still undeniably me",
    circles: [14, 14],
  },
  {
    value: "fuller",
    label: "Noticeably fuller",
    sub: "A cup size or two — visible but not obvious",
    circles: [14, 20],
  },
  {
    value: "larger",
    label: "Significantly larger",
    sub: "An obvious, intentional change",
    circles: [14, 26],
  },
  {
    value: "reduction",
    label: "Smaller & lighter",
    sub: "Relief, proportion, and finally feeling comfortable",
    circles: [26, 18],
  },
];

const FIELD = "requirements" as const;

export default function BreastGoalStep({ data, onAnswer, onNext }: StepProps) {
  const selected = (data.requirements as string[]).find((r) => r.startsWith("goal:"))?.split(":")[1] || null;

  function handleSelect(value: string) {
    const existing = (data.requirements as string[]).filter((r) => !r.startsWith("goal:"));
    onAnswer(FIELD, [...existing, `goal:${value}`]);
    setTimeout(() => onNext(), 300);
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-2xl md:text-3xl font-bold text-burgundy mb-2 text-pirk-heading">
          What result are you hoping for?
        </h2>
        <p className="text-warm-grey mb-8">
          Be honest — there&apos;s no wrong answer. This helps us match you with surgeons who specialise in your goals.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        {goals.map((g, i) => {
          const isSelected = selected === g.value;
          return (
            <motion.button
              key={g.value}
              onClick={() => handleSelect(g.value)}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.3 }}
              whileTap={{ scale: 0.97 }}
              className={`text-left rounded-2xl border-2 p-5 transition-all duration-200 cursor-pointer ${
                isSelected ? "border-coral bg-coral/5 shadow-md" : "border-gray-200 bg-white hover:border-coral/40"
              }`}
            >
              {/* Visual size indicator */}
              <div className="flex items-end gap-2 mb-4 h-8">
                <div
                  className="rounded-full bg-warm-grey/20 shrink-0"
                  style={{ width: g.circles[0], height: g.circles[0] }}
                />
                <div
                  className={`rounded-full shrink-0 transition-colors ${isSelected ? "bg-coral" : "bg-coral/40"}`}
                  style={{ width: g.circles[1], height: g.circles[1] }}
                />
              </div>
              <p className="font-bold text-burgundy text-sm leading-tight">{g.label}</p>
              <p className="text-xs text-warm-grey mt-1 leading-snug">{g.sub}</p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
