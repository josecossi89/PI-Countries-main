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
    setName(`${e.target.value}`);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getCountryByName(name));
    setName("");
  }

  return (
    <div className={Styles.search}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          className={Styles.input}
          type="text"
          value={name}
          placeholder="Name Countrie..."
          onChange={(e) => handleInputChange(e)}
        />
        <button
          className={Styles.btn}
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Search Countrie
        </button>
      </form>
    </div>
  );
}
