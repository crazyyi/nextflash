import { FlashCard, Button } from "components";
import { useEffect, useRef, useState } from "react";

export const StudyBoard = (props) => {
  const { onClick, collection } = props;

  const [card, setCard] = useState();

  const cardIndex = useRef(0);

  console.log("collection = ", collection);

  /**
   * Update card display when collection is available
   */
  useEffect(() => {
    if (collection && collection.cards.length > 0) {
      console.log(collection.cards[0]);
      setCard(collection.cards[0]);
    }
  }, [collection]);

  const onNextCard = () => {
    cardIndex.current++;
    if (cardIndex.current >= collection.cards.length) {
      cardIndex.current = 0;
    }
    setCard(collection.cards[cardIndex.current]);
  };

  return (
    <>
      <div className="flex justify-evenly">
        <Button text="Back" onClick={onClick} />
      </div>
      <div className="flex items-center justify-center m-4">
        {collection && collection.cards.length > 0 ? (
          <FlashCard card={card} />
        ) : (
          <></>
        )}
      </div>
      <div className="flex justify-evenly">
        <Button text="Next" onClick={onNextCard} />
      </div>
    </>
  );
};
