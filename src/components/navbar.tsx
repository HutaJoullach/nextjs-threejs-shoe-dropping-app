import {
  SignInButton,
  SignOutButton,
  useUser,
  RedirectToSignIn,
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
              className={`${theme.font.color.navbarForeground} flex items-center gap-1 text-[18px] font-medium hover:text-slate-100`}
            >
              <Image
                src={arrowleft}
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
                <div className="dark:hover:bg-[#050708]/85 flex items-center rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#24292F]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 dark:focus:ring-gray-500">
                  <svg
                    className="-ml-1 mr-2 h-4 w-4"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="github"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 496 512"
                  >
                    <path
                      fill="currentColor"
                      d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                    ></path>
                  </svg>
                  <span>Sign in with Github</span>
                </div>
              </Link>
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
