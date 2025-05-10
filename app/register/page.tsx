"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuthStore from "@/hooks/useAuthStore";
import RegisterForm from "@/components/auth/RegisterForm";
import { Navbar } from "@/components/navbar";
import { toast } from "sonner";

export default function RegisterPage() {
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
              Create an Account
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Join Remind.me to manage your service reminders
            </p>
          </div>
          <RegisterForm />
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
