import { createStore, applyMiddleware } from "redux"
import { thunk } from "redux-thunk"
import { reducer } from "./reducer/index"

const reduxStore = createStore(reducer, applyMiddleware(thunk))

export default reduxStore;