import React, { Suspense, useEffect, useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";
import theme from "../../styles/styles";
import { LoadingPage, LoadingSpinner } from "~/components/loading";
import { PageLayout } from "~/components/layout";
import { ObjectContainer } from "~/components/object-container";
import { toast } from "react-hot-toast";
import { editwrite } from "../../assets";
import Ground from "~/components/canvas/ground";
import Car from "~/components/canvas/car";

import { useUser } from "@clerk/nextjs";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";

import { caticon } from "../../assets";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const CowControlButton = ({ isCowOpened, setIsCowOpened }) => {
  const { data, isLoading: objectsLoading } = api.objects.getAll.useQuery();

  return (
    <div
      // className={`${theme.rounded.utilityCardBorder} flex w-full items-center justify-center gap-3 px-2 py-1`}
      className={`${theme.rounded.utilityCardBorder} flex`}
    >
      <div
        className="bg-warning-100 text-warning-800 hidden items-center rounded-lg text-xs data-[te-alert-show]:inline-flex"
        role="alert"
        data-te-alert-init
        data-te-alert-show
      >
        {/* <strong className="mr-1">Holy guacamole! </strong>  */}
        got a shoe for me?
        <button
          type="button"
          className="text-warning-900 hover:text-warning-900 rounded-none border-none opacity-50 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
          data-te-alert-dismiss
          aria-label="Close"
        >
          <span className="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path
                fill-rule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </button>
      </div>

      <div
        className={`${theme.rounded.utilityCardBorder} flex w-full items-center justify-center gap-3 px-2 py-1`}
      >
        <Image
          src={caticon}
          alt="caticon"
          className="h-8 w-8 rounded-full border-2 border-red-200"
          width={56}
          height={56}
        />

        <button
          onClick={() => {
            if (!objectsLoading) api.objects.getAll.useQuery();
          }}
          disabled={objectsLoading}
        >
          <div
            className={`${theme.rounded.utilityCardBorder} flex items-center justify-center gap-1 bg-zinc-500 px-2 py-1 text-xs`}
          >
            {!objectsLoading ? (
              <>
                <span>fetch new shoes</span>
                <Image
                  src={caticon}
                  className="h-5 w-5 rounded-full"
                  alt="caticon"
                  width={56}
                  height={56}
                />
              </>
            ) : (
              <LoadingSpinner size={20} />
            )}
          </div>
        </button>

        <button
          onClick={() => {
            if (!isCowOpened) setIsCowOpened(!isCowOpened);
          }}
        >
          <div
            className={`${theme.rounded.utilityCardBorder} flex items-center justify-center gap-1 bg-zinc-500 px-2 py-1 text-xs`}
          >
            <span>add my shoe!</span>
            <Image
              src={caticon}
              className="h-5 w-5 rounded-full"
              alt="caticon"
              width={56}
              height={56}
            />
          </div>
        </button>
      </div>
    </div>
  );
};

const CreateObjectWizard = () => {
  const { user } = useUser();

  const [input, setInput] = useState<string>("");

  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.objects.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.objects.getAll.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.objectType;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to post! Please try again later.");
      }
    },
  });

  console.log(user);

  if (!user) return null;

  return (
    // <div
    //   className={`${theme.rounded.utilityCardBorder} ${theme.bg.utilityCardBackground} flex w-full gap-3 p-1`}
    // >
    //   <Image
    //     src={user.profileImageUrl}
    //     alt="Profile image"
    //     className="h-6 w-6 rounded-full"
    //     width={56}
    //     height={56}
    //   />
    //   <input
    //     placeholder="Type some text"
    //     className="grow bg-transparent outline-none"
    //     type="text"
    //     value={input}
    //     onChange={(e) => setInput(e.target.value)}
    //     onKeyDown={(e) => {
    //       if (e.key === "Enter") {
    //         e.preventDefault();
    //         if (input !== "") {
    //           mutate({ objectType: input });
    //         }
    //       }
    //     }}
    //     disabled={isPosting}
    //   />
    //   {!isPosting && (
    //     <button
    //       onClick={() => {
    //         if (input !== "") mutate({ objectType: input });
    //       }}
    //     >
    //       <Image
    //         src={editwrite}
    //         className="h-5 w-5 rounded-full"
    //         alt="editwrite"
    //         width={56}
    //         height={56}
    //       />
    //     </button>
    //   )}
    //   {!!isPosting && (
    //     <div className="flex items-center justify-center">
    //       <LoadingSpinner size={20} />
    //     </div>
    //   )}
    // </div>
    <></>
  );
};

// type ObjectWithUser = RouterOutputs["objects"]["getAll"][number];
// const ObjectContainer = (props: { object: ObjectWithUser }) => {};

// type ObjectWithUser = RouterOutputs["objects"]["getAll"][number];
// const ObjectContainer = (props: ObjectWithUser) => {
//   const {object, author} = props;
// };

const RenderStoredObjects = () => {
  const { data, isLoading: objectsLoading } = api.objects.getAll.useQuery();

  if (!data) return null;

  return (
    <>
      {/* {data.map((objectData) => (
        <ObjectContainer {...objectData} key={objectData.object.id} />
      ))} */}
      {[
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
        ...data,
      ].map((objectData) => (
        <ObjectContainer {...objectData} key={objectData.object.id} />
      ))}
    </>
  );
};

const Scene = () => {
  // const { data, isLoading: objectsLoading } = api.objects.getAll.useQuery();

  return (
    <Suspense fallback={null}>
      <Environment
        files={
          process.env.PUBLIC_URL
            ? `${process.env.PUBLIC_URL}/textures/envmap.hdr`
            : `http://localhost:3000/textures/envmap.hdr`
        }
        background={"only"}
      />

      <PerspectiveCamera makeDefault position={[-6, 3.9, 6.21]} fov={40} />
      <OrbitControls target={[-2.64, -0.71, 0.03]} />

      <Ground />
      <RenderStoredObjects />
      <Car />
    </Suspense>
  );
};

const Sandbox: NextPage = () => {
  const [isCowOpened, setIsCowOpened] = useState<boolean>(false);
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  // Start fetching data
  // api.objects.getAll.useQuery();

  const { data, isLoading: objectsLoading } = api.objects.getAll.useQuery();

  if (!userLoaded) return <div />;

  if (objectsLoading) return <LoadingPage />;

  if (!data) return <div>Something went wrong</div>;

  return (
    <>
      <Head>
        <title>Sandbox</title>
      </Head>
      <PageLayout>
        {isSignedIn && (
          <div className="fixed right-2 z-10 mt-2">
            <div className="flex justify-center">
              {!isCowOpened ? (
                <CowControlButton isCowOpened setIsCowOpened />
              ) : (
                <CreateObjectWizard />
              )}
            </div>
          </div>
        )}
        {!isCowOpened && (
          <Canvas>
            <Physics
              broadphase="SAP"
              gravity={[0, -10, 0]}
              size={100}
              tolerance={0.001}
              iterations={5}
              // broadphase={"Naive"}
              step={1 / 60}
              shouldInvalidate={true}
              // children
              allowSleep={false}
              axisIndex={0}
              defaultContactMaterial={1e6}
            >
              <Scene />
            </Physics>
          </Canvas>
        )}
      </PageLayout>
    </>
  );
};

export default Sandbox;
