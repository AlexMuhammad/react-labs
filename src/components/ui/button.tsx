import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  bgColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  name,
  bgColor = "bg-yellow-500",
  ...props
}) => {
  return (
    <button
      className={` py-1 px-3 rounded-md text-white ${bgColor}`}
      {...props}
    >
      {name}
    </button>
  );
};

export default Button;
