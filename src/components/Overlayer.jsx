import React from 'react'

const Overlayer = ({ setOverlayerVisible }) => {
  return (
    <div className='fixed top-0 left-0 w-full h-screen bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center'>
      <div className='bg-white/10 p-8 rounded-lg backdrop-blur-sm relative'>
        <button 
          onClick={() => setOverlayerVisible(false)}
          className='absolute top-4 right-4 text-white hover:text-gray-300'
        >
          ✕
        </button>
        <h2 className='text-white text-2xl font-bold'>Overlay Content</h2>
      </div>
    </div>
  )
}

export default Overlayer;
