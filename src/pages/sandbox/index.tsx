import React, { Suspense, useEffect, useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { api } from "~/utils/api";
import theme from "../../styles/styles";
import { LoadingPage, LoadingSpinner } from "~/components/loading";
import { PageLayout } from "~/components/layout";
import { ObjectContainer } from "~/components/object-container";
import Ground from "~/components/canvas/ground";
// import Car from "~/components/canvas/car";
import { caticon, arrowleftmdplain } from "../../assets";

import { useUser } from "@clerk/nextjs";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { useControls } from "leva";
import { toast } from "react-hot-toast";
import { Color } from "three";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  ContactShadows,
  useGLTF,
} from "@react-three/drei";

import { useAtom } from "jotai";
import {
  isDataRefetchedAtom,
  bandDataToMutateAtom,
  capsDataToMutateAtom,
  innerDataToMutateAtom,
  lacesDataToMutateAtom,
  meshDataToMutateAtom,
  patchDataToMutateAtom,
  soleDataToMutateAtom,
  stripesDataToMutateAtom,
  isCowOpenedAtom,
  isMainCanvasMountedAtom,
  isMutateObjectBtnClickedAtom,
} from "../../states/object-data";
import { useHydrateAtoms } from "jotai/utils";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const CowControlButton = () => {
  const {
    data,
    isLoading: objectsLoading,
    refetch,
    isFetched,
  } = api.objects.getAll.useQuery();

  const [showMessage, setShowMessage] = useState<boolean>(true);
  const [isMainCanvasMounted, setIsMainCanvasMounted] = useAtom(
    isMainCanvasMountedAtom
  );

  useHydrateAtoms([[isDataRefetchedAtom, false] as const]);
  const [isDataRefetched, setIsDataRefetched] = useAtom(isDataRefetchedAtom);

  useHydrateAtoms([[isCowOpenedAtom, false] as const]);
  const [isCowOpened, setIsCowOpened] = useAtom(isCowOpenedAtom);

  return (
    <div
      className={`${theme.rounded.utilityCardBorder} flex w-full items-center justify-center gap-3 px-2 py-1`}
    >
      {showMessage && (
        <div
          className={`flex items-center justify-center rounded-2xl border border-red-400 bg-red-100 px-2 py-1 text-xs text-red-700`}
          role="alert"
        >
          <strong className="mr-1">Hey!</strong>
          <span className="block sm:inline">got a shoe for me?</span>
          <button
            onClick={() => {
              // store this in local storage with jotai instead
              if (showMessage) setShowMessage(false);
            }}
          >
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
          </button>
        </div>
      )}

      <Image
        src={caticon}
        alt="caticon"
        className="h-8 w-8 rounded-full border-2 border-red-200"
        width={56}
        height={56}
      />

      <button
        onClick={() => {
          setIsMainCanvasMounted(!isMainCanvasMounted);
        }}
        type="button"
      >
        <div
          className={`${theme.rounded.utilityCardBorder} inline-flex items-center border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
        >
          {isMainCanvasMounted ? (
            <>
              <span>got laggy comp?</span>
              &nbsp;
              <span>💻</span>
            </>
          ) : (
            <>
              <span>get me some shoes</span>
              &nbsp;
              <span>🐈‍⬛</span>
            </>
          )}
        </div>
      </button>

      <button
        onClick={() => {
          if (!objectsLoading) refetch;
          if (isFetched) setIsDataRefetched(true);
          window.location.reload();
        }}
        type="button"
        disabled={objectsLoading}
      >
        <div
          className={`${theme.rounded.utilityCardBorder} inline-flex items-center border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
        >
          {!objectsLoading ? (
            <>
              <span>fetch new shoes</span>
              &nbsp;
              <span>🐈</span>
            </>
          ) : (
            <>
              <LoadingSpinner size={20} />
              <span>Loading...</span>
            </>
          )}
        </div>
      </button>

      <button
        onClick={() => {
          if (!isCowOpened) setIsCowOpened(!isCowOpened);
        }}
        type="button"
      >
        <div
          className={`${theme.rounded.utilityCardBorder} inline-flex items-center border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
        >
          <span>add my shoe!</span>
          &nbsp;
          <span>👟</span>
        </div>
      </button>
    </div>
  );
};

const MutateObjectButton = () => {
  const { user } = useUser();
  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.objects.create.useMutation({
    onSuccess: () => {
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

  const [bandDataToMutate] = useAtom(bandDataToMutateAtom);
  const [capsDataToMutate] = useAtom(capsDataToMutateAtom);
  const [innerDataToMutate] = useAtom(innerDataToMutateAtom);
  const [lacesDataToMutate] = useAtom(lacesDataToMutateAtom);
  const [meshDataToMutate] = useAtom(meshDataToMutateAtom);
  const [patchDataToMutate] = useAtom(patchDataToMutateAtom);
  const [soleDataToMutate] = useAtom(soleDataToMutateAtom);
  const [stripesDataToMutate] = useAtom(stripesDataToMutateAtom);

  useHydrateAtoms([[isMutateObjectBtnClickedAtom, false] as const]);
  const [isMutateObjectBtnClicked, setIsMutateObjectBtnClicked] = useAtom(
    isMutateObjectBtnClickedAtom
  );

  useHydrateAtoms([[isCowOpenedAtom, false] as const]);
  const [isCowOpened, setIsCowOpened] = useAtom(isCowOpenedAtom);

  if (!user) return null;

  return (
    <div
      className={`${theme.rounded.utilityCardBorder} fixed bottom-8 right-8 z-10 mt-2`}
    >
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => {
            if (isCowOpened) setIsCowOpened(!isCowOpened);
          }}
        >
          <div
            className={`${theme.rounded.utilityCardBorder} inline-flex items-center border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
          >
            <Image
              src={arrowleftmdplain}
              alt="arrowleftmdplain"
              className="h-5 w-5 border-red-200"
              width={56}
              height={56}
            />
          </div>
        </button>

        <button
          onClick={() => {
            if (!isMutateObjectBtnClicked)
              setIsMutateObjectBtnClicked(!isMutateObjectBtnClicked);
            setTimeout(function () {
              if (isCowOpened) setIsCowOpened(!isCowOpened);

              if (
                bandDataToMutate !== "" &&
                capsDataToMutate !== "" &&
                innerDataToMutate !== "" &&
                lacesDataToMutate !== "" &&
                meshDataToMutate !== "" &&
                patchDataToMutate !== "" &&
                soleDataToMutate !== "" &&
                stripesDataToMutate !== ""
              ) {
                mutate({
                  bandData: bandDataToMutate,
                  capsData: capsDataToMutate,
                  innerData: innerDataToMutate,
                  lacesData: lacesDataToMutate,
                  meshData: meshDataToMutate,
                  patchData: patchDataToMutate,
                  soleData: soleDataToMutate,
                  stripesData: stripesDataToMutate,
                });

                // console.log(`band ${bandDataToMutate}`);
                // console.log(`caps ${capsDataToMutate}`);
                // console.log(`inner ${innerDataToMutate}`);
                // console.log(`laces ${lacesDataToMutate}`);
                // console.log(`mesh ${meshDataToMutate}`);
                // console.log(`patch ${patchDataToMutate}`);
                // console.log(`sole ${soleDataToMutate}`);
                // console.log(`stripes ${stripesDataToMutate}`);
              }
            }, 2500);
          }}
        >
          <div
            className={`${theme.rounded.utilityCardBorder} inline-flex items-center border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
          >
            <span>drop my shoe!</span>
            &nbsp;
            <span>✋🎤</span>
          </div>
        </button>
      </div>
    </div>
  );
};

const CreateObjectWizard = () => {
  const { user } = useUser();

  const [bandDataToMutate, setBandDataToMutate] = useAtom(bandDataToMutateAtom);
  const [capsDataToMutate, setCapsDataToMutate] = useAtom(capsDataToMutateAtom);
  const [innerDataToMutate, setInnerDataToMutate] = useAtom(
    innerDataToMutateAtom
  );
  const [lacesDataToMutate, setLacesDataToMutate] = useAtom(
    lacesDataToMutateAtom
  );
  const [meshDataToMutate, setMeshDataToMutate] = useAtom(meshDataToMutateAtom);
  const [patchDataToMutate, setPatchDataToMutate] = useAtom(
    patchDataToMutateAtom
  );
  const [soleDataToMutate, setSoleDataToMutate] = useAtom(soleDataToMutateAtom);
  const [stripesDataToMutate, setStripesDataToMutate] = useAtom(
    stripesDataToMutateAtom
  );

  useHydrateAtoms([[isMutateObjectBtnClickedAtom, false] as const]);
  const [isMutateObjectBtnClicked, setIsMutateObjectBtnClicked] = useAtom(
    isMutateObjectBtnClickedAtom
  );

  useHydrateAtoms([[isCowOpenedAtom, false] as const]);
  const [isCowOpened, setIsCowOpened] = useAtom(isCowOpenedAtom);

  if (!user) return null;

  const [hovered, setHovered] = useState(false);
  const { nodes, materials } = useGLTF(
    "http://localhost:3000/models/shoe-draco.glb"
  );

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  function updateObjectData() {
    for (let [key, value] of Object.entries(materials)) {
      if (key === "band") {
        setBandDataToMutate(materials[key].color.getHex);
      } else if (key === "caps") {
        setCapsDataToMutate(materials[key].color.getHex);
      } else if (key === "inner") {
        setInnerDataToMutate(materials[key].color.getHex);
      } else if (key === "laces") {
        setLacesDataToMutate(materials[key].color.getHex);
      } else if (key === "mesh") {
        setMeshDataToMutate(materials[key].color.getHex);
      } else if (key === "patch") {
        setPatchDataToMutate(materials[key].color.getHex);
      } else if (key === "sole") {
        setSoleDataToMutate(materials[key].color.getHex);
      } else if (key === "stripes") {
        setStripesDataToMutate(materials[key].color.getHex);
      }
      // console.log(`band ${bandDataToMutate}`);
      // console.log(`caps ${capsDataToMutate}`);
      // console.log(`inner ${innerDataToMutate}`);
      // console.log(`laces ${lacesDataToMutate}`);
      // console.log(`mesh ${meshDataToMutate}`);
      // console.log(`patch ${patchDataToMutate}`);
      // console.log(`sole ${soleDataToMutate}`);
      // console.log(`stripes ${stripesDataToMutate}`);
    }
  }

  // setInterval and clearInterval everytime isMutateObjectBtnClicked
  // state changes before unmount CreateObjectWizard component.
  useEffect(() => {
    const interval = setInterval(() => {
      updateObjectData();
    }, 2000);
    return () => clearInterval(interval);
  }, [isMutateObjectBtnClicked]);

  useControls("Shoe", () => {
    console.log("creating color pickers");

    // using forEach
    // const colorPickers = {}
    // Object.keys(materials).forEach((m) => {
    //   colorPickers[m] = {
    //     value: '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0'),
    //     onChange: (v) => {
    //       materials[m].color = new Color(v)
    //     }
    //   }
    // })
    // return colorPickers

    return Object.keys(materials).reduce(
      (acc, m) =>
        Object.assign(acc, {
          [m]: {
            value:
              "#" +
              ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0"),
            onChange: (v: any) => {
              materials[m].color = new Color(v);
              materials[m].color.getHex = v;
              // console.log(v);
              // console.log(m);
            },
          },
        }),
      {}
    );
  });

  return (
    <group
      dispose={null}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        document.getElementById("Shoe." + e.object.material.name)?.focus();
      }}
    >
      <mesh geometry={nodes.shoe.geometry} material={materials.laces} />
      <mesh geometry={nodes.shoe_1.geometry} material={materials.mesh} />
      <mesh geometry={nodes.shoe_2.geometry} material={materials.caps} />
      <mesh geometry={nodes.shoe_3.geometry} material={materials.inner} />
      <mesh geometry={nodes.shoe_4.geometry} material={materials.sole} />
      <mesh geometry={nodes.shoe_5.geometry} material={materials.stripes} />
      <mesh geometry={nodes.shoe_6.geometry} material={materials.band} />
      <mesh geometry={nodes.shoe_7.geometry} material={materials.patch} />
    </group>
  );
};

export const RenderStoredObjects = () => {
  const {
    data,
    isLoading: objectsLoading,
    refetch,
    fetchStatus,
    isFetchedAfterMount,
    isPreviousData,
    isStale,
  } = api.objects.getAll.useQuery();

  useHydrateAtoms([[isDataRefetchedAtom, false] as const]);
  const [isDataRefetched, setIsDataRefetched] = useAtom(isDataRefetchedAtom);

  // const [, updateState] = React.useState();
  // const forceUpdate = React.useCallback(() => updateState({}), []);

  if (!data) return null;

  if (isDataRefetched) {
    refetch;
    // forceUpdate();
    setIsDataRefetched(false);
  }

  return (
    <>
      {data.map((objectData) => (
        <ObjectContainer {...objectData} key={objectData.object.id} />
      ))}
    </>
  );
};

const Scene = () => {
  const { data, isLoading: objectsLoading } = api.objects.getAll.useQuery();

  const [thirdPerson, setThirdPerson] = useState(false);
  const [cameraPosition, setCameraPosition] = useState([-6, 3.9, 6.21]);

  useEffect(() => {
    function keydownHandler(e: KeyboardEvent) {
      if (e.key == "k") {
        // random is necessary to trigger a state change
        if (thirdPerson)
          setCameraPosition([-6, 3.9, 6.21 + Math.random() * 0.01]);
        setThirdPerson(!thirdPerson);
      }
    }

    window.addEventListener("keydown", keydownHandler);
    return () => window.removeEventListener("keydown", keydownHandler);
  }, [thirdPerson]);

  console.log(`here ${process.env.VERCEL_URL}`);

  return (
    <Suspense fallback={null}>
      <Environment
        files={
          process.env.VERCEL_URL
            ? `${process.env.VERCEL_URL}/textures/vignaioli.hdr`
            : `http://localhost:3000/textures/vignaioli.hdr`
        }
        background={"only"}
      />
      <PerspectiveCamera makeDefault position={[-1, 1.9, 6.21]} fov={40} />
      {!thirdPerson && <OrbitControls target={[-2.64, -0.71, 0.03]} />}

      <Ground />
      <RenderStoredObjects />
      {/* <Car thirdPerson={thirdPerson} /> */}
    </Suspense>
  );
};

const Sandbox: NextPage = () => {
  const [isCowOpened, setIsCowOpened] = useAtom(isCowOpenedAtom);
  const [isMainCanvasMounted, setIsMainCanvasMounted] = useAtom(
    isMainCanvasMountedAtom
  );

  useHydrateAtoms([[isMutateObjectBtnClickedAtom, false] as const]);
  const [isMutateObjectBtnClicked, setIsMutateObjectBtnClicked] = useAtom(
    isMutateObjectBtnClickedAtom
  );

  const { isLoaded: userLoaded, isSignedIn } = useUser();

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
        {isSignedIn && !isCowOpened && (
          <div className="fixed right-2 z-10 mt-2">
            <div className="flex justify-center">
              <CowControlButton />
            </div>
          </div>
        )}
        {isSignedIn && isCowOpened && (
          <div className={`flex h-full w-full items-center justify-center`}>
            <Canvas shadows camera={{ position: [0, 0, 1.66] }}>
              <Environment preset="forest" />
              <CreateObjectWizard />
              <ContactShadows position={[0, -0.8, 0]} color="#ffffff" />
              <OrbitControls autoRotate />
            </Canvas>
            <MutateObjectButton />
          </div>
        )}

        {isCowOpened || !isMainCanvasMounted ? (
          <div
            className={`${theme.h.content} flex items-center justify-center`}
          >
            <div
              className={`flex items-center justify-center rounded-2xl px-2 py-1`}
            >
              <span>dismounted canvas for u</span>
              &nbsp;
              <span>🔌</span>
            </div>
          </div>
        ) : (
          <Canvas>
            <Physics
              broadphase="SAP"
              gravity={[0, -10, 0]}
              size={100}
              tolerance={0.001}
              iterations={5}
              // step={1 / 60}
              shouldInvalidate={true}
              allowSleep={false}
              axisIndex={0}
              defaultContactMaterial={{
                friction: 0.3,
                restitution: 0,
                contactEquationStiffness: 1e7,
                contactEquationRelaxation: 3,
                frictionEquationStiffness: 1e7,
                frictionEquationRelaxation: 3,
              }}
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
