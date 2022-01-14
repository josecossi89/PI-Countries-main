import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountryByName } from "../../actions";
import Styles from "./search.module.css";

export default function Search() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getCountryByName(name));
  }

  return (
    <div className={Styles.search}>
      <input
        className={Styles.input}
        type="text"
        placeholder="Name..."
        onChange={(e) => handleInputChange(e)}
      />
      <button
        className={Styles.btn}
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Buscar
      </button>
    </div>
  );
}
