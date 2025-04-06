import React from "react";

const Gallery = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[600px]">
        <div className="col-span-2 row-span-2 relative group overflow-hidden rounded-xl">
          <img
            src="/images/cafe-1.jpg"
            alt="Café interior"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-2xl font-bold">Modern Ambiance</h3>
            <p className="text-sm opacity-90">Our welcoming space</p>
          </div>
        </div>
        <div className="relative group overflow-hidden rounded-xl">
          <img
            src="/images/cafe-2.jpg"
            alt="Coffee preparation"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-lg font-bold">Artisan Coffee</h3>
          </div>
        </div>

        <div className="relative group overflow-hidden rounded-xl">
          <img
            src="/images/cafe-3.jpg"
            alt="Coffee and pastries"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-lg font-bold">Fresh Pastries</h3>
          </div>
        </div>

        <div className="relative group overflow-hidden rounded-xl">
          <img
            src="/images/cafe-4.jpg"
            alt="Outdoor seating"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-lg font-bold">Outdoor Seating</h3>
          </div>
        </div>

        <div className="relative group overflow-hidden rounded-xl">
          <img
            src="/images/cafe-5.jpg"
            alt="Barista art"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="text-lg font-bold">Barista Art</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
