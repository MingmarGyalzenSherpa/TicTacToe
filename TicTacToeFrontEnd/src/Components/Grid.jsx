import React from "react";

export default function Grid({ label, handleClick }) {
  return (
    <div onClick={handleClick} className="grid">
      {label == "_" ? "" : label}
    </div>
  );
}
