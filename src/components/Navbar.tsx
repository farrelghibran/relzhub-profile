"use client";
import { Key, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="">
      <nav
        className={`
        w-full fixed z-50 py-4 overflow-hidden
        ${navOpen ? "h-auto backdrop-blur-sm" : "h-18"}
        ${isTop ? "backdrop-blur-none" : "backdrop-blur-sm shadow-lg"}
      `}
      >
        <div className="container max-w-7xl mx-auto px-2 sm:px-3 md:px-4 lg:px-5">
          <div className="w-full flex items-center justify-between">
            <Link
              href="/"
              className="text-xl sm:text-2xl font-bold text-neutral-50 transition ease duration-500"
            >
              <Image
                width={50}
                height={35}
                className="w-14 h-12"
                src="/images/logo.png"
                alt="logo"
              />
            </Link>
            <div className="w-full hidden sm:flex items-center justify-center gap-2 text-neutral-400">
              <a
                href="#features"
                className="hover:text-neutral-50 hover:bg-neutral-800/40 transition ease duration-500 py-2 px-4 rounded-lg"
              >
                Features
              </a>
              <a
                href="#games"
                className="hover:text-neutral-50 hover:bg-neutral-800/40 transition ease duration-500 py-2 px-4 rounded-lg"
              >
                Games
              </a>
            </div>
            <Link
              href="/getkey"
              className="hidden text-neutral-50 py-2 px-4 rounded-lg bg-linear-270/srgb from-red-600 to-orange-500 hover:from-orange-500 hover:to-red-500 ease transition-colors duration-500 sm:flex items-center gap-2"
            >
              <Key size={18} />
              Getkey
            </Link>
            <button
              className={`sm:hidden transition ease duration-500 text-neutral-50 cursor-pointer ${
                navOpen
                  ? "bg-linear-270/srgb from-neutral-500 to-neutral-500"
                  : "bg-linear-270/srgb from-red-500 to-orange-500"
              } p-2 rounded-full`}
              onClick={() => setNavOpen(!navOpen)}
            >
              <MenuIcon size={16} />
            </button>
          </div>
          <div
            className={`w-full mt-5 flex flex-col justify-center items-center gap-2 text-neutral-400 sm:hidden`}
          >
            <a
              onClick={() => setNavOpen(!navOpen)}
              className="w-full hover:text-neutral-50 hover:bg-neutral-800/40 transition ease duration-500 py-2 px-4 rounded-lg"
              href="#features"
            >
              Features
            </a>
            <a
              onClick={() => setNavOpen(!navOpen)}
              className="w-full hover:text-neutral-50 hover:bg-neutral-800/40 transition ease duration-500 py-2 px-4 rounded-lg"
              href="#games"
            >
              Games
            </a>
            <a
              href="/getkey"
              className="w-full text-center text-neutral-50 font-medium py-2 px-4 rounded-lg bg-linear-270/srgb from-red-500 to-orange-500 hover:from-orange-500 hover:to-red-600 ease transition-colors duration-500 text-sm flex items-center justify-center gap-2"
            >
              <Key size={18} />
              Getkey
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
