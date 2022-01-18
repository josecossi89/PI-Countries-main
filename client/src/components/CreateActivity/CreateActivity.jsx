import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { postActivity } from "../../actions/index.js";
import "./createactivity.module.css";

function formValidate(a) {
  let error = {};
  !a.name && (error.name = "Name is required");
  !a.difficulty && (error.difficulty = "Difficulty is required");
  !a.duration && (error.duration = "Duration is required");
  !a.season && (error.season = "Season is required");
  !a.countries && (error.countries = "Country is required");
  if (/^([0-9])*$/.test(a.name)) {
    error.name = "Numbers are not allowed";
  }
  return error;
}

const CreateActivity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allCountries = useSelector((s) => s.countries);

  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  const [error, setError] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });

  const [button, setButton] = useState(true);

  useEffect(() => {
    input.name &&
    input.difficulty &&
    input.duration &&
    input.season &&
    input.countries
      ? setButton(false)
      : setButton(true);
  }, [input]);

  const handleSelect = (e) => {
    setInput({
      ...input,
      countries: [...input.countries, e.target.value],
    });
  };

  const handleDelete = (event, e) => {
    event.preventDefault();
    setInput({
      ...input,
      countries: input.countries.filter((c) => c !== e),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postActivity(input));
    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countries: [],
    });
    alert("Activity Created Succesfuly");
    navigate("/countries");
    setError(
      formValidate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setError(
      formValidate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };
  const validateDuration = (e) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val)) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <div className="divcreate">
      <Link to="/countries">
        <button className="back">Back</button>
      </Link>
      <h2 className="title">Add a new tourist activity </h2>
      <form className="formCreate" onSubmit={handleSubmit}>
        <label className="lab">
          Name
          <input
            required="required"
            className="inputName"
            type="text"
            onChange={(e) => handleChange(e)}
            name="name"
            value={input.name}
          />
          {error.name && <p className="error">{error.name}</p>}
        </label>
        <br />
        <br />
        <label className="lab">
          Difficulty
          <select
            required="required"
            className="selectDif"
            name="difficulty"
            onChange={(e) => handleChange(e)}
          >
            <option
              selected
              disabled
              hidden
              style={{ display: "none" }}
              value="defaultValue"
            >
              -
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          {error.difficulty && <p className="error">{error.difficulty}</p>}
        </label>
        <br />
        <br />
        <label className="lab">
          Duration (min)
          <input
            className="inputDur"
            type="number"
            onChange={(e) => {
              validateDuration(e) && handleChange(e);
            }}
            required="required"
            name="duration"
            min="0"
            step={1}
            value={input.duration}
          />
          {error.duration && <p className="error">{error.duration}</p>}
        </label>
        <br />
        <br />
        <label className="lab">
          Season
          <select
            required="required"
            className="selectSea"
            name="season"
            onChange={handleChange}
          >
            <option
              selected
              disabled
              hidden
              style={{ display: "none" }}
              value="defaultValue"
            >
              -
            </option>
            <option value="Summer">Summer</option>
            <option value="Auntumn">Autumn</option>
            <option value="Winter">Winter</option>
            <option value="Spring">Spring</option>
          </select>
          {error.season && <p className="error">{error.season}</p>}
        </label>
        <br />
        <br />
        <label className="lab">
          Countrie/s
          <select
            className="selectCount"
            required="required"
            name="country"
            onChange={(e) => handleSelect(e)}
          >
            {allCountries?.map((c) => {
              return <option value={c.id}>{c.name}</option>;
            })}
          </select>
          {error.countries && <span className="error">{error.countries}</span>}
        </label>

        <div className="addCountries">
          {input.countries.map((el, idx) => (
            <div className="a" key={idx}>
              <p className="countriesAdd">
                {el}
                <button
                  className="btnDel"
                  onClick={(event) => handleDelete(event, el)}
                >
                  {" "}
                  X{" "}
                </button>
              </p>
            </div>
          ))}
        </div>
        <br />
        <br />

        <button
          className="btnSubmit"
          disabled={button}
          type="submit"
          onClick={handleSubmit}
        >
          Add Activity
        </button>
      </form>
    </div>
  );
};

export default CreateActivity;
