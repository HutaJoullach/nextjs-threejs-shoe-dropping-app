import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import theme from "../styles/styles";
// import { navLinks } from "../constants";
import {
  logo,
  arrowleft,
  githubblack,
  githubwhite,
  paperplane,
  menu,
  close,
} from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");

  return (
    <nav
      className={`${theme.p.x.sm} ${theme.bg.navbarBackground} fixed top-0 z-20 flex w-full items-center py-1`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link
          href={"/"}
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
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
          {true ? (
            <p
              className={`${theme.font.color.navbarForeground} flex cursor-pointer text-[18px] font-medium hover:text-slate-100`}
            >
              huta&nbsp;
              <span className="hidden sm:block">| react developer</span>
            </p>
          ) : (
            <div
              className={`${theme.font.color.navbarForeground} flex items-center gap-1 text-[18px] font-medium hover:text-slate-100`}
            >
              <Image
                src={arrowleft}
                className="h-5 w-5 rounded-full"
                alt={"arrow left"}
                width={65}
                height={65}
              />
              <span>take me back to home!</span>
            </div>
          )}
        </Link>

        <ul className="hidden list-none flex-row gap-10 sm:flex">
          <li
            className={`${theme.font.color.navbarForeground} cursor-pointer text-[18px] font-medium hover:text-slate-100`}
          >
            <Link href={"/sandbox/"}>
              <span>sandbox</span>
            </Link>
          </li>

          <li className="cursor-pointer">
            <a
              target="_blank"
              href="https://github.com/HutaJoullach/"
              rel="noopener noreferrer"
            >
              <Image
                src={githubwhite}
                className="h-7 w-7 rounded-full"
                alt="githubblack"
                width={56}
                height={56}
              />
            </a>
          </li>

          <li
            className={`${theme.font.color.navbarForeground} cursor-pointer text-[18px] font-medium hover:text-slate-100`}
          >
            <Image
              src={paperplane}
              className="h-7 w-7 rounded-full"
              alt="githubblack"
              width={56}
              height={56}
            />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
