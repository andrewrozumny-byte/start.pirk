"use client";

import { motion } from "framer-motion";
import type { StepProps } from "../types";

const goals = [
  {
    value: "flatten",
    label: "Flatten & tighten",
    sub: "Remove excess skin or fat — especially after weight loss or pregnancy",
    icon: "🎯",
  },
  {
    value: "contour",
    label: "Sculpt & contour",
    sub: "Reshape specific areas — lipo, BBL, or targeted reduction",
    icon: "✂️",
  },
  {
    value: "restore",
    label: "Restore my body",
    sub: "Reverse the effects of pregnancy, ageing, or major weight loss",
    icon: "🔄",
  },
  {
    value: "not_sure",
    label: "Not sure yet",
    sub: "I know I want a change — I need help figuring out what",
    icon: "💬",
  },
];

export default function BodyGoalStep({ data, onAnswer, onNext }: StepProps) {
  const selected = (data.requirements as string[]).find((r) =>
    r.startsWith("bodyGoal:")
  )?.split(":")[1] || null;

  function handleSelect(value: string) {
    const existing = (data.requirements as string[]).filter(
      (r) => !r.startsWith("bodyGoal:")
    );
    onAnswer("requirements", [...existing, `bodyGoal:${value}`]);
    setTimeout(() => onNext(), 300);
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-burgundy mb-2 text-pirk-heading">
          What result are you hoping for?
        </h2>
        <p className="text-warm-grey mb-8">
          This helps us match you with surgeons who specialise in your specific
          goals.
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
                isSelected
                  ? "border-coral bg-coral/5 shadow-md"
                  : "border-gray-200 bg-white hover:border-coral/40"
              }`}
            >
              <div className="text-2xl mb-3">{g.icon}</div>
              <p className="font-bold text-burgundy text-sm leading-tight">
                {g.label}
              </p>
              <p className="text-xs text-warm-grey mt-1 leading-snug">
                {g.sub}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
