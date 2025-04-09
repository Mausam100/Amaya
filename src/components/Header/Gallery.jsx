import React from "react";

const Gallery = () => {
  return (
    <div className="z-90 max-lg:w-[100%] max-w-7xl mx-auto p-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-4 h-[600px]">
        {/* Large image for modern ambiance */}
        <div className="col-span-2 row-span-2 relative group overflow-hidden rounded-xl">
          <img
            src="/images/gallery-4.png"
            alt="Café interior"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-2xl font-bold">Modern Ambiance</h3>
            <p className="text-sm opacity-90">Our welcoming space</p>
          </div>
        </div>

        {/* Smaller image for coffee preparation */}
        <div className="relative group overflow-hidden rounded-xl">
          <img
            src="/images/gallery-3.png"
            alt="Coffee preparation"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-lg font-bold text-center">
              Crafted Brews <br /> & Cozy Vibes
            </h3>
          </div>
        </div>

        {/* Smaller image for coffee and pastries */}
        <div className="relative group overflow-hidden rounded-xl">
          <img
            src="/images/gallery-2.png"
            alt="Coffee and pastries"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-lg font-bold">Fresh Pastries</h3>
          </div>
        </div>

        {/* Smaller image for indoor seating */}
        <div className="relative group overflow-hidden rounded-xl">
          <img
            src="/images/gallery-1.png"
            alt="Outdoor seating"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-lg font-bold">Indoor Seating</h3>
          </div>
        </div>

        {/* Smaller image for barista art */}
        <div className="relative group overflow-hidden rounded-xl">
          <img
            src="/images/gallery-5.png"
            alt="Barista art"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-lg font-bold">Barista Art</h3>
          </div>
        </div>
      </div>

      {/* Mobile Grid */}
      <div className="grid md:hidden grid-cols-1 gap-4">
        {/* Large image for modern ambiance */}
        <div className="relative group overflow-hidden rounded-xl h-[300px]">
          <img
            src="/images/gallery-4.png"
            alt="Café interior"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-2xl font-bold">Modern Ambiance</h3>
            <p className="text-sm opacity-90">Our welcoming space</p>
          </div>
        </div>

        {/* Two smaller images for coffee preparation and pastries */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative group overflow-hidden rounded-xl h-[200px]">
            <img
              src="/images/gallery-3.png"
              alt="Coffee preparation"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-sm font-bold">Crafted Brews</h3>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-xl h-[200px]">
            <img
              src="/images/gallery-2.png"
              alt="Coffee and pastries"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-sm font-bold">Fresh Pastries</h3>
            </div>
          </div>
        </div>

        {/* Two smaller images for indoor seating and barista art */}
        <div className="grid grid-cols-2 gap-4">
          <div className="relative group overflow-hidden rounded-xl h-[200px]">
            <img
              src="/images/gallery-1.png"
              alt="Indoor seating"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-sm font-bold">Indoor Seating</h3>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-xl h-[200px]">
            <img
              src="/images/gallery-5.png"
              alt="Barista art"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-sm font-bold">Barista Art</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
