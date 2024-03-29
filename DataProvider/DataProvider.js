import { createContext, useContext, useState, useEffect } from "react";

const Context = createContext(null);

export const useDataContext = () => {
  const contextState = useContext(Context);
  if (contextState === null) {
    throw new Error("useItemData must be used within a ");
  }
  return contextState;
};

export const DataProvider = (props) => {
  const [globalData, setGlobalData] = useState({
    status: "LOADING",
    cards: [],
  });

  const getCards = async (defaultConditions, callback) => {
    let queryString = ""
    if (defaultConditions) {
      const { maxVisited } = defaultConditions
      queryString += `/?maxVisited=${maxVisited}`
    }
    const URI = process.env.NEXT_PUBLIC_HOST_URL + "/api/getCards" + queryString
    const res = await fetch(URI, {
      headers: {
        Accept: "application/json, text/plain, */*",
        "User-Agent": "*",
      },
    });
    const json = await res.json();
    console.log(json)
    if (callback) {
      callback(json)
    } else {
      if (json) {
        setGlobalData({
          status: "LOADED",
          cards: json,
        });
      } else {
        setGlobalData({ status: "ERROR" });
      }
    }
  }

  const addNewCard = (newCard) => {
    setGlobalData((prevState) => {
      return {
        status: "LOADING",
        cards: [...prevState.cards, newCard],
      };
    });
  };

  const deleteCard = (uuid) => {
    setGlobalData((prevState) => {
      return {
        status: "LOADING",
        cards: prevState.cards.filter(card => card.uuid !== uuid),
      }
    });
  };

  const editCard = (obj) => {
    setGlobalData((prevState) => {
      for (let i = 0; i < prevState.cards.length; i++) {
        if (obj && obj.uuid === prevState.cards[i].uuid) {
          Object.assign(prevState.cards[i], obj);
        }
      }
      return {
        status: "LOADING",
        cards: prevState.cards,
      };
    });
  };

  useEffect(() => {
    setGlobalData({ status: "LOADING", cards: [] });

    getCards();
  }, [props.cards]);

  return (
    <Context.Provider value={{ globalData, getCards, addNewCard, deleteCard, editCard }}>
      {props.children}
    </Context.Provider>
  );
};
