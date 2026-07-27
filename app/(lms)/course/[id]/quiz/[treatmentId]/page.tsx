"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import MaterialIcon from "@/components/shared/MaterialIcon";
import { getCourse, getTreatment } from "@/lib/lms/mock-data";

export default function TheoryQuizPage() {
  const router = useRouter();
  const params = useParams();
  const courseId =
    typeof params.id === "string" ? params.id : "custom-injectables";
  const treatmentId =
    typeof params.treatmentId === "string" ? params.treatmentId : "botox";

  const course = getCourse(courseId);
  const treatment = getTreatment(treatmentId);
  const questions = treatment?.theory.quiz ?? [];

  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(() => {
    if (!submitted) return 0;
    return questions.reduce((acc, q) => {
      return acc + (answers[q.id] === q.correctIndex ? 1 : 0);
    }, 0);
  }, [answers, questions, submitted]);

  const passMark = Math.ceil(questions.length * 0.66);
  const passed = submitted && score >= passMark;
  const courseHref = `/course/${encodeURIComponent(course?.id ?? courseId)}`;
  const answeredCount = Object.keys(answers).length;

  if (!treatment || !course) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F4F6F8] p-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-lg font-bold text-slate-900">Quiz not found</p>
          <Link
            href="/dashboard/courses"
            className="mt-4 inline-block text-sm font-semibold text-teal-700"
          >
            Back to courses
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = () => {
    if (answeredCount < questions.length) return;
    setSubmitted(true);
    const nextScore = questions.reduce((acc, q) => {
      return acc + (answers[q.id] === q.correctIndex ? 1 : 0);
    }, 0);
    const nextPassed = nextScore >= passMark;
    if (nextPassed && typeof window !== "undefined") {
      try {
        const key = "lms-passed-quizzes";
        const raw = window.sessionStorage.getItem(key);
        const list: string[] = raw ? JSON.parse(raw) : [];
        if (!list.includes(treatmentId)) {
          window.sessionStorage.setItem(
            key,
            JSON.stringify([...list, treatmentId])
          );
        }
      } catch {
        /* ignore */
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8]">
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <button
            onClick={() => router.push(courseHref)}
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
            aria-label="Back to course"
          >
            <MaterialIcon name="arrow_back" size={20} />
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-900">
              {treatment.name}
            </p>
            <p className="truncate text-xs text-slate-500">
              Theory quiz · {course.title}
            </p>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600">
            {answeredCount}/{questions.length}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-600">
            Complete theory
          </p>
          <h1
            className="mt-2 text-2xl font-bold tracking-tight text-slate-900"
            style={{ fontFamily: "var(--font-heading), sans-serif" }}
          >
            {treatment.name} quiz
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Answer all questions to finish Theory and unlock Observation. Pass
            mark: {passMark} of {questions.length}.
          </p>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-teal-500 transition-all duration-300"
              style={{
                width: `${(answeredCount / Math.max(questions.length, 1)) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="space-y-4">
          {questions.map((q, qi) => {
            const selected = answers[q.id];
            return (
              <div
                key={q.id}
                className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)]"
              >
                <p className="mb-4 text-sm font-semibold leading-relaxed text-slate-900">
                  <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-[11px] font-bold text-slate-600">
                    {qi + 1}
                  </span>
                  {q.prompt}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt, oi) => {
                    const isSelected = selected === oi;
                    const showResult = submitted;
                    const isCorrect = oi === q.correctIndex;
                    let styles =
                      "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50";
                    if (!showResult && isSelected) {
                      styles =
                        "border-teal-300 bg-teal-50 text-teal-900 ring-1 ring-teal-100";
                    }
                    if (showResult && isCorrect) {
                      styles =
                        "border-emerald-200 bg-emerald-50 text-emerald-900";
                    } else if (showResult && isSelected && !isCorrect) {
                      styles = "border-red-200 bg-red-50 text-red-900";
                    }

                    return (
                      <button
                        key={opt}
                        type="button"
                        disabled={submitted}
                        onClick={() =>
                          setAnswers((prev) => ({ ...prev, [q.id]: oi }))
                        }
                        className={`flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left text-sm transition-all ${styles}`}
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-bold text-slate-500 ring-1 ring-slate-200">
                          {String.fromCharCode(65 + oi)}
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={answeredCount < questions.length}
            className="mt-6 w-full rounded-xl bg-teal-600 py-3.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
          >
            Submit quiz
          </button>
        ) : (
          <div
            className={`mt-6 rounded-2xl border p-5 sm:p-6 ${
              passed
                ? "border-emerald-100 bg-emerald-50"
                : "border-amber-100 bg-amber-50"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                  passed ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                }`}
              >
                <MaterialIcon
                  name={passed ? "check_circle" : "refresh"}
                  size={22}
                />
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-900">
                  {passed ? "Theory complete" : "Keep going"}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Score {score}/{questions.length}.{" "}
                  {passed
                    ? "Observation is unlocked for this treatment."
                    : "Review the videos and booklets, then try again."}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href={courseHref}
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    Back to course
                    <MaterialIcon name="arrow_forward" size={16} />
                  </Link>
                  {!passed && (
                    <button
                      onClick={() => {
                        setAnswers({});
                        setSubmitted(false);
                      }}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Retry quiz
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
