import { CHANGE_ROWS_PER_PAGE } from "../actions";

export const paginationMiddleware = store => next => action => {
    if (action.type === CHANGE_ROWS_PER_PAGE) {
        if (JSON.parse(localStorage.getItem('rowsPerPage')) !== action.rowsPerPage) {
            localStorage.setItem('rowsPerPage', JSON.stringify(action.rowsPerPage));
        }
    }

    return next(action)
};