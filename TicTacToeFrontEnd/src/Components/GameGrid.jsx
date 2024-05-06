import React, { useState } from "react";
import Grid from "./Grid";

export default function GameGrid({ grid, emitHandler }) {
  console.log("this is grid");
  console.log(grid);

  return (
    <div className="grid-container">
      {grid.map((value, i) => {
        return (
          <Grid
            key={i}
            handleClick={() => {
              console.log(i);
              emitHandler("move", JSON.stringify({ pos: i }));
            }}
            label={value}
          />
        );
      })}
    </div>
  );
}
