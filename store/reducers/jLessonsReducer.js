const initialState = {
    subjects: '',
    lesson: ''
};

const SET_SUBJECTS = 'SET_SUBJECTS';
const PICK_SUBJECT = 'PICK_SUBJECT';

export const setSubjects = (subjects) => {
    return {
        type: SET_SUBJECTS,
        payload: subjects
    };
};

export const pickSubject = (lesson) => {
    return {
        type: PICK_SUBJECT,
        payload: lesson
    }
}

export const jLessonsReducer = (state=initialState, action) => {
    switch(action.type) {
        case SET_SUBJECTS:

            return {
                ...state,
                subjects: action.payload
            }

        case PICK_SUBJECT:

            return {
                ...state,
                lesson: action.payload
            }

        default:
            return state;
    }
};