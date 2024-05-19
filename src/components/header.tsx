import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./theme/themebutton";
import { LucideMenu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import { FaGithub } from "react-icons/fa";
import { GIT_URL } from "@/constants/git";

export default function Header() {
  return (
    //bg-background bg-opacity-30
    <nav className="fixed z-50 flex items-center justify-between w-full h-24 px-4 py-10 backdrop-blur-md bg-transparent md:px-8 lg:px-12 xl:px-16 2xl:px-24">
      <Link href="/">
        <Image
          alt="logo"
          className="w-40 cursor-pointer invert dark:invert-0"
          src="/assets/img/logo.png"
          height={300}
          width={830}
        />
      </Link>
      <div className="hidden gap-1 md:gap-2 lg:gap-4 md:flex">
        <Button variant="ghost" className="font-semibold text-md">
          <Link href="/">Home</Link>
        </Button>
        <Link href="/convert">
          <Button variant="ghost" className="font-semibold text-md">
            Convert
          </Button>
        </Link>
        <Link href="/about">
          <Button variant="ghost" className="font-semibold text-md">
            Privacy Policy
          </Button>
        </Link>
      </div>
      <div className="items-center hidden gap-2 md:flex">
        {/* <ModeToggle /> */}
        <Link href={GIT_URL} target="_blank">
          <span >
            <FaGithub className="text-2xl" />
          </span>
        </Link>
      </div>
      {/* MOBILE NAV */}
      <Sheet>
        <SheetTrigger className="block p-3 md:hidden">
          <span className="text-2xl text-slate-950 dark:text-slate-200">
            <LucideMenu />
          </span>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetDescription>
              <div className="flex flex-col w-full h-full">
                <SheetTrigger asChild>
                  <Link href="/">
                    <Button
                      variant="link"
                      className="w-full font-semibold text-md"
                    >
                      Home
                    </Button>
                  </Link>
                </SheetTrigger>
                <SheetTrigger asChild>
                  <Link href="/convert">
                    <Button
                      variant="link"
                      className="w-full font-semibold text-md"
                    >
                      Convert
                    </Button>
                  </Link>
                </SheetTrigger>
                <SheetTrigger asChild>
                  <Link href="/about">
                    <Button
                      variant="link"
                      className="w-full font-semibold text-md"
                    >
                      About
                    </Button>
                  </Link>
                </SheetTrigger>
                <ModeToggle />
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
