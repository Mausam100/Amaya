import React, { useMemo } from "react";
import { Environment, Line, useScroll } from "@react-three/drei";
import * as THREE from "three";
import Model from "./Model";
import { useFrame, useThree } from "@react-three/fiber";
import { degToRad } from "three/src/math/MathUtils.js";

// Define curve points to explore the model
const curvePoints = [
  [-4, 1.8, -1],
  [1.6, 1.8, -1],
  [1.6, 1.8, -0.8],
  [-0.5, 1.2, -1.1],
  [-0.6, 1.2, -1.1],
  [-0.7, 1.2, -1.1],
  [-0.8, 1.2, -1.2],
  [-1, 1.5, -1.2],
  [-1.1, 1.5, -1.2],
  [-1.2, 1.6, -1.25],
  [-1.3, 1.7, -1.29],
  [-1.4, 1.7, -1.3],
  [-1.4, 1.6, -1.2],
  [-1.4, 1.5, -1.1],
  [-1.4, 1.1],
  [-0.8, 1.1, -1.8],
];

const Scene = () => {
  const { camera } = useThree();
  const scroll = useScroll();
  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(curvePoints.map((p) => new THREE.Vector3(...p))),
    []
  );
  const points = useMemo(() => curve.getPoints(100), [curve]);
  
  // Create a Vector3 to smoothly interpolate lookAt target
  const targetLookAt = useMemo(() => new THREE.Vector3(1.902, 1.722, -0.71), []);

  useFrame(() => {
    const offset = Math.min(1, Math.max(0, scroll.offset));
    console.log(offset);
    
    const point = curve.getPointAt(offset);
    if (point) {
      camera.position.lerp(point, 0.1); // Smoothly move along the curve
    }

    // Define different target positions based on offset
    let newTarget = new THREE.Vector3(1.902, 1.722, -0.71); // Default target //winodow
    if (offset > 0.46367851622874806) {//Menu
      newTarget.set(-1.377, 0, -1.82);
    }
    if (offset > 0.6413286614594021) {// doll
      newTarget.set(-2.531, 1.034, -2.24);
    }
    if (offset > 0.7212519319938177) {// t-peot
      newTarget.set(-1.719, 0.735, 0.212);
    }
    if (offset > 0.8758114374034003) {
      newTarget.set(-0.8, 1.1, -1.8);
    }
    
    if (offset > 1) { // 
      newTarget.set(1.8, 2.1, 11.8);
    }
    
    // Smoothly interpolate lookAt target
    targetLookAt.lerp(newTarget, 0.05);
    camera.lookAt(targetLookAt);
  });
 
  return (
    <>
      <Environment preset="park" />
      <Model />
      <Line points={points} color="red" lineWidth={3} />
    </>
  );
};

export default Scene;