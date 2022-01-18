import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import Card from "../Card/Card";
import Cards from "../Cards/Cards";
import Paged from "../Paged/Paged";
import Search from "../Search/Search";
import {
  getCountries,
  filterByContinent,
  orderByName,
  orderByPopulation,
  resetFilters,
  filterActivity,
  getActivity,
} from "../../actions/index.js";
import Styles from "./home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const activity = useSelector((state) => state.activities);
  const [currentPage, setCurrentPage] = useState(1);
  const [, setOrden] = useState("");
  //const [, setActivitySelected] = useState("");
  const [countriesPage] = useState(10);
  const indexOfLastCountries = currentPage * countriesPage;
  const indexOfFirstCountries = indexOfLastCountries - countriesPage;
  const currentCountries = allCountries?.slice(
    indexOfFirstCountries,
    indexOfLastCountries
  );

  const paged = (numberPage) => {
    setCurrentPage(numberPage);
  };

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivity());
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

  const handleActivityFilter = (e) => {
    if (e.target.value === "all") {
      dispatch(getCountries());
    } else {
      dispatch(filterActivity(e.target.value));
      setOrden(e.target.value);
    }
  };

  function handleSortName(e) {
    e.preventDefault();
    if (e.target.value === "defaultValue") {
      dispatch(getCountries());
    } else {
      dispatch(orderByName(e.target.value));
      setCurrentPage(1);
      setOrden(`Ordenado ${e.target.value}`);
    }
  }

  function handleSortPopulation(e) {
    e.preventDefault();
    if (e.target.value === "defaultValue") {
      dispatch(getCountries());
    } else {
      dispatch(orderByPopulation(e.target.value));
      setCurrentPage(1);
      setOrden(`Ordenado ${e.target.value}`);
    }
  }
  const onClick = (e) => {
    e.preventDefault();
    dispatch(getCountries());
    dispatch(resetFilters());
    resetSelectsFilters();
  };

  const resetSelectsFilters = () => {
    document.getElementById("selectPopulation").value = "defaultValue";
    document.getElementById("selectContinent").value = "all";
    document.getElementById("selectActivity").value = "all";
    document.getElementById("selectOrder").value = "defaultValue";
  };
  //render
  return (
    <div className="{Styles.home}">
      <h1>Countries</h1>

      <div className="resetfilters">
        <button className="btnreset" onClick={onClick}>
          Reset Filters
        </button>
      </div>
      <div>
        <select
          className={Styles.select}
          id="selectContinent"
          onChange={(e) => handleFilterByContinent(e)}
        >
          <option value="all">All</option>
          <option value="Africa">Africa</option>
          <option value="Americas">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europa</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      <Search />
      <div>
        <select
          className={Styles.select}
          id="selectOrder"
          onChange={(e) => handleSortName(e)}
        >
          <option value="defaultValue">Orden Alfabetico</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
      </div>
      <div className="filteractivity">
        <label className="labelac">Filter Activity</label>
        <select
          id="selectActivity"
          name="filters"
          onChange={(e) => handleActivityFilter(e)}
        >
          <option value="all">All</option>
          {activity ? (
            activity.map((a) => {
              return (
                <option key={a.id} value={a.name}>
                  {a.name}
                </option>
              );
            })
          ) : (
            <option disabled>No activities</option>
          )}
        </select>
      </div>
      <div>
        <select
          className={Styles.select}
          id="selectPopulation"
          onChange={(e) => {
            handleSortPopulation(e);
          }}
        >
          <option value="defaultValue">Poblacion</option>
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

      <Paged
        className={Styles.paged}
        countriesPage={countriesPage}
        allCountries={allCountries.length}
        paged={paged}
      />
      <Cards className="cardss" countries={currentCountries} />
    </div>
  );
}
