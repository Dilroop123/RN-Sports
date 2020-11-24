import { CREATE_WORKOUT, SET_WORK_OUT, DELETE_WORKOUT, SET_WORK_OUT_DETAIL } from "../actions/WorkoutAction";

const initialState = {
    WorkoutData: [],
    WorkoutDataDetail: []
};

export default (state = initialState, action) => {

    switch (action.type) {


        case CREATE_WORKOUT:


            return {
                ...state
            }

        case SET_WORK_OUT:


            return {
                ...state, WorkoutData: action.Workoutdata
            }
        case SET_WORK_OUT_DETAIL:


            return {
                ...state, WorkoutDataDetail: action.dataDetail
            }
        case DELETE_WORKOUT:


            return {
                ...state
            }

    }
    return state;
};
//


