"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import MaterialIcon from "@/components/shared/MaterialIcon";
import EmptyState from "@/app/(lms)/dashboard/_components/EmptyState";
import QuizSkeleton from "@/components/lms/QuizSkeleton";
import { useLMSTheme } from "@/components/lms/LMSThemeProvider";
import {
  fetchStudentFinalQuiz,
  submitStudentFinalQuiz,
  type StudentFinalQuizPayload,
} from "@/lib/api/student-client";
import { ApiError } from "@/lib/api/client";

function asOptions(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.map(String);
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed.map(String);
    } catch {
      /* ignore */
    }
  }
  return [];
}

export default function CertificateQuizPage() {
  const router = useRouter();
  const params = useParams();
  const { theme } = useLMSTheme();
  const isDark = theme === "dark";

  const enrollmentId =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
        ? params.id[0]
        : "";

  const [quiz, setQuiz] = useState<StudentFinalQuizPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    max_score: number;
    percent: number;
    passed: boolean;
    pass_percent: number;
    awaiting_admin: boolean;
  } | null>(null);

  const courseHref = `/course/${encodeURIComponent(enrollmentId)}`;
  const certsHref = "/dashboard/certificates";

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchStudentFinalQuiz(enrollmentId);
        if (!cancelled) setQuiz(data);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiError ? err.message : "Failed to load certificate quiz",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [enrollmentId]);

  const questions = quiz?.quiz.questions ?? [];
  const answeredCount = Object.keys(answers).length;
  const allAnswered = useMemo(
    () => answeredCount >= questions.length && questions.length > 0,
    [answeredCount, questions.length],
  );

  async function handleSubmit() {
    if (!allAnswered || submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await submitStudentFinalQuiz(enrollmentId, answers);
      setResult(res);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Submit failed");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <QuizSkeleton />;
  }

  if (error && !quiz) {
    return (
      <EmptyState
        icon="quiz"
        title="Certificate quiz unavailable"
        description={error}
        action={
          <Link href={courseHref} className="text-sm font-semibold text-teal-700">
            Back to course
          </Link>
        }
      />
    );
  }

  if (!quiz) return null;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-[#F4F6F8] text-slate-900"
      }`}
    >
      <header
        className={`sticky top-0 z-20 border-b backdrop-blur-xl transition-colors duration-300 ${
          isDark
            ? "border-slate-800 bg-slate-950/90 text-white"
            : "border-slate-200/80 bg-white/90 text-slate-900"
        }`}
      >
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <button
            type="button"
            onClick={() => router.push(courseHref)}
            className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${
              isDark
                ? "border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"
                : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900"
            }`}
          >
            <MaterialIcon name="arrow_back" size={16} /> Back
          </button>
          <p className="text-sm font-bold tracking-tight">{quiz.quiz.title}</p>
          <span className={isDark ? "text-xs text-slate-400" : "text-xs text-slate-500"}>
            Pass {quiz.quiz.pass_percent}%
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-6 sm:px-6">
        <p
          className={`mb-4 text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}
        >
          This is the course certificate quiz. You need {quiz.quiz.pass_percent}%
          to unlock download (after the academy issues your file).
        </p>

        {quiz.already_passed && !result ? (
          <div
            className={`mb-4 rounded-xl border px-4 py-3 text-sm ${
              isDark
                ? "border-emerald-500/30 bg-emerald-950/40 text-emerald-300"
                : "border-emerald-200 bg-emerald-50 text-emerald-800"
            }`}
          >
            You’ve already passed this quiz. You can retake it for practice.
          </div>
        ) : null}

        {result ? (
          <div
            className={`mb-6 rounded-2xl border p-5 ${
              result.passed
                ? isDark
                  ? "border-emerald-500/30 bg-emerald-950/40 text-emerald-300"
                  : "border-emerald-200 bg-emerald-50 text-emerald-900"
                : isDark
                  ? "border-amber-500/30 bg-amber-950/40 text-amber-300"
                  : "border-amber-200 bg-amber-50 text-amber-900"
            }`}
          >
            <p className="text-lg font-bold">
              {result.passed ? "Certificate quiz passed" : "Not passed yet"}
            </p>
            <p className="mt-1 text-sm opacity-80">
              Score {result.score}/{result.max_score} ({result.percent}%). Pass
              mark {result.pass_percent}%.
            </p>
            {result.passed ? (
              <p className="mt-2 text-sm opacity-80">
                Download unlocks after the academy uploads your certificate.
              </p>
            ) : null}
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href={certsHref}
                className="inline-flex rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 transition-colors"
              >
                My certificates
              </Link>
              <Link
                href={courseHref}
                className={`inline-flex rounded-xl border px-4 py-2 text-sm font-semibold ${
                  isDark
                    ? "border-slate-700 text-slate-200 hover:bg-slate-800"
                    : "border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                Back to course
              </Link>
            </div>
          </div>
        ) : null}

        <div className="space-y-4">
          {questions.map((q, idx) => {
            const options = asOptions(q.options);
            return (
              <div
                key={q.id}
                className={`rounded-2xl border p-5 shadow-sm transition-colors duration-300 ${
                  isDark
                    ? "border-slate-800 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-900"
                }`}
              >
                <p className="text-sm font-semibold">
                  {idx + 1}. {q.prompt}
                </p>
                <div className="mt-3 space-y-2">
                  {options.map((opt, oi) => {
                    const selected = answers[q.id] === oi;
                    return (
                      <button
                        key={`${q.id}-${oi}`}
                        type="button"
                        disabled={Boolean(result)}
                        onClick={() =>
                          setAnswers((prev) => ({ ...prev, [q.id]: oi }))
                        }
                        className={`flex w-full rounded-xl border px-3.5 py-2.5 text-left text-sm transition-all ${
                          selected
                            ? isDark
                              ? "border-teal-500 bg-teal-500/20 text-teal-300 font-medium"
                              : "border-teal-500 bg-teal-50 text-teal-900 font-medium"
                            : isDark
                              ? "border-slate-800 bg-slate-800/40 text-slate-300 hover:bg-slate-800 hover:text-white"
                              : "border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {!result ? (
          <button
            type="button"
            disabled={!allAnswered || submitting}
            onClick={() => void handleSubmit()}
            className="mt-6 w-full rounded-xl bg-teal-600 py-3 text-sm font-semibold text-white shadow-md hover:bg-teal-500 transition-all disabled:opacity-50"
          >
            {submitting
              ? "Submitting…"
              : `Submit (${answeredCount}/${questions.length})`}
          </button>
        ) : null}

        {error && quiz ? (
          <p className="mt-3 text-center text-sm text-red-500">{error}</p>
        ) : null}
      </main>
    </div>
  );
}
