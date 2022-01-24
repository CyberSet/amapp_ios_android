export const SET_SUBJECTS = 'SET_SUBJECTS';
export const PICK_DAY = 'PICK_DAY';
export const SET_OBJECT_LESSON = 'SET_OBJECT_LESSON';
export const SET_LESSON_TYPES = 'SET_LESSON_TYPES';

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
};

export const setObjectLesson = (lesson) => {
    return {
        type: SET_OBJECT_LESSON,
        payload: lesson
    }
};

export const setLessonTypes = (types) => {
    return {
        type: SET_LESSON_TYPES,
        payload: types
    }
};