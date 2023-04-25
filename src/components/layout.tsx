import type { PropsWithChildren } from "react";

import theme from "../styles/styles";
import Navbar from "./navbar";

import { IoMdClose } from "react-icons/io";

import { useAtom } from "jotai";
import { isContactModalOpenedAtom } from "../states/object-data";
import { useHydrateAtoms } from "jotai/utils";

const ContactModal = () => {
  useHydrateAtoms([[isContactModalOpenedAtom, false] as const]);
  const [isContactModalOpened, setIsContactModalOpened] = useAtom(
    isContactModalOpenedAtom
  );

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-neutral-800/70 outline-none focus:outline-none`}
    >
      <div
        className={`${theme.bg.contactModalBackground} relative mx-auto my-6 h-full w-full md:h-auto md:w-4/6 lg:h-auto lg:w-3/6 xl:w-2/5`}
      >
        <form>
          <div className="relative flex items-center justify-center rounded-t border-b-[1px] p-6">
            <button
              className="absolute left-9 border-0 p-1 transition hover:opacity-70"
              onClick={() => {
                if (isContactModalOpened)
                  setIsContactModalOpened(!isContactModalOpened);
              }}
            >
              <IoMdClose size={18} />
            </button>
          </div>
          <label className="flex flex-col">
            <span className="mb-4 font-medium text-white">name</span>
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
            <span className="mb-4 font-medium text-white">message</span>
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
            {false ? "sending..." : "send"}
          </button>
        </form>
      </div>
    </div>
  );
};

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
          {/* {props.children} */}
        </div>
      </div>
    </main>
  );
};
