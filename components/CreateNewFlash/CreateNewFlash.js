import { MessageDialog } from "components/Utilities";
import { Listbox, Transition } from "@headlessui/react";
import { GoCheck } from "react-icons/go";
import { HiSelector } from "react-icons/hi";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { folders } from "components/Utilities";

const buttonStyle =
  "bg-indigo-400 hover:bg-violet-600 focus:outline-4 w-36 h-12 text-white px-8 font-bold tracking-widest text-lg m-8";

const backButtonStyle =
  "bg-indigo-400 hover:bg-violet-600 focus:outline-4 w-36 h-12 text-white px-8 font-bold tracking-widest text-lg m-8";

export async function clickHandler(entered) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch("http://localhost:3000/api/addNewCard", {
    method: "POST",
    body: JSON.stringify(entered),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
}

export const CreateNewFlash = (props) => {
  const { onClick } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(folders[0]);

  const { register, control, handleSubmit, reset } = useForm();

  const closeAndContinue = () => {
    setIsOpen(false);
    reset({
      front: "",
      back: "",
      selected: folders[0],
    });
  };

  const closeAndGoBack = () => {
    setIsOpen(false);
    onClick();
  };

  async function handleAndClose(entered) {
    await clickHandler(entered);
    setIsOpen(true);
  }

  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-evenly">
        <button className={buttonStyle} onClick={onClick}>
          Back
        </button>
        <button className={buttonStyle} onClick={handleSubmit(handleAndClose)}>
          Save
        </button>
      </div>
      <div className="w-full flex items-center mt-2 flex-col">
        <h1 className="font-bold text-3xl my-3">Create New Flashcards</h1>
        <div className="">
          <MessageDialog
            isOpen={isOpen}
            closeAndContinue={closeAndContinue}
            closeAndGoBack={closeAndGoBack}
            type="createNewFlash"
          />
          <div className="max-w-xs flex flex-col justify-evenly">
            <form>
              <div className="flex flex-col items-center md:flex-row md:justify-start">
                <div className="text-2xl pr-8 ">Folder:</div>
                <div className="w-48 mt-3">
                  <Controller
                    control={control}
                    defaultValue=""
                    name="folder"
                    render={({ field }) => (
                      <Listbox
                        as="div"
                        className="space-y-1"
                        value={selected}
                        onChange={(e) => {
                          field.onChange(e);
                          setSelected(e);
                        }}
                      >
                        {({ open }) => (
                          <>
                            <div className="relative">
                              <span className="inline-block w-full rounded-md shadow-sm">
                                <Listbox.Button className="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                                  <span className="block truncate">
                                    {selected}
                                  </span>
                                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <HiSelector className="text-xl" />
                                  </span>
                                </Listbox.Button>
                              </span>

                              <Transition
                                show={open}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                className="absolute mt-1 w-full rounded-md shadow-lg"
                              >
                                <Listbox.Options
                                  static
                                  className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                                >
                                  {folders.map((folder) => (
                                    <Listbox.Option
                                      key={folder}
                                      value={folder}
                                      className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                          active
                                            ? "bg-amber-100 text-amber-900"
                                            : "text-gray-900"
                                        }`
                                      }
                                    >
                                      {({ selected, active }) => (
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
                          </>
                        )}
                      </Listbox>
                    )}
                  />
                </div>
              </div>
              <div className="max-w-xs flex flex-col md:flex-row justify-evenly items-center">
                <div className="flex md:justify-center md:items-center text-2xl pr-8">
                  Front:
                </div>
                <div className="md:m-2 mt-3">
                  <textarea
                    className="border-2 border-neutral-700 p-2"
                    {...register("front")}
                    cols="40"
                    rows="5"
                  ></textarea>
                </div>
              </div>
              <div className="max-w-xs flex flex-col md:flex-row justify-evenly items-center">
                <div className="flex md:justify-center md:items-center text-2xl pr-8">
                  Back:
                </div>
                <div className="md:m-2 mt-3">
                  <textarea
                    className="border-2 border-neutral-700 p-2"
                    {...register("back")}
                    cols="40"
                    rows="5"
                  ></textarea>
                </div>
              </div>
              <input type="submit" className="hidden" id="submitBtn" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};