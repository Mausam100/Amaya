import { Canvas } from "@react-three/fiber";
import { OrbitControls, ScrollControls } from "@react-three/drei";
import { Suspense, useState } from "react";
import Scene from "./components/Model/Scene";
import Navbar from "./components/navbar/Navbar";
import Overlayer from "./components/Home/Overlayer";
import Menu from "./components/Home/Menu";
import CircularMenu from "./components/navbar/CircularMenu";

function App() {
  const [isOverlayerVisible, setOverlayerVisible] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState({});

  const menu = [
    {
      name: "Espreeso macchiato",
      price: "$12",
      description: "A rich and bold coffee brewed from high-quality beans.",
      img: "/images/Group20.svg",
    },
    {
      name: "Americano",
      price: "$15",
      description: "A rich and bold coffee brewed from high-quality beans.",
      img: "/images/Group20.svg",
    },
    {
      name: "Espresso con Panna",
      price: "$24",
      description: "A rich and bold coffee brewed from high-quality beans.",
      img: "/images/Group20.svg",
    },
    {
      name: "Cappuccino",
      price: "$32",
      description: "A rich and bold coffee brewed from high-quality beans.",
      img: "/images/Group20.svg",
    },
  ];

  return (
    <div className="w-full h-screen bg-black select-none">
      <Canvas>
        <Suspense fallback={null}>
          <ScrollControls enabled={true} pages={10}>
            <Scene setOverlayerVisible={setOverlayerVisible} />
            <Menu
              setOverlayerVisible={setOverlayerVisible}
              setSelectedMenuItem={setSelectedMenuItem}
              menu={menu}
            />
          </ScrollControls>
        </Suspense>
        {/* <OrbitControls /> */}
      </Canvas>

      {/* Navbar Overlay */}
      <div className="flex flex-col w-full h-full p-8 absolute top-0 right-0 pointer-events-none">
        <div className="pointer-events-auto">
          <Navbar menu={menu} />
        </div>
      </div>
      {/* Description Overlay */}
      {isOverlayerVisible && (
        <Overlayer
          setOverlayerVisible={setOverlayerVisible}
          setSelectedMenuItem={setSelectedMenuItem}
          menuItem={selectedMenuItem}
        />
      )}
    </div>
  );
}

export default App;
