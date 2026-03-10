"use client";

import { motion } from "framer-motion";
import type { StepProps } from "../types";

const goals = [
  {
    value: "rejuvenation",
    label: "Turn back the clock",
    sub: "Look refreshed — like yourself, just younger",
    icon: "🕰️",
  },
  {
    value: "refinement",
    label: "Refine a feature",
    sub: "A specific change — nose, eyelids, chin, or ears",
    icon: "✨",
  },
  {
    value: "symmetry",
    label: "Improve symmetry",
    sub: "Balance things out for a more harmonious look",
    icon: "⚖️",
  },
  {
    value: "not_sure",
    label: "Not sure yet",
    sub: "I know something bothers me — I need guidance",
    icon: "💬",
  },
];

export default function FaceGoalStep({ data, onAnswer, onNext }: StepProps) {
  const selected = (data.requirements as string[]).find((r) =>
    r.startsWith("faceGoal:")
  )?.split(":")[1] || null;

  function handleSelect(value: string) {
    const existing = (data.requirements as string[]).filter(
      (r) => !r.startsWith("faceGoal:")
    );
    onAnswer("requirements", [...existing, `faceGoal:${value}`]);
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
