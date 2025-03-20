import * as types from '../action-types'

const initialState = {
    identity: {},
    tasks: []
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.UPLOAD_DATA_TYPE:
            return {
                ...state,
                identity: action.payload,
                tasks: [...state.tasks, action.payload]
            };

        default:
            return state
    }
}