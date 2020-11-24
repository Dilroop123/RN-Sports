
import { CREATE_LINK_WORKOUT } from '../actions/LinkWorkout';

const initialState = {

    LinkWorkout: []
};

export default (state = initialState, action) => {

    switch (action.type) {


        case CREATE_LINK_WORKOUT:


            return {
                ...state
            }


    }
    return state;
};

