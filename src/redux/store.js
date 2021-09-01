import { applyMiddleware, createStore } from "redux";
import rootReducer from "./root-reducer";
import reduxThunk from "redux-thunk";
import logger from 'redux-logger'

const middleware = [ reduxThunk ]

middleware.push(logger)

const store = createStore(rootReducer, applyMiddleware(...middleware))

export default store
