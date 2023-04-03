import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import theme from "../styles/styles";
// import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");

  return (
    <nav
      className={`${theme.p.x.sm} fixed top-0 z-20 flex w-full items-center bg-red-200 py-1`}
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
            alt={"@hutajoullach"}
            width={65}
            height={65}
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
