import Link from "next/link";
import { SignInForm } from "@/components/auth/SignInForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight">
            UIGen
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            AI-powered React component generator
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm px-8 py-8">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-neutral-900">
              Welcome back
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Sign in to your account to continue
            </p>
          </div>

          <SignInForm />

          <p className="mt-6 text-center text-sm text-neutral-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-neutral-400">
          <Link href="/" className="hover:text-neutral-600 transition-colors">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
