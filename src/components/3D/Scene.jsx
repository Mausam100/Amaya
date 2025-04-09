import React, { useMemo, useState, useEffect, useRef } from "react";
import { Environment, useScroll, Text } from "@react-three/drei";
import * as THREE from "three";
import Model from "./Model";
import { useFrame, useThree } from "@react-three/fiber";
import About from "./About";

// Define curve points for the camera path
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

// Define zones for camera look-at behavior
const lookAtZones = [
  { start: 0, end: 0.514, target: new THREE.Vector3(5.902, 1.722, -0.71) },
  { start: 0.514, end: 0.72145, target: new THREE.Vector3(-1.377, 0, -1.82) },
  { start: 0.72145, end: 0.8, target: new THREE.Vector3(-2.531, 1.034, -2.24) },
  { start: 0.8, end: 0.9, target: new THREE.Vector3(-1.719, 0.735, 0.212) },
  { start: 0.9, end: 1, target: new THREE.Vector3(-0.8, 1.1, -1.8) },
];

// Maximum parallax movement for camera
const maxMove = 0.1;

export default function Scene({
  menu,
  setOverlayerVisible,
  onScrollOffsetChange,
  setSelectedMenuItem,
}) {
  const { camera, mouse } = useThree();
  const scroll = useScroll();

  // State and refs for managing offsets and device type
  const [offset, setOffset] = useState(0);
  const [mouseOffset, setMouseOffset] = useState(new THREE.Vector2(0, 0));
  const mobileOffset = useRef(new THREE.Vector2(0, 0));
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const permissionAsked = useRef(false);

  // Handle window resize to update mobile flag
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Track mouse movement for desktop parallax effect
  useEffect(() => {
    const onMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouseOffset(new THREE.Vector2(x, y));
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  // Handle mobile device orientation and touch fallback
  useEffect(() => {
    let touchStart = null;

    // Handle device orientation changes
    const handleOrientation = (e) => {
      mobileOffset.current.set(
        THREE.MathUtils.clamp(e.gamma / 45, -1, 1),
        THREE.MathUtils.clamp(e.beta / 45, -1, 1)
      );
    };

    // Handle touch start event
    const onTouchStart = (e) => {
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
      const t = e.touches[0];
      touchStart = { x: t.clientX, y: t.clientY };
    };

    // Handle touch move event
    const onTouchMove = (e) => {
      if (!touchStart) return;
      const t = e.touches[0];
      const dx = ((t.clientX - touchStart.x) / window.innerWidth) * 2;
      const dy = ((t.clientY - touchStart.y) / window.innerHeight) * 2;

      // Smoothly interpolate the mobile offset
      mobileOffset.current.x +=
        (THREE.MathUtils.clamp(dx, -1, 1) - mobileOffset.current.x) * 0.1;
      mobileOffset.current.y +=
        (THREE.MathUtils.clamp(dy, -1, 1) - mobileOffset.current.y) * 0.1;
    };

    // Handle touch end event
    const onTouchEnd = () => {
      touchStart = null;
      mobileOffset.current.set(0, 0);
    };

    // Register device orientation and touch events
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

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  // Create a Catmull-Rom curve for the camera path
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        curvePoints.map((p) => new THREE.Vector3(...p))
      ),
    []
  );

  // Target vector for camera look-at behavior
  const targetLookAt = useMemo(() => new THREE.Vector3(), []);

  // Update camera position and look-at behavior on each frame
  useFrame(() => {
    const so = THREE.MathUtils.clamp(scroll.offset, 0, 1);
    setOffset(so);
    onScrollOffsetChange?.(so);

    // Determine the current look-at target based on scroll offset
    let curT = lookAtZones[0].target;
    for (let z of lookAtZones) {
      if (so >= z.start && so <= z.end) {
        curT = z.target;
        break;
      }
    }
    targetLookAt.lerp(curT, 0.05);
    camera.lookAt(targetLookAt);

    // Get the base position on the curve
    const basePos = curve.getPointAt(so);
    if (!basePos) return;

    // Apply parallax effect based on device type
    const src = isMobile ? mobileOffset.current : mouseOffset;
    const parallax = new THREE.Vector3(src.x * maxMove, src.y * maxMove, 0);

    // Calculate the final camera position
    const finalPos = basePos.clone().add(parallax);
    camera.position.lerp(finalPos, 0.1);
  });

  return (
    <>
      {/* Group containing text and interactive elements */}
      <group position={[-1.3, 0.72, -2.5]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Welcome text */}
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
        {/* Amaya title text */}
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
        {/* About section */}
        <About offset={offset} />
      </group>

      {/* Environment setup */}
      <Environment
        files="/resturant.hdr"
        background
        backgroundBlurriness={0.05}
        backgroundIntensity={0.5}
        environmentIntensity={0.8}
        backgroundRotation={[0, Math.PI / 2, 0]}
      />

      {/* 3D model */}
      <Model
        menu={menu}
        setOverlayerVisible={setOverlayerVisible}
        setSelectedMenuItem={setSelectedMenuItem}
      />

      {/* Ambient light */}
      <ambientLight intensity={1} />
    </>
  );
}
