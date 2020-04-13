import { fetchProject, fetchStatistic } from "./projectActions";
import axios from "../utils/axios";
import { changePage } from "./paginationActions";
import { stringify } from "qs";

/*
 * action types
 */

export const TOGGLE_FILTER = 'TOGGLE_FILTER';
export const CHANGE_FILTER = 'CHANGE_FILTER';
export const CLEAR_FILTER = 'CLEAR_FILTER';
export const RECEIVE_FILTER_OPTIONS = 'RECEIVE_FILTER_OPTIONS';
export const REQUEST_PLACES = 'REQUEST_PLACES';
export const RECEIVE_PLACES = 'RECEIVE_PLACES';

/*
 * action creators
 */

export function toggleFilter(isOpen) {
    return {
        type: TOGGLE_FILTER,
        isOpen
    }
}

export function changeFilter(field, value) {
    return {
        type: CHANGE_FILTER,
        field,
        value
    }

}

export function clearFilter() {
    return {
        type: CLEAR_FILTER
    }
}

function receiveFilterOptions(options) {
    return {
        type: RECEIVE_FILTER_OPTIONS,
        options
    }
}

function requestPlaces() {
    return {
        type: REQUEST_PLACES
    }
}

export function receivePlaces(places) {
    return {
        type: RECEIVE_PLACES,
        places
    }
}

export function fetchFilterOptions(slug, id) {
    return function (dispatch) {
        return axios.get(`/api/actualization/projects/${slug}/${id}/filter`)
            .then(response => {
                dispatch(receiveFilterOptions(response.data));
            });
    }
}

export function applyFilter(slug, id) {
    return function (dispatch) {
        dispatch(changePage(0));
        dispatch(toggleFilter(false));
        dispatch(fetchProject(slug, id));
        dispatch(fetchStatistic(slug, id));
    }
}

export function fetchPlacesForProject(slug, id, placeQuery) {
    return function (dispatch) {
        dispatch(requestPlaces());

        return axios.get(`/api/actualization/projects/${slug}/${id}/search`, {
            params: {
                placeQuery
            },
            paramsSerializer: params => stringify(params)
        })
            .then(response => {
                dispatch(receivePlaces(response.data));
            });
    }
}
