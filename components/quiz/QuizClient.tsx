"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, CheckCircle, Leaf } from "lucide-react";
import { calculateDosha, mapConcernsToProducts, type QuizAnswers } from "@/lib/quiz-engine";
import type { QuizQuestion } from "@/lib/api";

type Answers = Record<string, string | string[]>;

const SECTIONS = ["A", "B", "C", "D", "E"];
const SECTION_TITLES: Record<string, string> = {
  A: "About You",
  B: "Your Prakriti",
  C: "Your Skin",
  D: "Your Hair",
  E: "Your Lifestyle",
};

export default function QuizClient({ questions }: { questions: QuizQuestion[] }) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("arvaya-quiz-answers");
    if (saved) {
      try { setAnswers(JSON.parse(saved)); } catch {}
    }
    const savedIndex = localStorage.getItem("arvaya-quiz-index");
    if (savedIndex) setCurrentIndex(Number(savedIndex));
  }, []);

  useEffect(() => {
    localStorage.setItem("arvaya-quiz-answers", JSON.stringify(answers));
    localStorage.setItem("arvaya-quiz-index", String(currentIndex));
  }, [answers, currentIndex]);

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="flex justify-center mb-4 text-[#4A7C59]"><Leaf size={44} strokeWidth={1.25} /></div>
          <p className="font-heading text-2xl text-[#2F5233] mb-2">Quiz coming soon</p>
          <p className="text-[#6B5D4F] text-sm leading-relaxed">
            Questions are being set up. Check back shortly or{" "}
            <a href="/products" className="text-[#2F5233] underline">browse products</a> in the meantime.
          </p>
        </div>
      </div>
    );
  }

  const question = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const currentSection = question.section;
  const sectionIndex = SECTIONS.indexOf(currentSection);

  function handleSingle(value: string) {
    setAnswers(prev => ({ ...prev, [question.id]: value }));
  }

  function handleMulti(value: string) {
    setAnswers(prev => {
      const current = (prev[question.id] as string[]) || [];
      return {
        ...prev,
        [question.id]: current.includes(value)
          ? current.filter(v => v !== value)
          : [...current, value],
      };
    });
  }

  function goNext() {
    if (currentIndex >= questions.length - 1) {
      handleSubmit();
      return;
    }
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex(i => i + 1);
      setAnimating(false);
    }, 200);
  }

  function goPrev() {
    if (currentIndex === 0) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex(i => i - 1);
      setAnimating(false);
    }, 200);
  }

  function handleSubmit() {
    const doshaResult = calculateDosha(answers as QuizAnswers);
    const recs = mapConcernsToProducts(answers as QuizAnswers, doshaResult);
    const id = Math.random().toString(36).slice(2, 10);
    localStorage.setItem(`arvaya-result-${id}`, JSON.stringify({
      answers,
      doshaResult,
      recommendations: recs,
      timestamp: Date.now(),
    }));
    localStorage.removeItem("arvaya-quiz-answers");
    localStorage.removeItem("arvaya-quiz-index");
    router.push(`/quiz/results/${id}`);
  }

  const currentAnswer = answers[question.id];
  const hasAnswer = question.type === "multi"
    ? (currentAnswer as string[] | undefined)?.length
    : !!currentAnswer;

  return (
    <div className="min-h-screen bg-[#FAF7F0] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-[#A8C09A]/25 px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-[#4A7C59]">
              {question.sectionTitle}, Section {question.section}
            </span>
            <span className="text-xs text-[#6B5D4F]">
              {currentIndex + 1} / {questions.length}
            </span>
          </div>

          <div className="h-2 bg-[#A8C09A]/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2F5233] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex gap-1 mt-3">
            {SECTIONS.map((s, i) => (
              <div
                key={s}
                className={`flex-1 h-1 rounded-full transition-colors ${
                  i < sectionIndex
                    ? "bg-[#4A7C59]"
                    : i === sectionIndex
                    ? "bg-[#2F5233]"
                    : "bg-[#A8C09A]/25"
                }`}
                title={SECTION_TITLES[s]}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Question */}
      <div
        className={`flex-1 flex items-center justify-center px-4 py-12 transition-opacity duration-200 ${animating ? "opacity-0" : "opacity-100"}`}
      >
        <div className="w-full max-w-2xl">
          {question.hint && (
            <div className="bg-[#D4A24C]/10 border border-[#D4A24C]/25 rounded-xl px-4 py-3 mb-6">
              <p className="text-sm text-[#B8882E] leading-relaxed">{question.hint}</p>
            </div>
          )}

          <h2 className="font-heading text-2xl md:text-3xl text-[#2C2C2C] mb-8 leading-snug">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map(option => {
              const isSelected =
                question.type === "single"
                  ? currentAnswer === option.value
                  : (currentAnswer as string[] | undefined)?.includes(option.value);

              return (
                <button
                  key={option.value}
                  onClick={() =>
                    question.type === "single" ? handleSingle(option.value) : handleMulti(option.value)
                  }
                  className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-150 flex items-center justify-between gap-4 ${
                    isSelected
                      ? "bg-[#2F5233] text-[#FAF7F0] border-[#2F5233] shadow-[0_4px_16px_rgba(47,82,51,0.25)]"
                      : "bg-white text-[#2C2C2C] border-[#A8C09A]/40 hover:border-[#2F5233]/40 hover:bg-[#A8C09A]/8"
                  }`}
                >
                  <span className="text-sm leading-relaxed">{option.label}</span>
                  {isSelected && <CheckCircle size={18} className="flex-shrink-0 text-[#A8C09A]" />}
                </button>
              );
            })}
          </div>

          {question.type === "multi" && (
            <p className="text-xs text-[#6B5D4F] mt-3">Select all that apply</p>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-t border-[#A8C09A]/25 px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 text-sm font-medium text-[#6B5D4F] hover:text-[#2F5233] transition-colors disabled:opacity-30 disabled:cursor-not-allowed px-4 py-2 rounded-xl hover:bg-[#A8C09A]/15"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <p className="text-xs text-[#6B5D4F]/60">
            {currentIndex >= questions.length - 1 ? "Last question!" : `${questions.length - currentIndex - 1} more to go`}
          </p>

          <button
            onClick={goNext}
            disabled={question.type !== "multi" && !hasAnswer}
            className="flex items-center gap-2 bg-[#2F5233] text-[#FAF7F0] px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-[#4A7C59] transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 shadow-[0_4px_16px_rgba(47,82,51,0.25)]"
          >
            {currentIndex >= questions.length - 1 ? "See My Results" : "Next"}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
