"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { StepProps } from "../types";

const profiles = [
  {
    value: "low",
    label: "Low",
    sub: "Wide base, sits flat",
    // SVG arc path — d attribute
    arc: "M4 28 Q6 12 18 9 Q26 7 26 20",
  },
  {
    value: "moderate",
    label: "Moderate",
    sub: "Balanced & natural",
    arc: "M4 28 Q5 10 18 7 Q28 5 28 18",
  },
  {
    value: "mod_plus",
    label: "Mod Plus",
    sub: "Fuller projection",
    arc: "M4 28 Q4 8 18 5 Q30 3 30 16",
  },
  {
    value: "high",
    label: "High",
    sub: "Maximum projection",
    arc: "M4 28 Q3 6 18 3 Q32 1 32 14",
  },
];

const shapes = [
  {
    value: "round",
    label: "Round",
    sub: "Full top & bottom — classic look",
  },
  {
    value: "anatomical",
    label: "Anatomical",
    sub: "Teardrop — gradual slope, more natural",
  },
];

const FIELD = "requirements" as const;

function getSelected(requirements: string[], prefix: string) {
  return requirements.find((r) => r.startsWith(`${prefix}:`))?.split(":")[1] || null;
}

export default function BreastImplantStep({ data, onAnswer, onNext }: StepProps) {
  const requirements = data.requirements as string[];
  const selectedProfile = getSelected(requirements, "profile");
  const selectedShape = getSelected(requirements, "shape");

  function selectProfile(value: string) {
    const updated = requirements.filter((r) => !r.startsWith("profile:"));
    onAnswer(FIELD, [...updated, `profile:${value}`]);
  }

  function selectShape(value: string) {
    const updated = requirements.filter((r) => !r.startsWith("shape:"));
    onAnswer(FIELD, [...updated, `shape:${value}`]);
  }

  const canContinue = selectedProfile && selectedShape;

  return (
    <div className="w-full max-w-xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="text-2xl md:text-3xl font-bold text-burgundy mb-2 text-pirk-heading">
          Any implant preferences?
        </h2>
        <p className="text-warm-grey mb-7">
          If you&apos;ve done your research, tell us. If not, no worries — your advisor will explain all of this on your call.
        </p>
      </motion.div>

      {/* Profile */}
      <div className="mb-7">
        <p className="text-sm font-bold text-near-black mb-1">Profile</p>
        <p className="text-xs text-warm-grey mb-3">Controls how far the implant projects forward from the chest wall.</p>
        <div className="grid grid-cols-4 gap-2">
          {profiles.map((p, i) => {
            const isSelected = selectedProfile === p.value;
            return (
              <motion.button
                key={p.value}
                onClick={() => selectProfile(p.value)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
                whileTap={{ scale: 0.97 }}
                className={`rounded-xl border-2 p-3 text-center transition-all cursor-pointer ${
                  isSelected ? "border-coral bg-coral/5 shadow-md" : "border-gray-200 bg-white hover:border-coral/40"
                }`}
              >
                {/* Profile arc SVG */}
                <svg viewBox="0 0 36 30" className="w-full h-7 mb-2">
                  <line x1="4" y1="28" x2="34" y2="28" stroke="#E5E7EB" strokeWidth="1.5"/>
                  <path
                    d={p.arc}
                    stroke={isSelected ? "#F2705C" : "#9CA3AF"}
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="text-xs font-bold text-burgundy">{p.label}</p>
                <p className="text-[10px] text-warm-grey mt-0.5 leading-tight hidden sm:block">{p.sub}</p>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Shape */}
      <div className="mb-8">
        <p className="text-sm font-bold text-near-black mb-1">Shape</p>
        <p className="text-xs text-warm-grey mb-3">Round gives fullness throughout; anatomical follows a natural slope.</p>
        <div className="grid grid-cols-2 gap-3">
          {shapes.map((s, i) => {
            const isSelected = selectedShape === s.value;
            return (
              <motion.button
                key={s.value}
                onClick={() => selectShape(s.value)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.3 }}
                whileTap={{ scale: 0.97 }}
                className={`rounded-xl border-2 p-4 text-center transition-all cursor-pointer ${
                  isSelected ? "border-coral bg-coral/5 shadow-md" : "border-gray-200 bg-white hover:border-coral/40"
                }`}
              >
                <svg viewBox="0 0 48 42" className="w-full h-10 mb-2">
                  {s.value === "round" ? (
                    <ellipse
                      cx="24" cy="24" rx="17" ry="16"
                      fill="none"
                      stroke={isSelected ? "#F2705C" : "#9CA3AF"}
                      strokeWidth="2"
                    />
                  ) : (
                    <path
                      d="M7 38 Q7 12 24 7 Q41 12 41 38 Q32 33 24 33 Q16 33 7 38Z"
                      fill="none"
                      stroke={isSelected ? "#F2705C" : "#9CA3AF"}
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  )}
                </svg>
                <p className="text-sm font-bold text-burgundy">{s.label}</p>
                <p className="text-xs text-warm-grey mt-0.5 leading-tight">{s.sub}</p>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={onNext}
          disabled={!canContinue}
          className={`w-full py-4 rounded-xl text-lg font-semibold transition-all duration-200 cursor-pointer ${
            canContinue
              ? "bg-coral text-white shadow-lg hover:shadow-xl hover:brightness-105"
              : "bg-gray-100 text-warm-grey cursor-not-allowed"
          }`}
        >
          {canContinue ? "Continue" : "Select profile & shape to continue"}
        </button>
        <button
          onClick={onNext}
          className="text-xs text-warm-grey underline underline-offset-2 hover:text-burgundy cursor-pointer text-center"
        >
          I&apos;m not sure yet — my advisor can help
        </button>
      </div>
    </div>
  );
}
