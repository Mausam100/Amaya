import React from "react";
import { motion } from "motion/react";

const ExploreOverlay = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-26 left-30 w-84 h-96 flex items-center justify-center z-50 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/whiteScroll.svg')" }}
    >
      <h1>Content can go here if needed</h1>
    </motion.div>
  );
};

export default ExploreOverlay;
