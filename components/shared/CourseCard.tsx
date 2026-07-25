"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import {
  Award,
  BookOpen,
  Clock,
  Star,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type CourseCardData = {
  title: string;
  desc: string;
  image: string;
  duration: string;
  lessons: number;
  certificate: string;
  faculty: string;
  facultyAvatar: string;
  price: string;
  rating: number;
  progress?: number;
  tag?: string | null;
  bestseller?: boolean;
  href?: string;
};

export default function CourseCard({
  course,
  className,
}: {
  course: CourseCardData;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const transform = useMotionTemplate`perspective(800px) rotateX(${y}deg) rotateY(${x}deg)`;

  function onMove(e: React.MouseEvent<HTMLElement>) {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set((px - 0.5) * 8);
    y.set((0.5 - py) * 8);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.article
      style={{ transform }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={reduceMotion ? undefined : { y: -8 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_4px_24px_rgba(15,23,42,0.06)] ring-1 ring-slate-100/80 transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(15,118,110,0.14)]",
        className
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/10 to-transparent" />

        {course.bestseller && (
          <div className="absolute left-0 top-4 overflow-hidden">
            <span className="inline-block -translate-x-1 rotate-[-8deg] bg-gradient-to-r from-violet-600 to-violet-500 px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
              Bestseller
            </span>
          </div>
        )}

        {course.tag && !course.bestseller && (
          <span className="absolute left-3 top-3 rounded-full bg-teal-700 px-3 py-1 text-[10px] font-bold text-white shadow-lg">
            {course.tag}
          </span>
        )}

        <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-xl bg-white/15 px-2.5 py-1.5 backdrop-blur-md ring-1 ring-white/25">
          <Star className="size-3 fill-amber-400 text-amber-400" />
          <span className="text-xs font-bold text-white">{course.rating}</span>
        </div>

        {course.certificate && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-xl bg-white/90 px-2.5 py-1.5 text-[10px] font-semibold text-teal-800 shadow-sm backdrop-blur-sm">
            <Award className="size-3.5 text-teal-600" />
            Certificate
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="mb-2 text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-teal-700">
          {course.title}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-500">
          {course.desc}
        </p>

        {typeof course.progress === "number" && (
          <div className="mb-4">
            <div className="mb-1.5 flex items-center justify-between text-[11px]">
              <span className="font-medium text-slate-500">Progress</span>
              <span className="font-bold text-teal-700">{course.progress}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal-600 to-teal-400 transition-all duration-700"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="mb-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-600">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5 text-teal-500" />
            {course.duration}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BookOpen className="size-3.5 text-teal-500" />
            {course.lessons} lessons
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="flex items-center gap-2.5">
            <Image
              src={course.facultyAvatar}
              alt={course.faculty}
              width={36}
              height={36}
              className="size-9 rounded-full object-cover ring-2 ring-teal-50"
            />
            <div>
              <p className="text-[11px] text-slate-400">Instructor</p>
              <p className="text-xs font-semibold text-slate-700">
                {course.faculty}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-400">From</p>
            <p className="text-lg font-bold text-slate-900">{course.price}</p>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Link
            href={course.href ?? "/courses"}
            className="flex-1 rounded-2xl border border-slate-200 px-3 py-2.5 text-center text-xs font-semibold text-slate-600 transition-all hover:border-teal-300 hover:text-teal-700"
          >
            Details
          </Link>
          <Link
            href="/enroll"
            className="inline-flex flex-1 items-center justify-center gap-1 rounded-2xl bg-teal-700 px-3 py-2.5 text-xs font-semibold text-white transition-all hover:bg-teal-800 hover:shadow-[0_8px_24px_rgba(15,118,110,0.35)]"
          >
            Enroll
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
