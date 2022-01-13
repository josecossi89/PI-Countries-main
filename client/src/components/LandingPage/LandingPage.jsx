import React from "react";
import { Link } from "react-router-dom";
import Styles from "./landingpage.module.css";

export default function Landing() {
  return (
    <div className={Styles.landing}>
      <div className={Styles.title}>
        <h1>Bienvenido a Countries App </h1>
      </div>

      <div className={Styles.btn}>
        <Link to="/countries">
          <button>Acceder</button>
        </Link>
      </div>
    </div>
  );
}
