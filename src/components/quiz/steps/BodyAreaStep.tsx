"use client";

import { motion } from "framer-motion";
import type { StepProps } from "../types";

const areas = [
  { value: "abdomen", label: "Stomach / abdomen", icon: "🎯" },
  { value: "waist_hips", label: "Waist & hips", icon: "📐" },
  { value: "thighs", label: "Thighs", icon: "🦵" },
  { value: "arms", label: "Upper arms", icon: "💪" },
  { value: "buttocks", label: "Buttocks", icon: "🍑" },
  { value: "full_body", label: "Full body / multiple areas", icon: "🧍" },
];

export default function BodyAreaStep({ data, onAnswer, onNext }: StepProps) {
  const selected =
    (data.requirements as string[])
      .find((r) => r.startsWith("bodyArea:"))
      ?.split(":")[1] || null;

  function handleSelect(value: string) {
    const existing = (data.requirements as string[]).filter(
      (r) => !r.startsWith("bodyArea:")
    );
    onAnswer("requirements", [...existing, `bodyArea:${value}`]);
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
          Which area concerns you most?
        </h2>
        <p className="text-warm-grey mb-8">
          This helps us narrow down to surgeons with the right specialisation.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        {areas.map((a, i) => {
          const isSelected = selected === a.value;
          return (
            <motion.button
              key={a.value}
              onClick={() => handleSelect(a.value)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer text-left ${
                isSelected
                  ? "border-coral bg-coral/5 shadow-md"
                  : "border-gray-200 bg-white hover:border-coral/40"
              }`}
            >
              <span className="text-xl shrink-0">{a.icon}</span>
              <span className="font-medium text-burgundy text-sm">
                {a.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
