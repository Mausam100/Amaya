import React from "react";

const MusicButton = ({ audio, isPlaying, setIsPlaying }) => {
  const handleClick = () => {
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      className="relative w-16 h-16 flex items-center justify-center bg-[#F5D18C] rounded-lg shadow-[3px_3px_0_0_#675D50] cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center justify-center w-fit">
        <div
          className={`w-14 h-14 bg-[#675D50] rounded-full ${
            isPlaying ? "animate-spin" : ""
          } flex items-center justify-center`}
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
    </div>
  );
};

export default MusicButton;
