export function formatInrAmount(amount: number, currency = "INR") {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function normalizeReferralCode(raw: string | null | undefined) {
  const code = (raw ?? "").trim().toUpperCase();
  return code || "";
}

/** Remove leftover coupon from older auto-apply flow. */
export function clearStoredReferralCode() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem("academy_referral_code");
  } catch {
    /* ignore */
  }
}
