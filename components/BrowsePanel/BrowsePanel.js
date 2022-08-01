import { useEffect, useState, useCallback, memo } from "react";
import { RiEditLine } from "react-icons/ri";
import { MdRemoveCircle } from "react-icons/md";
import { MessageDialog } from "components/Utilities";
import { EditCardPanel } from "components";
import { useDataContext } from "DataProvider";
import fetch from "isomorphic-unfetch";

const buttonStyle =
  "bg-indigo-400 hover:bg-violet-600 focus:outline-4 w-36 h-12 text-white px-8 font-bold tracking-widest text-lg m-8";

function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

export const BrowsePanel = memo((props) => {
  const { onClick } = props;
  const [isEditMode, setIsEditMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [data, setData] = useState([]);
  const [confirmedId, setConfirmId] = useState(null);
  const [messageData, setMessageData] = useState();
  const [idsToDelete, setIdsToDelete] = useState([]);

  const { globalData, deleteCard, editCard } = useDataContext();

  useEffect(() => {
    setData(globalData.cards);
    return () => {
      return Promise.all(
        idsToDelete.map(async (uuid) => {
          await deleteHandler(uuid);
        })
      ).then(() => console.log("done"));
    };
  }, [globalData.cards, idsToDelete]);

  const deleteHandler = async (entered) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/delete/?uuid=${encodeURIComponent(entered)}`,
        {
          method: "DELETE",
          body: "",
          headers: {
            Accept: "application/json, text/plain, */*",
            "User-Agent": "*",
          },
        }
      );
      const data = await res.json();
    } catch (error) {
      console.error(error.message);
    }
  };

  const updateHandler = async (entered) => {
    try {
      const { uuid, form } = entered;
      const res = await fetch(
        `http://localhost:3000/api/updateCard/?uuid=${encodeURIComponent(
          uuid
        )}`,
        {
          method: "PATCH",
          body: form,
        }
      );
      const data = await res.json();
    } catch (error) {
      console.error(error.message);
    }
  };

  const onEditClick = (obj) => {
    setMessageData(obj.data);
    setIsEditDialogOpen(true);
  };

  const closeEdit = () => {
    setIsEditDialogOpen(false);
  };

  const saveAndCloseEdit = async (obj) => {
    setIsEditDialogOpen(false);
    editCard({
      uuid: obj.uuid,
      front: obj.front,
      back: obj.back,
      folder: obj.folder,
      tags: obj.tags.join(",")
    });

    const formData = new FormData();
    formData.append("front", obj.front);
    formData.append("back", obj.back);
    formData.append("folder", obj.folder);
    formData.append("tags", obj.tags);
    updateHandler({ uuid: obj.uuid, form: formData });
  };

  const onDeleteClick = (obj) => {
    const { id, data } = obj;
    setConfirmId(id);
    setMessageData(data);
    setIsOpen(true);
  };

  const cancelClicked = useCallback(() => {
    setIsOpen(false);
  }, [isOpen]);

  const confirmDeleted = useCallback(() => {
    deleteCard(confirmedId);
    setIsOpen(false);
    setIdsToDelete((prevState) => [...prevState, confirmedId]);
  }, [isOpen]);

  const onToggle = () => {
    let activeTable = document.querySelector(".slider");
    activeTable.classList.remove(
      isEditMode ? "-translate-x-7" : "translate-x-14"
    );
    activeTable.classList.add(isEditMode ? "translate-x-14" : "-translate-x-7");
    let buttons = activeTable.querySelectorAll(".buttons");
    buttons.forEach((button) => {
      if (!isEditMode) button.classList.remove("hidden");
      button.classList.remove(isEditMode ? "opacity-100" : "opacity-0");
      button.classList.add(isEditMode ? "opacity-0" : "opacity-100");
    });
    buttons.forEach((button) => {
      if (isEditMode) button.classList.add("hidden");
    });
    setIsEditMode(!isEditMode);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-evenly">
        <button className={buttonStyle} onClick={onClick}>
          Back
        </button>
        <button className={buttonStyle} onClick={onClick}>
          Save
        </button>
      </div>
      <div className="font-bold text-3xl">Browse All Flashcards</div>
      <div className="w-11/12 flex justify-end">
        <button
          className="bg-indigo-400 hover:bg-violet-600 focus:outline-4 w-20 h-8 text-white px-4 font-bold rounded-md tracking-widest text-base m-1"
          onClick={onToggle}
        >
          Edit
        </button>
      </div>
      <div className="grid grid-flow-col grid-cols-11 text-center w-11/12 m-4 font-bold bg-orange-800/40">
        <div className="p-2 col-span-1">Index</div>
        <div className="p-2 col-span-3">Front</div>
        <div className="p-2 col-span-3">Back</div>
        <div className="p-2 col-span-2">Folder</div>
        <div className="p-2 col-span-1">Visited</div>
        <div className="p-2 col-span-1">Last visited</div>
      </div>
      {isOpen && (
        <MessageDialog
          isOpen={isOpen}
          closeAndContinue={confirmDeleted}
          closeAndGoBack={cancelClicked}
          type="deleteConfirm"
          data={messageData}
        />
      )}
      <div className="w-full transition-all ease-in-out duration-1000 transform translate-x-14 slider">
        {data &&
          data.map((element, index) => {
            return (
              <div
                key={index}
                className="grid grid-flow-col grid-cols-12 text-center group"
              >
                <div className="p-2 col-span-1 group-hover:bg-slate-300/75">
                  {index + 1}
                </div>
                <div className="p-2 col-span-3 group-hover:bg-slate-300/75">
                  {element.front}
                </div>
                <div className="p-2 col-span-3 group-hover:bg-slate-300/75">
                  {element.back}
                </div>
                <div className="p-2 col-span-2 group-hover:bg-slate-300/75">
                  {element.folder}
                </div>
                <div className="p-2 col-span-1 group-hover:bg-slate-300/75">
                  {element.visited}
                </div>
                <div className="p-2 col-span-1 group-hover:bg-slate-300/75">
                  {element.lastVisited &&
                    `${timeSince(new Date(element.lastVisited))} ago`}{" "}
                </div>
                <div className="p-2 text-center col-span-1 hidden opacity-0 buttons">
                  <div className="h-full flex justify-items-center gap-4">
                    <div>
                      <RiEditLine
                        onClick={() => onEditClick({ data: element })}
                        className="hover:animate-pulse hover:shadow-2xl hover:p-0.5 text-cyan-800 cursor-pointer text-2xl"
                      />
                    </div>
                    <div
                      onClick={() =>
                        onDeleteClick({
                          id: element.uuid.toString(),
                          data: element.front,
                        })
                      }
                    >
                      <MdRemoveCircle className="hover:animate-pulse hover:shadow-2xl hover:p-0.5 text-cyan-800 cursor-pointer text-2xl" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {isEditDialogOpen && (
        <EditCardPanel
          visible={isEditDialogOpen}
          closeEdit={closeEdit}
          saveAndCloseEdit={saveAndCloseEdit}
          data={messageData}
        />
      )}
    </div>
  );
});
