// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { getCountries } from "../../actions/index.js";
// import axios from "axios";
// import Styles from "./createactivity.module.css";

// // function formValidate(a) {
// //   let error = {};
// //   !a.name && (error.name = "Name is required");
// //   !a.difficulty && (error.difficulty = "Difficulty is required");
// //   !a.duration && (error.duration = "Duration is required");
// //   !a.season && (error.season = "Season is required");
// //   !a.countries && (error.countries = "Country is required");
// //   if (/^([0-9])*$/.test(a.name)) {
// //     error.name = "Numbers are not allowed";
// //   }
// //   return error;
// // }

// function validate(input, countryId) {
//   let errors = {};
//   if (!input.name) {
//     errors.name = "Se requiere un Nombre";
//   }
//   if (/^([0-9])*$/.test(input.name)) {
//     errors.name = "Numeros no permitidos";
//   }
//   if (!input.dificulty) {
//     errors.dificulty = "se requiere completar la dificultad";
//   }
//   if (input.dificulty >= 5 || input.dificulty <= 1) {
//     errors.dificulty = "se requiere colocar una dificultad entre 1-5";
//   }
//   if (!input.duration) {
//     errors.duration = "se requiere completar la duracion";
//   }
//   if (input.duration > 24) {
//     errors.duration = "agregar duracion menor a 24 hs";
//   }
//   if (!input.season.length) {
//     errors.season = "se requiere seleccionar la temporada de la actividad";
//   } else if (!countryId.length) {
//     errors.countryId = "se requiere seleccionar pais";
//   }
//   return errors;
// }

// export default function CreateActivity() {
//   const dispatch = useDispatch();
//   const countries = useSelector((state) => state.allCountries);
//   const [errors, setErrors] = useState({});
//   const [countryId, setCountryId] = useState([]);

//   const [activityPost, setActivityPost] = useState({
//     //creo estado con la actividad q se va a postear
//     name: "",
//     dificulty: "",
//     duration: "",
//     season: "",
//   });
//   useEffect(() => {
//     dispatch(getCountries());
//   }, [dispatch]);

//   function handleChange(e) {
//     if (e.target.name === "countryId") {
//       setCountryId([...countryId, e.target.value]);
//     } else {
//       setActivityPost({
//         ...activityPost,
//         [e.target.name]: e.target.value,
//       });
//     }
//   }

//   // setErrors(
//   //   validate({ ...activityPost, [e.target.name]: e.target.value }, countryId)
//   // );

//   function handleDelete(e) {
//     setCountryId(countryId.filter((occ) => occ !== e));
//     console.log("COUNTRYID", countryId);
//   }
//   async function handleSubmit(e) {
//     e.preventDefault();
//     const activityComplete = { ...activityPost, countryId: countryId }; //uno el objeto de activityPost con el estado de country

//     // if (Object.keys(errors).length === 0) {
//     //     //posteo la actividad desde el axios
//     //     const res = await axios.post('http://localhost:3001/activity', activityComplete);
//     //     alert("Actividad creada!")
//     //     setActivityPost({ //y seteo el estado
//     //         name: "",
//     //         dificulty: "",
//     //         duration: "",
//     //         season: "",
//     //     });
//     //     setCountryId([])

//     // } else if (Object.keys(errors).length > 0) {
//     //     alert("Debes completar todos los campos requeridos para agregar la Actividad")
//     // }
//   }

//   return (
//     <form
//       className={Styles.Todo}
//       onSubmit={(e) => {
//         handleSubmit(e);
//       }}
//     >
//       <section className={Styles.name}>
//         {/* link a pagina principal */}
//         <Link to="/countries">
//           <button className={Styles.Button}>Volver A Paises</button>
//         </Link>
//         <h1>Crea la actividad turistica</h1>

//         <div className={Styles.Name}>
//           <input
//             type="text"
//             placeholder="Nombre..."
//             onChange={(e) => {
//               handleChange(e);
//             }}
//           />
//           {errors.name && <p className={Styles.p}>{errors.name}</p>}
//         </div>

//         <div className={Styles.form1}>
//           <div className={Styles.form1}>
//             <label>Dificultad:</label>
//             <select
//               name="dificulty"
//               value={activityPost.dificulty}
//               onChange={(e) => handleChange(e)}
//             >
//               <option value="1">1</option>
//               <option value="2">2</option>
//               <option value="3">3</option>
//               <option value="4">4</option>
//               <option value="5">5</option>
//             </select>
//             {errors.dificulty && <p className={Styles.p}>{errors.season}</p>}
//           </div>

//           {errors.dificulty && <p className={Styles.p}>{errors.dificulty}</p>}
//         </div>
//         <div className={Styles.form1}>
//           <label>Duracion (en horas) :</label>

//           <input
//             className={Styles.inputForm}
//             type="number"
//             value={activityPost.duration}
//             name="duration"
//             onChange={(e) => handleChange(e)}
//           ></input>
//           {errors.duration && <p className={Styles.p}>{errors.duration}</p>}
//         </div>
//         <div className={Styles.form1}>
//           <label>Temporada del año:</label>
//           <select
//             name="season"
//             value={activityPost.season}
//             onChange={(e) => handleChange(e)}
//           >
//             <option value="temporada">Temporada</option>
//             <option value="verano">Verano</option>
//             <option value="invierno">Invierno</option>
//             <option value="primavera">Primavera</option>
//             <option value="otoño">Otoño</option>
//           </select>
//           {errors.season && <p className={Styles.p}>{errors.season}</p>}
//         </div>

//         <label> Selecciona el Pais </label>
//         <select name="countryId" onChange={(e) => handleChange(e)}>
//           <option>Paises</option>
//           {countries.map((c) => (
//             <option key={c.id} value={c.id}>
//               {c.name}
//             </option>
//           ))}
//         </select>

//         <button className={Styles.btnForm2} type="submit">
//           Crear Actividad
//         </button>

//         {countryId.map((el) => (
//           <div>
//             <p className={Styles.form1}>{el}</p>
//             <button onClick={() => handleDelete(el)}>X</button>
//           </div>
//         ))}
//       </section>
//     </form>
//   );
// }

/************************************************************************ */

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

  const handleDelete = (e) => {
    setInput({
      ...input,
      countries: input.countries.filter((c) => c !== e),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // axios.post(constantes.ACTIVITY_URL, input)
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

  return (
    <div className="divcreate">
      <Link to="/countries">
        <button className="back">Back</button>
      </Link>
      <h2 className="title">Add a new tourist activity 🏄</h2>
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
            onChange={handleChange}
            required="required"
            name="duration"
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
          {input.countries.map((el) => (
            <div className="a">
              <p className="countriesAdd">
                {el}
                <button className="btnDel" onClick={() => handleDelete(el)}>
                  x
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
