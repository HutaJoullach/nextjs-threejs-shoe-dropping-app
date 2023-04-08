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

type CowControlButtonProps = {
  isCowOpened: boolean;
  setIsCowOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

const CowControlButton = ({
  isCowOpened,
  setIsCowOpened,
}: CowControlButtonProps) => {
  const { data, isLoading: objectsLoading } = api.objects.getAll.useQuery();

  return (
    <div
      className={`${theme.rounded.utilityCardBorder} flex w-full items-center justify-center gap-3 px-2 py-1`}
    >
      {/* <div
        className={`flex items-center justify-center rounded border border-red-400 bg-red-100 px-2 py-1 text-xs text-red-700`}
        role="alert"
      >
        <strong className="mr-1">Hey!</strong>
        <span className="block sm:inline">got a shoe for me?</span>
        <span className="-mr-1 flex">
          <svg
            className="h-6 w-6 fill-current text-red-500"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </span>
      </div> */}

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
