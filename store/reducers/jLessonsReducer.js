const initialState = {
    subjects: ''
};

const SET_SUBJECTS = 'SET_SUBJECTS';

export const setSubjects = (subjects) => {
    return {
        type: SET_SUBJECTS,
        payload: subjects
    };
};

export const jLessonsReducer = (state=initialState, action) => {
    switch(action.type) {
        case SET_SUBJECTS:

            return {
                ...state,
                subjects: action.payload
            }

        default:
            return state;
    }
};