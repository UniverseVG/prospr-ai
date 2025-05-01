import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import {
  ChevronDownIcon,
  FileTextIcon,
  GraduationCap,
  LayoutDashboard,
  Menu,
  PenBox,
  StarIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { checkUser } from "@/lib/checkUser";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "./ui/sheet";
import { ThemeToggle } from "./ui/theme";

const Header = async () => {
  await checkUser();
  return (
    <header className="fixed top-0 w-full border-b border-border bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60 overflow-hidden">
      <div className="px-4 h-20">
        <nav className="h-full flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="prospr logo"
                width={400}
                height={60}
                className="h-20 py-1 w-auto cursor-pointer"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <SignedIn>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 hover:bg-primary/10 transition-all"
                >
                  <LayoutDashboard className="h-4 w-4 text-primary" />
                  <span>Industry Insights</span>
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all">
                    <StarIcon className="h-4 w-4 text-primary-foreground" />
                    <span>Growth Tools</span>
                    <ChevronDownIcon className="h-4 w-4 text-primary-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 animate-in fade-in-80"
                >
                  <DropdownMenuLabel className="text-secondary">
                    Career Tools
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href="/resume"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <FileTextIcon className="h-4 w-4 text-primary" />
                      <span>Build Resume</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/ai-cover-letter"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <PenBox className="h-4 w-4 text-primary" />
                      <span>Cover Letter</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/interview"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <GraduationCap className="h-4 w-4 text-primary" />
                      <span>Interview Prep</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <ThemeToggle />
            </SignedIn>
            <SignedOut>
              <ThemeToggle />
              <div className="flex items-center space-x-2">
                <SignInButton>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all"
                  >
                    Sign In
                  </Button>
                </SignInButton>
                <Link href="/register">
                  <Button
                    size="sm"
                    variant="outline"
                    className="hover:bg-primary/10 transition-all"
                  >
                    Register
                  </Button>
                </Link>
              </div>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                    userButtonPopoverCard: "shadow-xl",
                    userPreviewMainIdentifier: "font-semibold text-secondary",
                  },
                }}
                afterSignOutUrl="/"
              />
            </SignedIn>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center space-x-3">
            <SignedIn>
              <ThemeToggle />
              <MobileNav />
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                    userButtonPopoverCard: "shadow-xl",
                    userPreviewMainIdentifier: "font-semibold text-secondary",
                  },
                }}
                afterSignOutUrl="/"
              />
            </SignedIn>
            <SignedOut>
              <ThemeToggle />
              <MobileNav />
            </SignedOut>
          </div>
        </nav>
      </div>
    </header>
  );
};

// Mobile Navigation Component
const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden">
          <Menu className="h-5 w-5 text-primary" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col p-0 w-72">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 border-b">
            <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ProsprAI
            </SheetTitle>
            <SheetDescription className="text-muted-foreground">
              Navigate to different sections of the app
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col space-y-3 p-6">
              <SignedIn>
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 h-12"
                  >
                    <LayoutDashboard className="h-5 w-5 text-primary" />
                    <span>Industry Insights</span>
                  </Button>
                </Link>
                <Link href="/resume">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 h-12"
                  >
                    <FileTextIcon className="h-5 w-5 text-primary" />
                    <span>Build Resume</span>
                  </Button>
                </Link>
                <Link href="/ai-cover-letter">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 h-12"
                  >
                    <PenBox className="h-5 w-5 text-primary" />
                    <span>Cover Letter</span>
                  </Button>
                </Link>
                <Link href="/interview">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 h-12"
                  >
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <span>Interview Prep</span>
                  </Button>
                </Link>
              </SignedIn>
              <SignedOut>
                <SignInButton>
                  <Button className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all">
                    Sign In
                  </Button>
                </SignInButton>
                <Link href="/register">
                  <Button variant="outline" className="w-full h-12">
                    Register
                  </Button>
                </Link>
              </SignedOut>
            </div>
          </div>

          <SheetFooter className="p-6 border-t bg-muted/30">
            <div className="flex items-center justify-between w-full">
              <p className="text-sm text-muted-foreground">© 2025 ProsprAI</p>
              <ThemeToggle />
            </div>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Header;
