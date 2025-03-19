import * as types from '../action-types'

const initialState = {
    identity: {},
    user: {},
    error: null
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.UPLOAD_EMPLOYEE_TYPE:
            return { ...state, user: action.payload };

        case types.UPLOAD_EMPLOYEE_FAIL:
            return { ...state, error: action.error };

        case types.UPLOAD_DATA_TYPE:
            return { ...state, identity: action.payload };

        default:
            return state
    }
}