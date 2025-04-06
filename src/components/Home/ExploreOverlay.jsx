import React from "react";
import { motion } from "motion/react";

const ExploreOverlay = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-26 left-30 w-[27vw] h-[70vh] flex flex-col items-center justify-center z-50 bg-cover bg-center gap-5"
      style={{ backgroundImage: "url('/images/whiteScroll.svg')" }}
    >
      <h1 className="mb-10 text-3xl p-2 creamy">Explore Our Cafe</h1>
     
     <img src="/images/tables.svg" alt="" />
      <img src="/images/WindowSeat.svg" alt="" />
      <img src="/images/coffeeMachine.svg" alt="" />

    </motion.div>
  );
};

export default ExploreOverlay;
