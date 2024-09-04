import React, { useContext, useEffect, useState } from "react";
import classes from "./App.module.scss";
import { Link, Outlet } from "react-router-dom";
import About from "@/pages/about/About";
import imagePng from "@/assets/m.png";
import imageJpg from "@/assets/p.jpg";
import StarSvg from "@/assets/star.svg";

// TREE SHAKING
function TODO() {
  console.log("TODOFUNCTION");
} //оптимизация - Тришейкинг

export const App = () => {
  const [count, setCount] = useState<number>(0);
  TODO();
  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);

  // if (__PLATFORM__ === "desktop") {
  //   return <div>ISDESKTOPPLATFORM</div>;
  // }

  // if (__PLATFORM__ === "mobile") {
  //   return <div>ISMOBILEPLATFORM</div>;
  // }

  return (
    <div>
      <h1>PLATFORM={__PLATFORM__}</h1>
      <div>
        <img width={100} height={100} src={imagePng} alt="" />
        <img width={100} height={100} src={imageJpg} alt="" />
      </div>
      <div>
        <StarSvg style={{ color: "green" }} width={50} height={50} />
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
