import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Link } from "react-router-dom";
import AUTH_ROUTES from "@/modules/auth/routes/paths";
import { config } from "@/config/config";

export function HeroSection() {
  return (
    <>
      <header className="sticky border-b border-border bg-background/80 backdrop-blur-md shadow-sm">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link to={AUTH_ROUTES.HOME} className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <span className="text-primary">{config.APP_NAME}</span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link to={AUTH_ROUTES.LOGIN} className="text-sm">
              <Button variant="outline" className="px-4 py-2">
                Log In
              </Button>
            </Link>
            <Link to={AUTH_ROUTES.REGISTER} className="text-sm">
              <Button className="px-4 py-2">
                Sign Up
              </Button>
            </Link>
            <ModeToggle />
          </nav>
        </div>
      </header>

      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden rounded-b-xl">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,hsl(var(--primary)/15%)_0,transparent_100%)]" />
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />

        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-10 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-fade-up [--animation-delay:200ms]">
              <span className="block">Modular Frontend Starter</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                React + Vite with Authentication
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground animate-fade-up [--animation-delay:400ms]">
              A solid foundation for projects with backend integration, protected routes, modern UI, and dark mode.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
