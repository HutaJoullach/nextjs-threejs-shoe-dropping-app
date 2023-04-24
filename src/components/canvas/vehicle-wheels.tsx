import { useRef } from "react";
import { useCompoundBody } from "@react-three/cannon";

type useWheelsProps = {
  width: number;
  height: number;
  front: number;
  wheelRadius: number;
};

const useWheels = ({
  width,
  height,
  front,
  wheelRadius: radius,
}: useWheelsProps) => {
  const wheels = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const wheelInfo = {
    radius,
    directionLocal: [0, -1, 0] as [number, number, number],
    axleLocal: [1, 0, 0] as [number, number, number],
    suspensionStiffness: 60,
    suspensionRestLength: 0.1,
    frictionSlip: 5,
    dampingRelaxation: 2.3,
    dampingCompression: 4.4,
    maxSuspensionForce: 100000,
    rollInfluence: 0.01,
    maxSuspensionTravel: 0.1,
    customSlidingRotationalSpeed: -30,
    useCustomSlidingRotationalSpeed: true,
  };

  const wheelInfos = [
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [-width * 0.65, height * 0.4, front] as [
        number,
        number,
        number
      ],
      isFrontWheel: true,
    },
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [width * 0.65, height * 0.4, front] as [
        number,
        number,
        number
      ],
      isFrontWheel: true,
    },
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [-width * 0.65, height * 0.4, -front] as [
        number,
        number,
        number
      ],
      isFrontWheel: false,
    },
    {
      ...wheelInfo,
      chassisConnectionPointLocal: [width * 0.65, height * 0.4, -front] as [
        number,
        number,
        number
      ],
      isFrontWheel: false,
    },
  ];

  const propsFunc = () => ({
    collisionFilterGroup: 0,
    mass: 1,
    shapes: [
      {
        args: [wheelInfo.radius, wheelInfo.radius, 0.015, 16],
        rotation: [0, 0, -Math.PI / 2],
        type: "Cylinder",
      },
    ],
    type: "Kinematic",
  });

  // fix those
  // @ts-ignore
  useCompoundBody(propsFunc, wheels[0]);
  // @ts-ignore
  useCompoundBody(propsFunc, wheels[1]);
  // @ts-ignore
  useCompoundBody(propsFunc, wheels[2]);
  // @ts-ignore
  useCompoundBody(propsFunc, wheels[3]);

  // return [wheels, wheelInfos];

  return {
    wheels,
    wheelInfos,
  };
};

export default useWheels;
