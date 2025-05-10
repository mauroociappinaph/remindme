"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuthStore from "@/hooks/useAuthStore";
import SignInForm from "@/components/auth/SignInForm";
import { Navbar } from "@/components/navbar";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    // If already authenticated, redirect to dashboard
    if (isAuthenticated) {
      toast.info("Ya has iniciado sesión");
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              Sign in to Remind.me
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Your personal service reminder tool
            </p>
          </div>
          <SignInForm />
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              ¿No tienes una cuenta?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
