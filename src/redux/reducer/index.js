import * as types from '../action-types'

const initialState = {
    identity: {}
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_NEW_TASK:
            return { ...state, identity: action.payload }

        default:
            return state
    }
}