import React, { useContext, useEffect, useState } from "react";
import classes from "./App.module.scss";
import { Link, Outlet } from "react-router-dom";
import About from "@/pages/about/About";
import imagePng from "@/assets/m.png";
import imageJpg from "@/assets/p.jpg";
import StarSvg from "@/assets/star.svg";
import { error } from "console";

// TREE SHAKING
function TODO() {
  TODO2();
} //оптимизация - Тришейкинг

function TODO2() {
  throw new Error();
}

export const App = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => {
    // setCount((prev) => prev + 1);
    TODO();
  };
  const decrement = () => setCount((prev) => prev - 1);

  // if (__PLATFORM__ === "desktop") {
  //   return <div>ISDESKTOPPLATFORM</div>;
  // }

  // if (__PLATFORM__ === "mobile") {
  //   return <div>ISMOBILEPLATFORM</div>;
  // }

  return (
    <div data-testid={"App.DataTestId"}>
      <h1 data-testid={"Platform"}>PLATFORM={__PLATFORM__}</h1>
      <div>
        <img width={100} height={100} src={imagePng} alt="" />
        <img width={100} height={100} src={imageJpg} alt="" />
      </div>
      <div>
        <StarSvg style={{ color: "red" }} width={50} height={50} />
      </div>
      <Link to={"/about"}>about</Link>
      <br />
      <Link to={"/shop"}>shop</Link>
      <h1>{count}</h1>
      <button className={classes.button} onClick={increment}>
        inc
      </button>
      <button className={classes.button} onClick={decrement}>
        dec
      </button>
      <About />
    </div>
  );
};
