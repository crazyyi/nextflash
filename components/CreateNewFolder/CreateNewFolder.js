const buttonStyle =
  "bg-indigo-400 hover:bg-violet-600 focus:outline-4 w-96 h-20 text-white px-8 font-bold tracking-widest text-lg m-8";

export const CreateNewFolder = (props) => {
    return <>
    <h1>Create New Folder</h1>
    <button className={buttonStyle} onClick={props.onClick}>Back</button>
    </>
}