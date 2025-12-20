import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useTranslation } from "react-i18next";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();
  const changeTheme = theme === "dark" ? "Light mode" : "Dark mode";

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? t('common:tooltipLightMode') : t('common:tooltipDarkMode'))}
            className="relative h-12 w-12 rounded-full bg-background border border-border hover:bg-muted transition"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 " />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">{t('common:toggleTheme')}</span>
          </Button>

        </TooltipTrigger>

        <TooltipContent >
          {changeTheme}
        </TooltipContent>

      </Tooltip>
    </>
  );
}
