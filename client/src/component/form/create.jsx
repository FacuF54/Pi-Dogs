import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postBreed, getTemps, getDogs } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import "./create.css";

function validateForm(input) {
  // ^ coincidencia en todas las lineas ?! coincide con siempre que no este en blanco * coincidencia de muchas letras repetidas
  // $ coincide con lo ultimo /gm coincide todos los caracteres en multiples lineas 
  let pattern =  /^[0-9]+[ ]+[-]+[ ]+[0-9]*$/;
  let expresion = /^(?![ .]+$)[a-zA-Z .]*$/gm;
  

  let errors = {};

  if (!input.name) {
    errors.name = "ingrese un nombre";
  } else if (!expresion.test(input.name)) {
    errors.name ="el nombre solo debe contener letras y no debe superar los 9 caracteres";
  } else if (!input.height) {
    errors.height = "la altura es requerida 'min - max'";
  } else if (!pattern.test(input.height)) {
    errors.height ="La altura debe tener un valor minimo seguido de espacio - espacio ( - ) y un valor maximo";
  } else if (parseInt(input.height.split(" - ")[0]) >= parseInt(input.height.split(" - ")[1])) {
    errors.height = "el primer nuemero debe ser menor que el segundo";
  } else if (
    parseInt(input.height.split(" - ")[0]) <= 0 ||
    parseInt(input.height.split(" - ")[1]) <= 0 ||
    parseInt(input.height.split(" - ")[0]) > 20 ||
    parseInt(input.height.split(" - ")[1]) > 35
  ) {
    errors.height = "no se permite numeros mayores a 20, negativos o 0";
  } else if (!input.weight) {
    errors.weight = "el peso es requerido 'min - max'";
  } else if (!pattern.test(input.weight)) {
    errors.height ="La altura debe tener un valor minimo seguido de espacio - espacio ( - ) y un valor maximo";
  } else if (parseInt(input.weight.split(" - ")[0]) >= input.weight.split(" - ")[1]) {
    errors.weight = "el primer nuemero debe ser menor que el segundo";
  } else if (
    parseInt(input.weight.split(" - ")[0]) <= 0 || 
    parseInt(input.weight.split(" - ")[1]) <= 0 ||
    parseInt(input.weight.split(" - ")[0]) > 50 || 
    parseInt(input.weight.split(" - ")[1]) > 90 
  ) {
    errors.weight = "no se permite numeros mayores a 20, negativos o 0";
  } else if (!input.life_span) {
    errors.life_span = "la esperanza de vida es requerida 'min - max'";
  } else if (!pattern.test(input.life_span)) {
    errors.life_span =
      "La altura debe tener un valor minimo seguido de espacio - espacio ( - ) y un valor maximo";
  } else if (parseInt(input.life_span.split(" - ")[0]) >= parseInt(input.life_span.split(" - ")[1])){
    errors.life_span = "el primer nuemero debe ser menor que el segundo";
  } else if (
    parseInt(input.life_span.split(" - ")[0]) <= 0 ||
    parseInt(input.life_span.split(" - ")[1]) <= 0 ||
    parseInt(input.life_span.split(" - ")[0]) > 8 || 
    parseInt(input.life_span.split(" - ")[1]) > 25 
  ) {
    errors.life_span = "no se permite numeros mayores a 20, negativos o 0";
  }
  return errors;
}

export default function Created() {
  const dispatch = useDispatch();
  const history = useHistory();
  const temperaments = useSelector((state) => state.temperaments);
  const nameDogs = useSelector((state) => state.allDogs);

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    height: "",
    weight: "",
    life_span: "",
    image: "",
    temperament: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validateForm({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelect(e) {
    if (!input.temperament.includes(e.target.value)) {
      setInput({
        ...input,
        temperament: [...input.temperament, e.target.value],
      });
    }
  } //

  function handleSubmit(e) {
    e.preventDefault();
    const validatioName = nameDogs.filter((e) => e.name === input.name)

    console.log(validatioName)
    console.log( input.name)
    if (!input.temperament.length) {
      alert("ingresa al menos un temperamento");
    } else {
      if (validatioName.length) {
        alert("el nombre ya existe");
      } else {
        if (
          errors.name !== undefined ||
          errors.weight !== undefined ||
          errors.height !== undefined ||
          errors.life_span !== undefined
        ) {
          alert("Revisa los errores");
        } else {
          dispatch(postBreed(input));
          setInput({
            name: "",
            height: "",
            weight: "",
            life_span: "",
            image: "",
            temperament: [],
          });
          e.target.reset();
          alert("Felicidades! create tu perrito ʕ•́ᴥ•̀ʔっ");
          
          history.push("/home");
        }
      }
    }
  }

  function handleDelete(el) {
    setInput({
      ...input,
      temperament: input.temperament.filter((temp) => temp !== el),
    });
  }

  useEffect(() => {
    dispatch(getTemps());
    dispatch(getDogs());
  }, [dispatch]);

  return (
    <div className="breed-main-container">
      <nav className="breed-nav">
        <div className="breed-titles">
          <h1>Ingresa los datos del perro:</h1>
        </div>
        <Link to="/home">
          <button className="create-btn">Go back home</button>
        </Link>
      </nav>

      <div className="flex-container">
        <form onSubmit={(e) => handleSubmit(e)} className="form">
          <div className="form__section">
            <input
              type="text"
              value={input.name}
              name="name"
              required
              placeholder="Name"
              onChange={(e) => handleChange(e)}
              className="form__input"
            />
            {errors.name && <p>{errors.name}</p>}
          </div>
          <div className="form__section">
            <input
              type="text"
              value={input.height}
              name="height"
              required
              placeholder="Height... e.g: 20 - 35"
              onChange={(e) => handleChange(e)}
              className="form__input"
            />
            {errors.height && <p>{errors.height}</p>}
          </div>

          <div className="form__section">
            <input
              type="text"
              value={input.weight}
              name="weight"
              required
              placeholder="Weight... e.g: 1 - 95"
              onChange={(e) => handleChange(e)}
              className="form__input"
            />
            {errors.weight && <p>{errors.weight}</p>}
          </div>

          <div className="form__section">
            <input
              type="text"
              value={input.life_span}
              name="life_span"
              required
              placeholder="Life span... e.g: 5 - 16"
              onChange={(e) => handleChange(e)}
              className="form__input"
            />

            {errors.life_span && <p>{errors.life_span}</p>}
          </div>
          <div className="form__section">
            <input
              type="text"
              value={input.image}
              name="image"
              placeholder="Imagen... https://..."
              onChange={(e) => handleChange(e)}
              className="form__input"
            />
          </div>
          <div className="form__section">
            <h4>Elije uno o mas temperamentos</h4>
            <select onChange={(e) => handleSelect(e)} className="form__input">
              {temperaments.map((temp, i) => {
                return (
                  <option value={temp} key={i} className="form__input">
                    {temp}
                  </option>
                );
              })}
            </select>
            <ul>
              {input.temperament?.map((el) => "  ---  " + el + "  ---  ")}
            </ul>
            {errors.temperament && <p>{errors.temperament}</p>}
          </div>

          <div className="delete-container">
            {input.temperament.map((el) => (
              <div>
                <button className="delete-btn" onClick={() => handleDelete(el)}>
                  x
                </button>
              </div>
            ))}
          </div>

          <button type="submit" className="create-btn">
            Ready!
          </button>
        </form>
        <div className="form-img">
          <div className="img-container">
            <div>
              <img
                src="https://th.bing.com/th/id/OIP.dLE9ClSq5JjEINA_jefv-AHaEC?pid=ImgDet&rs=1"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
