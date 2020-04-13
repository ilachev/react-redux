/*
 * action types
 */

export const CHANGE_PAGE = 'CHANGE_PAGE';
export const CHANGE_ROWS_PER_PAGE = 'CHANGE_ROWS_PER_PAGE';
export const SET_COUNT = 'SET_COUNT';


/*
 * action creators
 */

export function changePage(page) {
    return {
        type: CHANGE_PAGE,
        page: page
    }
}

export function changeRowsPerPage(rowsPerPage) {
    return {
        type: CHANGE_ROWS_PER_PAGE,
        rowsPerPage: rowsPerPage
    }
}

export function setCount(count) {
    return {
        type: SET_COUNT,
        count: count
    }
}