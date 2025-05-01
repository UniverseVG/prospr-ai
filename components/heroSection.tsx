/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement: any = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-full pt-36 md:pt-48 pb-10">
      <div className="space-y-6 text-center">
        <div className="space-y-6 mx-auto">
          <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient gradient-title">
            Your AI Career Navigator for
            <br />
            Professional Excellence
          </h1>
          <p className="mx-auto max-w-[600px] text-secondary-foreground md:text-xl">
            Empower your career growth with bespoke guidance, targeted interview
            strategies, and AI-powered resources for securing your next role.
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button size="lg" className="px-8 cursor-pointer" variant={"outline"}>
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="hero-image-wrapper mt-5 md:mt-0">
          <div ref={imageRef} className="hero-image">
            <Image
              src="/banner.png"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="rounded-lg h-[720px] shadow-2xl border mx-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
