const initialState = {
    teams: [],
    voters: [],
    parents: []
};

export const loadTeams = (payload) => ({type: 'LOAD_TEAMS', payload});
export const loadVoters = (payload) => ({type: 'LOAD_VOTERS', payload});
export const loadParents = (payload) => ({type: 'LOAD_PARENTS', payload});

export const VoteReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'LOAD_TEAMS':
            return {
                ...state,
                teams: action.payload
            }

        case 'LOAD_VOTERS':

            return {
                ...state,
                voters: action.payload
            }

        case 'LOAD_PARENTS':
            return {
                ...state,
                parents: action.payload
            }
        default:
            return state
    }
}