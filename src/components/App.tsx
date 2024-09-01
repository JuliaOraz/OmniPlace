import React, { useContext, useEffect, useState } from "react";
import "./App.scss";

export const App = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>inc</button>
      <button onClick={decrement}>dec</button>
    </div>
  );
};
