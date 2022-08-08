import axios from "axios";

export const GET_DOGS = "GET_DOGS";
export const GET_NAME = "GET_NAME";
export const FILTER_CREATE = "FILTER_CREATE";
export const GET_TEMPS = "GET_TEMPS";
export const FILTER_BY_TEMP = "FILTER_BY_TEMP";
export const FILTER_BY_NAMES = "FILTER_BY_NAMES";
export const GET_ID = "GET_ID";
export const RESET_DETAILS = "RESET_DETAILS";
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT";

export const getDogs = () => {
  return async (dispatch) => {
    const json = await axios("/dogs/").then(
      (res) => res.data
    );
    return dispatch({
      type: GET_DOGS,
      payload: json,
    });
  };
};

export const getName = (name) => async (dispatch) => {
  try {
    const data = await axios.get(`/dogs?name=${name}`);
    const data_1 = data.data;
    return dispatch({
      type: GET_NAME,
      payload: data_1,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getId = (id) => (dispatch) => {
  return axios(`/dogs/${id}`)
    .then((res) => res.data)
    .then((res) =>
      dispatch({
        type: GET_ID,
        payload: res,
      })
    );
};

export const getDogCrate = (type) => {
  return {
    type: FILTER_CREATE,
    payload: type,
  };
};

export function filterByTemp(temp) {
  return {
    type: FILTER_BY_TEMP,
    payload: temp,
  };
}

export const getTemps = () => (dispatch) => {
  return axios
    .get("/temperament")
    .then((data) => data.data)
    .then((data) =>
      dispatch({
        type: GET_TEMPS,
        payload: data,
      })
    );
};

export function filterByNames(name) {
  return {
    type: FILTER_BY_NAMES,
    payload: name,
  };
}

export function orderByWeight(payload) {
  return {
    type: ORDER_BY_WEIGHT,
    payload,
  };
}

export function reSetDetails() {
  return {
    type: RESET_DETAILS,
  };
}
export function postBreed(payload) {
  return async function () {
    const json = await axios.post("/dogs/", payload);
    return json;
  };
}
