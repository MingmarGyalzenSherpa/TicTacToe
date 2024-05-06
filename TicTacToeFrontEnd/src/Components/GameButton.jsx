/* eslint-disable react/prop-types */

export default function GameButton({
  label,
  handleClick,
  classes,
  btnClicked = false,
}) {
  return (
    <button
      disabled={btnClicked}
      onClick={handleClick}
      className={"game-btn " + classes}
    >
      {label}
    </button>
  );
}
