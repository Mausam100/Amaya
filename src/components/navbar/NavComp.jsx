import React from "react";

const NavComp = ({ text, img, onClick }) => {
  return (
    <div
      className="flex justify-center items-center relative"
      onClick={onClick}
    >
      <img src="/flower.svg" className="object-contain w-20 md:w-30" />
      {img ? (
        <img
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  w-14"
          src={img}
        />
      ) : null}
      {text ? (
        <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#9B6B41] text-md md:text-2xl font-normal text-center">
          {text}
        </h1>
      ) : null}
    </div>
  );
};

export default NavComp;
