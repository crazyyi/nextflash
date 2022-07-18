import { Dialog, Transition } from "@headlessui/react";
import { memo } from 'react'

const buttonStyle =
  "bg-indigo-400 hover:bg-violet-600 focus:outline-4 w-32 h-10 text-white px-4 font-bold tracking-widest text-sm m-8";

export const MessageDialog = memo((props) => {
  console.log('message dialog')
  const { isOpen, closeAndContinue, closeAndGoBack, type, data } = props;

  let title = "Message"
  let description = ""
  let leftBtnText = "", rightBtnText= ""

  if (type === "createNewFlash") {
    title = "Continue To Add New Flashcard?"
    description = "You have created a new flashcard. Do you want to create another one?"
    leftBtnText = "Continue"
    rightBtnText = "No, thanks"
  } else if (type === "deleteConfirm") {
    title = "Deleting a card"
    description = `Proceed to delete the flashcard for "${data}"?`
    leftBtnText = "Yes"
    rightBtnText = "No"
  } else {

  }

  return (
    <Dialog
      className="relative z-10"
      open={isOpen}
      onClose={closeAndGoBack}
    >
      <Transition appear show={isOpen}>
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white pt-5 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium leading-6 text-gray-900 text-center"
                >
                  {title}
                </Dialog.Title>
                <Dialog.Description className="p-4 mt-5 text-center">
                  {description}
                </Dialog.Description>

                <div className="w-full flex justify-around">
                  <button className={buttonStyle} onClick={closeAndContinue}>{leftBtnText}</button>
                  <button className={buttonStyle} onClick={closeAndGoBack}>{rightBtnText}</button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Transition>
    </Dialog>
  );
});
