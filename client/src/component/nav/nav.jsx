import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getName } from "../../redux/action";
import "./nav.css";

const Nav = ({ setOrder, setPage }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getName(name));
    setName("");
    setPage(1); 
    setOrder(`Order ${e.target.value}`); 
  }
  return (
    <div className="searchbar">
      <input
        className="inputNav"
        type="text"
        placeholder="Busca un perro..."
        onChange={(e) => handleInputChange(e)}
        value={name || ""}
      />
      <button
        className="botonNav"
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Buscar
      </button>
    </div>
  );
};

export default Nav;
