import React, { useMemo, useState, useEffect } from "react";
import { Environment, useScroll } from "@react-three/drei";
import * as THREE from "three";
import Model from "./Model";
import { useFrame, useThree } from "@react-three/fiber";

const curvePoints = [
  [-4, 1.8, -1], [1.6, 1.8, -1], [1.6, 1.8, -0.9], [1.6, 1.8, -0.85],
  [1.6, 1.8, -0.8], [-0.5, 1.2, -1.1], [-0.6, 1.2, -1.1], [-0.7, 1.2, -1.1],
  [-0.8, 1.2, -1.2], [-1, 1.5, -1.2], [-1.1, 1.5, -1.2], [-1.2, 1.6, -1.25],
  [-1.3, 1.7, -1.29], [-1.4, 1.7, -1.3], [-1.4, 1.6, -1.2], [-1.4, 1.5, -1.1],
  [-1.4, 1.1], [-0.8, 1.1, -1.6],
];

const Scene = () => {
  const { camera, gl } = useThree();
  const scroll = useScroll();
  const [mouseOffset, setMouseOffset] = useState(new THREE.Vector2(0, 0));

  const curve = useMemo(() => 
    new THREE.CatmullRomCurve3(curvePoints.map((p) => new THREE.Vector3(...p))), []
  );

  const targetLookAt = useMemo(() => new THREE.Vector3(1.902, 1.722, -0.71), []);

  // ✅ Handle Mouse Move (Improved)
  useEffect(() => {
    const handleMouseMove = (event) => {
      const { innerWidth, innerHeight } = window;
      const x = (event.clientX / innerWidth - 0.5) * 2; // Normalize to range [-1, 1]
      const y = (event.clientY / innerHeight - 0.5) * 2;
      setMouseOffset(new THREE.Vector2(x, y));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    const offset = Math.min(1, Math.max(0, scroll.offset));
    const basePosition = curve.getPointAt(offset);
    if (!basePosition) return;

    // 🛠 Define LookAt Targets Based on Scroll
    let newTarget = new THREE.Vector3(1.902, 1.722, -0.71);
    if (offset > 0.463) newTarget.set(-1.377, 0, -1.82);
    if (offset > 0.701) newTarget.set(-2.531, 1.034, -2.24);
    if (offset > 0.771) newTarget.set(-1.719, 0.735, 0.212);
    if (offset > 0.855) newTarget.set(-0.8, 1.1, -1.8);
    if (offset > 1) newTarget.set(1.8, 2.1);

    targetLookAt.lerp(newTarget, 0.05);
    camera.lookAt(targetLookAt);

    // ✅ Apply Mouse Movement (Fixed)
    const maxMove = 0.1; // Max offset range
    const mouseEffect = new THREE.Vector3(
      mouseOffset.x * maxMove,  // Move left/right
      mouseOffset.y * maxMove,  // Move up/down
      0
    );

    const finalPosition = basePosition.clone().add(mouseEffect);
    camera.position.lerp(finalPosition, 0.05);
  });

  return (
    <>
      <Environment
        files="/resturant.hdr"
        background
        backgroundBlurriness={0.05}
        backgroundIntensity={0.5}
        environmentIntensity={0.8}
        backgroundRotation={[0, Math.PI / 2, 0]}
      />
      <Model />
      <ambientLight intensity={1} />
    </>
  );
};

export default Scene;
