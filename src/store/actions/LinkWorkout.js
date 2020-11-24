export const CREATE_LINK_WORKOUT = "CREATE_LINK_WORKOUT";


import baseUrl from "../../constants/baseUrl";

export const createLinkWorkout = (CoachId, WorkoutId, Date) => {

    return async (dispatch) => {
        const response = await fetch(baseUrl.url + "linkworkout/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                CoachId,
                WorkoutId,
                Date,

            }),
        });

        const resData = await response.json();


        dispatch({
            type: CREATE_LINK_WORKOUT,
            Workoutdata: resData,
        });
    };
};













