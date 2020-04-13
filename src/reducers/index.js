import { combineReducers } from 'redux';

import paginationReducer from "./paginationReducer";
import projectReducer from "./projectReducer";
import filterReducer from "./filterReducer";

const rootReducer = combineReducers({
    pagination: paginationReducer,
    project: projectReducer,
    filter: filterReducer
});

export default rootReducer;