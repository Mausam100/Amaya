import { Image } from "@react-three/drei";
import React from "react";
function About({ offset }) {
  return (
    <group visible={offset > 0.35 && offset < 0.7}>
      <Image
        position={[1.7, 0.8, -5.7]}
        scale={[1.5, 2]}
        url={"/images/About.png"}
      />
    </group>
  );
}
export default About;