import React from "react";
import Styles from "./card.module.css";

export default function Card({ name, region, flags }) {
  return (
    <div className={Styles.card}>
      <img src={flags} alt="img not found" />
      <h3>{name}</h3>
      <h3>{region}</h3>
    </div>
  );
}
