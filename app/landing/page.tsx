"use client";

import Link from "next/link";
import { ArrowRight, Bell, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardHeader } from "@/components/dashboard-header";

export default function LandingPage() {
  // Función simulada para el manejo de recordatorios en la landing page
  const handleAddReminder = (data: any) => {
    console.log('Acción simulada para la landing page', data);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Incluir el navbar */}
      <DashboardHeader onAddReminder={handleAddReminder} />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-6xl max-w-3xl mx-auto">
                Nunca vuelvas a olvidar un pago importante
              </h1>
              <p className="mx-auto max-w-2xl text-muted-foreground text-lg md:text-xl">
                Remind.me te ayuda a gestionar tus recordatorios de servicios, dominios y suscripciones
                de forma simple y efectiva.
              </p>
            </div>
            <div className="pt-2">
              <Button
                asChild
                size="lg"
                className="bg-brand-purple hover:bg-brand-purple/90 text-white px-8 py-6 text-lg h-auto"
              >
                <Link href="/">
                  Comenzar ahora <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 animate-fade-in">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border shadow-lg transition-all duration-200 hover:shadow-xl hover:border-brand-purple/20">
              <CardHeader className="pb-2">
                <div className="p-3 bg-brand-purple/10 rounded-full w-fit mb-4">
                  <Bell className="h-6 w-6 text-brand-purple" />
                </div>
                <CardTitle className="text-xl font-bold">Recordatorios inteligentes</CardTitle>
                <CardDescription className="text-base pt-1">
                  Recibe alertas antes de que venzan tus pagos y suscripciones.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <p className="text-muted-foreground">
                  Configura recordatorios para cualquier tipo de servicio y recibe
                  notificaciones exactamente cuando las necesitas.
                </p>
              </CardContent>
            </Card>
            <Card className="border shadow-lg transition-all duration-200 hover:shadow-xl hover:border-brand-coral/20">
              <CardHeader className="pb-2">
                <div className="p-3 bg-brand-coral/10 rounded-full w-fit mb-4">
                  <Clock className="h-6 w-6 text-brand-coral" />
                </div>
                <CardTitle className="text-xl font-bold">Ahorra tiempo</CardTitle>
                <CardDescription className="text-base pt-1">
                  Gestiona todos tus servicios desde un solo lugar.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <p className="text-muted-foreground">
                  Deja de revisar múltiples calendarios y correos. Centraliza todo
                  en una sola aplicación fácil de usar.
                </p>
              </CardContent>
            </Card>
            <Card className="border shadow-lg transition-all duration-200 hover:shadow-xl hover:border-brand-orange/20">
              <CardHeader className="pb-2">
                <div className="p-3 bg-brand-orange/10 rounded-full w-fit mb-4">
                  <Shield className="h-6 w-6 text-brand-orange" />
                </div>
                <CardTitle className="text-xl font-bold">Protege tus servicios</CardTitle>
                <CardDescription className="text-base pt-1">
                  Evita interrupciones en tus servicios más importantes.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <p className="text-muted-foreground">
                  Mantén tus dominios, hosting y suscripciones activos sin preocupaciones
                  por olvidos o pagos tardíos.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="flex flex-col items-center space-y-6 text-center">
            <div className="space-y-4 max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-4xl">
                Comienza a gestionar tus recordatorios
              </h2>
              <p className="mx-auto max-w-xl text-muted-foreground text-lg">
                Únete a miles de freelancers y profesionales que confían en Remind.me
                para gestionar sus servicios importantes.
              </p>
            </div>
            <div className="pt-4">
              <Button
                asChild
                size="lg"
                className="bg-brand-purple hover:bg-brand-purple/90 text-white px-8 py-6 text-lg h-auto"
              >
                <Link href="/">
                  Ir al Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 mt-auto">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Remind.me. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm text-muted-foreground hover:text-brand-purple hover:underline">
              Inicio
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-brand-purple hover:underline">
              Términos
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-brand-purple hover:underline">
              Privacidad
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
