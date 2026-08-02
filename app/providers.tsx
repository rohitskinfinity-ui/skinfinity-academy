"use client";

import { StudentAuthProvider } from "@/store/student-auth";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <StudentAuthProvider>{children}</StudentAuthProvider>;
}
