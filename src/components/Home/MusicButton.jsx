import React, { useState } from 'react';

const MusicButton = () => {
  const [isRotating, setIsRotating] = useState(true); // State to track rotation

  const handleClick = () => {
    setIsRotating((prev) => !prev); // Toggle rotation state
  };

  return (
    <div className="relative w-16 h-16 flex items-center justify-center bg-[#ABC4AA] rounded-lg shadow-[3px_3px_0_0_#675D50]">
      <div className="flex items-center justify-center w-fit">
        <div
          className={`w-14 h-14 bg-[#675D50] rounded-full ${isRotating ? 'animate' : ''} flex items-center justify-center`}
        >
          <div className="w-8 h-8 bg-[#F3DEBA] rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-[#675D50] rounded-full" />
          </div>
          <div className="w-12 h-12 border-2 border-t-[#F3DEBA] border-b-[#F3DEBA] border-l-[#675D50] border-r-[#675D50] rounded-full absolute" />
        </div>
      </div>
      <div className="absolute bottom-1 right-1 flex flex-col items-center rotate-[-45deg]">
        <div className="w-3 h-3 bg-[#F3DEBA] rounded-full z-10" />
        <div className="w-1 h-6 bg-[#F3DEBA] absolute bottom-0 mb-1" />
      </div>
      <button
        onClick={handleClick}
        className="absolute inset-0 cursor-pointer" // Make the entire button clickable
      />
    </div>
  );
};

export default MusicButton;