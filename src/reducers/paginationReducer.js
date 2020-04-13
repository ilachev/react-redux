import * as actionTypes from '../actions';

const initialState = {
    page: 0,
    rowsPerPage: localStorage.getItem('rowsPerPage') ? JSON.parse(localStorage.getItem('rowsPerPage')) : 10,
    count: 0
};

const paginationReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_PAGE:
            return {
                ...state,
                page: action.page,
            };

        case actionTypes.CHANGE_ROWS_PER_PAGE:
            return {
                ...state,
                rowsPerPage: action.rowsPerPage,
            };


        case actionTypes.SET_COUNT:
            return {
                ...state,
                count: action.count,
            };

        default:
            return state;
    }
};

export default paginationReducer;