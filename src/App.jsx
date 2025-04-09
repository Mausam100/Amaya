import { Canvas } from "@react-three/fiber";
import { OrbitControls, ScrollControls } from "@react-three/drei";
import { Suspense, useState } from "react";
import Scene from "./components/Model/Scene";
import Navbar from "./components/navbar/Navbar";
import Overlayer from "./components/Home/Overlayer";
import ExploreOverlay from "./components/Home/ExploreOverlay";
import Menu from "./components/Home/Menu";
import { useEffect } from "react";
import BookingFrom from "./components/Home/BookingFrom";
import Loader from "./components/Home/Loader";

function App() {
  const [isOverlayerVisible, setOverlayerVisible] = useState(false);
  const [bookingform, setbookingform] = useState(false)
  const [isExploreOverlayVisible, setExploreOverlayVisible] = useState(false); // State for ExploreOverlay
  const [selectedMenuItem, setSelectedMenuItem] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const handleEnterWithMusic = () => {
    const audio = new Audio('/music/lo-fi-in-coffeshop-SBA-346459437-preview.mp3');
    audio.volume = 0.5;
    audio.play();
    console.log("Entering with music...");
    setIsLoaded(true);
    // Add logic to play music here
  };

  const handleEnterWithoutMusic = () => {
 
    console.log("Entering without music...");
    setIsLoaded(true);
    // Add logic to disable music here
  };

  const menu = [
    {
      name: "Espreeso macchiato",
      price: "$12",
      description: "A rich and bold coffee brewed from high-quality beans.",
      img: "/images/Machiaato.png",
    },
    {
      name: "Americano",
      price: "$15",
      description: "A rich and bold coffee brewed from high-quality beans.",
      img: "/images/AmericanoCoffee.png",
    },
    {
      name: "Espresso con Panna",
      price: "$24",
      description: "A rich and bold coffee brewed from high-quality beans.",
      img: "/images/Expresso.png",
    },
    {
      name: "Cappuccino",
      price: "$32",
      description: "A rich and bold coffee brewed from high-quality beans.",
      img: "/images/CappuchinoCoffee.png",
    },
  ];
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
  const handleScrollOffset = (offset) => {
    // Show ExploreOverlay when offset is between 0.7214516784195425 and 0.8
    if(isMobile){
      if (offset >= 0.7514516784195425 && offset <= 0.8) {
        setExploreOverlayVisible(true);
      } else {
        setExploreOverlayVisible(false);
      }
      if (offset >= 0.99 && offset <= 1) {
        setbookingform(true);
      } else {
        setbookingform(false);
      }
    }else{
      if (offset >= 0.7214516784195425 && offset <= 0.8) {
        setExploreOverlayVisible(true);
      } else {
        setExploreOverlayVisible(false);
      }
      if (offset >= 0.99 && offset <= 1) {
        setbookingform(true);
      } else {
        setbookingform(false);
      }
    }
  };

  return (
    <>
      {!isLoaded && (
        <Loader
          onEnterWithMusic={handleEnterWithMusic}
          onEnterWithoutMusic={handleEnterWithoutMusic}
        />
      )}
      {isLoaded && (
        <div className="w-full h-screen bg-black select-none">
          <Canvas>
            <Suspense fallback={null}>
              <ScrollControls enabled={true} pages={10}>
                <Scene
                  setOverlayerVisible={setOverlayerVisible}
                  onScrollOffsetChange={handleScrollOffset} // Pass the handler to Scene
                />
                <Menu
                  setOverlayerVisible={setOverlayerVisible}
                  setSelectedMenuItem={setSelectedMenuItem}
                  menu={menu}
                />
              </ScrollControls>
            </Suspense>
          </Canvas>

          {/* Navbar Overlay */}
          <div className="flex flex-col w-full h-full p-8 absolute top-0 right-0 pointer-events-none">
            <div className="pointer-events-auto">
              <Navbar menu={menu} />
            </div>
          </div>

          {/* Description Overlay */}
          {isOverlayerVisible && (
            <Overlayer
              setOverlayerVisible={setOverlayerVisible}
              setSelectedMenuItem={setSelectedMenuItem}
              menuItem={selectedMenuItem}
              menu={menu}
            />
          )}

          {/* Booking Form */}
          {bookingform && <BookingFrom />}

          {/* Explore Overlay */}
          {isExploreOverlayVisible && (
            <ExploreOverlay setExploreOverlayVisible={setExploreOverlayVisible} />
          )}
        </div>
      )}
    </>
  );
}

export default App;
