import React from "react";
import { Link } from "react-router-dom";
import Styles from "./landingpage.module.css";

export default function Landing() {
  return (
    <div className={Styles.landing}>
      <h1 className={Styles.title}>Country App</h1>
      <h2 className={Styles.title}>Welcome</h2>
      <Link to="/countries">
        <button className={Styles.btnlanding}>
          <span></span>
          <text>Acceder</text>
        </button>
      </Link>
    </div>
  );
}
