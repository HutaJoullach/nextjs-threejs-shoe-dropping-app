import {
  SignInButton,
  SignOutButton,
  useUser,
  RedirectToSignIn,
  UserButton,
} from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import theme from "../styles/styles";
// import { navLinks } from "../constants";
import {
  logo,
  arrowleft,
  arrowleftmd,
  arrowleftsm,
  githubblack,
  githubwhite,
  paperplane,
  sandbucket,
  menualt,
  arrowcircleright,
  nextarrowright,
  menu,
  close,
} from "../assets";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  // const [scrolled, setScrolled] = useState(false);

  const { route } = useRouter();
  const pathname = route.replace("/", "");
  console.log(pathname);

  const { isLoaded: userLoaded, isSignedIn } = useUser();

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollTop = window.scrollY;
  //     if (scrollTop > 100) {
  //       setScrolled(true);
  //     } else {
  //       setScrolled(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <nav
      className={`${theme.p.x.sm} ${theme.bg.navbarBackground} fixed top-0 z-20 flex w-full items-center py-1`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link
          href={"/"}
          className="flex items-center gap-2"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <Image
            src={logo}
            className="h-9 w-9 rounded-full"
            alt="@hutajoullach"
            width={65}
            height={65}
          />
          {pathname === "sandbox" ? (
            <div
              className={`${theme.font.color.navbarForeground} flex items-center gap-1 text-[18px] font-medium hover:text-slate-100 max-md:hidden`}
            >
              <Image
                src={arrowleftmd}
                className="h-5 w-5 rounded-full"
                alt="arrowleft"
                width={65}
                height={65}
              />
              <span>take me back to home!</span>
            </div>
          ) : (
            <p
              className={`${theme.font.color.navbarForeground} flex cursor-pointer text-[18px] font-medium hover:text-slate-100`}
            >
              huta&nbsp;
              <span className="hidden sm:block">| react developer</span>
            </p>
          )}
        </Link>

        <ul className="hidden list-none flex-row items-center gap-10 sm:flex">
          {pathname !== "sandbox" && (
            <li
              className={`${theme.font.color.navbarForeground} cursor-pointer text-[18px] font-medium hover:text-slate-100`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-red-300">
                <Link href={"/sandbox/"}>
                  <Image
                    src={sandbucket}
                    className="h-7 w-7 rounded-full"
                    alt="sandbucket"
                    width={56}
                    height={56}
                  />
                </Link>
              </div>
            </li>
          )}

          <li className="cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-red-300">
              <a
                target="_blank"
                href="https://github.com/HutaJoullach/"
                rel="noopener noreferrer"
              >
                <Image
                  src={githubwhite}
                  className="h-7 w-7 rounded-full"
                  alt="githubwhite"
                  width={56}
                  height={56}
                />
              </a>
            </div>
          </li>

          <li className="cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-red-300">
              <Image
                src={paperplane}
                className="h-7 w-7 rounded-full"
                alt="paperplane"
                width={56}
                height={56}
              />
            </div>
          </li>

          {pathname === "sandbox" && !isSignedIn && (
            <li
              className={`${theme.font.color.navbarForeground} cursor-pointer text-[18px] font-medium hover:text-slate-100`}
            >
              <Link href={"/signin/"}>
                <div className="dark:hover:bg-[#050708]/85 flex items-center gap-1 rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#24292F]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 dark:focus:ring-gray-500">
                  <Image
                    src={githubwhite}
                    className="h-4 w-4 rounded-full"
                    alt="githubwhite"
                    width={56}
                    height={56}
                  />
                  <span>Sign in with Github</span>
                </div>
              </Link>
            </li>
          )}

          {pathname === "sandbox" && !!isSignedIn && (
            <li
              className={`${theme.font.color.navbarForeground} cursor-pointer text-[18px] font-medium hover:text-slate-100`}
            >
              <UserButton />
            </li>
          )}
        </ul>

        <div className="flex flex-1 items-center justify-end sm:hidden">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-red-300">
            <Image
              src={toggle ? arrowcircleright : menualt}
              alt="menu"
              className="h-[28px] w-[28px] object-contain"
              onClick={() => setToggle(!toggle)}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
