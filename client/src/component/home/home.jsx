import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByNames,
  filterByTemp,
  getDogCrate,
  getDogs,
  getTemps,
  orderByWeight,
} from "../../redux/action";
import CardHome from "../cardHome/cardHome";
import "./home.css";
import Paginado from "../paginado/paginado";
import Nav from "../nav/nav";
import Carga from "../carga/carga";
import { Link } from "react-router-dom";

const Home = () => {
  const allDogs = useSelector((state) => state.dogs);
  const allTemps = useSelector((state) => state.temperaments);

  const dispatch = useDispatch();

  const [order, setOrder] = useState("");

  const [currentPage, setPage] = useState(1);
  const [currentDog, setDog] = useState(8);

  const ultimaPagina = currentPage * currentDog;
  const primerPagina = ultimaPagina - currentDog;

  const currentPerros = allDogs.slice(primerPagina, ultimaPagina);

  const paginado = (numerDePagina) => {
    setPage(numerDePagina);
    setDog(currentDog)
    setOrder(order)
  };

  useEffect(() => {
      dispatch(getTemps());
      dispatch(getDogs());
  }, [dispatch]);

  function handleReset(e) {
    e.preventDefault();
    dispatch(getDogs());
    setPage(1);
  }

  function handleFilterByCreated(e) {
    dispatch(getDogCrate(e.target.value));
  }

  function handleFilterTemp(e) {
    dispatch(filterByTemp(e.target.value));
    setPage(1);
  }

  function handleOrderByName(e) {
    e.preventDefault();
    dispatch(filterByNames(e.target.value));
    setPage(1); 
    setOrder(e.target.value); 
  }

  function handleOrderByWeight(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setPage(1);
    setOrder(e.target.value);
  }

  return (
    <div className="home">
      <nav className="nav">
        
        <Link className="linkVolver" to="/">
          <button className="volverInicio">Dogs</button>
        </Link>
        

        <Nav setOrder={setOrder} setPage={setPage} />
        
        <Link className="addDogLink" to="/create">
          <div className="crearDogi">
            <button className="crearPerro">Crear un perro</button>
          </div>
        </Link>

        <button
          className="reset"
          onClick={(e) => {
            handleReset(e);
          }}
        >
          {" "}
          Reset
        </button>
        
      </nav>

      <div className="filtrosPerros">
        <select
          className="allBreeds"
          onChange={(e) => {
            handleFilterByCreated(e);
          }}
        >
          <option value="" disabled="disabled" selected="selected">
            Perro creado o existente...
          </option>
          <option value="Exists">Perros existentes</option>
          <option value="Created">Perros creados</option>
        </select>

        <select className="temp" onChange={(e) => handleFilterTemp(e)}>
          <>
            <option value="" disabled selected="selected"> 
              elije un temperamento...
            </option>

            {allTemps.map((t,i) => {
               return <option key={i} type="checkbox" value={t}>{t}</option>
            })}
          </>
        </select>

        <select
          className="ordenAlfabetico"
          onChange={(e) => {
            handleOrderByName(e);
          }}
        >
          <option value="" disabled="disabled" selected="selected">
            elije un orden alfabetico...
          </option>
          <option value="ASC">filtrado de a-z</option>
          <option value="DES">filtrado de z-a</option>
        </select>

        <select
          className="porPeso"
          onChange={(e) => {
            handleOrderByWeight(e);
          }}
        >
          <option value="" disabled="disabled" selected="selected">
            elije un orden por peso...
          </option>
          <option value="minToMax">menor a mayor peso</option>
          <option value="maxToMin">mayor a menor peso</option>
        </select>
        
        
      </div>


      <div>
        <Paginado
          currentPage = {currentPage}
          currentDog={currentDog}
          allDogs={allDogs.length}
          paginado={paginado}
        />
      </div>

     

      <div className="dogs">
        {currentPerros.length ? (
          currentPerros.map((detail) => {
            return (
              <div key={detail.id} className="dataCard" >
                <Link to={`/home/${detail.id}`} >
                  <CardHome
                    image={detail.image}
                    name={detail.name}
                    weight={detail.weight}
                    temperaments={detail.temperaments}
                  />
                </Link>
              </div>
            );
          })
        ) : (
          <Carga />
        )}
      </div>
    </div>
  );
};

export default Home;
