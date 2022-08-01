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

  const getCards = async () => {
    const res = await fetch("http://localhost:3000/api/getCards", {
      headers: {
        Accept: "application/json, text/plain, */*",
        "User-Agent": "*",
      },
    });
    const json = await res.json();
    console.log(json);
    if (json) {
      setGlobalData({
        status: "LOADED",
        cards: json,
      });
    } else {
      setGlobalData({ status: "ERROR" });
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
      for (let i = 0; i < prevState.cards.length; i++) {
        if (uuid === prevState.cards[i].uuid) {
          prevState.cards.splice(i, 1);
        }
      }
      return {
        status: "LOADING",
        cards: prevState.cards,
      };
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
    <Context.Provider value={{ globalData, addNewCard, deleteCard, editCard }}>
      {props.children}
    </Context.Provider>
  );
};
