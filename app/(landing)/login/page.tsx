"use client";

import { createClient } from "@/app/utils/supabase/client";
import { motion } from "framer-motion";
import { AlertCircle, Lock, Mail, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);
  const [emailNotFound, setEmailNotFound] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const isMissingRelationError = (error: { code?: string; message?: string }) =>
    error.code === "42P01" ||
    error.message?.toLowerCase().includes("could not find the table") === true;

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      const userId = data.user?.id;

      if (!userId) {
        router.push("/dashboard");
        return;
      }

      // Check education profile, CRM access, HRM access, and Store access
      // New schema: crm_users.id = auth.users.id, hrm_users.id = auth.users.id
      const { data: profile } = await supabase
        .from("profiles")
        .select("id, role")
        .eq("id", userId)
        .maybeSingle();

      const { data: crmUser } = await supabase
        .from("crm_users")
        .select("id, crm_role")
        .eq("id", userId)
        .maybeSingle();

      const { data: hrmUser } = await supabase
        .from("hrm_users")
        .select("id, hrm_role")
        .eq("id", userId)
        .maybeSingle();

      const { data: storeUser, error: storeUserError } = await supabase
        .from("store_users")
        .select("id, store_role")
        .eq("id", userId)
        .maybeSingle();

      if (storeUserError && !isMissingRelationError(storeUserError)) {
        setError(storeUserError.message);
        return;
      }

      const hasEducationAccess = profile !== null;
      const hasCrmAccess = crmUser !== null;
      const hasHrmAccess = hrmUser !== null;
      const hasStoreAccess = storeUser !== null;

      // If user has no access to any application, auto-provision a customer profile
      // so they can access the education dashboard as a customer.
      if (
        !hasEducationAccess &&
        !hasCrmAccess &&
        !hasHrmAccess &&
        !hasStoreAccess
      ) {
        const { error: insertError } = await supabase.from("profiles").insert({
          id: userId,
          email: email.trim().toLowerCase(),
          role: "customer",
        });

        if (insertError) {
          setError(
            "Failed to set up your account. Please try again or contact support.",
          );
          await supabase.auth.signOut();
          return;
        }

        router.push("/dashboard/customer");
        return;
      }

      // Determine redirect target based on priority: Education > CRM > HRM > Store
      if (hasEducationAccess) {
        // Education takes priority
        router.push(
          profile?.role === "admin"
            ? "/dashboard/admin"
            : "/dashboard/customer",
        );
      } else if (hasCrmAccess) {
        // CRM second priority
        router.push("/dashboard/crm");
      } else if (hasHrmAccess) {
        // HRM third priority - let middleware handle role-specific redirect
        router.push("/dashboard/hrm");
      } else if (hasStoreAccess) {
        // Store fourth priority
        router.push("/dashboard/store");
      } else {
        // Fallback (shouldn't reach here due to earlier check)
        router.push("/dashboard");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError(null);
    setResetSuccess(false);
    setEmailNotFound(false);
    setResetLoading(true);

    try {
      // Trim and normalize email
      const normalizedEmail = resetEmail.trim().toLowerCase();

      if (!normalizedEmail) {
        setResetError("Please enter your email address.");
        setResetLoading(false);
        return;
      }

      // Basic email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(normalizedEmail)) {
        setResetError("Please enter a valid email address.");
        setResetLoading(false);
        return;
      }

      // Check if the email exists via API route (bypasses RLS)
      const checkResponse = await fetch("/api/auth/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      if (!checkResponse.ok) {
        setResetError("Unable to verify email. Please try again.");
        setResetLoading(false);
        return;
      }

      const { exists } = await checkResponse.json();

      if (!exists) {
        setEmailNotFound(true);
        setResetLoading(false);
        return;
      }

      // Email exists, proceed with password reset
      const { error } = await supabase.auth.resetPasswordForEmail(
        normalizedEmail,
        {
          redirectTo: `${window.location.origin}/set-password`,
        },
      );

      if (error) {
        setResetError(error.message);
      } else {
        setResetSuccess(true);
      }
    } catch {
      setResetError("An unexpected error occurred. Please try again.");
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080B14] flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FBBF24] opacity-[0.04] blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <div className="rounded-2xl border border-[#1E2A3A] bg-[#0F1422] p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-[#8B9CB6]">Sign in to your WeTrain account</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4"
            >
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-400">{error}</p>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSignIn} className="space-y-4 mb-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-[#8B9CB6]" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#1E2A3A] bg-[#080B14] text-white placeholder-[#8B9CB6] focus:outline-none focus:border-[#FBBF24]/50 focus:ring-1 focus:ring-[#FBBF24]/30"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-[#8B9CB6]" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#1E2A3A] bg-[#080B14] text-white placeholder-[#8B9CB6] focus:outline-none focus:border-[#FBBF24]/50 focus:ring-1 focus:ring-[#FBBF24]/30"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-[#FBBF24] text-[#0A0A0A] py-2.5 rounded-lg font-bold hover:bg-[#F59E0B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#1E2A3A]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#0F1422] text-[#8B9CB6]">New to WeTrain?</span>
            </div>
          </div>

          <Link href="/register">
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="w-full border border-[#FBBF24]/40 text-white py-2.5 rounded-lg font-bold hover:border-[#FBBF24]/70 hover:bg-[#FBBF24]/5 transition-colors"
              type="button"
            >
              Create an Account
            </motion.button>
          </Link>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setShowForgotPassword(true)}
              className="text-sm text-[#FBBF24] hover:underline"
            >
              Forgot your password?
            </button>
          </div>
        </div>

        {/* Forgot Password Modal */}
        {showForgotPassword && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
            onClick={() => {
              if (!resetLoading) {
                setShowForgotPassword(false);
                setResetError(null);
                setResetSuccess(false);
                setEmailNotFound(false);
                setResetEmail("");
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="rounded-2xl border border-[#1E2A3A] bg-[#0F1422] p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">Reset Password</h2>
                <button
                  type="button"
                  onClick={() => {
                    if (!resetLoading) {
                      setShowForgotPassword(false);
                      setResetError(null);
                      setResetSuccess(false);
                      setEmailNotFound(false);
                      setResetEmail("");
                    }
                  }}
                  className="text-[#8B9CB6] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {resetSuccess ? (
                <div className="space-y-4">
                  <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-4">
                    <p className="text-green-400 text-sm font-medium mb-2">✅ Password reset email sent!</p>
                    <p className="text-green-400/80 text-sm">Check your inbox at <strong>{resetEmail.trim()}</strong></p>
                    <p className="text-green-400/60 text-xs mt-2">💡 Don&apos;t see it? Check your spam folder.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setShowForgotPassword(false); setResetError(null); setResetSuccess(false); setEmailNotFound(false); setResetEmail(""); }}
                    className="w-full bg-[#FBBF24] text-[#0A0A0A] py-2 rounded-lg font-bold hover:bg-[#F59E0B] transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : emailNotFound ? (
                <div className="space-y-4">
                  <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
                    <p className="text-amber-400 text-sm font-medium mb-2">⚠️ No account found</p>
                    <p className="text-amber-400/80 text-sm">We couldn&apos;t find an account with <strong>{resetEmail.trim()}</strong></p>
                    <p className="text-amber-400/60 text-xs mt-2">Double-check the email or create a new account.</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => { setEmailNotFound(false); setResetEmail(""); }}
                      className="flex-1 border border-[#1E2A3A] text-[#8B9CB6] py-2 rounded-lg font-semibold hover:border-[#FBBF24]/30 hover:text-white transition-colors"
                    >
                      Try Again
                    </button>
                    <Link href="/register" className="flex-1">
                      <button
                        type="button"
                        onClick={() => { setShowForgotPassword(false); setResetError(null); setResetSuccess(false); setEmailNotFound(false); setResetEmail(""); }}
                        className="w-full bg-[#FBBF24] text-[#0A0A0A] py-2 rounded-lg font-bold hover:bg-[#F59E0B] transition-colors"
                      >
                        Create Account
                      </button>
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <p className="text-[#8B9CB6] text-sm">
                    Enter your email and we&apos;ll send you a link to reset your password.
                  </p>

                  {resetError && (
                    <div className="flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4">
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-400">{resetError}</p>
                    </div>
                  )}

                  <div>
                    <label htmlFor="reset-email" className="block text-sm font-medium text-white mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-[#8B9CB6]" />
                      <input
                        id="reset-email"
                        type="email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#1E2A3A] bg-[#080B14] text-white placeholder-[#8B9CB6] focus:outline-none focus:border-[#FBBF24]/50 focus:ring-1 focus:ring-[#FBBF24]/30"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={resetLoading}
                    className="w-full bg-[#FBBF24] text-[#0A0A0A] py-2 rounded-lg font-bold hover:bg-[#F59E0B] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {resetLoading ? "Sending..." : "Send Reset Link"}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
