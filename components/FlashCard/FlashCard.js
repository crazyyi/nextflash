import { useEffect, useState } from "react";
import { updateHandler } from "components/Utilities";
import { useDataContext } from "DataProvider";

export const FlashCard = (props) => {
  const { onClick, card } = props;
  const [isFlipped, setIsFlipped] = useState(false);

  const { editCard } = useDataContext();

  let { visited } = { ...card };

  useEffect(() => {
    
    console.log("BeforeUpdate ", typeof visited, visited)
    visited++;
    if (card) {
      editCard({
        uuid: card.uuid,
        visited: visited,
      });

      const formData = new FormData();
      formData.append("visited", visited);
      const fetchData = async () => {
        await updateHandler({ uuid: card.uuid, form: formData });
      }

      fetchData().catch(error => console.log(error))
    }
  }, [card]);

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
          {card && (
            <>
              <div className="absolute w-full h-full bg-orange-300 backface-hidden flex items-center justify-center">
                {card.front}
              </div>
              <div className="absolute w-full h-full bg-amber-200 backface-hidden my-rotate-y-180 flex items-center justify-center">
                {card.back}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
