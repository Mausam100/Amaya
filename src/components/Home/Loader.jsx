import React from "react";

function Loader({ onEnterWithMusic, onEnterWithoutMusic }) {
  return (
    <div className="w-full h-screen bg-[#CDCCCE] fixed inset-0 z-9999 flex flex-col items-center justify-center">
      {/* Loader Animation */}
      <img
        src="/images/Animation - 1744191874269.gif"
        alt="Loading Animation"
      />

      {/* Buttons */}
      <div className="flex flex-col gap-4">
        <button
          className="px-6 py-3 bg-[#d4af7a] text-white font-bold rounded-lg hover:bg-[#b89568] transition-colors"
          onClick={onEnterWithMusic}
        >
          Enter
        </button>
        <button
          className="px-6 py-3 bg-[#333] text-white font-bold rounded-lg hover:bg-[#555] transition-colors"
          onClick={onEnterWithoutMusic}
        >
          Enter without Music
        </button>
      </div>
    </div>
  );
}

export default Loader;