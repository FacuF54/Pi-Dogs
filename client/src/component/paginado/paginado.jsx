import React from "react";
import  "./paginado.css";

export default function Paginado({ currentDog, allDogs, paginado, currentPage}) {
  const numeroDePagina = [];
  
  for (let i = 1; i <= Math.ceil(allDogs / currentDog); i++) {
    numeroDePagina.push(i);
  }

  let ultimaPagina = numeroDePagina.length;
  
  return (
    <nav>
      <div className="paginado">
        <button onClick={()=>paginado(currentPage === 1? currentPage : currentPage-1 )} className="active">🡸</button>
        {numeroDePagina?.map((e) => {
            return (
            <button onClick={() => paginado(e)} key={e} className={e === currentPage ? "active" : "otros"}>
              {e}
            </button>
          );
        })}
         <button onClick={()=>paginado(currentPage === ultimaPagina? currentPage : currentPage+1  )} className="active">🡺</button>
       
      </div>
    </nav>
  );
}
