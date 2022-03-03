import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: string;
}

const Button = ({onClick, children}: ButtonProps) => {
  return <button onClick={onClick} className={"bg-blue-200 p-1 rounded-sm"}>
    {children}
  </button>
}

export default Button
