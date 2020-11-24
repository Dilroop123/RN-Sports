export const CREATE_WORKOUT = "CREATE_WORKOUT";
export const SET_WORK_OUT = "SET_WORK_OUT";
export const DELETE_WORKOUT = "DELETE_WORKOUT";
export const SET_WORK_OUT_DETAIL = "SET_WORK_OUT_DETAIL";

import baseUrl from "../../constants/baseUrl";

export const createWorkout = (Exercise, Sets, Reps, Tempo, Rest, userId, workoutDate) => {

  return async (dispatch) => {
    const response = await fetch(baseUrl.url + "AddTrainings/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Exercise,
        Sets,
        Reps,
        Tempo,
        Rest,
        userId,
        workoutDate
      }),
    });

    const resData = await response.json();


    dispatch({
      type: CREATE_WORKOUT,
      Workoutdata: resData,
    });
  };
};



export const getWorkoutsByCoach = (user) => {
  return async (dispatch) => {
    const response = await fetch(baseUrl.url + "AddTrainings/getWorkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({

        user
      }),
    });

    const resData = await response.json();


    dispatch({
      type: SET_WORK_OUT,
      Workoutdata: resData,
    });
  };
};

export const workoutDetail = (CoachId, Date) => {
  return async (dispatch) => {
    const response = await fetch(baseUrl.url + "linkworkout/getWorkoutDetail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({

        CoachId,
        Date
      }),
    });

    const resData = await response.json();


    dispatch({
      type: SET_WORK_OUT_DETAIL,
      dataDetail: resData,
    });
  };
};







