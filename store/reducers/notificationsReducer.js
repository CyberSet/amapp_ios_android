const initialState = {
    pushToken: '',
    message: '',
    status: ''
};

export const notificationsReducer = (state=initialState, action) => {
    switch(action.type) {
        case 'SET_TOKEN':

            return {
                ...state,
                pushToken: action.payload
            };

        case 'SET_MESSAGE':
            
            return {
                ...state,
                message: action.payload
            }

        case 'SET_STATUS':
            
            return {
                ...state,
                status: action.payload
            }

        default:

            return state
    }

};