import React from "react";
import { Link } from "react-router-dom";
import Styles from "./card.module.css";

export default function Card({ id, flags, name, continent }) {
  return (
    <Link to={`/countries/${id}`}>
      <div class={Styles.abox}>
        <div class={Styles.imgcontainer}>
          <div class={Styles.imginner}>
            <div class={Styles.innerskew}>
              <img src={flags} alt={name} />
            </div>
          </div>
        </div>
        <div class={Styles.textcontainer}>
          <h3>{name}</h3>
          <div class="continent">{continent}</div>
        </div>
      </div>
    </Link>
  );
}
