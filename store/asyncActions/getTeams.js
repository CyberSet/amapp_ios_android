import { loadTeams } from "../reducers/voteReducer";
import { ip } from "../../screens/gimnazist/RegForm";

export const fetchTeams = () => {
    return dispatch => {
        fetch(`https://${ip}/teams/`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(response =>
            dispatch(loadTeams(response))
        )
        .catch(error => console.log(error));
    };
};