import { loadParents } from "../reducers/voteReducer";
import { ip } from "../../screens/gimnazist/RegForm";

export const fetchParents = () => {
    return dispatch => {
        fetch(`https://${ip}/parents/`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(response =>
            dispatch(loadParents(response))
        )
        .catch(error => console.log(error));
    };
};