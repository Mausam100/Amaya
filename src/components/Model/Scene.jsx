import React, { useMemo, useState, useEffect, useRef } from "react";
import { Environment, useScroll, Text } from "@react-three/drei";
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
  { start: 0.514, end: 0.72145, target: new THREE.Vector3(-1.377, 0, -1.82) },
  { start: 0.72145, end: 0.8, target: new THREE.Vector3(-2.531, 1.034, -2.24) },
  { start: 0.8, end: 0.9, target: new THREE.Vector3(-1.719, 0.735, 0.212) },
  { start: 0.9, end: 1, target: new THREE.Vector3(-0.8, 1.1, -1.8) },
];

const maxMove = 0.1; // world-space parallax magnitude

export default function Scene({ menu, setOverlayerVisible, onScrollOffsetChange, setSelectedMenuItem }) {
  const { camera, mouse } = useThree();
  const scroll = useScroll();

  const [offset, setOffset] = useState(0);
  const [mouseOffset, setMouseOffset] = useState(new THREE.Vector2(0, 0));
  const mobileOffset = useRef(new THREE.Vector2(0, 0));
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const permissionAsked = useRef(false);

  // Resize → mobile flag
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Desktop mouse tracking
  useEffect(() => {
    const onMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouseOffset(new THREE.Vector2(x, y));
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  // Mobile: deviceorientation + touch fallback
  useEffect(() => {
    let touchStart = null;

    const handleOrientation = (e) => {
      // gamma: LR tilt, beta: FB tilt
      mobileOffset.current.set(
        THREE.MathUtils.clamp(e.gamma / 45, -1, 1),
        THREE.MathUtils.clamp(e.beta / 45, -1, 1)
      );
    };

    const onTouchStart = (e) => {
      e.preventDefault(); // Prevent default touch behavior
      if (
        typeof DeviceOrientationEvent !== "undefined" &&
        DeviceOrientationEvent.requestPermission &&
        !permissionAsked.current
      ) {
        permissionAsked.current = true;
        DeviceOrientationEvent.requestPermission()
          .then((resp) => {
            if (resp === "granted") {
              window.addEventListener(
                "deviceorientation",
                handleOrientation,
                true
              );
            }
          })
          .catch(console.error);
      }
      // also begin our touch‑drag fallback
      const t = e.touches[0];
      touchStart = { x: t.clientX, y: t.clientY };
    };

    const onTouchMove = (e) => {
      if (!touchStart) return;
      const t = e.touches[0];
      const dx = ((t.clientX - touchStart.x) / window.innerWidth) * 2;
      const dy = ((t.clientY - touchStart.y) / window.innerHeight) * 2;

      // Smoothly interpolate the mobile offset
      mobileOffset.current.x += (THREE.MathUtils.clamp(dx, -1, 1) - mobileOffset.current.x) * 0.1; // Smoothing factor
      mobileOffset.current.y += (THREE.MathUtils.clamp(dy, -1, 1) - mobileOffset.current.y) * 0.1; // Smoothing factor
    };

    const onTouchEnd = () => {
      touchStart = null;
      mobileOffset.current.set(0, 0);
    };

    // If permission API not needed (Android/desktop), register immediately
    if (
      !(
        typeof DeviceOrientationEvent !== "undefined" &&
        DeviceOrientationEvent.requestPermission
      )
    ) {
      window.addEventListener("deviceorientation", handleOrientation, true);
    }

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        curvePoints.map((p) => new THREE.Vector3(...p))
      ),
    []
  );
  const targetLookAt = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    // 1) Scroll offset
    const so = THREE.MathUtils.clamp(scroll.offset, 0, 1);
    setOffset(so);
    onScrollOffsetChange?.(so);

    // 2) LookAt zones
    let curT = lookAtZones[0].target;
    for (let z of lookAtZones) {
      if (so >= z.start && so <= z.end) {
        curT = z.target;
        break;
      }
    }
    targetLookAt.lerp(curT, 0.05);
    camera.lookAt(targetLookAt);

    // 3) Base position on curve
    const basePos = curve.getPointAt(so);
    if (!basePos) return;

    // 4) Parallax: choose source by device
    const src = isMobile ? mobileOffset.current : mouseOffset;
    const parallax = new THREE.Vector3(
      src.x * maxMove,
      src.y * maxMove,
      0
    );

    // 5) Final camera position
    const finalPos = basePos.clone().add(parallax);
    camera.position.lerp(finalPos, 0.1);
  });

  return (
    <>
      <group position={[-1.3, 0.72, -2.5]} rotation={[0, -Math.PI / 2, 0]}>
        <Text
          onClick={() => setOverlayerVisible((v) => !v)}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
          fillOpacity={
            offset > 0.09 && offset < 0.35
              ? Math.min(Math.max((offset - 0.09) * 15, 0), 1)
              : 0
          }
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
          fillOpacity={
            offset > 0 && offset < 0.3
              ? Math.min(Math.max(offset * 50, 0), 1)
              : 0
          }
          color="white"
          position={[1.57, 1.7, 1.1]}
          fontSize={0.2}
          maxWidth={1}
          lineHeight={1.2}
          font="/fonts/bakery-roast-demo/BakeryRoastDemoRegular.ttf"
        >
          Amaya
        </Text>
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
      <Model menu={menu} setOverlayerVisible={setOverlayerVisible} setSelectedMenuItem={setSelectedMenuItem} />
      <ambientLight intensity={1} />
    </>
  );
}
