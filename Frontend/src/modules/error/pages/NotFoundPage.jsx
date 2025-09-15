import React from 'react';
import { Button } from "@/components/ui/button";
import { CircleDollarSign, Home, MoveLeft } from "lucide-react";
import { Link } from 'react-router-dom';
import { config } from '@/config/config';

const NotFoundPage = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,hsl(var(--primary)/15%)_0,transparent_100%)]" />
      <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />

      <div className="relative z-10 w-full max-w-xl text-center space-y-6">
        <div className="flex justify-center items-center gap-2">
          <CircleDollarSign className="w-12 h-12 text-primary" />
          <span className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {config.APP_NAME}
          </span>
        </div>

        <h1 className="text-8xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          404
        </h1>

        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground">
            Sorry, the page you're looking for doesn't exist or has been moved. Let’s get you back on track.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          <Button
            variant="outline"
            className="group relative rounded-full px-6 transition duration-300 overflow-hidden"
            onClick={() => window.history.back()}
          >
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <MoveLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Go Back
          </Button>

          <Link to="/user">
            <Button className="group relative rounded-full px-6 transition duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <Home className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
              Return to Dashboard
            </Button>
          </Link>
        </div>

        <div className="pt-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} {config.APP_NAME}. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
