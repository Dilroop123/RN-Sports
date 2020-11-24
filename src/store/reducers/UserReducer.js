
import { CREATE_USER, SET_USER, SET_COACH } from '../actions/UserAction';

const initialState = {
    UserData: [],
    CoachData: []
};

export default (state = initialState, action) => {

    switch (action.type) {


        case CREATE_USER:


            return {
                ...state
            }
        case SET_USER:


            return {
                ...state, UserData: action.userdata
            }

        case SET_COACH:


            return {
                ...state, CoachData: action.coachesData
            }

    }
    return state;
};

