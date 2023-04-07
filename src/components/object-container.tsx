import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import type { RouterOutputs } from "~/utils/api";
import theme from "../styles/styles";
import { DogCanvas } from "~/components/canvas";

import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { useControls } from "leva";
import { Color } from "three";

import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

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

  const [hovered, setHovered] = useState(false);
  // const { nodes, materials } = useGLTF(
  //   "https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@gltfjsx/public/models/shoe-draco.glb"
  // );

  // const shoe = useGLTF(
  //   "https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@gltfjsx/public/models/shoe-draco.glb"
  // ).scene;

  let shoe = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL
      ? `${process.env.PUBLIC_URL}/models/shoe-draco.glb`
      : `http://localhost:3000/models/shoe-draco.glb`
  ).scene;

  console.log(shoe);

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

  useEffect(() => {
    if (!shoe) return;

    let mesh = shoe;
    mesh.scale.set(0.0012, 0.0012, 0.0012);

    mesh.children[0].position.set(-365, -18, -67);
  }, [shoe]);

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
      dispose={null}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      // onClick={(e) => {
      //   e.stopPropagation();
      //   document.getElementById("Shoe." + e.object.material.name).focus();
      // }}
    >
      <primitive
        object={shoe}
        // object={car.scene}
        // rotation-y={Math.PI}
        position={[0, -0.09, 0]}
      />
      {/* <mesh geometry={nodes.shoe.geometry} material={materials.laces} />
      <mesh geometry={nodes.shoe_1.geometry} material={materials.mesh} />
      <mesh geometry={nodes.shoe_2.geometry} material={materials.caps} />
      <mesh geometry={nodes.shoe_3.geometry} material={materials.inner} />
      <mesh geometry={nodes.shoe_4.geometry} material={materials.sole} />
      <mesh geometry={nodes.shoe_5.geometry} material={materials.stripes} />
      <mesh geometry={nodes.shoe_6.geometry} material={materials.band} />
      <mesh geometry={nodes.shoe_7.geometry} material={materials.patch} /> */}
    </group>
  );
};

useGLTF.preload(
  "https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@gltfjsx/public/models/shoe-draco.glb"
);
