"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { BellRing, Clock, Shield } from "lucide-react";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero section */}
        <section className="relative bg-black text-white">
          <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl mb-6">
                Nunca vuelvas a olvidar un <span className="text-primary">pago importante</span>
              </h1>
              <p className="text-xl mb-8">
                Remind.me te ayuda a gestionar tus recordatorios de servicios,
                dominios y suscripciones de forma simple y efectiva.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link href="/register">
                    Comenzar ahora
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-white hover:text-white border-white hover:border-primary">
                  <Link href="/login">
                    Ya tengo cuenta
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">¿Por qué usar Remind.me?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <BellRing className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Recordatorios inteligentes</h3>
                <p className="text-muted-foreground">
                  Nunca más pierdas un pago o renovación importante gracias a nuestros recordatorios personalizados.
                </p>
              </div>

              <div className="bg-background p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Ahorra tiempo</h3>
                <p className="text-muted-foreground">
                  Gestiona todos tus recordatorios desde un solo lugar y olvídate de usar múltiples herramientas.
                </p>
              </div>

              <div className="bg-background p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Protege tus servicios</h3>
                <p className="text-muted-foreground">
                  Evita perder acceso a tus dominios o servicios importantes por olvidos en renovaciones.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Comienza a gestionar tus recordatorios hoy mismo
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Únete a Remind.me y nunca más olvides un pago o renovación importante.
            </p>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link href="/register">
                Registrarse gratis
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
