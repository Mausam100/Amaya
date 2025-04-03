import { Image } from "@react-three/drei";
import React from "react";

function About({ offset }) {
  return (
    <group visible={offset > 0.35 && offset < 0.7}>
      <Image
        //   opacity={offset > 0.5 && offset < 0.7 ? Math.min(Math.max((offset - 0.5) * 15, 0), 1) : 0}
        position={[1.7, 0.8, -5.7]}
        scale={[1.5, 2]}
        url={"/public/imgs/Frame 13.png"}
      />
    </group>
  );
}

export default About;
