import React from "react";
import { motion } from "motion/react";

const ExploreOverlay = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:top-87 md:left-[30vw] md:transform-none w-76 h-96 sm:w-96 sm:h-[70vh] flex flex-col gap-6 items-center md:pt-30 pt-20  z-40 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/whiteScroll.svg')" }}
    >
      <h1 className="text-2xl sm:text-3xl md:text-4xl creamy">Explore Our Cafe</h1>

      <img className="w-60 cursor-pointer sm:w-70 md:w-80 md:pt-6 md:pb-6" src="/images/tables.svg" alt="" />
      <img className="w-60 cursor-pointer sm:w-70 md:w-80 md:pb-6" src="/images/WindowSeat.svg" alt="" />
      <img className="w-60 cursor-pointer sm:w-70 md:w-80" src="/images/coffeeMachine.svg" alt="" />
    </motion.div>
  );
};

export default ExploreOverlay;
