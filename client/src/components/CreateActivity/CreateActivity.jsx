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
//   let errors = [];
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
