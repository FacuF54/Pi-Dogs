import {
  GET_DOGS,
  GET_NAME,
  FILTER_CREATE,
  GET_TEMPS,
  FILTER_BY_TEMP,
  FILTER_BY_NAMES,
  GET_ID,
  RESET_DETAILS,
  ORDER_BY_WEIGHT,
} from "../action";

const initialState = {
  allDogs: [],
  dogs: [],
  temperaments: [],
  detail: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        allDogs: action.payload,
        dogs: action.payload,
      };

      case RESET_DETAILS:
        return {
            ...state,
            detail: {}
        }

    case GET_NAME:
      return {
        ...state,
        dogs: action.payload,
      };
    case GET_ID:
      return {
        ...state,
        detail: action.payload,
      };


    case GET_TEMPS:
      return {
        ...state,
        temperaments: action.payload,
      };
    case FILTER_CREATE:
      const allDogsCreated = state.allDogs; 
      const filteredCreatedDogs =
        action.payload === "Created"
          ? allDogsCreated.filter((dog) => typeof dog.id === "string") 
          : allDogsCreated.filter((dog) => typeof dog.id === "number");

      return {
        ...state,
        dogs: filteredCreatedDogs,
      };

    case FILTER_BY_TEMP:

    const allDogsTemps = [...state.dogs];

    const filteredTempDogs = allDogsTemps.filter((dog) => dog.temperaments?.includes(action.payload));
      return {
        ...state,
        dogs: filteredTempDogs,
      };

      case FILTER_BY_NAMES:

      let filtro = state.dogs

      let sortBreed = action.payload === 'ASC'? 

      filtro.sort(function(a,b){
              if(a.name > b.name){
                  return 1 
              }
              if(b.name > a.name){
                  return -1 
              }
              return 0 
      }) : filtro.sort(function(a,b){
              if(a.name > b.name){
                  return -1
              }
              if(b.name > a.name){
                  return 1 
              }
              return 0 
          }) 
      return{
        ...state,
        dogs: sortBreed
      }
      case ORDER_BY_WEIGHT:
            
        let arr = state.dogs.filter(el => el.weight !== false);
        
        let sortWeight = action.payload === 'minToMax'?
                
        arr.sort(function(a,b){
            return a.weight.split(/ - /)[0] - b.weight.split(/ - /)[0]      

        }) :

        arr.sort(function(a,b){
        
            return a.weight.split(/ - /)[1] - b.weight.split(/ - /)[1]
        }) 
            
        return {
            ...state,
            dogs: sortWeight
            
        }
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
