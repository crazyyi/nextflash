import { useEffect, useState, useCallback, memo } from "react";
import { RiEditLine } from "react-icons/ri";
import { MdRemoveCircle } from "react-icons/md";
import { MessageDialog, Spinner, updateHandler } from "components/Utilities";
import { EditCardPanel, Button } from "components";
import { useDataContext } from "DataProvider";

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
      )
        .then(() => console.log("done"))
        .catch((error) => console.log(error.message));
    };
  }, [globalData.cards, idsToDelete]);

  const deleteHandler = async (entered) => {
    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_HOST_URL
        }/api/delete/?uuid=${encodeURIComponent(entered)}`,
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
      tags: obj.tags.join(","),
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
  }, []);

  const confirmDeleted = useCallback(() => {
    deleteCard(confirmedId);
    setIsOpen(false);
    setIdsToDelete((prevState) => [...prevState, confirmedId]);
  }, [confirmedId, deleteCard]);

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
        <Button text="Back" onClick={onClick} />
        <Button text="Save" onClick={onClick} />
      </div>
      <div className="font-bold text-3xl">Browse All Flashcards</div>
      <div className="w-[1280px] flex justify-end">
        <Button text="Edit" size="sm" isRounded onClick={onToggle} />
      </div>
      <div className="grid grid-flow-col grid-cols-12 text-center w-[1280px] m-4 font-bold bg-orange-800/40">
        <div className="p-2 col-span-1">Index</div>
        <div className="p-2 col-span-3">Front</div>
        <div className="p-2 col-span-3">Back</div>
        <div className="p-2 col-span-2">Folder</div>
        <div className="p-2 col-span-1">Visited</div>
        <div className="p-2 col-span-2">Last visited</div>
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
        {data.length > 0 ? (
          data.map((element, index) => {
            return (
              <div
                key={index}
                className="grid grid-flow-col grid-cols-13 text-center group"
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
                <div className="p-2 col-span-2 group-hover:bg-slate-300/75">
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
          })
        ) : (
          <Spinner />
        )}
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

BrowsePanel.displayName = "BrowsePanel";
