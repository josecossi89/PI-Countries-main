import React from "react";
import { Link } from "react-router-dom";
import Styles from "./landingpage.module.css";

export default function Landing() {
  return (
    <div className={Styles.landing}>
      <h1 className={Styles.h1title}>Country App</h1>
      <Link to="/countries">
        <button className={Styles.btnlanding}>
          <span></span>
          <text>Acceder</text>
        </button>
      </Link>
    </div>
  );
}
