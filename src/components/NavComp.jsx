import React from "react";

const NavComp = ({ text, img }) => {
  return (
    <div className="relative w-full flex justify-center items-center">
      <img
        src="/flower.svg"
        width={"90%"}
        height={"20%"}
        className="object-contain"
      />
      {img ? <img className="absolute" src={img} /> : null}
      {text ? (
        <h1 className="absolute text-[#9B6B41] text-3xl font-normal">{text}</h1>
      ) : null}
    </div>
  );
};

export default NavComp;
