import React, { useMemo, useState, useEffect } from "react";
import {
  Environment,
  useScroll,
  Text,
  Line,
} from "@react-three/drei";
import * as THREE from "three";
import Model from "./Model";
import { useFrame, useThree } from "@react-three/fiber";
import About from "../Home/About";

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

const lookAtZones = [
  { start: 0, end: 0.514, target: new THREE.Vector3(5.902, 1.722, -0.71) },
  { start: 0.514, end: 0.7214516784195425, target: new THREE.Vector3(-1.377, 0, -1.82) },
  { start: 0.7214516784195425, end: 0.8, target: new THREE.Vector3(-2.531, 1.034, -2.24) },
  { start: 0.8, end: 0.9, target: new THREE.Vector3(-1.719, 0.735, 0.212) },
  { start: 0.9, end: 1, target: new THREE.Vector3(-0.8, 1.1, -1.8) },
];

const Scene = ({ setOverlayerVisible, onScrollOffsetChange }) => {
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
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const curve = useMemo(
    () => new THREE.CatmullRomCurve3(curvePoints.map((p) => new THREE.Vector3(...p))),
    []
  );

  const targetLookAt = useMemo(() => new THREE.Vector3(), []);

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
    const scrollOffset = scroll.offset;
    setOffset(scrollOffset);

    // Notify App about the offset change
    if (onScrollOffsetChange) {
      onScrollOffsetChange(scrollOffset);
    }

    const basePosition = curve.getPointAt(scrollOffset);
    if (!basePosition) return;

    let currentTarget = lookAtZones[0].target;
    for (let i = 0; i < lookAtZones.length; i++) {
      const zone = lookAtZones[i];
      if (scrollOffset >= zone.start && scrollOffset <= zone.end) {
        currentTarget = zone.target;
        break;
      }
    }

    targetLookAt.lerp(currentTarget, 0.05);
    camera.lookAt(targetLookAt);

    const maxMove = 0.1;
    const mouseEffect = new THREE.Vector3(
      mouseOffset.x * maxMove,
      mouseOffset.y * maxMove,
      0
    );

    const finalPosition = basePosition.clone().add(mouseEffect);
    camera.position.lerp(finalPosition, 0.05);
  });

  return (
    <>
      <group position={[-1.3, 0.72, -2.5]} rotation={[0, -Math.PI / 2, 0]}>
        {isMobile === false ? (
          <>
            <Text
              fillOpacity={offset > 0.12 && offset < 0.35 ? Math.min(Math.max((offset - 0.12) * 15, 0), 1) : 0}
              color="white"
              position={[0.927, 1.012, -1.5]}
              fontSize={0.1}
              maxWidth={1}
              lineHeight={1.2}
              font="/fonts/bakery-roast-demo/BakeryRoastDemoRegular.ttf"
            >
              Welcome to Amaya Café – A digital café experience like never before!
            </Text>

            <Text
              fillOpacity={offset > 0.0 && offset < 0.3 ? Math.min(Math.max((offset - 0.0) * 115, 0), 1) : 0}
              color="white"
              position={[1.87, 1.6, 1.1]}
              fontSize={0.2}
              maxWidth={1}
              lineHeight={1.2}
              font="/fonts/bakery-roast-demo/BakeryRoastDemoRegular.ttf"
            >
              Amaya
            </Text>
          </>
        ) : (
          <>
            <Text
              onClick={() => setOverlayerVisible((prev) => !prev)}
              onPointerOver={() => (document.body.style.cursor = "pointer")}
              onPointerOut={() => (document.body.style.cursor = "default")}
              fillOpacity={offset > 0.09 && offset < 0.35 ? Math.min(Math.max((offset - 0.09) * 15, 0), 1) : 0}
              color="white"
              position={[1.427, 1.212, -1.5]}
              fontSize={0.1}
              font="/fonts/bakery-roast-demo/BakeryRoastDemoRegular.ttf"
              maxWidth={1}
              lineHeight={1.2}
            >
              Welcome to Amaya Café – A digital café experience like never before!
            </Text>

            <Text
              fillOpacity={offset > 0.0 && offset < 0.3 ? Math.min(Math.max((offset - 0.0) * 50, 0), 1) : 0}
              color="white"
              position={[1.57, 1.7, 1.1]}
              fontSize={0.2}
              maxWidth={1}
              lineHeight={1.2}
               font="/fonts/bakery-roast-demo/BakeryRoastDemoRegular.ttf"
            >
              Amaya
            </Text>
          </>
        )}
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
      {/* <Line points={curvePoints} color="red" lineWidth={3} /> */}
    </>
  );
};

export default Scene;
