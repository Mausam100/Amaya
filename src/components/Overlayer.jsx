import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";

const Overlayer = ({ setOverlayerVisible, menuItem }) => {
  const tl = gsap.timeline({
  });
  useGSAP(()=>{
    tl.from(".menuImage",{
      scale: 0,
      duration: 0.8,
      stagger:0.2,
    })
    tl.from(".menuline",{
      scale: 0,
      duration: 0.8,
      stagger:0.2,
    })
    tl.from(".price",{
      scale: 0,
      duration: 0.8,
      stagger:0.2,
    })
    tl.from(".menuname",{
      scale: 0,
      duration: 0.8,
      stagger:0.2,
    })
    tl.from(".description",{
      scale: 0,
      duration: 0.8,
      stagger:0.2,
    })
    tl.from(".addcart",{
      scale: 0,
      duration: 0.8,
      stagger:0.2,
    })
  },[])

  return (
    <div className="fixed top-0 left-0 w-full h-screen p-30 bg-b backdrop-blur-sm z-50 flex items-center justify-center">
      <button
        onClick={() => setOverlayerVisible(false)}
        className="absolute top-4 right-4 text-white hover:text-gray-300"
      >
        ✕
      </button>
      <div className="p-8 w-full h-full flex items-center justify-center rounded-lg backdrop-blur-sm relative">
        {menuItem && (
          <>
            <h2 className="text-white absolute w-1/3 top-32 right-0 menuname">
              {menuItem.name}
            </h2>
            <p className="text-white absolute left-62 top-61 price">
              {menuItem.price}
            </p>
            <p className="text-white absolute w-1/3 top-60 right-0 description">
              {menuItem.description}
            </p>
            <img
              src={menuItem.img}
              alt={menuItem.name}
              className="w-44 object-cover h-auto menuImage"
            />
            <img
              src={"/public/images/Group21.svg"}
              alt={menuItem.name}
              className=" absolute object-cover h-auto menuline"
            />
            <button className="mt-4 bg-[#F5D18C] addcart text-black font-bold py-2 px-4 rounded absolute top-80">
              Add to Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Overlayer;
