import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center text-center px-4">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-3xl font-bold tracking-tight mt-4">Page not found</h2>
        <p className="text-muted-foreground mt-2 mb-8 max-w-md">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </>
  );
}
