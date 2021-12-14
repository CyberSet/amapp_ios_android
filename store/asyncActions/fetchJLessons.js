import { setSubjects } from "../reducers/jLessonsReducer";

export const fetchLessonsList = () => {
    return dispatch => {
        fetch(`https://diary.alma-mater-spb.ru/e-journal/api/open_class_group.php?clue=${userData.clue}&user_id=${userData.user_id}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(res => {
            dispatch(setSubjects(res.subject_class_group));
        })
        .catch(err => console.log(err));
    };
};