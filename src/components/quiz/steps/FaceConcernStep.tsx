"use client";

import { motion } from "framer-motion";
import type { StepProps } from "../types";

const concerns = [
  { value: "sagging_skin", label: "Sagging or loose skin", icon: "↕️" },
  { value: "wrinkles", label: "Deep wrinkles or lines", icon: "〰️" },
  { value: "nose_shape", label: "Nose shape or size", icon: "👃" },
  { value: "eyelids", label: "Droopy or heavy eyelids", icon: "👁️" },
  { value: "jawline", label: "Jawline or chin definition", icon: "💪" },
  { value: "ears", label: "Ear shape or prominence", icon: "👂" },
  { value: "multiple", label: "Multiple concerns", icon: "📋" },
];

export default function FaceConcernStep({ data, onAnswer, onNext }: StepProps) {
  const selected = (data.requirements as string[]).find((r) =>
    r.startsWith("faceConcern:")
  )?.split(":")[1] || null;

  function handleSelect(value: string) {
    const existing = (data.requirements as string[]).filter(
      (r) => !r.startsWith("faceConcern:")
    );
    onAnswer("requirements", [...existing, `faceConcern:${value}`]);
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
          What bothers you most?
        </h2>
        <p className="text-warm-grey mb-8">
          Knowing your primary concern helps us find surgeons with the right
          expertise.
        </p>
      </motion.div>

      <div className="flex flex-col gap-3">
        {concerns.map((c, i) => {
          const isSelected = selected === c.value;
          return (
            <motion.button
              key={c.value}
              onClick={() => handleSelect(c.value)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer text-left ${
                isSelected
                  ? "border-coral bg-coral/5 shadow-md"
                  : "border-gray-200 bg-white hover:border-coral/40"
              }`}
            >
              <span className="text-xl shrink-0">{c.icon}</span>
              <span className="font-medium text-burgundy text-sm">
                {c.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
