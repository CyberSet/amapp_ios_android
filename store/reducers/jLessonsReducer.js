import { SET_SUBJECTS, PICK_DAY, SET_OBJECT_LESSON, SET_LESSON_TYPES } from "../actions/actions";

const initialState = {
    subjects: '',
    day: '',
    objectLesson: null,
    lessonTypes: null,
    comments: null
};

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

        case SET_OBJECT_LESSON:

            return {
                ...state,
                objectLesson: action.payload
            }

        case SET_LESSON_TYPES:

            return {
                ...state,
                lessonTypes: action.payload
            }

        default:
            return state;
    }
};