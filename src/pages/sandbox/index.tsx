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
      className={`${theme.rounded.utilityCardBorder} ${theme.bg.utilityCardBackground} flex w-full gap-3 p-1`}
    >
      <Image
        src={caticon}
        alt="caticon"
        className="h-6 w-6 rounded-full"
        width={56}
        height={56}
      />

      <button
        onClick={() => {
          if (!objectsLoading) api.objects.getAll.useQuery();
        }}
        disabled={objectsLoading}
      >
        <div className="flex items-center justify-center">
          {!objectsLoading ? (
            <>
              <span>fetch shoes!!</span>
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
        <div className="flex items-center justify-center">
          <span>add my shoe</span>
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
        <div className="fixed right-2 z-10 mt-2">
          {isSignedIn && (
            <div className="flex justify-center">
              {!isCowOpened ? (
                <CowControlButton isCowOpened setIsCowOpened />
              ) : (
                <CreateObjectWizard />
              )}
            </div>
          )}
        </div>
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
