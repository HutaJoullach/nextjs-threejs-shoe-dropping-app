import type { PropsWithChildren } from "react";

import theme from "../styles/styles";
import Navbar from "./navbar";

import { useAtom } from "jotai";
import { isEmailModalOpenedAtom } from "../states/object-data";
import { useHydrateAtoms } from "jotai/utils";

export const PageLayout = (props: PropsWithChildren) => {
  useHydrateAtoms([[isEmailModalOpenedAtom, false] as const]);
  const [isEmailModalOpened, setIsEmailModalOpened] = useAtom(
    isEmailModalOpenedAtom
  );

  return (
    <main className="flex h-screen justify-center">
      <div className="h-full w-full overflow-y-scroll md:max-w-7xl">
        <Navbar />
        <div className={`${theme.h.content} ${theme.top.content}`}>
          {props.children}
        </div>
      </div>
    </main>
  );
};
