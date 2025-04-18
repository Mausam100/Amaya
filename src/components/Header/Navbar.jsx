// Import necessary libraries and components
import { motion, AnimatePresence } from "motion/react";
import React, { useState, useRef, useEffect } from "react";
import NavComp from "./NavComp";
import CircularMenu from "./CircularMenu";
import Gallery from "./Gallery";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import BookingFrom from "../Overlayers/BookingFrom";
import { FaChevronLeft } from "react-icons/fa";

const Navbar = ({ menu }) => {
  // State variables to manage menu visibility and hover effects
  const [isOpen, setIsOpen] = useState(false); // Tracks if the menu is open
  const [isHover, setIsHover] = useState(false); // Tracks hover state
  const [showMenu, setShowMenu] = useState(false); // Tracks if the circular menu is visible
  const [showGallery, setShowGallery] = useState(false); // Tracks if the gallery is visible
  const [showReserve, setShowReserve] = useState(false); // Tracks if the reservation form is visible
  const navRef = useRef(); // Ref for the navigation container

  // Toggle the main menu open/close state
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Show the appropriate menu based on the selected type
  const showCurrentMenu = (menuType) => {
    switch (menuType) {
      case "cart":
        if (showMenu) {
          setShowMenu(false);
        } else {
          setShowGallery(false);
          setShowReserve(false);
          setShowMenu(true);
        }
        break;
      case "gallery":
        if (showGallery) {
          setShowGallery(false);
        } else {
          setShowMenu(false);
          setShowReserve(false);
          setShowGallery(true);
        }
        break;
      case "reserve":
        if (showReserve) {
          setShowReserve(false);
        } else {
          setShowMenu(false);
          setShowGallery(false);
          setShowReserve(true);
        }
        break;
      default:
        break;
    }
  };

  // Initialize GSAP animations for the navigation menu
  useEffect(() => {
    if (navRef.current) {
      gsap.set(navRef.current.children, { opacity: 0, y: -20 });
    }
  }, []);

  // GSAP animation for showing/hiding the menu
  useGSAP(() => {
    if (!navRef.current) return;
    const targets = navRef.current.children;

    const tl = gsap.timeline({ defaults: { transformOrigin: "center top" } });

    if (!showMenu) {
      // Animation for showing the menu
      tl.clear()
        .set(targets, {
          opacity: 0,
          y: 40,
          scale: 0.95,
          rotateX: -10,
          filter: "blur(10px)",
          perspective: 1000,
          transformStyle: "preserve-3d",
          pointerEvents: "auto",
          display: "block",
        })
        .to(targets, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 0.65,
          stagger: 0.1,
          ease: "back.out(1.4)",
        });
    } else {
      // Animation for hiding the menu
      tl.to(targets, {
        opacity: 0,
        y: -20,
        scale: 0.94,
        rotateX: -8,
        filter: "blur(8px)",
        duration: 0.4,
        stagger: 0.07,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(targets, {
            display: "none",
            pointerEvents: "none",
          });
        },
      });
    }
  }, [showMenu]);

  return (
    <main>
      {/* AnimatePresence for menu transitions */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            layout
            initial={{
              opacity: 0,
              width: "0vw",
              height: "0vh",
            }}
            animate={{
              opacity: 1,
              width: "100vw",
              height: "100vh",
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="overflow-hidden flex flex-col gap-4 top-0 right-0 bg-transparent backdrop-blur-md z-50 absolute"
            style={{ pointerEvents: isOpen ? "auto" : "none" }}
          >
            {/* Navigation container */}
            <div className="flex flex-col h-full justify-center items-center md:justify-center md:items-end mr-0 md:mr-30 pt-4 gap-6">
              <div
                ref={navRef}
                className={`flex flex-col gap-4 ${
                  showMenu || showGallery ? "hidden lg:flex" : ""
                }`}
              >
                {/* Cart menu button */}
                <NavComp
                  img={"/cart.svg"}
                  onClick={() => {
                    showCurrentMenu("cart");
                  }}
                />
                {/* Gallery menu button */}
                <NavComp
                  text={"Gallery"}
                  onClick={() => {
                    showCurrentMenu("gallery");
                  }}
                />
                {/* Reserve menu button */}
                <NavComp
                  text={"Reserve"}
                  onClick={() => {
                    showCurrentMenu("reserve");
                  }}
                />
              </div>
            </div>

            {/* Circular menu */}
            {showMenu && (
              <CircularMenu
                menu={menu}
                onClick={() => {
                  showCurrentMenu("cart");
                }}
              />
            )}

            {/* Gallery view */}
            {showGallery && (
              <>
                <button
                  className="z-100 lg:hidden py-2 px-4 rounded-full bg-[#562E11] border-none flex justify-center items-center cursor-pointer shadow-[0_4px_8px_rgba(0,0,0,0.3)] absolute left-10 top-[3%]"
                  onClick={() => {
                    showCurrentMenu("gallery");
                  }}
                >
                  <span className="text-white text-sm font-bold ">
                    <FaChevronLeft size={25} />
                  </span>
                </button>
                <Gallery />
              </>
            )}

            {/* Reservation form */}
            {showReserve && <BookingFrom />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <nav className="z-50 flex items-center justify-end">
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onClick={toggleMenu}
          className={`bg-white z-50 flex items-center rounded-full gap-4 px-1 py-1 transition-all duration-500 ${
            isOpen ? "w-16 h-16" : "w-auto"
          }`}
          style={{ pointerEvents: "auto" }}
        >
          {/* Hamburger menu icon */}
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

          {/* Menu label and logo */}
          {!isOpen && (
            <div className="flex z-50 items-center justify-between gap-2 transition-all duration-500 ease-in-out">
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden flex items-center ${
                  isHover ? "max-w-[100px]" : "max-w-0"
                }`}
              >
                <h3
                  className={`font-semibold text-base cursor-pointer transition-opacity duration-500 ${
                    isHover ? "opacity-100 delay-200" : "opacity-0"
                  }`}
                >
                  MENU
                </h3>
              </div>

              <div className="bg-white rounded-full z-50 cursor-pointer overflow-hidden">
                <motion.img
                  animate={{ rotate: [0, 0, -40, 0] }}
                  transition={{
                    repeat: Infinity,
                    repeatDelay: 2,
                    duration: 1,
                    ease: "linear",
                  }}
                  style={{ originX: 1 }}
                  src={"/images/Navlogo.png"}
                  alt="cup"
                  className="w-14 mx-auto h-12 translate-y-0 z-50"
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
