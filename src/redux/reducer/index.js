import * as types from '../action-types'

const initialState = {
    identity: {},
    employee: {}
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.UPLOAD_EMPLOYEE_TYPE: {
            return { ...state, employee: action.employee }
        }
        case types.UPLOAD_DATA_TYPE:
            return { ...state, identity: action.payload }

        default:
            return state
    }
}