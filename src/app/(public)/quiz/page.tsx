import type { Metadata } from "next";
import { Suspense } from "react";
import QuizContainer from "@/components/quiz/QuizContainer";

export const metadata: Metadata = {
  title: "Find Your Surgeon — Pirk",
  description:
    "Tell us what matters to you and get matched with vetted surgeons across Australia.",
};

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-cream">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-coral border-t-transparent" />
          </div>
        }
      >
        <QuizContainer />
      </Suspense>
    </main>
  );
}
