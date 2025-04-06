import { Root, Text } from "@react-three/uikit";
import React from "react";

function Menu({ setOverlayerVisible, menu, setSelectedMenuItem }) {
  return (
    <>
      <group
        position={[-1.31, 0.66, -1.74]}
        rotation={[-0.26, Math.PI / 4.8, 0.17]}
      >
        <Root
          backgroundColor="#1d1208"
          sizeX={0.4}
          sizeY={0.68}
          alignItems={"center"}
          padding={5}
          gap={4}
          flexDirection="column"
        >
          <Text fontSize={6} color={"#fff"}>
            Menu
          </Text>
          {menu.map((item, index) => (
            <Text
              key={index}
              fontSize={3}
              borderBottomWidth={0.2}
              onClick={() => {
                setSelectedMenuItem(item);
                setOverlayerVisible(true);
              }}
              onPointerOver={(e) => {
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={(e) => {
                document.body.style.cursor = "default";
              }}
              color="#fff"
            >
              {item.name}
            </Text>
          ))}
        </Root>
      </group>
      <group
        position={[-0.94, 0.60, -2.2]}
        // rotation={[-0.26, Math.PI / /4.8, 0.17]}
      >
        <Root>

        <Text fontSize={6} color={"#fff"}>Explore Our 3D Menu</Text>
        </Root>
      </group>
    </>
  );
}

export default Menu;
