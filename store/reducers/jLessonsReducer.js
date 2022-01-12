const initialState = {
    subjects: '',
    day: '',
};

const SET_SUBJECTS = 'SET_SUBJECTS';
const PICK_DAY = 'PICK_DAY';

export const setSubjects = (subjects) => {
    return {
        type: SET_SUBJECTS,
        payload: subjects
    };
};

export const pickDay = (day) => {
    return {
        type: PICK_DAY,
        payload: day
    }
}

export const jLessonsReducer = (state=initialState, action) => {
    switch(action.type) {
        case SET_SUBJECTS:

            return {
                ...state,
                subjects: action.payload
            }

        case PICK_DAY:

            return {
                ...state,
                day: action.payload
            }

        default:
            return state;
    }
};