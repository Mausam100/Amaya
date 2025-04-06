import React, { useMemo, useState, useEffect } from "react";
import {
  Environment,
  useScroll,
  Text,
} from "@react-three/drei";

import * as THREE from "three";
import Model from "./Model";
import { useFrame, useThree } from "@react-three/fiber";
import About from "./About";

const curvePoints = [
  [-4, 1.8, -1],
  [2.5, 1.8, -1],
  [1.6, 1.8, -0.9],
  [1.6, 1.8, -0.85],
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
  [-0.8, 1.1, -1.6],
];

const Scene = ({ setOverlayerVisible }) => {
  const { camera } = useThree();
  const scroll = useScroll();
  const [offset, setOffset] = useState(0);
  const [mouseOffset, setMouseOffset] = useState(new THREE.Vector2(0, 0));
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        curvePoints.map((p) => new THREE.Vector3(...p))
      ),
    []
  );

  const targetLookAt = useMemo(
    () => new THREE.Vector3(1.902, 1.722, -0.71),
    []
  );

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { innerWidth, innerHeight } = window;
      const x = (event.clientX / innerWidth - 0.5) * 2;
      const y = (event.clientY / innerHeight - 0.5) * 2;
      setMouseOffset(new THREE.Vector2(x, y));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    setOffset(scroll.offset);

    const basePosition = curve.getPointAt(offset);
    if (!basePosition) return;

    let newTarget = new THREE.Vector3(5.902, 1.722, -0.71);
    if (offset > 0.515) newTarget.set(-1.377, 0, -1.82);
    if (offset > 0.72) newTarget.set(-2.531, 1.034, -2.24);
    if (offset > 0.825) newTarget.set(-1.719, 0.735, 0.212);
    if (offset > 0.91) newTarget.set(-0.8, 1.1, -1.8);
    if (offset > 1) newTarget.set(1.8, 2.1);

    targetLookAt.lerp(newTarget, 0.05);
    camera.lookAt(targetLookAt);

    const maxMove = 0.1;
    const mouseEffect = new THREE.Vector3(
      mouseOffset.x * maxMove,
      mouseOffset.y * maxMove,
      0
    );

    const finalPosition = basePosition;
    camera.position.lerp(finalPosition, 0.05);
  });

  return (
    <>
      <group position={[-1.3, 0.72, -2.5]} rotation={[0, -Math.PI / 2, 0]}>
        <>
          {isMobile === false ? (
            <>
              <Text
                onClick={() => {
                  setOverlayerVisible((prev) => !prev);
                }}
                onPointerOver={(e) => {
                  document.body.style.cursor = "pointer";
                }}
                onPointerOut={(e) => {
                  document.body.style.cursor = "default";
                }}
                fillOpacity={
                  offset > 0.12 && offset < 0.35
                    ? Math.min(Math.max((offset - 0.12) * 15, 0), 1)
                    : 0
                }
                color="white"
                position={[0.927, 1.012, -1.5]}
                fontSize={0.1}
                maxWidth={1}
                lineHeight={1.2}
              >
                Welcome to Amaya Café – A digital café experience like never before!
              </Text>

              <Text
                fillOpacity={
                  offset > 0.0 && offset < 0.3
                    ? Math.min(Math.max((offset - 0.0) * 115, 0), 1)
                    : 0
                }
                color="white"
                position={[1.87, 1.6, 1.1]}
                fontSize={0.2}
                maxWidth={1}
                lineHeight={1.2}
              >
                Amaya
              </Text>
            </>
          ):(
            <>
             <Text
          onClick={() => {
            setOverlayerVisible((prev) => !prev);
          }}
          onPointerOver={(e) => {
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={(e) => {
            document.body.style.cursor = "default";
          }}
          fillOpacity={
            offset > 0.09 && offset < 0.35
              ? Math.min(Math.max((offset - 0.09) * 15, 0), 1)
              : 0
          }
          color="white"
          position={[1.427, 1.212, -1.5]}
          fontSize={0.1}
          maxWidth={1}
          lineHeight={1.2}
        >
          Welcome to Amaya Café – A digital café experience like never before!
        </Text>

        <Text
          fillOpacity={
            offset > 0.0 && offset < 0.3
              ? Math.min(Math.max((offset - 0.0) * 50, 0), 1)
              : 0
          }
          color="white"
          position={[1.57, 1.7, 1.1]}
          fontSize={0.2}
          maxWidth={1}
          lineHeight={1.2}
        >
          Amaya
        </Text>

            </>
          )}
        </>
        <About offset={offset} />
      </group>


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
