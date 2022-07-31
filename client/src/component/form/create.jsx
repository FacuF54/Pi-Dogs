import React, {useState, useEffect} from "react";
import {Link, useHistory} from 'react-router-dom';
import {postBreed, getTemps, getDogs} from '../../redux/action';
import { useDispatch, useSelector } from "react-redux";
import './create.css'


function validateForm(input){
    
    let errors = {};
    if(!input.name){
        errors.name = "El nombre es requerido";
    }
    if(!input.height){
        errors.height = "la altura es requerida 'min - max'";
    }
    if(!input.weight){
        errors.weight = "el peso es requerido 'min - max'";
    }
    if(!input.life_span){
        errors.life_span = "la esperanza de vida es requerida 'min - max'";
    }
    if(!input.temperament.length){
        errors.temperament = "al menos un temperamento es requerido"
    }

    return errors;
        
}

export default function Created(){
    const dispatch = useDispatch();
    const history = useHistory()
    const temperaments = useSelector((state) => state.temperaments);
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({ 
        name: "",
        height: "",
        weight: "",
        life_span: "",
        image:"",
        temperament: [] 
    })

    function handleChange(e){
        if (input.temperament.includes(e.target.value)) {
            alert("ya seleccionaste este temperamento, vuelve a intentarlo");
        } else{
        setInput({  
            ...input,
            [e.target.name] : e.target.value
        })

        setErrors(validateForm({
            ...input,
            [e.target.name] :  e.target.value, 
        }))}
        
    }

    function handleSelect(e){
       
        if (input.temperament.includes(e.target.value)) {
            alert("ya seleccionaste este temperamento, vuelve a intentarlo");
        } else{
        setInput({
              ...input,
            temperament: [...input.temperament,  e.target.value ] 
        })}
        
    } //

    function handleSubmit(e){
        e.preventDefault();
        if(!input.temperament.length){
            alert("ingresa al menos un temperamento")
         }else{
             if (
                 errors.name &&
                 errors.weight &&
                 errors.height &&
                 errors.life_span &&
                 errors.temperament.length 
             ){
                alert("Revisa los errores")
            }else{
             dispatch(postBreed(input));
             setInput({
                 name: "",
                 height: "",
                 weight: "",
                 life_span: "",
                 image:"",
                 temperament: []
             })
                 e.target.reset();
                alert("Felicidades! create tu perrito ʕ•́ᴥ•̀ʔっ")
                history.push('/home')
            
            }
         }
    }

    function handleDelete(el){
        setInput({
            ...input,
            temperament: input.temperament.filter(temp => temp !== el)
        })
    }

    useEffect(() => {
        dispatch(getTemps());
        dispatch(getDogs())
    }, [dispatch]);

    return(
        <div className='breed-main-container'>
            <nav className='breed-nav'>
                <div className='breed-titles'>
                    <h1>Ingresa los datos del perro:</h1>
                </div>
                <Link to='/home'><button className='create-btn'>Go back home</button></Link>

            </nav>
            
            <div className='flex-container'>
            <form onSubmit={(e) => handleSubmit(e)} className='form'>
                <div className='form__section'>
                    
                    <input
                    type="text"
                    value={input.name}
                    pattern="[A-zÁÉÍÓÚÑáéíóúñA z]{1,20}"
                    name="name"
                    required
                    title="el nombre solo debe contener letras y no debe superar los 9 caracteres"
                    placeholder="Name"
                    onChange={(e) => handleChange(e)}
                    className='form__input'
                    />
                    {errors.name && (
                        <p>{errors.name}</p>
                    )}
                </div>
                <div className='form__section'>
                    
                

                    <input
                    type="text"
                    value={input.height}
                    name="height"
                    pattern="[0-9]{1,2}[ ][-][ ][0-9]{1,2}"
                    required
                    title="La altura debe tener un valor máximo seguido de espacio - espacio ( - ) y un valor mínimo"
                    placeholder="Height... e.g: 20 - 35"
                    onChange={(e) => handleChange(e)}
                    className='form__input'
                    />
                    {errors.height && (
                        <p>{errors.height}</p>
                    )}

                </div>
                
                
                
                <div className='form__section'>
                
                    <input
                    type="text"
                    value={input.weight}
                    name="weight"
                    pattern="[0-9]{1,2}[ ][-][ ][0-9]{1,2}"
                    required
                    title="El peso debe tener un valor máximo seguido de espacio - espacio ( - ) y un valor mínimo"
                    placeholder="Weight... e.g: 1 - 95"
                    onChange={(e) => handleChange(e)}
                    className='form__input'
                    />
                    {errors.weight && (
                        <p>{errors.weight}</p>
                    )}

                </div>

                

                <div className='form__section'>
                    
                    <input
                    type="text"
                    value={input.life_span}
                    name="life_span"
                    pattern="[0-9]{1,2}[ ][-][ ][0-9]{1,2}"
                    required
                    title="La esperanza de vida debe tener un valor máximo seguido de espacio - espacio ( - ) y un valor mínimo"
                    placeholder="Life span... e.g: 5 - 16"
                    onChange={(e)=> handleChange(e)}
                    className='form__input'
                    

                    />
                    
                    {errors.life_span && (
                        <p>{errors.life_span}</p>
                    )}

                </div>
                <div className='form__section'>
                    
                    <input
                    type="text"
                    value={input.image}
                    name="image"
                    placeholder="Imagen... https://..."
                    onChange={(e)=> handleChange(e)}
                    className='form__input'
                    />

                </div>
                <div className='form__section'>
                    <h4>Elije uno o mas temperamentos</h4>
                    <select onChange={(e) => handleSelect(e)} className='form__input' >
                        {temperaments.map((temp, i) => {
                        return <option value={temp} key={i} className='form__input'>{temp}</option>
                        })

                        }

                    </select>
                    <ul>{input.temperament?.map(el => "  ---  " + el + "  ---  ")}</ul>
                    {errors.temperament && (
                        <p>{errors.temperament}</p>
                    )}
                </div>
                
                <div className='delete-container'>
                    {input.temperament.map(el => 
                        <div>
                            
                            <button className='delete-btn' onClick={() => handleDelete(el)}>x</button>
                        </div>

                    )}
                </div>
                
                
                <button type='submit' className='create-btn'>Ready!</button>
            
            </form>
            <div className='form-img'>
                <div className='img-container'>
                    <div>
                        <img src="https://th.bing.com/th/id/OIP.dLE9ClSq5JjEINA_jefv-AHaEC?pid=ImgDet&rs=1" alt="" />

                    </div>

                </div>

            </div>

            

        </div>

        </div>
        
        
    )
}