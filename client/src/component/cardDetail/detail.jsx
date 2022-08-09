import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getId, reSetDetails } from "../../redux/action";
import "./detail.css";

const Detail = (props) => {
  const dispatch = useDispatch();

  const dogDetail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getId(props.match.params.id));
  }, [props.match.params.id, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(reSetDetails());
    };
  }, [dispatch]);
  console.log(dogDetail, "se llena el selector");
  return (
    <div className="contieneDetail">
     
        {dogDetail ? (
          <div className="card">
            <div className="divImagen">
            <img className="img" src={dogDetail.image} alt="broken" />
            </div>
            <div className="nombreDetail">
              <span>
                Hola! <br /> mi nombre es... <br /> <br /> {dogDetail.name}
              </span>
            </div>
            <div className="tempCardDetalle">
              <span className="tempDet">
                mis temperamentos son: <br /> <br />
                {Array.isArray(dogDetail.temperaments)
                  ? dogDetail.temperaments.join(", ")
                  : dogDetail.temperaments}
              </span>
            </div>
            <div className="alturaDetail">
              <span>
                Altura: {dogDetail.height ? dogDetail.height : "not found"} cm
              </span>
            </div>
            <div className="pesoDetail">
              <span>
                Peso: {dogDetail.weight ? dogDetail.weight : "not found"} kg
              </span>
            </div>
            <div className="lifeSpan">
              <span>
                mi esperanza de vida es de: {dogDetail.life_span}
              </span>
            </div>
            <div className="volverDetail">

            <Link to= "/home"><button className="volverDetail">volver</button></Link>
            </div>
          </div>
        ) : (
          <p> ¡Vaya! Falta un perro ( ˘︹˘ )</p>
        )}
      
    </div>
  );
};

export default Detail;
