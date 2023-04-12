import React, { Suspense, useEffect, useReducer, useState } from "react";
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
import { useControls } from "leva";
import { Color } from "three";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  ContactShadows,
  useGLTF,
} from "@react-three/drei";
import rgbHex from "rgb-hex";

import {
  caticon,
  closemodal,
  arrowleft,
  arrowleftmd,
  arrowleftmdplain,
} from "../../assets";

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
} from "../../states/object-data";
import { useHydrateAtoms } from "jotai/utils";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

type CowControlButtonProps = {
  // canvasMountState: ICanvasMountState;
  // setCanvasMountState: React.Dispatch<React.SetStateAction<ICanvasMountState>>;
};

const CowControlButton = ({}: // canvasMountState,
// setCanvasMountState,
CowControlButtonProps) => {
  const {
    data,
    isLoading: objectsLoading,
    refetch,
    isFetched,
  } = api.objects.getAll.useQuery();

  const [isDataRefetched, setIsDataRefetched] = useAtom(isDataRefetchedAtom);

  const [showMessage, setShowMessage] = useState<boolean>(true);

  // const [isCowOpened, setIsCowOpened] = useAtom(isCowOpenedAtom);
  const [isMainCanvasMounted, setIsMainCanvasMounted] = useAtom(
    isMainCanvasMountedAtom
  );

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
          // setCanvasMountState({
          //   ...canvasMountState,
          //   isMainCanvasMounted: !canvasMountState.isMainCanvasMounted,
          // });
          setIsMainCanvasMounted(!isMainCanvasMounted);
        }}
        type="button"
      >
        <div
          className={`${theme.rounded.utilityCardBorder} inline-flex items-center border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
        >
          {/* {canvasMountState.isMainCanvasMounted ? ( */}
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
          // if (!objectsLoading) api.objects.getAll.useQuery();
          if (!objectsLoading) refetch;
          if (isFetched) setIsDataRefetched(true);

          // window.location.reload();
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
          // if (!canvasMountState.isCowOpened)
          //   setCanvasMountState({
          //     ...canvasMountState,
          //     isCowOpened: !canvasMountState.isCowOpened,
          //   });

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

type MutateObjectButtonProps = {
  // canvasMountState: ICanvasMountState;
  // setCanvasMountState: React.Dispatch<React.SetStateAction<ICanvasMountState>>;
  // objectDataToMutate: IObjectDataToMutate;
  // setObjectDataToMutate: React.Dispatch<
  //   React.SetStateAction<IObjectDataToMutate>
  // >;
  // isMutateObjectBtnClicked: boolean;
  // setIsMutateObjectBtnClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

const MutateObjectButton = ({}: // canvasMountState,
// setCanvasMountState,
// objectDataToMutate,
// setObjectDataToMutate,
// isMutateObjectBtnClicked,
// setIsMutateObjectBtnClicked,
MutateObjectButtonProps) => {
  const { user } = useUser();

  // const [input, setInput] = useState<string>("");
  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.objects.create.useMutation({
    onSuccess: () => {
      // setInput("");
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

  // const [isCowOpened, setIsCowOpened] = useAtom(isCowOpenedAtom);
  const [isMainCanvasMounted, setIsMainCanvasMounted] = useAtom(
    isMainCanvasMountedAtom
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
            // if (canvasMountState.isCowOpened)
            //   setCanvasMountState({
            //     ...canvasMountState,
            //     isCowOpened: !canvasMountState.isCowOpened,
            //   });
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
            // if (!isMutateObjectBtnClicked) setIsMutateObjectBtnClicked(true);

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
            }

            console.log(`band ${bandDataToMutate}`);
            console.log(`caps ${capsDataToMutate}`);
            console.log(`inner ${innerDataToMutate}`);
            console.log(`laces ${lacesDataToMutate}`);
            console.log(`mesh ${meshDataToMutate}`);
            console.log(`patch ${patchDataToMutate}`);
            console.log(`sole ${soleDataToMutate}`);
            console.log(`stripes ${stripesDataToMutate}`);

            // if (canvasMountState.isCowOpened)
            //   setCanvasMountState({
            //     ...canvasMountState,
            //     isCowOpened: !canvasMountState.isCowOpened,
            //   });

            // if (isCowOpened) setIsCowOpened(!isCowOpened);
            setIsCowOpened(false);
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

type CreateObjectWizardProps = {
  // canvasMountState: ICanvasMountState;
  // setCanvasMountState: React.Dispatch<React.SetStateAction<ICanvasMountState>>;
  // objectDataToMutate: IObjectDataToMutate;
  // setObjectDataToMutate: React.Dispatch<
  //   React.SetStateAction<IObjectDataToMutate>
  // >;
  // isMutateObjectBtnClicked: boolean;
  // setIsMutateObjectBtnClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateObjectWizard = ({}: // canvasMountState,
// setCanvasMountState,
// objectDataToMutate,
// setObjectDataToMutate,
// isMutateObjectBtnClicked,
// setIsMutateObjectBtnClicked,
CreateObjectWizardProps) => {
  const { user } = useUser();

  // const [input, setInput] = useState<string>("");
  // const ctx = api.useContext();

  // const { mutate, isLoading: isPosting } = api.objects.create.useMutation({
  //   onSuccess: () => {
  //     setInput("");
  //     void ctx.objects.getAll.invalidate();
  //   },
  //   onError: (e) => {
  //     const errorMessage = e.data?.zodError?.fieldErrors.objectType;
  //     if (errorMessage && errorMessage[0]) {
  //       toast.error(errorMessage[0]);
  //     } else {
  //       toast.error("Failed to post! Please try again later.");
  //     }
  //   },
  // });

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

  // const [isCowOpened, setIsCowOpened] = useAtom(isCowOpenedAtom);
  const [isMainCanvasMounted, setIsMainCanvasMounted] = useAtom(
    isMainCanvasMountedAtom
  );

  useHydrateAtoms([[isCowOpenedAtom, false] as const]);
  const [isCowOpened, setIsCowOpened] = useAtom(isCowOpenedAtom);

  // console.log(user);
  if (!user) return null;

  const [hovered, setHovered] = useState(false);
  const { nodes, materials } = useGLTF(
    "http://localhost:3000/models/shoe-draco.glb"
  );

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
  }, [hovered]);

  // for testing, delete later
  // let obj = {};

  // useEffect(() => {
  //   setObjectDataToMutate(obj);
  //   console.log(obj);
  //   console.log(objectDataToMutate);

  //   // console.log(`hey!!!${objectDataToMutate.laces}`);
  // }, [obj]);

  // useEffect(() => {
  //   for (let [key, value] of Object.entries(obj)) {
  //     setObjectDataToMutate({
  //       ...objectDataToMutate,
  //       [key]: value,
  //     });
  //   }
  //   // console.log(`hey!!!${objectDataToMutate.laces}`);
  // }, [obj]);

  // const mutateObjectData = () => {
  //   let obj = {};

  //   console.log("hey");

  //   for (let [key, value] of Object.entries(materials)) {
  //     console.log(`hey ${[key]}`);
  //     console.log(`hey ${[materials.key.color.getHex]}`);

  //     obj = { ...obj, [key]: materials.key.color.getHex };
  //     console.log(obj);

  //     setObjectDataToMutate({
  //       ...objectDataToMutate,
  //       [key]: materials.band.color.getHex,
  //     });

  //     setObjectDataToMutate({
  //       ...objectDataToMutate,
  //       // [key]: materials[key].color.getHex,
  //       [key]: materials[key].color.getHex,
  //     });
  //   }
  // };

  // console.log(`yo ${isMutateObjectBtnClicked}`);

  // useEffect(() => {
  //   console.log("hey");
  //   if (isMutateObjectBtnClicked) {
  //     mutateObjectData();
  //     setIsMutateObjectBtnClicked(false);
  //   }
  // }, [isMutateObjectBtnClicked]);

  let obj = {};
  useEffect(() => {
    for (let [key, value] of Object.entries(materials)) {
      // console.log(`yo${[key]}`);
      // console.log(`yo${[materials.band.color.getHex]}`);
      // setObjectDataToMutate({
      //   ...objectDataToMutate,
      //   [key]: materials.band.color.getHex,
      // });
      // setObjectDataToMutate({
      //   ...objectDataToMutate,
      //   // [key]: materials[key].color.getHex,
      //   [key]: materials[key].color.getHex,
      // });
      // if (key === "laces") {
      //   setObjectDataToMutate({
      //     laces: materials[key].color.getHex,
      //   });
      // }
      // const objectDataValuePair = { [key]: materials[key].color.getHex };
      const objectDataValue = materials[key]?.color.getHex;
      console.log(objectDataValue);

      // const rValue = materials[key]?.color?.r;
      // const gValue = materials[key]?.color?.g;
      // const bValue = materials[key]?.color?.b;

      // console.log(rValue * 100, gValue * 100, bValue * 100);

      // rgbHex(rValue, gValue, bValue);
      // console.log(rgbHex(rValue * 100, gValue * 100, bValue * 100));

      // console.log(materials);
      // if (
      //   materials[key]?.color?.b &&
      //   materials[key]?.color?.g &&
      //   materials[key]?.color?.r &&
      //   materials[key]?.color?.getHex &&
      //   key === "band"
      // ) {
      //   const objectDataValue = materials[key]?.color?.getHex(`srgb-linear`);
      //   console.log(objectDataValue);
      //   setBandDataToMutate(materials[key]?.color?.getHex(`srgb-linear`));
      // }
      if (key === "band") {
        setBandDataToMutate(materials[key]?.color?.getHex);
      }
      // if (key === "band") {
      //   setBandDataToMutate(objectDataValue);
      // } else if (key === "caps") {
      //   setCapsDataToMutate(objectDataValue);
      // } else if (key === "inner") {
      //   setInnerDataToMutate(objectDataValue);
      // } else if (key === "laces") {
      //   setLacesDataToMutate(objectDataValue);
      // } else if (key === "mesh") {
      //   setMeshDataToMutate(objectDataValue);
      // } else if (key === "patch") {
      //   setPatchDataToMutate(objectDataValue);
      // } else if (key === "sole") {
      //   setSoleDataToMutate(objectDataValue);
      // } else if (key === "stripes") {
      //   setStripesDataToMutate(objectDataValue);
      // }
      // console.log(`band ${bandDataToMutate}`);
      // console.log(`caps ${capsDataToMutate}`);
      // console.log(`inner ${innerDataToMutate}`);
      // console.log(`laces ${lacesDataToMutate}`);
      // console.log(`mesh ${meshDataToMutate}`);
      // console.log(`patch ${patchDataToMutate}`);
      // console.log(`sole ${soleDataToMutate}`);
      // console.log(`stripes ${stripesDataToMutate}`);
    }
  }, [obj]);

  // const storeObjectDataValue = () => {
  //   for (let [key, value] of Object.entries(materials)) {
  //     const objectDataValue = materials[key].color.getHex;

  //     if (key === "band") {
  //       setBandDataToMutate(objectDataValue);
  //     } else if (key === "caps") {
  //       setCapsDataToMutate(objectDataValue);
  //     } else if (key === "inner") {
  //       setInnerDataToMutate(objectDataValue);
  //     } else if (key === "laces") {
  //       setLacesDataToMutate(objectDataValue);
  //     } else if (key === "mesh") {
  //       setMeshDataToMutate(objectDataValue);
  //     } else if (key === "patch") {
  //       setPatchDataToMutate(objectDataValue);
  //     } else if (key === "sole") {
  //       setSoleDataToMutate(objectDataValue);
  //     } else if (key === "stripes") {
  //       setStripesDataToMutate(objectDataValue);
  //     }

  //     // console.log(`band ${bandDataToMutate}`);
  //     // console.log(`caps ${capsDataToMutate}`);
  //     // console.log(`inner ${innerDataToMutate}`);
  //     // console.log(`laces ${lacesDataToMutate}`);
  //     // console.log(`mesh ${meshDataToMutate}`);
  //     // console.log(`patch ${patchDataToMutate}`);
  //     // console.log(`sole ${soleDataToMutate}`);
  //     // console.log(`stripes ${stripesDataToMutate}`);
  //   }
  //   // if (!isCowOpened) clearInterval(interval);
  //   console.log(`heyyyyyy ${isCowOpened}`);
  // };

  // let interval: NodeJS.Timer;
  // if (isCowOpened) {
  //   interval = setInterval(storeObjectDataValue, 3000);
  // }

  // let handleStoreObjectDataValue = setInterval(storeObjectDataValue, 3000);
  // clearInterval(handleStoreObjectDataValue);

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

    // using reduce
    return Object.keys(materials).reduce(
      (acc, m) =>
        Object.assign(acc, {
          [m]: {
            value:
              "#" +
              ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0"),
            onChange: (v: any) => {
              materials[m].color = new Color(v);
              // console.log(v);
              // console.log(m);
              materials[m].color.getHex = v;
              // materials[m].color.getHex = v?.toString;

              // console.log(materials);

              // if (m === "band") {
              //   setBandDataToMutate(materials[m].color.getHex);
              // } else if (m === "caps") {
              //   setCapsDataToMutate(materials[m].color.getHex);
              // } else if (m === "inner") {
              //   setInnerDataToMutate(materials[m].color.getHex);
              // } else if (m === "laces") {
              //   setLacesDataToMutate(materials[m].color.getHex);
              // } else if (m === "mesh") {
              //   setMeshDataToMutate(materials[m].color.getHex);
              // } else if (m === "patch") {
              //   setPatchDataToMutate(materials[m].color.getHex);
              // } else if (m === "sole") {
              //   setSoleDataToMutate(materials[m].color.getHex);
              // } else if (m === "stripes") {
              //   setStripesDataToMutate(materials[m].color.getHex);
              // }

              // console.log(bandDataToMutate);

              // setObjectDataToMutate({
              //   ...objectDataToMutate,
              //   [m]: v,
              // });

              // console.log(objectDataToMutate);

              // setCanvasMountState({
              //   ...canvasMountState,
              //   isMainCanvasMounted: !canvasMountState.isMainCanvasMounted,
              // });

              // obj = { ...obj, [m]: v };
              // console.log(obj);
            },
          },
        }),
      {}
    );
  });

  // console.log(materials);
  // console.log(materials.band.color.getHex);

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

    <group
      dispose={null}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        document.getElementById("Shoe." + e.object.material.name).focus();
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

// type ObjectWithUser = RouterOutputs["objects"]["getAll"][number];
// const ObjectContainer = (props: { object: ObjectWithUser }) => {};

// type ObjectWithUser = RouterOutputs["objects"]["getAll"][number];
// const ObjectContainer = (props: ObjectWithUser) => {
//   const {object, author} = props;
// };

const RenderStoredObjects = () => {
  const {
    data,
    isLoading: objectsLoading,
    refetch,
    fetchStatus,
    isFetchedAfterMount,
    isPreviousData,
    isStale,
  } = api.objects.getAll.useQuery();

  const [isDataRefetched, setIsDataRefetched] = useAtom(isDataRefetchedAtom);

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  if (!data) return null;

  if (isDataRefetched) {
    forceUpdate();
    setIsDataRefetched(false);
  }

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
  const { data, isLoading: objectsLoading } = api.objects.getAll.useQuery();

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

// interface ICanvasMountState {
//   isCowOpened: boolean;
//   isMainCanvasMounted: boolean;
// }

// interface IObjectDataToMutate {
//   laces?: string;
//   mesh?: string;
//   caps?: string;
//   inner?: string;
//   sole?: string;
//   stripes?: string;
//   band?: string;
//   patch?: string;
// }

const Sandbox: NextPage = () => {
  // const [canvasMountState, setCanvasMountState] = useState<ICanvasMountState>({
  //   isCowOpened: false,
  //   isMainCanvasMounted: true,
  // });

  const [isCowOpened, setIsCowOpened] = useAtom(isCowOpenedAtom);
  const [isMainCanvasMounted, setIsMainCanvasMounted] = useAtom(
    isMainCanvasMountedAtom
  );

  // const [objectDataToMutate, setObjectDataToMutate] =
  //   useState<IObjectDataToMutate>({
  //     laces: "",
  //     mesh: "",
  //     caps: "",
  //     inner: "",
  //     sole: "",
  //     stripes: "",
  //     band: "",
  //     patch: "",
  //   });

  // const [isMutateObjectBtnClicked, setIsMutateObjectBtnClicked] =
  //   useState<boolean>(false);

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
        {/* {isSignedIn && !canvasMountState.isCowOpened && ( */}
        {isSignedIn && !isCowOpened && (
          <div className="fixed right-2 z-10 mt-2">
            <div className="flex justify-center">
              <CowControlButton
              // canvasMountState={canvasMountState}
              // setCanvasMountState={setCanvasMountState}
              />
            </div>
          </div>
        )}

        {/* {isSignedIn && canvasMountState.isCowOpened && ( */}
        {isSignedIn && isCowOpened && (
          <div className={`flex h-full w-full items-center justify-center`}>
            <Canvas shadows camera={{ position: [0, 0, 1.66] }}>
              <Environment preset="forest" />
              <CreateObjectWizard
              // canvasMountState={canvasMountState}
              // setCanvasMountState={setCanvasMountState}
              // objectDataToMutate={objectDataToMutate}
              // setObjectDataToMutate={setObjectDataToMutate}
              // isMutateObjectBtnClicked={isMutateObjectBtnClicked}
              // setIsMutateObjectBtnClicked={setIsMutateObjectBtnClicked}
              />
              <ContactShadows position={[0, -0.8, 0]} color="#ffffff" />
              <OrbitControls autoRotate />
            </Canvas>
            <MutateObjectButton
            // canvasMountState={canvasMountState}
            // setCanvasMountState={setCanvasMountState}
            // objectDataToMutate={objectDataToMutate}
            // setObjectDataToMutate={setObjectDataToMutate}
            // isMutateObjectBtnClicked={isMutateObjectBtnClicked}
            // setIsMutateObjectBtnClicked={setIsMutateObjectBtnClicked}
            />
          </div>
        )}

        {/* {canvasMountState.isCowOpened || */}
        {isCowOpened ||
        // !canvasMountState.isMainCanvasMounted ? (
        !isMainCanvasMounted ? (
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
