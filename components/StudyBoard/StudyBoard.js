import { FlashCard } from "components/FlashCard";
import { useDataContext } from "DataProvider";
import { useRef, useState } from "react";

const buttonStyle =
  "bg-indigo-400 hover:bg-violet-600 focus:outline-4 w-36 h-12 text-white px-8 font-bold tracking-widest text-lg m-8";

const backButtonStyle =
  "bg-indigo-400 hover:bg-violet-600 focus:outline-4 w-36 h-12 text-white px-8 font-bold tracking-widest text-lg m-8";

export const StudyBoard = (props) => {
  const { onClick } = props;

  const { globalData } = useDataContext();
  const [card, setCard] = useState(globalData.cards[0]);

  const cardIndex = useRef(0);

  const onNextCard = () => {
    cardIndex.current++;
    if (cardIndex.current >= globalData.cards.length) {
      cardIndex.current = 0
    }
    setCard(globalData.cards[cardIndex.current]);
  };

  return (
    <>
      <div className="flex justify-evenly">
        <button className={buttonStyle} onClick={onClick}>
          Back
        </button>
      </div>
      <div className="flex items-center justify-center m-4">
        <FlashCard card={card} />
      </div>
      <div className="flex justify-evenly">
        <button className={buttonStyle} onClick={onNextCard}>
          Next
        </button>
      </div>
    </>
  );
};
