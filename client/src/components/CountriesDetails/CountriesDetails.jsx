import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getCountryDetails, clearCountryDetail } from "../../actions/index.js";
import { useEffect } from "react";
import Styles from "./countriesdetails.module.css";

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
          <div className={Styles.containerDetails}>
            <Link to="/countries">
              <button className={Styles.btnback}>Back</button>
            </Link>
            <img
              className={Styles.img}
              src={countrie?.flags}
              alt={countrie?.name}
            />
            <h1 className={Styles.name}>{countrie?.name}</h1>
            <span className={Styles.id}>{countrie?.id}</span>
            <p className={Styles.infodetail}>
              {" "}
              <span className={Styles.titlesinfo}>Continent: </span>{" "}
              {countrie?.continent}
            </p>
            <p className={Styles.infodetail}>
              {" "}
              <span className={Styles.titlesinfo}>Capital: </span>{" "}
              {countrie?.capital}
            </p>
            <p className={Styles.infodetail}>
              {" "}
              <span className={Styles.titlesinfo}>Sub Region: </span>{" "}
              {countrie?.subregion}
            </p>
            <p className={Styles.infodetail}>
              {" "}
              <span className={Styles.titlesinfo}>Area: </span> {countrie?.area}{" "}
              km²
            </p>
            <p className={Styles.infodetail}>
              {" "}
              <span className={Styles.titlesinfo}>Population: </span>{" "}
              {countrie?.population}
            </p>
          </div>
          <div className={Styles.divAct}>
            <h2 className={Styles.activ}>Activities:</h2>
            {countrie.activities?.length > 0 ? (
              countrie.activities?.map((a) => (
                <div className={Styles.activity}>
                  <p key={a.id} className={Styles.elementsAct}>
                    <li className={Styles.liAct}>
                      {" "}
                      <span className={Styles.spanAct}>Name:</span> {a.name}
                    </li>
                    <li className={Styles.liAct}>
                      {" "}
                      <span className={Styles.spanAct}>Season:</span> {a.season}
                    </li>
                    <li className={Styles.liAct}>
                      {" "}
                      <span className={Styles.spanAct}>Duration:</span>{" "}
                      {a.duration}
                    </li>
                    <li className={Styles.liAct}>
                      {" "}
                      <span className={Styles.spanAct}>Difficulty:</span>{" "}
                      {a.difficulty}
                    </li>
                  </p>
                </div>
              ))
            ) : (
              <p className={Styles.ntfA}>not found activity</p>
            )}
          </div>
        </>
      ) : (
        <span>Country Not Found</span>
      )}
    </div>
  );
}
