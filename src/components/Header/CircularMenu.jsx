import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useState, useRef } from "react";

const CircularMenu = ({ menu, onClick }) => {
  // State to track quantities of menu items
  const [quantities, setQuantities] = useState({});
  // State to control the visibility of the order summary popup
  const [showPopup, setShowPopup] = useState(false);
  // Ref for the circular menu container
  const containerRef = useRef(null);
  // Ref for individual menu items
  const menuItemsRef = useRef([]);

  // Animation for showing the circular menu
  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });
    // Animate the container
    tl.from(containerRef.current, {
      scale: 0.5,
      opacity: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.7)",
    });
    // Animate the center controls
    tl.from(
      ".center-controls > *",
      {
        scale: 0,
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
      },
      "-=0.4"
    );
    // Animate the menu items
    tl.from(menuItemsRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      transformOrigin: "center center",
    });
  }, []);

  // Animation for closing the circular menu
  const handleClose = () => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => onClick(),
    });

    // Animate menu items in reverse order
    tl.to([...menuItemsRef.current].reverse(), {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      transformOrigin: "center center",
    })
      // Animate the center controls
      .to(
        ".center-controls > *",
        {
          scale: 0,
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.1,
        },
        "-=0.3"
      )
      // Animate the container
      .to(
        containerRef.current,
        {
          scale: 0.5,
          opacity: 0,
          duration: 0.8,
          ease: "elastic.in(1, 0.7)",
        },
        "-=0.4"
      );
  };

  // Handle quantity changes for menu items
  const handleQuantityChange = (itemId, change) => {
    setQuantities((prev) => {
      const newQuantity = (prev[itemId] || 0) + change;
      return newQuantity >= 0 ? { ...prev, [itemId]: newQuantity } : prev;
    });
  };

  // Calculate the total price of the order
  const calculateTotal = () => {
    return menu.reduce((total, item, index) => {
      const quantity = quantities[index] || 0;
      const price = parseFloat(item.price.replace("$", ""));
      return total + price * quantity;
    }, 0);
  };

  return (
    <>
      {/* Circular menu container */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000]">
        <div
          ref={containerRef}
          className="relative w-[500px] h-[750px] md:w-[800px] md:h-[800px] rounded-full bg-black/30 bg-[url('/images/food-pattern-bg.png')] bg-cover scale-[0.8]"
        >
          {/* Center controls */}
          <div className="center-controls absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center">
            {/* Place Order button */}
            <button
              className="absolute -top-[50px] left-1/2 -translate-x-1/2 text-white text-base font-bold w-[120px] p-[5px] bg-amber-700 rounded-lg hover:bg-amber-600 transition-colors"
              onClick={() =>
                quantities &&
                Object.values(quantities).some((quantity) => quantity > 0) &&
                setShowPopup(true)
              }
            >
              Place Order
            </button>
            {/* Close button */}
            <button
              className="clos-bn w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded-full bg-[#ff4444] border-none flex justify-center items-center cursor-pointer shadow-[0_4px_8px_rgba(0,0,0,0.3)]"
              onClick={() => {
                handleClose();
              }}
            >
              <span className="text-white text-2xl font-bold">✕</span>
            </button>
            {/* Empty Cart button */}
            <button
              className="absolute -bottom-[50px] left-1/2 -translate-x-1/2 text-white text-base font-bold w-[120px] p-[5px] bg-red-400 rounded-lg hover:bg-red-500 transition-colors"
              onClick={() => setQuantities({})}
            >
              Empty Cart
            </button>
          </div>

          {/* Menu items */}
          <div className="absolute w-full h-full">
            {menu.map((item, index) => (
              <div
                key={index}
                ref={(el) => (menuItemsRef.current[index] = el)}
                className={`absolute flex flex-col items-center justify-center w-[150px] md:w-[250px] p-1 md:p-3 rounded-[10px] text-white text-center 
                  ${index === 0 && "top-[5%] left-1/2 -translate-x-1/2"}
                  ${index === 1 && "top-1/2 right-[5%] -translate-y-1/2"}
                  ${index === 2 && "bottom-[5%] left-1/2 -translate-x-1/2"}
                  ${index === 3 && "top-1/2 left-[5%] -translate-y-1/2"}`}
              >
                {/* Menu item image */}
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-[100px] h-auto mb-2"
                />
                {/* Menu item name and price */}
                <h3 className="my-[5px] text-lg">
                  {item.name} {item.price}
                </h3>
                {/* Quantity controls */}
                <div className="flex justify-center items-center gap-2 my-2 bg-white/10 rounded-[15px] p-[3px]">
                  <button
                    className="w-6 h-6 border-none rounded-full bg-white text-[#333] cursor-pointer font-bold"
                    onClick={() => handleQuantityChange(index, -1)}
                  >
                    -
                  </button>
                  <span>{quantities[index] || 0}</span>
                  <button
                    className="w-6 h-6 border-none rounded-full bg-white text-[#333] cursor-pointer font-bold"
                    onClick={() => handleQuantityChange(index, 1)}
                  >
                    +
                  </button>
                </div>
                {/* Remove item button */}
                <button
                  className="bg-[#ff4444] text-white border-none px-3 py-1 rounded-[5px] cursor-pointer text-[0.8em] mt-[5px]"
                  onClick={() =>
                    handleQuantityChange(index, -(quantities[index] || 0))
                  }
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order summary popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1001]">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Order Summary
            </h2>
            <div className="space-y-2 mb-4">
              {/* List of ordered items */}
              {menu.map((item, index) => {
                const quantity = quantities[index] || 0;
                if (quantity > 0) {
                  return (
                    <div
                      key={index}
                      className="flex justify-between text-gray-700"
                    >
                      <span>
                        {item.name} x{quantity}
                      </span>
                      <span>
                        $
                        {(
                          parseFloat(item.price.replace("$", "")) * quantity
                        ).toFixed(2)}
                      </span>
                    </div>
                  );
                }
                return null;
              })}
              {/* Total price */}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold text-lg text-gray-800">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
            {/* Confirm and Cancel buttons */}
            <div className="flex gap-3">
              <button
                className="w-full py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                onClick={() => {
                  setShowPopup(false);
                  setQuantities({});
                  onClick();
                }}
              >
                Confirm Order
              </button>
              <button
                className="w-full py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CircularMenu;
