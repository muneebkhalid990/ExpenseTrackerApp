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
        className=" w-44 rounded-lg overflow-hidden py-1 bg-emerald-100 text-black p-2 font-bold hover:bg-emerald-300 hover:border-black hover:border-2 text-xl border-2 border-teal-700"
      >
        {buttonTitle}
      </button>
    </div>
  );
};

export default CustomButton;
