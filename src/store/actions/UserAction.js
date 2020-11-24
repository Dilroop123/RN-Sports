export const SET_USER = "SET_USER";
export const CREATE_USER = "CREATE_USER";
export const SET_COACH = "SET_COACH";
import baseUrl from "../../constants/baseUrl";


export const createUser = (email, password, displayname, userType) => {

  return async (dispatch) => {
    const response = await fetch(baseUrl.url + "users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        displayname,
        userType,

      }),
    });

    const resData = await response.json();


    dispatch({
      type: CREATE_USER,
      userdata: resData,
    });
  };
};



export const loginAthlete = (email, password) => {

  return async (dispatch) => {
    const response = await fetch(baseUrl.url + "users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password

      }),
    });

    const resData = await response.json();


    dispatch({
      type: SET_USER,
      userdata: resData,
    });
  };
};

export const getCoaches = () => {

  return async (dispatch) => {
    const response = await fetch(baseUrl.url + "users/getCoach", {
      method: "GET"
    });

    const resData = await response.json();


    dispatch({
      type: SET_COACH,
      coachesData: resData,
    });
  };
};
