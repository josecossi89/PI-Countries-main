import React from "react";
import Styles from "../Paged/page.module.css";

export default function Paged({ countriesPage, allCountries, paged }) {
  const numberPage = [];

  for (let i = 0; i < Math.ceil(allCountries / countriesPage); i++) {
    numberPage.push(i + 1);
  }

  return (
    <nav>
      <ul className={Styles.paged}>
        {numberPage &&
          numberPage.map((number) => (
            <div className={Styles.number} key={number}>
              <button onClick={() => paged(number)}>{number}</button>
            </div>
          ))}
      </ul>
    </nav>
  );
}
