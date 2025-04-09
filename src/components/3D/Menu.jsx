import { FontFamilyProvider, Root, Text } from "@react-three/uikit"; // UI components for 3D rendering
import React from "react";

// MenuContent component to display the 3D menu
function MenuContent({ setOverlayerVisible, menu, setSelectedMenuItem }) {
  return (
    <>
      {/* Menu Card */}
      <group
        position={[-1.31, 0.66, -1.74]} // Position of the menu card in the 3D scene
        rotation={[-0.26, Math.PI / 4.8, 0.17]} // Rotation of the menu card
      >
        <Root
          style={{ backgroundImage: "url('/images/whiteScroll.svg')" }} // Background image for the menu card
          backgroundColor="#1d1208"
          sizeX={0.4}
          sizeY={0.68}
          alignItems="center"
          padding={6}
          gap={2}
          flexDirection="column"
        >
          {/* Menu Title */}
          <Text fontSize={6} color="#fff" fontFamily="bakeryroast" fontWeight={400}>
            Today Menu
          </Text>

          {/* Menu Items */}
          {menu.map((item, index) => (
            <Text
              key={index}
              fontSize={5}
              fontFamily="bakeryroast"
              fontWeight={400}
              color="#fff"
              borderBottomWidth={0.3}
              onClick={() => {
                setSelectedMenuItem(item); // Set the selected menu item
                setOverlayerVisible(true); // Show the overlayer
              }}
              onPointerOver={() => {
                document.body.style.cursor = "pointer"; // Change cursor to pointer on hover
              }}
              onPointerOut={() => {
                document.body.style.cursor = "default"; // Reset cursor on hover out
              }}
            >
              {item.name}
            </Text>
          ))}
        </Root>
      </group>

      {/* Title Section */}
      <group position={[-0.94, 0.58, -2.2]}>
        <Root>
          <Text fontSize={8} color="#fff" fontFamily="bakeryroast" fontWeight={400}>
            Explore Our 3D Menu
          </Text>
        </Root>
      </group>
    </>
  );
}

// Main Menu component with font family provider
export default function Menu(props) {
  return (
    <FontFamilyProvider
      bakeryroast={{
        400: '/fonts/CreamyCoffeeFixed.json', // Font configuration
      }}
    >
      <MenuContent {...props} />
    </FontFamilyProvider>
  );
}
