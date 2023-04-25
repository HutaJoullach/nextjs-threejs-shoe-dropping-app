import type { PropsWithChildren } from "react";

import theme from "../styles/styles";
import Navbar from "./navbar";

import { useAtom } from "jotai";
import { isEmailModalOpenedAtom } from "../states/object-data";
import { useHydrateAtoms } from "jotai/utils";

const ContactModal = () => {
  return (
    <div className={`flex h-full w-full items-center justify-center`}>
      <div
        className={`flex flex-col-reverse gap-10 overflow-hidden xl:mt-12 xl:flex-row`}
      >
        <form>
          <label className="flex flex-col">
            <span className="mb-4 font-medium text-white">Name</span>
            <input
              type="text"
              name="name"
              value=""
              onChange={() => {}}
              placeholder="enter name"
              className="bg-tertiary placeholder:text-secondary rounded-lg border-none px-6 py-4 font-medium text-white outline-none"
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-4 font-medium text-white">email</span>
            <input
              type="email"
              name="email"
              value=""
              onChange={() => {}}
              placeholder="enter email"
              className="bg-tertiary placeholder:text-secondary rounded-lg border-none px-6 py-4 font-medium text-white outline-none"
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-4 font-medium text-white">Message</span>
            <textarea
              rows={7}
              name="message"
              value=""
              onChange={() => {}}
              placeholder="enter message"
              className="bg-tertiary placeholder:text-secondary rounded-lg border-none px-6 py-4 font-medium text-white outline-none"
            />
          </label>
          <button
            type="submit"
            className="bg-tertiary shadow-primary w-fit rounded-xl px-8 py-3 font-bold text-white shadow-md outline-none"
          >
            {false ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

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
          {!!isEmailModalOpened && <ContactModal />}
          {!isEmailModalOpened && <>{props.children}</>}
          {/* {props.children} */}
        </div>
      </div>
    </main>
  );
};
