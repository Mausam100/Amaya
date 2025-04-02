// filepath: c:\Users\kushw\OneDrive\Desktop\Amaya\src\components\Scene.jsx
import React, { useMemo } from "react";
import { Environment, Line, useScroll } from "@react-three/drei";
import * as THREE from "three";
import Model from "./Model";
import { useFrame, useThree } from "@react-three/fiber";
import { degToRad } from "three/src/math/MathUtils.js";
import SmokeShader from "./SmokeShader";

// Define curve points to explore the model
const curvePoints = [
  // x    y     z
  [-4.0, 1.5, -0.7],
  [3.9, 1.5, -0.7],
  
  // [0, 1.5, -0.7],
  // [1.6, 1.8, -0.7],
  // [1.6, 1.8, -0.1],
  // [-1, 1.2, -1],
  // [-1.1, 1.2, -1],
  // [-1.3, 1.2, -1],
  // [10, 2, 0],
  // [0, 2, 0],
  // [-2, 1.8, 0],
  // [-6, 1.5, 0],
  // [-10, 1.5, 0],
];

const Scene = () => {
  const { camera } = useThree();
  const scroll = useScroll();
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        curvePoints.map((p) => new THREE.Vector3(...p))
      ),
    []
  );
  const points = useMemo(() => curve.getPoints(100), [curve]);

  useFrame(() => {
    const offset = Math.min(1, Math.max(0, scroll.offset));
    console.log(offset);
    
    const point = curve.getPointAt(offset);
    if (point) {
      camera.position.lerp(point, 0.1);
      camera.lookAt(0, 0, 0); // Ensure the camera is always looking at the model's center
    }
 
    // Adjust camera rotation based on scroll offset
    if (offset > 0.32) {
      camera.rotation.y = THREE.MathUtils.lerp(
        camera.rotation.y,
        degToRad(0),
        0.05
      );
    }
    if (offset < 0.33) {
      camera.rotation.y = THREE.MathUtils.lerp(
        camera.rotation.y,
        degToRad(0),
        0.05
      );
    }
    // if (offset > 0.) {
    //   camera.rotation.z = THREE.MathUtils.lerp(
    //       camera.rotation.z,
    //       degToRad(-90),
    //       0.5
    //     );
    //   camera.rotation.x = THREE.MathUtils.lerp(
    //     camera.rotation.x,
    //     degToRad(20),
    //     0.5
    //   );
    // }
  //   if (offset > 0.41) {
  //     camera.rotation.y = THREE.MathUtils.lerp(
  //       camera.rotation.y,
  //       degToRad(-70),
  //       0.05
  //     );
  //   }
  //   if (offset > 0.512) {
  //     camera.rotation.y = THREE.MathUtils.lerp(
  //       camera.rotation.y,
  //       degToRad(-200),
  //       0.05
  //     );
  //   }
  //   if (offset > 0.683) {
  //     camera.rotation.y = THREE.MathUtils.lerp(
  //       camera.rotation.y,
  //       degToRad(90),
  //       0.05
  //     );
  //   }
  //   if (offset > 0.86) {
  //     camera.rotation.y = THREE.MathUtils.lerp(
  //       camera.rotation.y,
  //       degToRad(-360),
  //       0.05
  //     );
  //   }
  //   if (offset > 0.98) {
  //     camera.rotation.y = THREE.MathUtils.lerp(
  //       camera.rotation.y,
  //       degToRad(-200),
  //       0.05
  //     );
  //   }
  });

  return (
    <>
    <Environment preset="park" />
    <Model />
    <Line points={points} color="red" lineWidth={3} />
    <SmokeShader />
  </>
  );
};

export default Scene;