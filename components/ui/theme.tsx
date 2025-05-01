"use client";
import { Moon, Settings, Sun } from "lucide-react";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { useTheme } from "next-themes";

export const ThemeToggle = () => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 border-border hover:bg-background hover:text-primary touch-none"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all text-primary dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all text-primary dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="animate-in fade-in-80">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="cursor-pointer hover:bg-muted focus:bg-muted"
        >
          <Sun className="mr-2 h-4 w-4 text-primary" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="cursor-pointer hover:bg-muted focus:bg-muted"
        >
          <Moon className="mr-2 h-4 w-4 text-primary" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="cursor-pointer hover:bg-muted focus:bg-muted"
        >
          <Settings className="mr-2 h-4 w-4 text-secondary" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
