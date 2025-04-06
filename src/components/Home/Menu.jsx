import { FontFamilyProvider, Root, Text } from "@react-three/uikit";
import React from "react";

function MenuContent({ setOverlayerVisible, menu, setSelectedMenuItem }) {
  return (
    <>
      {/* Menu Card */}
      <group
        position={[-1.31, 0.66, -1.74]}
        rotation={[-0.26, Math.PI / 4.8, 0.17]}
      >
        <Root
          backgroundColor="#1d1208"
          sizeX={0.4}
          sizeY={0.68}
          alignItems="center"
          padding={5}
          gap={4}
          flexDirection="column"
        >
          <Text fontSize={7} color="#fff" fontFamily="bakeryroast" fontWeight={400}>
            Today 
            Menu
          </Text>

          {menu.map((item, index) => (
            <Text
              key={index}
              fontSize={6}
              fontFamily="bakeryroast"
              fontWeight={400}
              color="#fff"
              borderBottomWidth={0.2}
              onClick={() => {
                setSelectedMenuItem(item);
                setOverlayerVisible(true);
              }}
              onPointerOver={() => {
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={() => {
                document.body.style.cursor = "default";
              }}
            >
              {item.name}
            </Text>
          ))}
        </Root>
      </group>

      {/* Title Section */}
      <group position={[-0.94, 0.6, -2.2]}>
        <Root>
          <Text fontSize={8} color="#fff" fontFamily="bakeryroast" fontWeight={400}>
            Explore Our 3d Menu
          </Text>
        </Root>
      </group>
    </>
  );
}

export default function Menu(props) {
  return (
    <FontFamilyProvider
      bakeryroast={{
        400: '/fonts/BakeryRoastFixed.json',
      }}
    >
      <MenuContent {...props} />
    </FontFamilyProvider>
  );
}
