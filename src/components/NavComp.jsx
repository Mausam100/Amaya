import React from "react";

const NavComp = ({ text, img }) => {
  return (
    <div className="relative w-full flex justify-center items-center">
      <img
        src="/flower.svg"
        className="object-contain w-30"
      />
      {img ? <img className="absolute w-14" src={img} /> : null}
      {text ? (
        <h1 className="absolute text-[#9B6B41] text-2xl font-normal">{text}</h1>
      ) : null}
    </div>
  );
};

export default NavComp;
