import { Triplet, useBox } from "@react-three/cannon";
import { Vector3 } from "@react-three/fiber";

const debug = true;

type ColliderBoxProps = {
  position?: Triplet | undefined;
  scale?: Triplet | undefined;
};

const ColliderBox = ({ position, scale }: ColliderBoxProps) => {
  useBox(() => ({
    args: scale,
    position,
    type: "Dynamic",
  }));

  if (!debug) return null;

  return (
    <mesh position={position}>
      <boxGeometry args={scale} />
      <meshBasicMaterial transparent={true} opacity={0.25} />
    </mesh>
  );
};

export default ColliderBox;
