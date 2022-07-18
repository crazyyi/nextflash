import { Listbox, Transition } from "@headlessui/react";
import { HiSelector } from "react-icons/hi";
import { GoCheck } from "react-icons/go";
import { useCallback, useState, memo } from "react";
import ReactTags from "react-tag-autocomplete";
import { folders  } from "components/Utilities";

const buttonStyle =
  "bg-indigo-400 hover:bg-violet-600 focus:outline-4 w-32 h-10 text-white px-4 font-bold tracking-widest text-sm m-8";

export const EditCardPanel = memo((props) => {
  const { visible, closeEdit, saveAndCloseEdit, data } = props;
  const [selected, setSelected] = useState(data.folder ? data.folder : folders[0]);
  /* In database: tags: ['A','B'] => In code: tags: [{id: undefined, name: 'A'}, {id: undefined, name: 'B'}] */
  const [tags, setTags] = useState(
    data.tags
      ? data.tags.split(',').map((v) => {
          return { id: undefined, name: v };
        })
      : []
  );
  const [frontText, setFrontText] = useState(data.front);
  const [backText, setBackText] = useState(data.back);
  const [tagPlaceholderText, setTagPlaceholderText] = useState("Add New Tag");

  const title = visible ? 'Edit Flashcard for "' + data.front + '"' : "";

  const onDeleteTag = useCallback(
    (tagIndex) => {
      setTagPlaceholderText("Add New Tag");
      setTags(tags.filter((_, i) => i !== tagIndex));
    },
    [tags]
  );

  const onAddTag = useCallback(
    (newTag) => {
      if (newTag.name.length >= 10) return;
      if (tags.length >= 7) {
        setTagPlaceholderText("Max 8 tags.");
      }
      if (
        newTag.name.length < 10 &&
        tags.length < 8 &&
        tags.indexOf(newTag) === -1
      ) {
        setTags([...tags, newTag]);
      }
    },
    [tags]
  );

  const handleFrontChange = useCallback(
    (e) => {
      setFrontText(e.target.value);
    },
    [frontText]
  );

  const handleBackChange = (e) => {
    setBackText(e.target.value);
  };

  const handleSaveAndClose = (e) => {
    const formData = new FormData();
    formData.append("front", frontText);
    formData.append("back", backText);
    formData.append("folder", selected)
    formData.append(
      "tags",
      tags.map((v) => v.name)
    );
    saveAndCloseEdit({ id: data._id, form: formData });
  };

  return (
    <>
      {visible && (
        <Transition appear show={visible}>
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>
          <div className="fixed inset-0 z-10 backdrop-blur-sm flex justify-center items-center">
            <Transition.Child
              className="w-5/12 h-2/3 flex flex-col items-center"
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="container flex flex-col items-center bg-white p-2 rounded-md w-full h-full">
                <div className="mt-9 h-10 text-2xl font-bold">{title}</div>
                <div className=" md:h-full flex flex-col mt-3">
                  <div className="flex justify-center items-start gap-16 mr-5">
                    <div className="flex flex-col justify-start items-start mr-5">
                      <div className="p-2 font-bold">Front:</div>
                      <div>
                        <textarea
                          className="border-2 p-2"
                          name="front"
                          id=""
                          cols="25"
                          rows="5"
                          value={frontText}
                          onChange={handleFrontChange}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col justify-start items-start ml-5">
                      <div className="p-2 font-bold">Back:</div>
                      <div>
                        <textarea
                          className="border-2 p-2"
                          name="back"
                          id=""
                          cols="25"
                          rows="5"
                          value={backText}
                          onChange={handleBackChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-col max-w-xl">
                    <div className="flex justify-start items-center">
                      <div className="font-bold pl-2 pr-5 ">Folder:</div>
                      <div className="w-48">
                        <Listbox value={selected} onChange={setSelected}>
                          <div className="relative mt-1 z-20">
                            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-amber-100 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                              <span className="block truncate">
                                {selected}
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <HiSelector />
                              </span>
                            </Listbox.Button>
                            <Transition
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {folders.map((folder, folderIdx) => (
                                  <Listbox.Option
                                    key={folderIdx}
                                    className={({ active }) =>
                                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active
                                          ? "bg-amber-100 text-amber-900"
                                          : "text-gray-900"
                                      }`
                                    }
                                    value={folder}
                                  >
                                    {({ selected }) => (
                                      <>
                                        <span
                                          className={`block truncate ${
                                            selected
                                              ? "font-medium"
                                              : "font-normal"
                                          }`}
                                        >
                                          {folder}
                                        </span>
                                        {selected ? (
                                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                            <GoCheck />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </Listbox>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-start items-center min-w-full">
                      <div className="font-bold pl-2 ">Tags:</div>
                      <div className="ml-8 pt-2 w-5/6">
                        <ReactTags
                          allowNew
                          name="tags"
                          tags={tags}
                          placeholderText={tagPlaceholderText}
                          onDelete={onDeleteTag}
                          onAddition={onAddTag}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-around">
                  <button className={buttonStyle} onClick={closeEdit}>
                    Cancel
                  </button>
                  <button className={buttonStyle} onClick={handleSaveAndClose}>
                    Finish
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Transition>
      )}
    </>
  );
});
