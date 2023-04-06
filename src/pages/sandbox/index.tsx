import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { Canvas } from "@react-three/fiber";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";
import theme from "../../styles/styles";
import { LoadingPage, LoadingSpinner } from "~/components/loading";
import { PageLayout } from "~/components/layout";
import { ObjectContainer } from "~/components/object-container";
import { toast } from "react-hot-toast";
import { editwrite } from "../../assets";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

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
    <div
      className={`${theme.rounded.utilityCardBorder} ${theme.bg.utilityCardBackground} flex w-full gap-3 p-1`}
    >
      <Image
        src={user.profileImageUrl}
        alt="Profile image"
        className="h-6 w-6 rounded-full"
        width={56}
        height={56}
      />
      <input
        placeholder="Type some text"
        className="grow bg-transparent outline-none"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (input !== "") {
              mutate({ objectType: input });
            }
          }
        }}
        disabled={isPosting}
      />
      {!isPosting && (
        <button
          onClick={() => {
            if (input !== "") mutate({ objectType: input });
          }}
        >
          <Image
            src={editwrite}
            className="h-5 w-5 rounded-full"
            alt="editwrite"
            width={56}
            height={56}
          />
        </button>
      )}
      {!!isPosting && (
        <div className="flex items-center justify-center">
          <LoadingSpinner size={20} />
        </div>
      )}
    </div>
  );
};

// type ObjectWithUser = RouterOutputs["objects"]["getAll"][number];
// const ObjectContainer = (props: { object: ObjectWithUser }) => {};

// type ObjectWithUser = RouterOutputs["objects"]["getAll"][number];
// const ObjectContainer = (props: ObjectWithUser) => {
//   const {object, author} = props;
// };

const Board = () => {
  const { data, isLoading: objectsLoading } = api.objects.getAll.useQuery();

  if (objectsLoading) return <LoadingPage />;

  if (!data) return <div>Something went wrong</div>;

  return (
    <>
      <div className="flex h-full w-full items-center justify-center">
        {data.map((objectData) => (
          <ObjectContainer {...objectData} key={objectData.object.id} />
        ))}
      </div>
      {/* <Canvas>
        <div></div>
      </Canvas> */}
    </>
  );
};

const Sandbox: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  // Start fetching data
  api.objects.getAll.useQuery();

  if (!userLoaded) return <div />;

  return (
    <>
      <Head>
        <title>Sandbox</title>
      </Head>
      <PageLayout>
        <div className="fixed right-2 mt-2">
          {isSignedIn && (
            <div className="flex justify-center">
              <CreateObjectWizard />
            </div>
          )}
        </div>
        <Board />
      </PageLayout>
    </>
  );
};

export default Sandbox;
