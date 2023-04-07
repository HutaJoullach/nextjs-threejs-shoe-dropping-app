import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import * as THREE from "three";

// draco
const draco = new DRACOLoader();
// draco.setDecoderPath("../node_modules/three/examples/js/libs/draco/gltf/");
draco.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
draco.setDecoderConfig({ type: "js" });
export const dracoLoader = draco;

// gltf
const gltf = new GLTFLoader();
gltf.setDRACOLoader(dracoLoader);
export const gltfLoader = gltf;

// fix type errors
const promisify = ({ loader, onProgress }: any) => {
  const promiseLoader = ({ url }: any) => {
    return new Promise((resolve, reject) => {
      loader.load(url, resolve, onProgress, reject);
    });
  };
  return {
    originalLoader: loader,
    load: promiseLoader,
  };
};

export const fbxLoader = promisify(new FBXLoader());

// import statement, usecase below
// import { fbxLoader } from './loaders'

// fbxLoader.load('cat.fbx').then(model => {
//   console.log(model)
// })
