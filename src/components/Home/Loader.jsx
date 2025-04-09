import React from "react";
import { motion } from "framer-motion";

function Loader({ onEnterWithMusic, onEnterWithoutMusic }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full font2 h-screen bg-[#c5bebe] fixed inset-0 z-9999 flex flex-col items-center justify-center"
    >
      {/* Loader Animation */}
      <motion.img
        className="br"
        src="/images/Animation - 1744191874269.gif"
        alt="Loading Animation"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Buttons */}
      <div className="flex flex-col gap-4">
        <motion.button
          className="px-6 py-3 bg-[#572e10] text-white font-bold rounded-lg hover:bg-[#907552] transition-colors"
          onClick={onEnterWithMusic}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Enter
        </motion.button>
        <motion.button
          className="px-6 py-3 bg-[#333] text-white font-bold rounded-lg hover:bg-[#555] transition-colors"
          onClick={onEnterWithoutMusic}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Enter without Music
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Loader;