import classnames from "classnames";

const buttonStyle =
  "bg-indigo-400 hover:bg-violet-600 focus:outline-4 text-white px-8 font-bold tracking-widest m-8";

export const Button = ({ text, size, hidden, isRounded, ...props }) => {
  let textSize, buttonSize;
  if (size === "sm") {
    textSize = "text-base";
    buttonSize = "w-24 h-8";
  } else if (size === "md") {
    textSize = "text-sm";
    buttonSize = "w-32 h-10";
  } else if (size === "xl") {
    textSize = "text-xl";
    buttonSize = "w-96 h-20";
  } else {
    textSize = "text-lg";
    buttonSize = "w-36 h-12";
  }
  
  return (
    <button
      className={classnames(
        buttonStyle,
        textSize,
        buttonSize,
        { "rounded-md": isRounded },
        { "hidden": hidden }
      )}
      {...props}
    >
      {text}
    </button>
  );
};
