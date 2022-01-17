import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getCountryDetails, clearCountryDetail } from "../../actions/index.js";
import { useEffect } from "react";
// import Loading from "./Loading/Loading";
import "./countriesdetails.module.css";

export default function CountryDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const countrie = useSelector((s) => s.countryDetail);

  useEffect(() => {
    dispatch(getCountryDetails(id));
    return () => {
      dispatch(clearCountryDetail());
    };
  }, [dispatch, id]);

  //render
  return (
    <div>
      {countrie ? (
        <>
          <div className="divDetail">
            <Link to="/countries">
              <button className="backdet">Back</button>
            </Link>
            <img className="img" src={countrie?.flags} alt={countrie?.name} />
            <h1 className="name">{countrie?.name}</h1>
            <span className="id">{countrie?.id}</span>
            <p className="info">
              {" "}
              <span className="info2">Continent: </span> {countrie?.continent}
            </p>
            <p className="info">
              {" "}
              <span className="info2">Capital: </span> {countrie?.capital}
            </p>
            <p className="info">
              {" "}
              <span className="info2">Sub Region: </span> {countrie?.subregion}
            </p>
            <p className="info">
              {" "}
              <span className="info2">Area: </span> {countrie?.area} km²
            </p>
            <p className="info">
              {" "}
              <span className="info2">Population: </span> {countrie?.population}
            </p>
          </div>
        </>
      ) : (
        <span>Country Not Found</span>
      )}
    </div>
  );
}
