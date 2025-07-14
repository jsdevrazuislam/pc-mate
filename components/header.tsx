"use client";

import { Languages, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "@/context/i18n-store";

function Header() {
  const { setTheme } = useTheme();
  const { t, language, setLanguage } = useTranslation();

  return (
    <header className="px-6 py-4 border-b border-border">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-primary text-h5-size font-bold">PCMate</Link>

        <div className="flex items-center gap-4">
          <nav className="hidden md:flex space-x-6 mr-4">
            <a href="/#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("how_it_works")}
            </a>
            <a href="/builder" className="text-muted-foreground hover:text-foreground transition-colors">
              {t("builder")}
            </a>
          </nav>

          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
                  <Languages className="h-4 w-4" />
                  <span className="sr-only">{t("toggle_language")}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("en")}>
                  <span className={language === "en" ? "font-semibold" : ""}>
                    English
                  </span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("bn")}>
                  <span className={language === "bn" ? "font-semibold" : ""}>
                    বাংলা
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">{t("toggle_theme")}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2 h-4 w-4" />
                  <span>{t("light")}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 h-4 w-4" />
                  <span>{t("dark")}</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Monitor className="mr-2 h-4 w-4" />
                  <span>{t("system")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
