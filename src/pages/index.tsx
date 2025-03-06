import { useState } from "react";
import { Start } from "../components/controls";
import { Picture } from "../components/picture";
import { GameBoard } from "../components/gameBoard";

export const Page = () => {
  const [start, setStart] = useState(false);

  return (
    <div className="flex justify-center items-center flex-col gap-1">
      <div className="w-full h-full text-center justify-center items-center flex bg-amber-500 p-5">
        <h1>Snake</h1>
      </div>
      {!start && (
        <>
          <Picture />
        </>
      )}

      {start && <GameBoard />}
      <Start buttonName="Reset Game" onClick={setStart} />
    </div>
  );
};
