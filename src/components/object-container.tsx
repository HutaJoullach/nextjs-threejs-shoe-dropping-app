import { Suspense, useRef, useState, useMemo } from "react";
import Link from "next/link";
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

  // console.log(`${object.lacesData}`);
  // console.log(`${object.meshData}`);
  // console.log(`${object.capsData}`);
  // console.log(`${object.innerData}`);
  // console.log(`${object.soleData}`);
  // console.log(`${object.stripesData}`);
  // console.log(`${object.bandData}`);
  // console.log(`${object.patchData}`);

  interface CustomGLTF extends GLTFStd {
    nodes: Record<string, THREE.Object3D>;
    materials: Record<string, THREE.Material>;
  }

  const { nodes, materials, scene } = useGLTF(
    "http://localhost:3000/models/shoe-draco.glb"
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

  // const lacesMaterial = useMemo(() => {
  //   const material = materials.laces.clone();
  //   material.color = new THREE.Color(object.lacesData);
  //   return material;
  // }, [object.lacesData]);

  const lacesMaterial = useMemo(() => {
    const material = materials?.laces?.clone();
    if (material instanceof THREE.MeshBasicMaterial) {
      material.color = new THREE.Color(`#${object.lacesData}`);
    }
    return material;
  }, [object.lacesData]);

  // const meshMaterial = useMemo(() => {
  //   const material = materials.mesh.clone();
  //   material.color = new THREE.Color(object.meshData);
  //   return material;
  // }, [object.meshData]);

  const meshMaterial = useMemo(() => {
    const material = materials?.mesh?.clone();
    if (material instanceof THREE.MeshBasicMaterial) {
      material.color = new THREE.Color(`#${object.meshData}`);
    }
    return material;
  }, [object.meshData]);

  // const capsMaterial = useMemo(() => {
  //   const material = materials.caps.clone();
  //   material.color = new THREE.Color(object.capsData);
  //   return material;
  // }, [object.capsData]);

  const capsMaterial = useMemo(() => {
    const material = materials?.caps?.clone();
    if (material instanceof THREE.MeshBasicMaterial) {
      material.color = new THREE.Color(`#${object.capsData}`);
    }
    return material;
  }, [object.capsData]);

  // const innerMaterial = useMemo(() => {
  //   const material = materials.inner.clone();
  //   material.color = new THREE.Color(object.innerData);
  //   return material;
  // }, [object.innerData]);

  const innerMaterial = useMemo(() => {
    const material = materials?.inner?.clone();
    if (material instanceof THREE.MeshBasicMaterial) {
      material.color = new THREE.Color(`#${object.innerData}`);
    }
    return material;
  }, [object.innerData]);

  // const soleMaterial = useMemo(() => {
  //   const material = materials.sole.clone();
  //   material.color = new THREE.Color(object.soleData);
  //   return material;
  // }, [object.soleData]);

  const soleMaterial = useMemo(() => {
    const material = materials?.sole?.clone();
    if (material instanceof THREE.MeshBasicMaterial) {
      material.color = new THREE.Color(`#${object.soleData}`);
    }
    return material;
  }, [object.soleData]);

  // const stripesMaterial = useMemo(() => {
  //   const material = materials.stripes.clone();
  //   material.color = new THREE.Color(object.stripesData);
  //   return material;
  // }, [object.stripesData]);

  const stripesMaterial = useMemo(() => {
    const material = materials?.stripes?.clone();
    if (material instanceof THREE.MeshBasicMaterial) {
      material.color = new THREE.Color(`#${object.stripesData}`);
    }
    return material;
  }, [object.stripesData]);

  // const bandMaterial = useMemo(() => {
  //   const material = materials.band.clone();
  //   material.color = new THREE.Color(object.bandData);
  //   return material;
  // }, [object.bandData]);

  const bandMaterial = useMemo(() => {
    const material = materials?.band?.clone();
    if (material instanceof THREE.MeshBasicMaterial) {
      material.color = new THREE.Color(`#${object.bandData}`);
    }
    return material;
  }, [object.bandData]);

  // const patchMaterial = useMemo(() => {
  //   const material = materials.patch.clone();
  //   material.color = new THREE.Color(object.patchData);
  //   return material;
  // }, [object.patchData]);

  const patchMaterial = useMemo(() => {
    const material = materials?.patch?.clone();
    if (material instanceof THREE.MeshBasicMaterial) {
      material.color = new THREE.Color(`#${object.patchData}`);
    }
    return material;
  }, [object.patchData]);

  return (
    <group ref={shoeBody} dispose={null} scale={0.06}>
      <ambientLight intensity={0.008} />
      <mesh
        geometry={nodes.shoe?.geometry}
        // material={materials.laces}
        // material-color={
        //   object.lacesData ? object.lacesData : fallbackColor.shoe.laces
        // }
        material={lacesMaterial}
      />
      <mesh
        geometry={nodes.shoe_1.geometry}
        // material={materials.mesh}
        // material-color={
        //   object.meshData ? object.meshData : fallbackColor.shoe.mesh
        // }
        material={meshMaterial}
      />
      <mesh
        geometry={nodes.shoe_2.geometry}
        // material={materials.caps}
        // material-color={
        //   object.capsData ? object.capsData : fallbackColor.shoe.caps
        // }
        material={capsMaterial}
      />
      <mesh
        geometry={nodes.shoe_3.geometry}
        // material={materials.inner}
        // material-color={
        //   object.innerData ? object.innerData : fallbackColor.shoe.inner
        // }
        material={innerMaterial}
      />
      <mesh
        geometry={nodes.shoe_4.geometry}
        // material={materials.sole}
        // material-color={
        //   object.soleData ? object.soleData : fallbackColor.shoe.sole
        // }
        material={soleMaterial}
      />
      <mesh
        geometry={nodes.shoe_5.geometry}
        // material={materials.stripes}
        // material-color={
        //   object.stripesData ? object.stripesData : fallbackColor.shoe.stripes
        // }
        material={stripesMaterial}
      />
      <mesh
        geometry={nodes.shoe_6.geometry}
        // material={materials.band}
        // material-color={
        //   object.bandData ? object.bandData : fallbackColor.shoe.band
        // }
        material={bandMaterial}
      />
      <mesh
        geometry={nodes.shoe_7.geometry}
        // material={materials.patch}
        // material-color={
        //   object.patchData ? object.patchData : fallbackColor.shoe.patch
        // }
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
