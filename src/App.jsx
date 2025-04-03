import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import { Suspense } from "react";
import Scene from "./components/Scene";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div className="w-full h-screen bg-black">
        <Canvas>
          <Suspense fallback={null}>
            <ScrollControls enabled={true} pages={10} damping={0.3}>
              <Scene />
            </ScrollControls>
          </Suspense>
        </Canvas>
        <div className="flex flex-col items-center w-[full] h-full p-8 absolute top-0 right-0 pointer-events-none">
          <div className="pointer-events-auto">
            <Navbar />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
