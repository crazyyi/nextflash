import { folders } from "components/Utilities";
import { useState } from "react";
import { GrFolder } from "react-icons/gr";
import { Button } from "components";

export const CreateNewFolder = (props) => {
  const [folderName, setFolderName] = useState("");
  const { onClick } = props;

  const onChange = (e) => {
    setFolderName(e.target.value);
  };

  const onAddFolder = (e) => {};

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-evenly">
        <Button text="Back" onClick={onClick} />
        <Button text="Save" onClick={onClick} />
      </div>
      <div className="mt-2 text-3xl text-bold">Create New Folder</div>
      <div className="flex mt-4 p-3 justify-center items-center">
        <div className="p-4">Folder Name:</div>
        <div className="p-4">
          <input
            className="p-2 border-2 border-black h-8"
            type="text"
            value={folderName}
            onChange={onChange}
          />
        </div>
        <button
          className="bg-indigo-400 hover:bg-violet-600 focus:outline-4 w-24 h-8 text-white px-3 font-bold tracking-widest text-base"
          onClick={onAddFolder}
        >
          Add
        </button>
      </div>
      <div className="grid grid-cols-5 gap-3 mt-4 items-center justify-center">
        {folders.map((folder, index) => {
          return (
            <div
              className="w-[100px] h-[100px] flex flex-col items-center justify-center"
              key={index}
            >
              <GrFolder className="w-full h-full hover:animate-pulse hover:shadow-2xl hover:border-2 hover:border-slate-700 p-2 text-cyan-800 cursor-pointer text-5xl" />
              {folder}
            </div>
          );
        })}
      </div>
    </div>
  );
};
