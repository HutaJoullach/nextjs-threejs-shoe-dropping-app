import React, { Suspense, useEffect, useState } from "react";

import CanvasLoader from "./canvas-loader";
import { fbxLoader } from "./loaders";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Preload,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";

type StagProps = {
  isMobile?: boolean | undefined;
};

const Stag = ({ isMobile }: StagProps) => {
  // const stag = useGLTF("./models/Stag.gltf");
  // const { animations } = stag;
  // const { actions } = useAnimations(animations);
  const { scene, animations } = useGLTF("./models/Stag.gltf");
  const { ref, mixer, names, actions, clips } = useAnimations(
    animations,
    scene
  );

  useEffect(() => {
    actions?.Attack_Kick?.play();
  }, []);

  return (
    <mesh onClick={() => actions?.Attack_Kick?.play()}>
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
        // object={stag.scene}
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
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  // animate
  // const mixers = [];
  // const mixer = new THREE.AnimationMixer(stagClone);
  // const clip = THREE.AnimationClip.findByName(clips, "Idle_2");
  // const action = mixer.clipAction(clip);
  // action.play();
  // mixers.push(mixer);

  // const clock = new THREE.Clock();
  // function animate(time) {
  //   highlightMesh.material.opacity = 1 + Math.sin(time / 120);
  //   // objects.forEach(function(object) {
  //   //     object.rotation.x = time / 1000;
  //   //     object.rotation.z = time / 1000;
  //   //     object.position.y = 0.5 + 0.5 * Math.abs(Math.sin(time / 1000));
  //   // });
  //   // if(mixer)
  //   //     mixer.update(clock.getDelta());
  //   const delta = clock.getDelta();
  //   mixers.forEach(function (mixer) {
  //     mixer.update(delta);
  //   });
  //   renderer.render(scene, camera);
  // }

  // renderer.setAnimationLoop(animate);
  // animate

  return (
    <Canvas
      frameloop="demand"
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
