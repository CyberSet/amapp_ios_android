const initialState = {
    subjects: '',
    day: '',
    objectLesson: null,
    lessonTypes: null
};

const SET_SUBJECTS = 'SET_SUBJECTS';
const PICK_DAY = 'PICK_DAY';
const SET_OBJECT_LESSON = 'SET_OBJECT_LESSON';
const SET_LESSON_TYPES = 'SET_LESSON_TYPES';

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

export const setObjectLesson = (lesson) => {
    return {
        type: SET_OBJECT_LESSON,
        payload: lesson
    }
}

export const setLessonTypes = (types) => {
    return {
        type: SET_LESSON_TYPES,
        payload: types
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