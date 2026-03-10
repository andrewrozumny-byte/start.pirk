"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import ProgressBar from "./ProgressBar";
import NarrowingIndicator from "./SurgeonGrid";
import InsightCard from "./InsightCard";
import TestimonialCard from "./TestimonialCard";
import { slideVariants } from "./QuizStep";
import type { QuizData, QuizField, InsightCardData } from "./types";
import { initialQuizData } from "./types";

// ---- Step imports ----
import ProcedureStep from "./steps/ProcedureStep";
import LocationStep from "./steps/LocationStep";
import PrioritiesStep from "./steps/PrioritiesStep";
import BudgetStep from "./steps/BudgetStep";
import RequirementsStep from "./steps/RequirementsStep";
import BreastGoalStep from "./steps/BreastGoalStep";
import BreastImplantStep from "./steps/BreastImplantStep";
import FaceGoalStep from "./steps/FaceGoalStep";
import FaceConcernStep from "./steps/FaceConcernStep";
import BodyGoalStep from "./steps/BodyGoalStep";
import BodyAreaStep from "./steps/BodyAreaStep";
import EmailCaptureStep from "./steps/EmailCaptureStep";
import PhoneCaptureStep from "./steps/PhoneCaptureStep";
import BookCallStep from "./steps/BookCallStep";

// ---- Social proof ticker ----
const PROOF_ITEMS = [
  "2,500+ patients guided",
  "12 matched this week",
  "5.0 · Verified client reviews",
  "200+ surgeons independently vetted",
];

// ---- Procedure category sets ----
const BREAST_PROCEDURES = new Set([
  "breast_augmentation",
  "breast_lift",
  "aug_lift",
  "breast_reduction",
  "implant_revision",
  "breast_reconstruction",
]);

const FACE_PROCEDURES = new Set([
  "rhinoplasty",
  "blepharoplasty",
  "brow_lift",
  "facelift",
  "face_other",
]);

const BODY_PROCEDURES = new Set([
  "liposuction",
  "abdominoplasty",
  "combined_body",
  "body_other",
]);

const AUGMENTATION_PROCEDURES = new Set(["breast_augmentation", "aug_lift"]);

// ---- Ending types ----
export type QuizEnding = "payment" | "call";

// ---- Step Definitions ----
interface TestimonialData {
  quote: string;
  name: string;
  location: string;
  initials: string;
}

type StepEntry =
  | { type: "step"; id: string; label: string }
  | { type: "insight"; id: string; data: InsightCardData }
  | { type: "testimonial"; id: string; data: TestimonialData };

// -------------------------------------------------------
// LONG FORM STEP SEQUENCES
// -------------------------------------------------------

// Generic long funnel (no procedure pre-selected)
const LONG_STEPS: StepEntry[] = [
  { type: "step", id: "procedure", label: "Procedure" },
  { type: "step", id: "location", label: "Location" },
  {
    type: "insight",
    id: "insight-1",
    data: {
      icon: "ShieldCheck",
      stat: "200+",
      description:
        "surgeons independently vetted across Australia — we know which ones are right for you",
    },
  },
  // Procedure-specific follow-ups injected dynamically (see getActiveSteps)
  { type: "step", id: "budget", label: "Budget" },
  { type: "step", id: "priorities", label: "Priorities" },
  { type: "step", id: "requirements", label: "Preferences" },
  {
    type: "testimonial",
    id: "testimonial-1",
    data: {
      quote:
        "I'd spent weeks going in circles — different surgeons, different prices, no idea who to trust. Pirk just made it simple.",
      name: "Jess M.",
      location: "Sydney, NSW",
      initials: "JM",
    },
  },
  { type: "step", id: "emailCapture", label: "Your Details" },
  // Final step depends on ending type (see getActiveSteps)
];

// Breast-specific long funnel (procedure pre-selected)
const LONG_BREAST_STEPS: StepEntry[] = [
  { type: "step", id: "location", label: "Location" },
  {
    type: "insight",
    id: "insight-1",
    data: {
      icon: "ShieldCheck",
      stat: "200+",
      description:
        "breast surgeons independently vetted — we know which ones specialise in your procedure",
    },
  },
  { type: "step", id: "breastGoal", label: "Your Goal" },
  { type: "step", id: "breastImplant", label: "Preferences" },
  { type: "step", id: "budget", label: "Budget" },
  { type: "step", id: "priorities", label: "Priorities" },
  { type: "step", id: "requirements", label: "Preferences" },
  {
    type: "testimonial",
    id: "testimonial-1",
    data: {
      quote:
        "I'd been researching for 8 months and still felt lost. Pirk matched me in days and my advisor understood exactly what I was asking for.",
      name: "Sophie T.",
      location: "Brisbane",
      initials: "ST",
    },
  },
  { type: "step", id: "emailCapture", label: "Your Details" },
];

// Face-specific long funnel
const LONG_FACE_STEPS: StepEntry[] = [
  { type: "step", id: "location", label: "Location" },
  {
    type: "insight",
    id: "insight-1",
    data: {
      icon: "ShieldCheck",
      stat: "200+",
      description:
        "facial surgeons independently vetted — we know who gets the best results for your goals",
    },
  },
  { type: "step", id: "faceGoal", label: "Your Goal" },
  { type: "step", id: "faceConcern", label: "Main Concern" },
  { type: "step", id: "budget", label: "Budget" },
  { type: "step", id: "priorities", label: "Priorities" },
  { type: "step", id: "requirements", label: "Preferences" },
  {
    type: "testimonial",
    id: "testimonial-1",
    data: {
      quote:
        "I was terrified of choosing the wrong surgeon for my rhinoplasty. Pirk matched me with someone who genuinely understood what I wanted.",
      name: "Amy L.",
      location: "Melbourne",
      initials: "AL",
    },
  },
  { type: "step", id: "emailCapture", label: "Your Details" },
];

// Body-specific long funnel
const LONG_BODY_STEPS: StepEntry[] = [
  { type: "step", id: "location", label: "Location" },
  {
    type: "insight",
    id: "insight-1",
    data: {
      icon: "ShieldCheck",
      stat: "200+",
      description:
        "body contouring surgeons independently vetted — we match you with the right specialist",
    },
  },
  { type: "step", id: "bodyGoal", label: "Your Goal" },
  { type: "step", id: "bodyArea", label: "Target Area" },
  { type: "step", id: "budget", label: "Budget" },
  { type: "step", id: "priorities", label: "Priorities" },
  { type: "step", id: "requirements", label: "Preferences" },
  {
    type: "testimonial",
    id: "testimonial-1",
    data: {
      quote:
        "After two kids I didn't know where to start. My Pirk advisor made the whole process feel manageable and I couldn't be happier with my surgeon.",
      name: "Rachel K.",
      location: "Perth",
      initials: "RK",
    },
  },
  { type: "step", id: "emailCapture", label: "Your Details" },
];

// -------------------------------------------------------
// Helpers
// -------------------------------------------------------

/** Detect funnel category from procedure slug */
function getFunnelCategory(procedure: string): "breast" | "face" | "body" | "generic" {
  if (BREAST_PROCEDURES.has(procedure)) return "breast";
  if (FACE_PROCEDURES.has(procedure)) return "face";
  if (BODY_PROCEDURES.has(procedure)) return "body";
  return "generic";
}

/** Get the base steps for the long variant based on procedure */
function getBaseSteps(category: "breast" | "face" | "body" | "generic"): StepEntry[] {
  switch (category) {
    case "breast": return [...LONG_BREAST_STEPS];
    case "face": return [...LONG_FACE_STEPS];
    case "body": return [...LONG_BODY_STEPS];
    default: return [...LONG_STEPS];
  }
}

/** Append the correct final step(s) based on ending type */
function appendEnding(steps: StepEntry[], ending: QuizEnding): StepEntry[] {
  if (ending === "call") {
    // Book-call ending: email capture is already in the steps, add bookCall
    return [...steps, { type: "step", id: "bookCall", label: "Book a Call" }];
  }
  // Payment ending: email → phone → submit → redirect to results/payment
  return [
    ...steps,
    { type: "step", id: "phoneCapture", label: "Priority Access" },
  ];
}

function getRealStepIndex(steps: StepEntry[], currentIndex: number): number {
  let count = 0;
  for (let i = 0; i < currentIndex; i++) {
    if (steps[i].type === "step") count++;
  }
  if (steps[currentIndex]?.type === "step") count++;
  return count;
}

function getCurrentLabel(steps: StepEntry[], currentIndex: number): string {
  const step = steps[currentIndex];
  if (!step) return "";
  if (step.type === "step") return step.label;
  return "Loading...";
}

// -------------------------------------------------------
// Component
// -------------------------------------------------------

export default function QuizContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read query params
  const prefilledProcedure = searchParams.get("procedure") || "";
  const ending = (searchParams.get("ending") as QuizEnding) || "payment";

  // Determine funnel category
  const funnelCategory = getFunnelCategory(prefilledProcedure);
  const isAugFunnel = AUGMENTATION_PROCEDURES.has(prefilledProcedure);

  // Build active steps
  const activeSteps = appendEnding(getBaseSteps(funnelCategory), ending);
  const TOTAL_REAL_STEPS = activeSteps.filter((s) => s.type === "step").length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<QuizData>({
    ...initialQuizData,
    procedure: prefilledProcedure,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // When user picks a procedure in the generic funnel, we need to
  // dynamically switch to the category-specific steps.
  // We track this with selectedCategory state.
  const [dynamicCategory, setDynamicCategory] = useState<"breast" | "face" | "body" | "generic">(funnelCategory);

  // Recompute steps when the procedure changes in the generic funnel
  const currentActiveSteps = funnelCategory === "generic" && dynamicCategory !== "generic"
    ? appendEnding(getBaseSteps(dynamicCategory), ending)
    : activeSteps;

  const currentTotalRealSteps = currentActiveSteps.filter((s) => s.type === "step").length;

  const currentStep = currentActiveSteps[currentIndex];

  // Watch for procedure changes in generic funnel to inject follow-up steps
  useEffect(() => {
    if (funnelCategory !== "generic") return;
    const newCat = getFunnelCategory(data.procedure);
    if (newCat !== dynamicCategory) {
      setDynamicCategory(newCat);
    }
  }, [data.procedure, funnelCategory, dynamicCategory]);

  // Auto-advance insight + testimonial cards
  useEffect(() => {
    const delay =
      currentStep?.type === "testimonial"
        ? 3500
        : currentStep?.type === "insight"
          ? 2500
          : null;

    if (delay !== null) {
      const timer = setTimeout(() => {
        setDirection(1);
        setCurrentIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, currentStep?.type]);

  const handleAnswer = useCallback(
    (field: QuizField, value: string | string[]) => {
      setData((prev) => ({ ...prev, [field]: value } as QuizData));
    },
    []
  );

  const goNext = useCallback(() => {
    if (currentIndex < currentActiveSteps.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, currentActiveSteps]);

  const goBack = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      let target = currentIndex - 1;
      while (
        target > 0 &&
        (currentActiveSteps[target].type === "insight" ||
          currentActiveSteps[target].type === "testimonial")
      ) {
        target--;
      }
      setCurrentIndex(target);
    }
  }, [currentIndex, currentActiveSteps]);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, quizEnding: ending }),
      });

      if (response.ok) {
        const result = await response.json();
        if (ending === "call") {
          // For book-call ending, go to a confirmation/results page
          router.push(`/results/${result.matchId}?source=call`);
        } else {
          router.push(`/results/${result.matchId}`);
        }
      } else {
        const fallbackId = crypto.randomUUID();
        router.push(`/results/${fallbackId}`);
      }
    } catch {
      const fallbackId = crypto.randomUUID();
      router.push(`/results/${fallbackId}`);
    } finally {
      setIsSubmitting(false);
    }
  }, [data, ending, router]);

  const handlePhoneNext = useCallback(() => {
    handleSubmit();
  }, [handleSubmit]);

  const handlePhoneSkip = useCallback(() => {
    handleAnswer("phone", "");
    handleSubmit();
  }, [handleAnswer, handleSubmit]);

  // Build the step props shared by all step components
  const stepProps = {
    data,
    onAnswer: handleAnswer,
    onNext: goNext,
    onBack: goBack,
  };

  const isFirstRealStep =
    currentStep?.type === "step" &&
    (currentStep.id === "procedure" || currentStep.id === "location");
  const showBack = currentIndex > 0 && currentStep?.type === "step" && !isFirstRealStep;

  // Render the content for the current step
  const renderStep = () => {
    if (!currentStep) return null;

    if (currentStep.type === "insight") {
      return (
        <InsightCard
          icon={currentStep.data.icon}
          stat={currentStep.data.stat}
          description={currentStep.data.description}
        />
      );
    }

    if (currentStep.type === "testimonial") {
      return (
        <TestimonialCard
          quote={currentStep.data.quote}
          name={currentStep.data.name}
          location={currentStep.data.location}
          initials={currentStep.data.initials}
        />
      );
    }

    switch (currentStep.id) {
      case "procedure":
        return <ProcedureStep {...stepProps} />;
      case "location":
        return <LocationStep {...stepProps} />;
      case "budget":
        return <BudgetStep {...stepProps} />;
      case "priorities":
        return <PrioritiesStep {...stepProps} />;
      case "requirements":
        return <RequirementsStep {...stepProps} />;
      // Breast follow-ups
      case "breastGoal":
        return <BreastGoalStep {...stepProps} />;
      case "breastImplant":
        if (!isAugFunnel) {
          setTimeout(() => goNext(), 0);
          return null;
        }
        return <BreastImplantStep {...stepProps} />;
      // Face follow-ups
      case "faceGoal":
        return <FaceGoalStep {...stepProps} />;
      case "faceConcern":
        return <FaceConcernStep {...stepProps} />;
      // Body follow-ups
      case "bodyGoal":
        return <BodyGoalStep {...stepProps} />;
      case "bodyArea":
        return <BodyAreaStep {...stepProps} />;
      // Capture steps
      case "emailCapture":
        return <EmailCaptureStep {...stepProps} />;
      case "phoneCapture":
        return (
          <PhoneCaptureStep
            {...stepProps}
            onNext={handlePhoneNext}
            onSkip={handlePhoneSkip}
          />
        );
      case "bookCall":
        return (
          <BookCallStep
            {...stepProps}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  const realStepNumber = getRealStepIndex(currentActiveSteps, currentIndex);
  const stepLabel = getCurrentLabel(currentActiveSteps, currentIndex);

  // Social proof ticker state
  const [tickerIndex, setTickerIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % PROOF_ITEMS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const isCardStep =
    currentStep?.type === "insight" || currentStep?.type === "testimonial";

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 min-h-screen flex flex-col">
      {/* Social proof ticker — visible on all steps */}
      <div className="mb-4 flex items-center justify-center overflow-hidden h-6">
        <AnimatePresence mode="wait">
          <motion.p
            key={tickerIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-xs font-medium text-coral text-center"
          >
            ★ {PROOF_ITEMS[tickerIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Progress bar -- hidden on insight/testimonial cards */}
      {!isCardStep && (
        <>
          <ProgressBar
            currentStep={realStepNumber}
            totalSteps={currentTotalRealSteps}
            label={stepLabel}
          />
          <NarrowingIndicator progress={realStepNumber / currentTotalRealSteps} />
        </>
      )}

      {/* Back button */}
      {showBack && (
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 text-warm-grey hover:text-burgundy
            text-sm font-medium mb-6 transition-colors cursor-pointer self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      )}

      {/* Step content with animations */}
      <div className="flex-1 flex items-start justify-center pt-4">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep?.id ?? currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="w-full"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Loading overlay for submission */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-cream/80 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-8 shadow-xl text-center max-w-sm mx-4"
            >
              <div className="w-12 h-12 rounded-full border-4 border-coral border-t-transparent animate-spin mx-auto mb-4" />
              <p className="text-lg font-semibold text-burgundy">
                {ending === "call"
                  ? "Setting up your matching call..."
                  : "Finding your matches..."}
              </p>
              <p className="text-sm text-warm-grey mt-1">
                This will only take a moment.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
