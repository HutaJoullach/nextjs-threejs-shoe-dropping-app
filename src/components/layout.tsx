import { useState } from "react";
import type { PropsWithChildren } from "react";

import theme from "../styles/styles";
import Navbar from "./navbar";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";
import { IoMdClose } from "react-icons/io";

import { useAtom } from "jotai";
import { isContactModalOpenedAtom } from "../states/object-data";
import { useHydrateAtoms } from "jotai/utils";

const ContactModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const name = watch("name");
  const email = watch("email");
  const message = watch("message");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data: any) => {
    setIsLoading(true);

    if (
      !process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
      !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
      !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ||
      !process.env.NEXT_PUBLIC_MY_EMAIL_ADDRESS
    ) {
      toast.error("Something went wrong.");
      setIsLoading(false);
      return;
    }

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: name,
          to_name: "shoe loving cat",
          from_email: email,
          to_email: process.env.NEXT_PUBLIC_MY_EMAIL_ADDRESS,
          message: message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          toast.success("email sent!");
          reset();
        },
        (error) => {
          toast.error("Something went wrong.");
          reset();
        }
      )
      .finally(() => {
        setIsLoading(false);
        if (isContactModalOpened)
          setIsContactModalOpened(!isContactModalOpened);
      });
  };

  useHydrateAtoms([[isContactModalOpenedAtom, false] as const]);
  const [isContactModalOpened, setIsContactModalOpened] = useAtom(
    isContactModalOpenedAtom
  );

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-neutral-800/70 outline-none focus:outline-none`}
    >
      <div
        className={`${theme.bg.contactModalBackground} ${theme.rounded.utilityCardBorder} relative mx-auto my-6 h-full w-full p-5 md:h-auto md:w-4/6 lg:h-auto lg:w-3/6 xl:w-2/5`}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative flex items-center justify-center rounded-t p-4">
            <button
              className="absolute right-6 border-0 p-1 text-white transition hover:opacity-70"
              onClick={() => {
                if (isContactModalOpened)
                  setIsContactModalOpened(!isContactModalOpened);
              }}
            >
              <IoMdClose size={24} />
            </button>
          </div>
          <label className="flex flex-col">
            <span className="mb-4 font-medium text-white">name</span>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(name) => {
                setCustomValue("name", name);
              }}
              placeholder="name"
              className="bg-tertiary placeholder:text-secondary rounded-lg border-none px-6 py-4 font-medium text-white outline-none"
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-4 font-medium text-white">email</span>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(email) => {
                setCustomValue("email", email);
              }}
              placeholder="email"
              className="bg-tertiary placeholder:text-secondary rounded-lg border-none px-6 py-4 font-medium text-white outline-none"
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-4 font-medium text-white">message</span>
            <textarea
              rows={7}
              name="message"
              value={message}
              onChange={(message) => {
                setCustomValue("message", message);
              }}
              placeholder="message"
              className="bg-tertiary placeholder:text-secondary rounded-lg border-none px-6 py-4 font-medium text-white outline-none"
            />
          </label>
          <span className="py-3"></span>
          <button
            type="submit"
            disabled={true}
            className="bg-tertiary shadow-primary flex-end w-fit rounded-xl px-8 py-3 font-bold text-white shadow-md outline-none"
          >
            {/* {isLoading ? "sending..." : "send"} */}
            <span>scaffolding 🚧👷🏼‍♂️🏗️</span>
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
