import { Suspense, useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import type { RouterOutputs } from "~/utils/api";
import theme from "../styles/styles";
import { DogCanvas } from "~/components/canvas";

import {
  ContactShadows,
  Environment,
  OrbitControls,
  Preload,
  useGLTF,
} from "@react-three/drei";
import { useControls } from "leva";
import { Color } from "three";
import { HexColorPicker } from "react-colorful";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { gltfLoader } from "./canvas/loaders";
import ColliderBox from "./canvas/collider-box";
import { useBox, useSphere } from "@react-three/cannon";

// type ObjectWrapperProps = {
//   objectType: string;
// };

// const ObjectWrapper = ({ objectType }: ObjectWrapperProps) => {
//   return <></>;
// };

type ObjectWithUser = RouterOutputs["objects"]["getAll"][number];
export const ObjectContainer = (props: ObjectWithUser) => {
  const { object, author } = props;

  const [fallbackColor, setFallbackColor] = useState({
    shoe: {
      laces: "#ffffff",
      mesh: "#3f3cbb",
      caps: "#121063",
      inner: "#565584",
      sole: "#3ab7bf",
      stripes: "#ecebff",
      band: "#ff77e9",
      patch: "#78dcca",
    },
  });

  console.log(`${object.lacesData}`);
  console.log(`${object.meshData}`);
  console.log(`${object.capsData}`);
  console.log(`${object.innerData}`);
  console.log(`${object.soleData}`);
  console.log(`${object.stripesData}`);
  console.log(`${object.bandData}`);
  console.log(`${object.patchData}`);

  // const [hovered, setHovered] = useState(false);
  // const { nodes, materials } = useGLTF(
  //   "https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@gltfjsx/public/models/shoe-draco.glb"
  // );

  // let shoe = useLoader(
  //   GLTFLoader,
  //   process.env.PUBLIC_URL
  //     ? `${process.env.PUBLIC_URL}/models/shoe-draco.glb`
  //     : `http://localhost:3000/models/shoe-draco.glb`
  // ).scene;

  // useEffect(() => {
  //   document.body.style.cursor = hovered ? 'pointer' : 'auto'
  // }, [hovered])

  // useControls("Shoe", () => {
  //   console.log("creating color pickers");

  //   // using forEach
  //   // const colorPickers = {}
  //   // Object.keys(materials).forEach((m) => {
  //   //   colorPickers[m] = {
  //   //     value: '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0'),
  //   //     onChange: (v) => {
  //   //       materials[m].color = new Color(v)
  //   //     }
  //   //   }
  //   // })
  //   // return colorPickers

  //   // using reduce
  //   return Object.keys(materials).reduce(
  //     (acc, m) =>
  //       Object.assign(acc, {
  //         [m]: {
  //           value:
  //             "#" +
  //             ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0"),
  //           onChange: (v) => {
  //             materials[m].color = new Color(v);
  //           },
  //         },
  //       }),
  //     {}
  //   );
  // });

  // const objectRef = useRef();
  const { nodes, materials } = useGLTF(
    "http://localhost:3000/models/shoe-draco.glb"
  );

  // console.log(nodes.Scene.position);

  const position = [
    (0.5 - Math.random()) * 7,
    20 + (0.5 - Math.random()) * 2,
    (0.5 - Math.random()) * 7,
  ];
  const width = 0.15;
  const height = 0.07;
  const front = 0.15;

  const shoeBodyArgs = [width, height, front * 2];
  const [shoeBody, shoeApi] = useBox(
    () => ({
      allowSleep: false,
      args: shoeBodyArgs,
      mass: 1,
      position,
    }),
    useRef(null)
  );

  return (
    // <div key={object.id} className="flex gap-2 p-2">
    //   <span>{object.objectType}</span>
    //   <ObjectWrapper objectType={object.objectType} />
    //   <div
    //     className={`${theme.rounded.utilityCardBorder} ${theme.bg.utilityCardBackground} flex h-[44px] items-center gap-1 p-1`}
    //   >
    //     <Image
    //       src={author.profileImageUrl}
    //       className="h-7 w-7 rounded-full"
    //       alt={`@${author.username}'s profile pic`}
    //       width={56}
    //       height={56}
    //     />
    //     <div className="flex flex-col text-xs font-bold text-slate-300">
    //       <Link href={`/sandbox/@${author.username}`}>
    //         <span>{`@${author.username}`}</span>
    //       </Link>
    //       <span className="flex justify-center font-thin">{`${dayjs(
    //         object.createdAt
    //       ).fromNow()}`}</span>
    //     </div>
    //   </div>
    // </div>

    <group
      ref={shoeBody}
      dispose={null}
      scale={0.06}
      // position={[0, 0.02, 0]}
      // onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
      // onPointerOut={(e) => e.intersections.length === 0 && set(null)}
      // onPointerMissed={() => (state.current = null)}
      // onPointerDown={(e) => (
      //   e.stopPropagation(), (state.current = e.object.material.name)
      // )}
    >
      <ambientLight intensity={0.008} />
      <mesh
        geometry={nodes.shoe.geometry}
        material={materials.laces}
        // material-color={
        //   object.lacesData ? object.lacesData : fallbackColor.shoe.laces
        // }
        material-color={object.lacesData}
      />
      <mesh
        geometry={nodes.shoe_1.geometry}
        material={materials.mesh}
        // material-color={
        //   object.meshData ? object.meshData : fallbackColor.shoe.mesh
        // }
        material-color={object.meshData}
      />
      <mesh
        geometry={nodes.shoe_2.geometry}
        material={materials.caps}
        // material-color={
        //   object.capsData ? object.capsData : fallbackColor.shoe.caps
        // }
        material-color={object.capsData}
      />
      <mesh
        geometry={nodes.shoe_3.geometry}
        material={materials.inner}
        // material-color={
        //   object.innerData ? object.innerData : fallbackColor.shoe.inner
        // }
        material-color={object.innerData}
      />
      <mesh
        geometry={nodes.shoe_4.geometry}
        material={materials.sole}
        // material-color={
        //   object.soleData ? object.soleData : fallbackColor.shoe.sole
        // }
        material-color={object.soleData}
      />
      <mesh
        geometry={nodes.shoe_5.geometry}
        material={materials.stripes}
        // material-color={
        //   object.stripesData ? object.stripesData : fallbackColor.shoe.stripes
        // }
        material-color={object.stripesData}
      />
      <mesh
        geometry={nodes.shoe_6.geometry}
        material={materials.band}
        // material-color={
        //   object.bandData ? object.bandData : fallbackColor.shoe.band
        // }
        material-color={object.bandData}
      />
      <mesh
        geometry={nodes.shoe_7.geometry}
        material={materials.patch}
        // material-color={
        //   object.patchData ? object.patchData : fallbackColor.shoe.patch
        // }
        material-color={object.patchData}
      />

      {/* <ColliderBox
        position={[
          nodes.Scene.position.x,
          nodes.Scene.position.y,
          nodes.Scene.position.z,
        ]}
        scale={[0.001, 1, 0.001]}
      /> */}
    </group>
  );
};
