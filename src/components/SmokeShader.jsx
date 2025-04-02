import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const SmokeShader = () => {
  const meshRef = useRef();

  // Vertex Shader
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  // Fragment Shader
  const fragmentShader = `
    uniform float time;
    varying vec2 vUv;

    void main() {
      float alpha = smoothstep(0.4, 0.5, sin(vUv.y * 10.0 + time) * 0.5 + 0.5);
      gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
    }
  `;

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.time.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 1, -2]}>
      <planeGeometry args={[10, 10]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{ time: { value: 0 } }}
        transparent={true}
      />
    </mesh>
  );
};

export default SmokeShader;
