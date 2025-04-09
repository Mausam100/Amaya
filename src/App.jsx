import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import Scene from "./components/Model/Scene";
import Navbar from "./components/navbar/Navbar";
import Overlayer from "./components/Home/Overlayer";
import ExploreOverlay from "./components/Home/ExploreOverlay";
import Menu from "./components/Home/Menu";
import BookingFrom from "./components/Home/BookingFrom";
import Loader from "./components/Home/Loader";
import MusicButton from "./components/Home/MusicButton";

function App() {
  const [isOverlayerVisible, setOverlayerVisible] = useState(false);
  const [bookingform, setbookingform] = useState(false);
  const [isExploreOverlayVisible, setExploreOverlayVisible] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(new Audio("/music/chill-vibes-322180.mp3"));

  const handleEnterWithMusic = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.volume = 0.4;
      audio.play();
      setIsPlaying(true);
    }
    setIsLoaded(true);
  };

  const handleEnterWithoutMusic = () => {
    const audio = audioRef.current;
    if (!audio.paused) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    }
    setIsLoaded(true);
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
    if (isMobile) {
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
    } else {
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
        <div className="w-full h-screen bg-black select-none creamy">
          <Canvas>
            <Suspense fallback={null}>
              <ScrollControls enabled={true} pages={10}>
                <Scene
                  setOverlayerVisible={setOverlayerVisible}
                  onScrollOffsetChange={handleScrollOffset}
                />
                <Menu
                  setOverlayerVisible={setOverlayerVisible}
                  setSelectedMenuItem={setSelectedMenuItem}
                  menu={menu}
                />
              </ScrollControls>
            </Suspense>
          </Canvas>

          <div className="flex flex-col w-full h-full p-8 absolute top-0 right-0 pointer-events-none">
            <div className="pointer-events-auto flex items-center justify-end gap-10">
              <MusicButton
                audio={audioRef.current}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
              />
              <Navbar menu={menu} />
            </div>
          </div>

          {isOverlayerVisible && (
            <Overlayer
              setOverlayerVisible={setOverlayerVisible}
              setSelectedMenuItem={setSelectedMenuItem}
              menuItem={selectedMenuItem}
              menu={menu}
            />
          )}

          {bookingform && <BookingFrom />}

          {isExploreOverlayVisible && (
            <ExploreOverlay setExploreOverlayVisible={setExploreOverlayVisible} />
          )}
        </div>
      )}
    </>
  );
}

export default App;
