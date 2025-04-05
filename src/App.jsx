import { Canvas } from "@react-three/fiber";
import { OrbitControls, ScrollControls } from "@react-three/drei";
import { Suspense, useState } from "react";
import Scene from "./components/Scene";
import Navbar from "./components/Navbar";
import Overlayer from "./components/Overlayer";
import Menu from "./components/Menu";

function App() {
  const [isOverlayerVisible, setOverlayerVisible] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState({});
  console.log(selectedMenuItem);
  
  // const menu = ["Americano", "Cappuccino", "Latte", "Mocha", "Matcha Latte"];
  const menu = [
    {
    name: "Americano",
    price: "$12",
    description: "A rich and bold coffee brewed from high-quality beans.",
    img: "/public/images/Group20.svg"
  },
  {
    name: "Americano",
    price: "$12",
    description: "A rich and bold coffee brewed from high-quality beans.",
    img: "/public/images/Group20.svg"
  },
  {
    name: "Americano",
    price: "$12",
    description: "A rich and bold coffee brewed from high-quality beans.",
    img: "/public/images/Group20.svg"
  },
  {
    name: "Americano",
    price: "$12",
    description: "A rich and bold coffee brewed from high-quality beans.",
    img: "/public/images/Group20.svg"
  }
]
  return (
    <>
      <div className="w-full h-screen bg-black">
        <Canvas>
          <Suspense fallback={null}>
            <ScrollControls enabled={true} pages={10} damping={0.3}>
              <Scene setOverlayerVisible={setOverlayerVisible}  />
              <Menu 
                setOverlayerVisible={setOverlayerVisible} 
                menu={menu} 
                setSelectedMenuItem={setSelectedMenuItem}
              />
            </ScrollControls>
          </Suspense>
          {/* <OrbitControls/> */}
        </Canvas>
        <div className="flex flex-col items-center w-[full] h-full p-8 absolute top-0 right-0 pointer-events-none">
          <div className="pointer-events-auto">
            <Navbar />
          </div>
        </div>
        {isOverlayerVisible && <Overlayer setOverlayerVisible={setOverlayerVisible} setSelectedMenuItem={setSelectedMenuItem}  menuItem={selectedMenuItem} />}
      </div>
    </>
  );
}

export default App;
