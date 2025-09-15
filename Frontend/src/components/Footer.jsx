import { MailIcon, GithubIcon, TwitterIcon, GlobeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { config } from "@/config/config";

const Footer = () => {
  return (
    <footer className="w-full mt-24 border-t border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 space-y-10">
        <div className="h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-20 rounded-full" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <p className="text-center">
            © 2025 <span className="font-semibold text-primary">{config.APP_NAME}</span>. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Support
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Contact Us
            </a>
          </div>

          <div className="flex gap-3 justify-center">
            <Button variant="ghost" size="icon" asChild>
              <a href="mailto:contacto@tuempresa.com" aria-label="Email">
                <MailIcon className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://twitter.com/tuempresa" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                <TwitterIcon className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/tuempresa" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                <GithubIcon className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://tuempresa.com" aria-label="Website" target="_blank" rel="noopener noreferrer">
                <GlobeIcon className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
