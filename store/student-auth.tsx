"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  fetchStudentMe,
  studentLogout,
  type StudentProfile,
} from "@/lib/api/student-client";
import {
  getStudentToken,
  setStudentToken,
  subscribeStudentToken,
} from "@/lib/api/student-token";

type StudentAuthContextValue = {
  token: string | null;
  student: StudentProfile | null;
  hydrated: boolean;
  loading: boolean;
  setToken: (token: string | null) => void;
  refreshMe: () => Promise<void>;
  logout: () => Promise<void>;
};

const StudentAuthContext = createContext<StudentAuthContextValue | null>(null);

function useTokenStore() {
  return useSyncExternalStore(
    subscribeStudentToken,
    getStudentToken,
    () => null,
  );
}

export function StudentAuthProvider({ children }: { children: ReactNode }) {
  const token = useTokenStore();
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(false);

  const refreshMe = useCallback(async () => {
    const current = getStudentToken();
    if (!current) {
      setStudent(null);
      return;
    }
    setLoading(true);
    try {
      const me = await fetchStudentMe();
      setStudent(me);
    } catch {
      setStudentToken(null);
      setStudent(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!token) {
        if (!cancelled) {
          setStudent(null);
          setHydrated(true);
          setLoading(false);
        }
        return;
      }
      setLoading(true);
      try {
        const me = await fetchStudentMe();
        if (!cancelled) setStudent(me);
      } catch {
        if (!cancelled) {
          setStudentToken(null);
          setStudent(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
          setHydrated(true);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const logout = useCallback(async () => {
    await studentLogout();
    setStudent(null);
  }, []);

  const value = useMemo<StudentAuthContextValue>(
    () => ({
      token,
      student,
      hydrated,
      loading,
      setToken: setStudentToken,
      refreshMe,
      logout,
    }),
    [token, student, hydrated, loading, refreshMe, logout],
  );

  return (
    <StudentAuthContext.Provider value={value}>
      {children}
    </StudentAuthContext.Provider>
  );
}

export function useStudentAuth() {
  const ctx = useContext(StudentAuthContext);
  if (!ctx) {
    throw new Error("useStudentAuth must be used within StudentAuthProvider");
  }
  return ctx;
}
