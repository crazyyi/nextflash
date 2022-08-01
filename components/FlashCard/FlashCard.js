import { useState } from "react";

export const FlashCard = (props) => {
  const { onClick, card } = props;
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <>
      <div
        className="w-[420px] h-[300px] text-bold text-2xl cursor-pointer perspective"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className={`shadow-lg preserve-3d relative w-full h-full duration-1000 ${
            isFlipped ? "my-rotate-y-180" : ""
          }`}
        >
          <div className="absolute w-full h-full bg-orange-300 backface-hidden flex items-center justify-center">
            {card.front}
          </div>
          <div className="absolute w-full h-full bg-amber-200 backface-hidden my-rotate-y-180 flex items-center justify-center">
            {card.back}
          </div>
        </div>
      </div>
    </>
  );
};
