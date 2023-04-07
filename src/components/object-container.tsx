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
// import { proxy, useProxy } from "valtio";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { gltfLoader } from "./canvas/loaders";
import ColliderBox from "./canvas/collider-box";
import { useSphere } from "@react-three/cannon";

// import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";
// dayjs.extend(relativeTime);

// type ObjectWrapperProps = {
//   objectType: string;
// };

// const ObjectWrapper = ({ objectType }: ObjectWrapperProps) => {
//   const renderSwitch = () => {
//     switch (objectType) {
//       case "dog":
//         return <DogCanvas />;
//         break;
//       case "cat":
//         // return <CatCanvas />;
//         break;
//       default:
//         return <div />;
//         break;
//     }
//   };

//   return <div className="">{renderSwitch()}</div>;
// };

type ObjectWithUser = RouterOutputs["objects"]["getAll"][number];
export const ObjectContainer = (props: ObjectWithUser) => {
  const { object, author } = props;

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

  // useEffect(() => {
  //   if (!shoe) return;

  //   let mesh = shoe;
  //   mesh.scale.set(0.0012, 0.0012, 0.0012);

  //   mesh.children[0].position.set(-365, -18, -67);
  // }, [shoe]);

  const objectRef = useRef();
  const { nodes, materials } = useGLTF(
    "http://localhost:3000/models/shoe-draco.glb"
  );

  console.log(nodes.Scene.position);

  const [ref] = useSphere((index) => ({
    args: [0.01],
    mass: 6,
    position: [Math.random() - 9, Math.random() - 0.3, index * 4],
  }));

  const args = [0.2, 32, 32];

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
      ref={objectRef}
      dispose={null}
      scale={0.06}
      position={[0, 0.02, 0]}
      // onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
      // onPointerOut={(e) => e.intersections.length === 0 && set(null)}
      // onPointerMissed={() => (state.current = null)}
      // onPointerDown={(e) => (
      //   e.stopPropagation(), (state.current = e.object.material.name)
      // )}
    >
      <instancedMesh ref={ref}>
        <mesh
          geometry={nodes.shoe.geometry}
          material={materials.laces}
          // material-color={snap.items.laces}
        />
        <mesh
          geometry={nodes.shoe_1.geometry}
          material={materials.mesh}
          // material-color={snap.items.mesh}
        />
        <mesh
          geometry={nodes.shoe_2.geometry}
          material={materials.caps}
          // material-color={snap.items.caps}
        />
        <mesh
          geometry={nodes.shoe_3.geometry}
          material={materials.inner}
          // material-color={snap.items.inner}
        />
        <mesh
          geometry={nodes.shoe_4.geometry}
          material={materials.sole}
          // material-color={snap.items.sole}
        />
        <mesh
          geometry={nodes.shoe_5.geometry}
          material={materials.stripes}
          // material-color={snap.items.stripes}
        />
        <mesh
          geometry={nodes.shoe_6.geometry}
          material={materials.band}
          // material-color={snap.items.band}
        />
        <mesh
          geometry={nodes.shoe_7.geometry}
          material={materials.patch}
          // material-color={snap.items.patch}
        />

        <sphereBufferGeometry args={args} />

        {/* <ColliderBox position={[1, 0, 0.5]} scale={[0.3, 1, 0.3]} /> */}
        {/* <ColliderBox
        position={[
          nodes.Scene.position.x,
          nodes.Scene.position.y,
          nodes.Scene.position.z,
        ]}
        scale={[0.001, 1, 0.001]}
      /> */}
      </instancedMesh>
    </group>
  );
};
