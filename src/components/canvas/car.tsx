import { useEffect, useRef, MutableRefObject } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { useBox, useRaycastVehicle } from "@react-three/cannon";
import { Group, Quaternion, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import useControls from "../canvas/vehicle-controls";
import useWheels from "../canvas/vehicle-wheels";
import WheelDebug from "../canvas/wheel-debug";

const Car = ({ thirdPerson }: any) => {
  // car physics functions are from this following repo.
  // R3F-in-practice: https://github.com/Domenicobrz/R3F-in-practice
  // many thanks to the detailed video of this code.

  let result = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL
      ? `${process.env.PUBLIC_URL}/models/car.glb`
      : `http://localhost:3000/models/car.glb`
  ).scene;

  const position: [number, number, number] = [-1.5, 0.5, 3];
  const width = 0.15;
  const height = 0.07;
  const front = 0.15;
  const wheelRadius = 0.05;

  const chassisBodyArgs: [number, number, number] = [width, height, front * 2];
  const [chassisBody, chassisApi] = useBox(
    () => ({
      allowSleep: false,
      args: chassisBodyArgs,
      mass: 150,
      position,
    }),
    useRef<Group>(null)
  );

  // type WheelInfos = {
  //   chassisConnectionPointLocal: number[];
  //   isFrontWheel: boolean;
  //   radius: number;
  //   directionLocal: number[];
  //   axleLocal: number[];
  //   suspensionStiffness: number;
  //   suspensionRestLength: number;
  //   frictionSlip: number;
  //   dampingRelaxation: number;
  //   dampingCompression: number;
  //   maxSuspensionForce: number;
  //   rollInfluence: number;
  //   maxSuspensionTravel: number;
  //   customSlidingRotationalSpeed: number;
  //   useCustomSlidingRotationalSpeed: boolean;
  // }[];

  // const [wheels, wheelInfos]: MutableRefObject<null>[] | WheelInfos = useWheels(
  //   {
  //     width,
  //     height,
  //     front,
  //     wheelRadius,
  //   }
  // );

  const { wheels, wheelInfos }: any = useWheels({
    width,
    height,
    front,
    wheelRadius,
  });

  const [vehicle, vehicleApi] = useRaycastVehicle(
    () => ({
      chassisBody,
      wheelInfos,
      wheels,
    }),
    useRef<Group>(null)
  );

  // const [wheels, wheelInfos] = useWheels({ width, height, front, wheelRadius });

  // fix those errors
  // const [vehicle, vehicleApi] = useRaycastVehicle(
  //   () => ({
  //     chassisBody,
  //     // @ts-ignore
  //     wheelInfos,
  //     // @ts-ignore
  //     wheels,
  //   }),
  //   useRef<Group>(null)
  // );

  useControls({ vehicleApi, chassisApi });

  useFrame((state) => {
    if (!thirdPerson) return;

    let position = new Vector3(0, 0, 0);
    if (chassisBody.current?.matrixWorld) {
      position.setFromMatrixPosition(chassisBody.current?.matrixWorld);
    }

    let quaternion = new Quaternion(0, 0, 0, 0);
    if (chassisBody.current?.matrixWorld) {
      quaternion.setFromRotationMatrix(chassisBody.current?.matrixWorld);
    }

    let wDir = new Vector3(0, 0, 1);
    wDir.applyQuaternion(quaternion);
    wDir.normalize();

    let cameraPosition = position
      .clone()
      .add(wDir.clone().multiplyScalar(1).add(new Vector3(0, 0.3, 0)));

    wDir.add(new Vector3(0, 0.2, 0));
    state.camera.position.copy(cameraPosition);
    state.camera.lookAt(position);
  });

  useEffect(() => {
    if (!result) return;

    let mesh = result;
    mesh.scale.set(0.0012, 0.0012, 0.0012);

    mesh.children[0]?.position.set(-365, -18, -67);
  }, [result]);

  return (
    <group ref={vehicle} name="vehicle">
      <group ref={chassisBody} name="chassisBody">
        <primitive
          object={result}
          rotation-y={Math.PI}
          position={[0, -0.06, 0]}
        />
        <spotLight
          position={[-20, 50, 10]}
          angle={0.12}
          penumbra={1}
          intensity={0}
          castShadow
          shadow-mapSize={1024}
        />
        <pointLight intensity={0.2} />
        <ambientLight />
      </group>

      {/* <mesh ref={chassisBody}>
        <meshBasicMaterial transparent={true} opacity={0.3} />
        <boxGeometry args={chassisBodyArgs} />
      </mesh> */}

      {wheels && (
        <>
          <WheelDebug wheelRef={wheels[0]} radius={wheelRadius} />
          <WheelDebug wheelRef={wheels[1]} radius={wheelRadius} />
          <WheelDebug wheelRef={wheels[2]} radius={wheelRadius} />
          <WheelDebug wheelRef={wheels[3]} radius={wheelRadius} />
        </>
      )}
    </group>
  );
};

export default Car;
