// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";

import React, { useState } from "react";
import NavComp from "./NavComp";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <main className="">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            layout
            initial={{
              opacity: 0,
              width: "0vw",
              height: "0vh",
              borderRadius: "70%",
            }}
            animate={{
              opacity: 1,
              width: "10vw",
              height: "90vh",
              borderRadius: "1rem",
            }}
            exit={{
              opacity: 0,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={` flex flex-col items-center bg-green justify-between top-6 right-20 z-10 absolute `}
          >
            <NavComp img={"/cart.svg"} />
            <NavComp img={"/cart.svg"} />
            <NavComp img={"/cart.svg"} />
            <NavComp img={"/cart.svg"} />
            <NavComp img={"/cart.svg"} />
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="z-50 flex items-center justify-end">
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onClick={toggleMenu}
          className={`bg-white z-50 flex items-center rounded-full gap-4 px-1 py-1 transition-all duration-500 ${
            isOpen ? "w-16 h-16  ml-[13vw]" : "w-auto"
          }`}
        >
          {/* Hamburger Icon */}
          <div className="flex z-50 w-10 items-center justify-end cursor-pointer">
            <div className="flex flex-col w-6 gap-[6px]">
              <div
                className={`h-[2px] w-full bg-black duration-300 origin-center ${
                  isOpen ? "rotate-[45deg] translate-y-1 " : ""
                }`}
              ></div>
              <div
                className={`h-[2px] w-full bg-black duration-300 origin-center ${
                  isOpen ? "-rotate-[45deg] -translate-y-1 " : ""
                }`}
              ></div>
            </div>
          </div>

          {!isOpen && (
            <div className="flex z-50 items-center justify-between gap-2 transition-all duration-500 ease-in-out">
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden flex items-center ${
                  isHover ? "max-w-[100px]" : "max-w-0"
                }`}
              >
                <h3
                  className={`font-semibold text-base transition-opacity duration-500 ${
                    isHover ? "opacity-100 delay-200" : "opacity-0"
                  }`}
                >
                  MENU
                </h3>
              </div>

              <div className="bg-[#3ADD8A] rounded-full z-50 cursor-pointer overflow-hidden">
                <motion.img
                  animate={{ rotate: [0, 0, -40, 0] }}
                  transition={{
                    repeat: Infinity,
                    repeatDelay: 2,
                    duration: 1,
                    ease: "linear",
                  }}
                  style={{ originX: 1 }}
                  src="https://www.bikebear.com.my/wp-content/uploads/2022/10/Mask-Group-34014.png"
                  alt="hand"
                  className="w-16 translate-y-0 z-50"
                />
              </div>
            </div>
          )}
        </div>
      </nav>
    </main>
  );
};

export default Navbar;
