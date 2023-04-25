import { useRef, useState, useMemo } from "react";
import type { RouterOutputs } from "~/utils/api";

import { useGLTF } from "@react-three/drei";
import ColliderBox from "./canvas/collider-box";
import { useBox } from "@react-three/cannon";
import * as THREE from "three";
import { GLTF as GLTFStd } from "three-stdlib";

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

  interface CustomGLTF extends GLTFStd {
    nodes: Record<string, THREE.Object3D>;
    materials: Record<string, THREE.Material>;
  }

  // const { nodes, materials, scene } = useGLTF(
  //   "http://localhost:3000/models/shoe-draco.glb"
  // ) as CustomGLTF;

  const { nodes, materials, scene } = useGLTF(
    `${process.env.NEXT_PUBLIC_URL}/models/shoe-draco.glb`
  ) as CustomGLTF;

  const position: [number, number, number] = [
    (0.5 - Math.random()) * 7,
    20 + (0.5 - Math.random()) * 2,
    (0.5 - Math.random()) * 7,
  ];
  const width = 0.15;
  const height = 0.07;
  const front = 0.15;

  const shoeBodyArgs: [number, number, number] = [width, height, front * 2];
  const [shoeBody, shoeApi] = useBox(
    () => ({
      allowSleep: false,
      args: shoeBodyArgs,
      mass: 1,
      position,
    }),
    useRef<THREE.Group>(null)
  );

  const lacesMaterial = useMemo(() => {
    const material = materials?.laces?.clone();
    // fixing type errors for color of Material, and ColorRepresentation will break the code. Ignoring the errors for now.
    // @ts-ignore
    material.color = new THREE.Color(object.lacesData);
    return material;
  }, [object.lacesData]);

  const meshMaterial = useMemo(() => {
    const material = materials?.mesh?.clone();
    // fixing type errors for color of Material, and ColorRepresentation will break the code. Ignoring the errors for now.
    // @ts-ignore
    material.color = new THREE.Color(object.meshData);
    return material;
  }, [object.meshData]);

  const capsMaterial = useMemo(() => {
    const material = materials?.caps?.clone();
    // fixing type errors for color of Material, and ColorRepresentation will break the code. Ignoring the errors for now.
    // @ts-ignore
    material.color = new THREE.Color(object.capsData);
    return material;
  }, [object.capsData]);

  const innerMaterial = useMemo(() => {
    const material = materials?.inner?.clone();
    // fixing type errors for color of Material, and ColorRepresentation will break the code. Ignoring the errors for now.
    // @ts-ignore
    material.color = new THREE.Color(object.innerData);
    return material;
  }, [object.innerData]);

  const soleMaterial = useMemo(() => {
    const material = materials?.sole?.clone();
    // fixing type errors for color of Material, and ColorRepresentation will break the code. Ignoring the errors for now.
    // @ts-ignore
    material.color = new THREE.Color(object.soleData);
    return material;
  }, [object.soleData]);

  const stripesMaterial = useMemo(() => {
    const material = materials?.stripes?.clone();
    // fixing type errors for color of Material, and ColorRepresentation will break the code. Ignoring the errors for now.
    // @ts-ignore
    material.color = new THREE.Color(object.stripesData);
    return material;
  }, [object.stripesData]);

  const bandMaterial = useMemo(() => {
    const material = materials?.band?.clone();
    // fixing type errors for color of Material, and ColorRepresentation will break the code. Ignoring the errors for now.
    // @ts-ignore
    material.color = new THREE.Color(object.bandData);
    return material;
  }, [object.bandData]);

  const patchMaterial = useMemo(() => {
    const material = materials?.patch?.clone();
    // fixing type errors for color of Material, and ColorRepresentation will break the code. Ignoring the errors for now.
    // @ts-ignore
    material.color = new THREE.Color(object.patchData);
    return material;
  }, [object.patchData]);

  return (
    <group ref={shoeBody} dispose={null} scale={0.06}>
      <ambientLight intensity={0.008} />
      <mesh
        // The error geometry property does not exist on the Object3D type. Ignoring the errors for now.
        // @ts-ignore
        geometry={nodes.shoe?.geometry}
        material={lacesMaterial}
      />
      <mesh
        // The error geometry property does not exist on the Object3D type. Ignoring the errors for now.
        // @ts-ignore
        geometry={nodes.shoe_1.geometry}
        material={meshMaterial}
      />
      <mesh
        // The error geometry property does not exist on the Object3D type. Ignoring the errors for now.
        // @ts-ignore
        geometry={nodes.shoe_2.geometry}
        material={capsMaterial}
      />
      <mesh
        // The error geometry property does not exist on the Object3D type. Ignoring the errors for now.
        // @ts-ignore
        geometry={nodes.shoe_3.geometry}
        material={innerMaterial}
      />
      <mesh
        // The error geometry property does not exist on the Object3D type. Ignoring the errors for now.
        // @ts-ignore
        geometry={nodes.shoe_4.geometry}
        material={soleMaterial}
      />
      <mesh
        // The error geometry property does not exist on the Object3D type. Ignoring the errors for now.
        // @ts-ignore
        geometry={nodes.shoe_5.geometry}
        material={stripesMaterial}
      />
      <mesh
        // The error geometry property does not exist on the Object3D type. Ignoring the errors for now.
        // @ts-ignore
        geometry={nodes.shoe_6.geometry}
        material={bandMaterial}
      />
      <mesh
        // The error geometry property does not exist on the Object3D type. Ignoring the errors for now.
        // @ts-ignore
        geometry={nodes.shoe_7.geometry}
        material={patchMaterial}
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
