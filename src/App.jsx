// filepath: c:\Users\kushw\OneDrive\Desktop\Amaya\src\App.jsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import { Model } from './components/Model'

function App() {
  return (
    <>
      <div className='w-full h-screen bg-black'>
        <Canvas className='w-full h-screen'>
          <ambientLight intensity={2} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            <Model />
          </Suspense>
          {/* <OrbitControls /> */}
        </Canvas>
      </div>
    </>
  )
}

export default App