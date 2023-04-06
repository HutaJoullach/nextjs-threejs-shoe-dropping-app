import { forwardRef } from "react";

const debug = false;

type WheelDebugProps = {
  radius: number;
  wheelRef: any;
};

const WheelDebug = forwardRef(({ radius, wheelRef }: WheelDebugProps) => {
  if (debug) return null;

  return (
    <group ref={wheelRef}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[radius, radius, 0.015, 16]} />
        <meshNormalMaterial transparent={true} opacity={0.25} />
      </mesh>
    </group>
  );
  // return (
  //   debug && (
  //     <group ref={wheelRef}>
  //       <mesh rotation={[0, 0, Math.PI / 2]}>
  //         <cylinderGeometry args={[radius, radius, 0.015, 16]} />
  //         <meshNormalMaterial transparent={true} opacity={0.25} />
  //       </mesh>
  //     </group>
  //   )
  // );
});

export default WheelDebug;
