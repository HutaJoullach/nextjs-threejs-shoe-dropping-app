import React, { Suspense, useEffect, useRef, useState } from "react";

import CanvasLoader from "./canvas-loader";

import { Canvas, useFrame } from "@react-three/fiber";
import { AnimationAction } from "three";
import {
  OrbitControls,
  Preload,
  useAnimations,
  useGLTF,
} from "@react-three/drei";

type StagProps = {
  isMobile?: boolean | undefined;
};

const Stag = ({ isMobile }: StagProps) => {
  const { scene, animations } = useGLTF("./models/Stag.gltf");
  const { ref, mixer, names, actions, clips } = useAnimations(
    animations,
    scene
  );

  const currentAction = useRef<AnimationAction | null | undefined>(null);
  const nextAction = useRef<AnimationAction | null | undefined>(null);

  useEffect(() => {
    currentAction.current = actions["Idle"];
    currentAction.current?.play();
  }, []);

  useFrame((state, delta) => {
    mixer.update(delta);
  });

  type updateActionRefProps = {
    actionType: string;
  };

  const updateActionRef = ({ actionType }: updateActionRefProps) => {
    if (currentAction.current !== actions[`${actionType}`]) {
      currentAction.current?.stop();
      nextAction.current = actions[`${actionType}`];
      nextAction.current?.play();
      currentAction.current = nextAction.current;
      nextAction.current = null;
    } else {
      currentAction.current?.play();
    }
  };

  const handleGallopPress = () => {
    updateActionRef({ actionType: "Gallop" });
  };

  const handleAttackKickPress = () => {
    updateActionRef({ actionType: "Attack_Kick" });
  };

  const handleEatingPress = () => {
    updateActionRef({ actionType: "Eating" });
  };

  const handleWalkPress = () => {
    updateActionRef({ actionType: "Walk" });
  };

  const handleIdlePress = () => {
    updateActionRef({ actionType: "Idle" });
  };

  interface IControls {
    w?: boolean | undefined;
    s?: boolean | undefined;
    a?: boolean | undefined;
    d?: boolean | undefined;
  }

  let [controls, setControls] = useState<IControls>({});
  useEffect(() => {
    const keyDownPressHandler = (e: KeyboardEvent) => {
      setControls((controls) => ({ [e.key.toLowerCase()]: true }));
    };
    window.addEventListener("keydown", keyDownPressHandler);
    return () => {
      window.removeEventListener("keydown", keyDownPressHandler);
    };
  }, []);

  useEffect(() => {
    if (controls.w) {
      handleGallopPress();
    } else if (controls.s) {
      handleAttackKickPress();
    } else if (controls.a) {
      handleEatingPress();
    } else if (controls.d) {
      handleWalkPress();
    } else {
      handleIdlePress();
    }
  }, [controls]);

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const StagCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="always"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Stag isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default StagCanvas;
