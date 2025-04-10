// Main application component
import { Canvas } from "@react-three/fiber"; // For rendering 3D scenes
import { ScrollControls } from "@react-three/drei"; // For scroll-based controls
import { Suspense, useEffect, useRef, useState } from "react";
import Scene from "./components/3D/Scene"; // 3D scene component
import Navbar from "./components/Header/Navbar"; // Navigation bar
import Overlayer from "./components/Overlayers/Overlayer"; // Overlayer for menu details
import ExploreOverlay from "./components/Overlayers/ExploreOverlay"; // Explore overlay
import Menu from "./components/3D/Menu"; // 3D menu
import BookingFrom from "./components/Overlayers/BookingFrom"; // Booking form
import Loader from "./components/Overlayers/Loader"; // Loader component
import MusicButton from "./components/Header/MusicButton"; // Music toggle button

// Import utility functions
import {
  handleEnterWithMusic,
  handleEnterWithoutMusic,
  handleScrollOffset,
  handleResize,
} from "./utils/utils";

function App() {
  // State variables
  const [isOverlayerVisible, setOverlayerVisible] = useState(false); // Overlayer visibility
  const [bookingform, setbookingform] = useState(false); // Booking form visibility
  const [isExploreOverlayVisible, setExploreOverlayVisible] = useState(false); // Explore overlay visibility
  const [selectedMenuItem, setSelectedMenuItem] = useState({}); // Selected menu item
  const [isLoaded, setIsLoaded] = useState(false); // Loader state
  const [isPlaying, setIsPlaying] = useState(false); // Music playing state
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Mobile view state

  // Reference to audio element
  const audioRef = useRef(new Audio("/music/chill-vibes-322180.mp3"));

  // Handle window resize
  useEffect(() => {
    const resizeHandler = () => handleResize(setIsMobile);
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  // Menu items
  const menu = [
    {
      name: "Espresso Macchiato",
      price: "$12",
      description:
        "A classic espresso topped with a small amount of steamed milk, offering a perfect balance of rich coffee flavor and creamy texture.",
      img: "/images/Machiaato.png",
    },
    {
      name: "Americano",
      price: "$15",
      description:
        "A smooth and robust coffee made by diluting a shot of espresso with hot water, providing a rich and full-bodied taste.",
      img: "/images/AmericanoCoffee.png",
    },
    {
      name: "Espresso con Panna",
      price: "$24",
      description:
        "A luxurious espresso topped with a dollop of whipped cream, creating a delightful contrast of strong coffee and creamy sweetness.",
      img: "/images/Expresso.png",
    },
    {
      name: "Cappuccino",
      price: "$32",
      description:
        "A popular coffee drink featuring equal parts of espresso, steamed milk, and milk foam, delivering a harmonious blend of flavors and textures.",
      img: "/images/CappuchinoCoffee.png",
    },
  ];

  return (
    <>
      {/* Show loader until app is loaded */}
      {!isLoaded && (
        <Loader
          onEnterWithMusic={() =>
            handleEnterWithMusic(audioRef, setIsPlaying, setIsLoaded)
          }
          onEnterWithoutMusic={() =>
            handleEnterWithoutMusic(audioRef, setIsPlaying, setIsLoaded)
          }
        />
      )}
      {/* Main app content */}
      {isLoaded && (
        <div className="w-full h-screen bg-black select-none creamy">
          {/* 3D Canvas */}
          <Canvas>
            <Suspense fallback={null}>
              <ScrollControls enabled={true} pages={10}>
                <Scene
                  setOverlayerVisible={setOverlayerVisible}
                  onScrollOffsetChange={(offset) =>
                    handleScrollOffset(
                      offset,
                      isMobile,
                      setExploreOverlayVisible,
                      setbookingform
                    )
                  }
                  setSelectedMenuItem={setSelectedMenuItem}
                  menu={menu}
                />
                <Menu
                  setOverlayerVisible={setOverlayerVisible}
                  setSelectedMenuItem={setSelectedMenuItem}
                  menu={menu}
                />
              </ScrollControls>
            </Suspense>
          </Canvas>

          {/* Navbar and Music Button */}
          <img
            src="/images/logo.svg"
            alt="logo"
            className="w-16 md:w-20 fixed top-8 left-5 z-50"
          />
          <div className="flex flex-col w-full h-full p-8 absolute top-0 right-0 pointer-events-none">
            <div className="pointer-events-auto flex items-center justify-end gap-2">
              <MusicButton
                audio={audioRef.current}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
              />
              <Navbar menu={menu} />
            </div>
          </div>

          {/* Overlayer for menu details */}
          {isOverlayerVisible && (
            <Overlayer
              setOverlayerVisible={setOverlayerVisible}
              setSelectedMenuItem={setSelectedMenuItem}
              menuItem={selectedMenuItem}
              menu={menu}
            />
          )}

          {/* Booking form */}
          {bookingform && <BookingFrom />}

          {/* Explore overlay */}
          {isExploreOverlayVisible && (
            <ExploreOverlay
              setExploreOverlayVisible={setExploreOverlayVisible}
            />
          )}
        </div>
      )}
    </>
  );
}

export default App;
