import { Tab } from "@headlessui/react";
import MenuItems from "models/MenuItems";
import { useState } from "react";
import { CreateNewFolder, CreateNewFlash, BrowsePanel } from "../";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const realClassNames = ({ selected }) =>
  classNames(
    "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
    "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
    selected ? "bg-white shadow" : "hover:bg-white/[0.12] hover:text-white"
  );

const buttonStyle =
  "bg-indigo-400 hover:bg-violet-600 focus:outline-4 w-96 h-20 text-white px-8 font-bold tracking-widest text-lg m-8";

const Menus = [
  new MenuItems({
    id: "001",
    displayTexts: "Browse",
  }),
  new MenuItems({
    id: "010",
    displayTexts: "Create New Flashcard",
  }),
  new MenuItems({
    id: "100",
    displayTexts: "Create New Folder",
  }),
];

const TITLE = "Next Gen Flashcard"

export const MainPanel = () => {
  const [show, setShow] = useState(true);
  const [menuSelected, setMenuSelected] = useState("0");
  const goToDataPanel = (clicked) => {
    const clickedOnMenu = clicked && clicked.target.id.length === 3;
    setShow(clickedOnMenu ? false : true);
    setMenuSelected(clickedOnMenu ? clicked.target.id : "0");
  };
  return (
    <div className="w-full lg:w-3/4 px-2 py-8 sm:px-0">
      <div className="w-full text-center text-red-700 font-extrabold text-4xl mb-8">{TITLE}</div>
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-orange-800/40 p-1">
          <Tab className={realClassNames}>Home</Tab>
          <Tab className={realClassNames}>Recent</Tab>
          <Tab className={realClassNames}>Trending</Tab>
        </Tab.List>
        <Tab.Panels className="">
          <Tab.Panel
            className={classNames(
              "rounded-xl bg-white p-3",
              "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
            )}
          >
            {show && (
              <div className="flex justify-center items-center mt-24 flex-col">
                {Menus.map((element) => (
                  <button
                    id={element.id}
                    key={element.id}
                    className={`${buttonStyle} + ${show ? "" : "hidden"}`}
                    onClick={goToDataPanel}
                  >
                    {element.displayTexts}
                  </button>
                ))}
              </div>
            )}
            {menuSelected === "001" && <BrowsePanel onClick={goToDataPanel}/>}
            {menuSelected === "010" && (
              <CreateNewFlash onClick={goToDataPanel} />
            )}
            {menuSelected === "100" && (
              <CreateNewFolder onClick={goToDataPanel} />
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
