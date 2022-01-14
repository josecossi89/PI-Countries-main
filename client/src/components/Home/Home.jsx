import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paged from "../Paged/Paged";
import Search from "../Search/Search";
import {
  getCountries,
  filterByContinent,
  orderByName,
  orderByPopulation,
} from "../../actions/index.js";
import Styles from "./home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const [currentPage, setCurrentPage] = useState(1);
  const [orden, setOrden] = useState("");
  const [countriesPage, setCountriesPage] = useState(10);
  const indexOfLastCountries = currentPage * countriesPage;
  const indexOfFirstCountries = indexOfLastCountries - countriesPage;
  const currentCountries = allCountries.slice(
    indexOfFirstCountries,
    indexOfLastCountries
  );

  const paged = (numberPage) => {
    setCurrentPage(numberPage);
  };

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  //get info of db
  function handleClick(e) {
    e.preventDefault();
    dispatch(getCountries());
  }
  //get info for filter by continent
  function handleFilterByContinent(e) {
    dispatch(filterByContinent(e.target.value));
  }

  function handleFilterByActivities(e) {
    dispatch(filterByContinent(e.target.value));
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  function handleSortPopulation(e) {
    e.preventDefault();
    dispatch(orderByPopulation(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }
  //render
  return (
    <div className="{Styles.home}">
      <h1>Countries</h1>

      <div>
        <select
          className={Styles.select}
          onChange={(e) => handleFilterByContinent(e)}
        >
          <option value="All">All</option>
          <option value="Africa">Africa</option>
          <option value="Americas">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europa</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      <Search />
      <div>
        <select className={Styles.select} onChange={(e) => handleSort(e)}>
          <option value="Orden">Orden Alfabetico</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
      </div>

      <div>
        <select
          className={Styles.select}
          onChange={(e) => {
            handleSortPopulation(e);
          }}
        >
          <option value="Poblacion">Poblacion</option>
          <option value="ASC">Ascendente</option>
          <option value="DES">Descendente</option>
        </select>
      </div>

      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Cargar Todos los Paises
      </button>

      <div className={Styles.recarga}>
        <button
          className={Styles.refresh}
          onClick={(e) => {
            handleClick(e);
          }}
        ></button>
      </div>
      <div className={Styles.toActivity}>
        <Link to="/activity">
          <button className={Styles.act}>Crear Actividad a Paises</button>
        </Link>
      </div>

      <div className={Styles.cards}>
        {currentCountries?.map((country) => {
          return (
            <Link key={country.name} to={"/countries/" + country.id}>
              <Card
                name={country.name}
                region={country.continent}
                flags={country.flags}
              />
            </Link>
          );
        })}
      </div>

      <Paged
        className={Styles.paged}
        countriesPage={countriesPage}
        allCountries={allCountries.length}
        paged={paged}
      />
    </div>
  );
}
