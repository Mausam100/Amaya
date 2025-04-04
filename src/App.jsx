import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import { Suspense, useState } from "react";
import Scene from "./components/Scene";
import Navbar from "./components/Navbar";
import Overlayer from "./components/Overlayer";

function App() {
  const [isOverlayerVisible, setOverlayerVisible] = useState(false);

  return (
    <>
      <div className="w-full h-screen bg-black">
        <Canvas>
          <Suspense fallback={null}>
            <ScrollControls enabled={true} pages={10} damping={0.3}>
              <Scene setOverlayerVisible={setOverlayerVisible} />
            </ScrollControls>
          </Suspense>
        </Canvas>
        <div className="flex flex-col items-center w-[full] h-full p-8 absolute top-0 right-0 pointer-events-none">
          <div className="pointer-events-auto">
            <Navbar />
          </div>
        </div>
        {isOverlayerVisible && <Overlayer setOverlayerVisible={setOverlayerVisible} />}
      </div>
    </>
  );
}

export default App;
