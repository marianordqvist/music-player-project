"use client";
import { DefaulButtonInterface } from "../types/DefaultButtonTypes";

const DefaultButton: React.FC<DefaulButtonInterface> = ({
  icon,
  clickFunction,
  bgColor,
  description,
}) => {
  return (
    <button
      onClick={clickFunction}
      className={`${description} ${bgColor} p-2 rounded-lg`}
    >
      {icon}
    </button>
  );
};

export default DefaultButton;
