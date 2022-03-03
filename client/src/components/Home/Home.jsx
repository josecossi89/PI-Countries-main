import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
  getClima,
} from "../../actions/index.js";
import Styles from "./home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const activity = useSelector((state) => state.activities);
  const [currentPage, setCurrentPage] = useState(1);
  const [, setOrden] = useState("");
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
    dispatch(getClima());
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
    console.log(e.target.value);
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
    <div className={Styles.home}>
      <h1>Countries</h1>
      <div className={Styles.divNav}>
        {/* Charge all countries */}
        <button
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Load Countries
        </button>
        {/* componentSearchCountrieByName */}
        <Search className="search" />
        {/* ResetFilters */}
        <div className={Styles.resetfilters}>
          <button className={Styles.btnreset} onClick={onClick}>
            Reset Filters
          </button>
        </div>
        {/* filterByContinent */}
        <div>
          <select
            className={Styles.select}
            id="selectContinent"
            onChange={(e) => handleFilterByContinent(e)}
          >
            <option value="all">All Continent</option>
            <option value="Africa">Africa</option>
            <option value="Americas">America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europa</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>

        {/* SortByName */}
        <div>
          <select
            className={Styles.select}
            id="selectOrder"
            onChange={(e) => handleSortName(e)}
          >
            <option value="defaultValue">Alphabetical Order</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
        </div>

        {/* filterActivities */}
        <div className={Styles.filteractivity}>
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

        {/* SortByPopulation */}
        <div>
          <select
            className={Styles.select}
            id="selectPopulation"
            onChange={(e) => {
              handleSortPopulation(e);
            }}
          >
            <option value="defaultValue">Population</option>
            <option value="ASC">Upward</option>
            <option value="DES">Falling</option>
          </select>
        </div>
        {/* CreateActivities */}
        <div className={Styles.divBtns}>
          <Link to="/activity">
            <button className={Styles.addactivity}>Add Activity</button>
          </Link>
        </div>
      </div>

      <div className={Styles.divHome}>
        <Paged
          className={Styles.paged}
          countriesPage={countriesPage}
          allCountries={allCountries.length}
          paged={paged}
        />
        {/* componentCards */}
        <Cards className="cardss" countries={currentCountries} />
      </div>
    </div>
  );
}
