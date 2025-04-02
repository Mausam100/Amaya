// filepath: c:\Users\kushw\OneDrive\Desktop\Amaya\src\App.jsx
import { Canvas } from "@react-three/fiber";
import { ScrollControls, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Scene from "./components/Scene";
import NavComp from "./components/NavComp";
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
          {/* <OrbitControls/> */}
        </Canvas>
        <div className="flex flex-col gap-6  items-center w-[250px] h-full p-5 absolute top-0 right-0">
          <Navbar />
        </div>
      </div>
    </>
  );
}

export default App;
