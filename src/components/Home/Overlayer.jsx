import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useState } from "react";

const Overlayer = ({ setOverlayerVisible, menuItem, menu, setSelectedMenuItem }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNext = () => {
    const currentIndex = menu.findIndex((item) => item.name === menuItem.name);
    const nextIndex = (currentIndex + 1) % menu.length;
    setSelectedMenuItem(menu[nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = menu.findIndex((item) => item.name === menuItem.name);
    const prevIndex = (currentIndex - 1 + menu.length) % menu.length;
    setSelectedMenuItem(menu[prevIndex]);
  };

  const tl = gsap.timeline({});
  useGSAP(() => {
    tl.from(".menuImage", {
      scale: 0,
      duration: 0.5,
      stagger: 0.2,
    });
    tl.from(".menuline", {
      scale: 0,
      duration: 0.5,
      stagger: 0.2,
    });
    tl.from(".price", {
      scale: 0,
      duration: 0.5,
      stagger: 0.2,
    });
    tl.from(".menuname", {
      scale: 0,
      duration: 0.5,
      stagger: 0.2,
    });
    tl.from(".description", {
      scale: 0,
      duration: 0.5,
      stagger: 0.2,
    });
    tl.from(".addcart", {
      scale: 0,
      duration: 0.5,
      stagger: 0.2,
    }, "+0.5");
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-screen p-30 backdrop-blur-sm z-50 flex items-center justify-center">
      <button
        onClick={() => setOverlayerVisible(false)}
        className="absolute top-4 right-4 text-white hover:text-gray-300"
      >
        ✕
      </button>
      {isMobile === false ? (
        <div className="p-8 w-full h-full flex items-center justify-center rounded-lg backdrop-blur-sm relative">
          {menuItem && (
            <>
              <h2 className="text-white absolute w-1/3 ml-110 md:ml-130 md:2xl menuname xl:ml-159 -mt-32">
                {menuItem.name}
              </h2>
              <p className="text-white absolute -ml-79 mt-28 price">
                {menuItem.price}
              </p>
              <p className="text-white absolute max-sm:w-[70%] max-sm:text-sm sm:w-[45%] md:w-1/4 max-sm:ml-74 :ml-110 sm:ml-120 md:ml-120 lg:ml-130 xl:ml-142 mt-32 description">
                {menuItem.description}
              </p>
              <img
                src={menuItem.img}
                alt={menuItem.name}
                className="w-44 object-cover h-auto menuImage"
              />
              <img
                src={"/images/Group21.svg"}
                alt={menuItem.name}
                className="absolute object-cover h-auto menuline"
              />
              <button className="mt-4 bg-[#F5D18C] addcart text-black font-bold py-2 px-4 rounded absolute top-80">
                Add to Cart
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-black font-bold py-2 px-4 rounded hover:bg-gray-300"
              >
                ◀ Prev
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-black font-bold py-2 px-4 rounded hover:bg-gray-300"
              >
                Next ▶
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="p-4 w-full h-full flex flex-col items-center justify-center rounded-lg backdrop-blur-sm relative">
          {menuItem && (
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-white text-lg text-nowrap menuname">
                Name: {menuItem.name}
              </h2>
              <img
                src={menuItem.img}
                alt={menuItem.name}
                className="object-cover menuImage"
              />
              <p className="text-white text-xl price">Price: {menuItem.price}</p>
              <button className="mt-4 bg-[#F5D18C] addcart text-black font-bold py-2 px-4 rounded">
                Add to Cart
              </button>

              {/* Navigation Buttons */}
              <div className="flex justify-between w-full mt-4">
                <button
                  onClick={handlePrev}
                  className="bg-white text-black font-bold py-2 px-4 rounded hover:bg-gray-300"
                >
                  ◀ Prev
                </button>
                <button
                  onClick={handleNext}
                  className="bg-white text-black font-bold py-2 px-4 rounded hover:bg-gray-300"
                >
                  Next ▶
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Overlayer;
