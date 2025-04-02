// filepath: c:\Users\kushw\OneDrive\Desktop\Amaya\src\App.jsx
import { Canvas } from '@react-three/fiber'
import { ScrollControls, OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import Scene from './components/Scene'

function App() {
  return (
    <>
      <div className='w-full h-screen bg-black'>
        <Canvas >
          <Suspense fallback={null}>
            <ScrollControls enabled={true} pages={5} damping={0.3}>
              <Scene />
            </ScrollControls>
            {/* <OrbitControls />  */}
          </Suspense>
        </Canvas>
      </div>
    </>
  )
}

export default App