import React from "react";

const CustomButton: React.FC<ButtonProps> = ({
  type,
  buttonTitle,
  onClick,
}) => {
  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        className="inline-block px-6 py-3 text-lg font-semibold leading-none text-white bg-teal-500 rounded-lg shadow-md hover:bg-teal-600 focus:outline-none focus:bg-teal-600 transform transition-transform duration-200 ease-in-out hover:scale-105"
      >
        {buttonTitle}
      </button>
    </div>
  );
};

export default CustomButton;
