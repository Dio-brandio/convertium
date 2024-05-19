"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../ui/heroHighlightSection";
import TextRevealTypewriter from "./textRevealTypewriter";

export interface HeroSectionProps {
  title: string;
  words: Array<{ text: string; className?: string,flipWords?:string[] }>;
  className?:string
}

export default function HeroSection({ title, words,className }: HeroSectionProps) {
  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className={` text-2xl py-64 px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white leading-relaxed lg:leading-snug text-center mx-auto ${className}`}
      >
        {title}
        <TextRevealTypewriter words={words} />
      </motion.h1>
    </HeroHighlight>
  );
}
