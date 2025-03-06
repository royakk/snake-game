import React from "react";

interface StartProps {
  onClick: (toggle: (prev: boolean) => boolean) => void;
  buttonName: string;
}

export const Start: React.FC<StartProps> = ({ onClick, buttonName }) => {
  return (
    <div className="text-center">
      <button
        onClick={() => onClick((prev) => !prev)}
        className="bg-green-500 p-3 text-white px-4 rounded"
      >
        {buttonName}
      </button>
    </div>
  );
};
