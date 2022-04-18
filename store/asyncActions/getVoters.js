import { loadVoters } from "../reducers/voteReducer";
import { ip } from "../../screens/gimnazist/RegForm";

export const fetchVoters = () => {
    return dispatch => {
        fetch(`https://${ip}/voters/`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(response =>
            dispatch(loadVoters(response))
        )
        .catch(error => console.log(error));
    };
};
