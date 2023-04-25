import type { PropsWithChildren } from "react";

import theme from "../styles/styles";
import Navbar from "./navbar";
import ContactModal from "./contact-modal";

import { useAtom } from "jotai";
import { isContactModalOpenedAtom } from "../states/object-data";
import { useHydrateAtoms } from "jotai/utils";

export const PageLayout = (props: PropsWithChildren) => {
  useHydrateAtoms([[isContactModalOpenedAtom, false] as const]);
  const [isContactModalOpened, setIsContactModalOpened] = useAtom(
    isContactModalOpenedAtom
  );

  return (
    <main className="flex h-screen justify-center">
      <div className="h-full w-full overflow-y-scroll md:max-w-7xl">
        <Navbar />
        <div className={`${theme.h.content} ${theme.top.content}`}>
          {!isContactModalOpened && <>{props.children}</>}
          {!!isContactModalOpened && <ContactModal />}
        </div>
      </div>
    </main>
  );
};
