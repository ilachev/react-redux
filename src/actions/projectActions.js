import axios from '../utils/axios';
import { setCount } from "./paginationActions";
import { stringify } from 'qs';
import {
    cuisineNormalizer,
    featureNormalizer,
    placeNormalizer,
    placeTypeNormalizer,
    rubricNormalizer
} from "../schemas";

const BYTES = 1000000;
const MAX_REQUEST_SIZE = 15;

/*
 * action types
 */

export const REQUEST_PROJECTS = 'REQUEST_PROJECTS';
export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';
export const REQUEST_PROJECT = 'REQUEST_PROJECT';
export const RECEIVE_PROJECT = 'RECEIVE_PROJECT';
export const REQUEST_FEATURES = 'REQUEST_FEATURES';
export const RECEIVE_FEATURES = 'RECEIVE_FEATURES';
export const RECEIVE_STATISTIC = 'RECEIVE_STATISTIC';
export const REQUEST_CHOSEN_CATEGORIES = 'REQUEST_CHOSEN_CATEGORIES';
export const RECEIVE_CHOSEN_CATEGORIES = 'RECEIVE_CHOSEN_CATEGORIES';
export const REQUEST_RUBRICS = 'REQUEST_RUBRICS';
export const RECEIVE_RUBRICS = 'RECEIVE_RUBRICS';
export const REQUEST_PLACE_TYPES = 'REQUEST_PLACE_TYPES';
export const RECEIVE_PLACE_TYPES = 'RECEIVE_PLACE_TYPES';
export const REQUEST_CUISINES = 'REQUEST_CUISINES';
export const RECEIVE_CUISINES = 'RECEIVE_CUISINES';
export const TOGGLE_COMMENT_EDIT = 'TOGGLE_COMMENT_EDIT';
export const ADD_PHONE = 'ADD_PHONE';
export const DELETE_PHONE = 'DELETE_PHONE';
export const CHANGE_PHONE = 'CHANGE_PHONE';
export const ADD_FEATURE = 'ADD_FEATURE';
export const DELETE_FEATURE = 'DELETE_FEATURE';
export const SET_ACTIVE_PLACE_ID = 'SET_ACTIVE_PLACE_ID';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const TOGGLE_WORK_TIME_EDIT = 'TOGGLE_WORK_TIME_EDIT';
export const EDIT_OPEN_TIME = 'EDIT_OPEN_TIME';
export const EDIT_CLOSE_TIME = 'EDIT_CLOSE_TIME';
export const EDIT_KITCHEN_OPEN_TIME = 'EDIT_KITCHEN_OPEN_TIME';
export const EDIT_KITCHEN_CLOSE_TIME = 'EDIT_KITCHEN_CLOSE_TIME';
export const TOGGLE_DAY_OFF = 'TOGGLE_DAY_OFF';
export const TOGGLE_LAST_CLIENT = 'TOGGLE_LAST_CLIENT';
export const TOGGLE_ON_REQUEST = 'TOGGLE_ON_REQUEST';
export const EDIT_PLACE_OPEN_TIME = 'EDIT_PLACE_OPEN_TIME';
export const EDIT_PLACE_CLOSE_TIME = 'EDIT_PLACE_CLOSE_TIME';
export const TOGGLE_PHOTOS_EDIT = 'TOGGLE_PHOTOS_EDIT';
export const SET_ACTIVE_PHOTO_ID = 'SET_ACTIVE_PHOTO_ID';
export const TOGGLE_PHOTO_DETAIL = 'TOGGLE_PHOTO_DETAIL';
export const CHANGE_PHOTO_POSITION = 'CHANGE_PHOTO_POSITION';
export const TOGGLE_SELECT_PHOTO = 'TOGGLE_SELECT_PHOTO';
export const SELECT_ALL_PHOTO = 'SELECT_ALL_PHOTO';
export const DESELECT_ALL_PHOTO = 'DESELECT_ALL_PHOTO';
export const DELETE_SELECTED_PHOTOS = 'DELETE_SELECTED_PHOTOS';
export const UPLOAD_PHOTOS = 'UPLOAD_PHOTOS';
export const TOGGLE_SUCCESS_SNACKBAR = 'TOGGLE_SUCCESS_SNACKBAR';
export const TOGGLE_ERROR_SNACKBAR = 'TOGGLE_ERROR_SNACKBAR';
export const SET_SNACKBAR_MESSAGE = 'SET_SNACKBAR_MESSAGE';
export const SET_PROJECT_UPDATE_ERRORS = 'SET_PROJECT_UPDATE_ERRORS';
export const TOGGLE_CHOSEN_MENU_EDIT = 'TOGGLE_CHOSEN_MENU_EDIT';
export const TOGGLE_MENU_FILE_EDIT = 'TOGGLE_MENU_FILE_EDIT';
export const TOGGLE_PLACE_TYPE_EDIT = 'TOGGLE_PLACE_TYPE_EDIT';
export const EDIT_CHOSEN_MENU_NAME = 'EDIT_CHOSEN_MENU_NAME';
export const EDIT_CHOSEN_MENU_PRICE = 'EDIT_CHOSEN_MENU_PRICE';
export const DELETE_CHOSEN_MENU = 'DELETE_CHOSEN_MENU';
export const DELETE_CHOSEN_MENU_ALL = 'DELETE_CHOSEN_MENU_ALL';
export const EDIT_MENU_FILE_NAME = 'EDIT_MENU_FILE_NAME';
export const ADD_MENU_FILE = 'ADD_MENU_FILE';
export const DELETE_MENU_FILE = 'DELETE_MENU_FILE';
export const CHANGE_MENU_FILE_POSITION = 'CHANGE_MENU_FILE_POSITION';
export const CHANGE_MENU_FILE_RUBRICS = 'CHANGE_MENU_FILE_RUBRICS';
export const UPLOAD_MEDIA = 'UPLOAD_MEDIA';
export const ADD_PLACE_TYPE = 'ADD_PLACE_TYPE';
export const DELETE_PLACE_TYPE = 'DELETE_PLACE_TYPE';
export const CHANGE_PLACE_TYPE_POSITION = 'CHANGE_PLACE_TYPE_POSITION';
export const TOGGLE_SHOW_IN_META = 'TOGGLE_SHOW_IN_META';
export const CHANGE_PLACE_TYPE = 'CHANGE_PLACE_TYPE';
export const CHANGE_AVERAGE_BILL = 'CHANGE_AVERAGE_BILL';
export const TOGGLE_CUISINE_EDIT = 'TOGGLE_CUISINE_EDIT';
export const ADD_CUISINE = 'ADD_CUISINE';
export const CHANGE_CUISINE_POSITION = 'CHANGE_CUISINE_POSITION';
export const DELETE_CUISINE = 'DELETE_CUISINE';
export const CHANGE_PLACE_CUISINE = 'CHANGE_PLACE_CUISINE';

/*
 * action creators
 */

function requestProjects() {
    return {
        type: REQUEST_PROJECTS
    }
}

function receiveProjects(projects) {
    return {
        type: RECEIVE_PROJECTS,
        projects: projects
    }
}

function requestProject() {
    return {
        type: REQUEST_PROJECT
    }
}

function receiveProject(data) {
    return {
        type: RECEIVE_PROJECT,
        project: data.project,
        places: placeNormalizer(data.places)
    }
}

function requestFeatures() {
    return {
        type: REQUEST_FEATURES
    }
}

function receiveFeatures(features) {
    return {
        type: RECEIVE_FEATURES,
        features: featureNormalizer(features)
    }
}

function receiveStatistic(statistic) {
    return {
        type: RECEIVE_STATISTIC,
        statistic
    }
}

function requestChosenCategories() {
    return {
        type: REQUEST_CHOSEN_CATEGORIES
    }
}

function receiveChosenCategories(chosenCategories) {
    return {
        type: RECEIVE_CHOSEN_CATEGORIES,
        chosenCategories
    }
}

function requestRubrics() {
    return {
        type: REQUEST_RUBRICS
    }
}

function receiveRubrics(rubrics) {
    return {
        type: RECEIVE_RUBRICS,
        rubrics: rubricNormalizer(rubrics)
    }
}

function requestPlaceTypes() {
    return {
        type: REQUEST_PLACE_TYPES
    }
}

function receivePlaceTypes(placeTypes) {
    return {
        type: RECEIVE_PLACE_TYPES,
        placeTypes: placeTypeNormalizer(placeTypes)
    }
}

function requestCuisines() {
    return {
        type: REQUEST_CUISINES
    }
}

function receiveCuisines(cuisines) {
    return {
        type: RECEIVE_CUISINES,
        cuisines: cuisineNormalizer(cuisines)
    }
}

export function toggleCommentEdit(isCommentEditOpen) {
    return {
        type: TOGGLE_COMMENT_EDIT,
        isCommentEditOpen
    }
}

export function addPhone(placeId) {
    return {
        type: ADD_PHONE,
        placeId
    }
}

export function deletePhone(id, placeId) {
    return {
        type: DELETE_PHONE,
        id,
        placeId
    }
}

export function changePhone(id, value) {
    return {
        type: CHANGE_PHONE,
        id,
        value
    }
}

export function addFeature(id, placeId) {
    return {
        type: ADD_FEATURE,
        id,
        placeId
    }
}

export function deleteFeature(id, placeId) {
    return {
        type: DELETE_FEATURE,
        id,
        placeId
    }
}

export function setActivePlaceId(placeId) {
    return {
        type: SET_ACTIVE_PLACE_ID,
        placeId
    }
}

function editComment(placeId, comment) {
    return {
        type: EDIT_COMMENT,
        placeId,
        comment
    }
}

export function toggleWorkTimeEdit(isWorkTimeEditOpen) {
    return {
        type: TOGGLE_WORK_TIME_EDIT,
        isWorkTimeEditOpen
    }
}

export function editOpenTime(workTimeId, openTime) {
    return {
        type: EDIT_OPEN_TIME,
        workTimeId,
        openTime
    }
}

export function editCloseTime(workTimeId, closeTime) {
    return {
        type: EDIT_CLOSE_TIME,
        workTimeId,
        closeTime
    }
}

export function editKitchenOpenTime(workTimeId, kitchenOpenTime) {
    return {
        type: EDIT_KITCHEN_OPEN_TIME,
        workTimeId,
        kitchenOpenTime
    }
}

export function editKitchenCloseTime(workTimeId, kitchenCloseTime) {
    return {
        type: EDIT_KITCHEN_CLOSE_TIME,
        workTimeId,
        kitchenCloseTime
    }
}

export function toggleDayOff(workTimeId, dayOff) {
    return {
        type: TOGGLE_DAY_OFF,
        workTimeId,
        dayOff
    }
}

export function toggleLastClient(workTimeId, lastClient) {
    return {
        type: TOGGLE_LAST_CLIENT,
        workTimeId,
        lastClient
    }
}

export function toggleOnRequest(workTimeId, onRequest) {
    return {
        type: TOGGLE_ON_REQUEST,
        workTimeId,
        onRequest
    }
}

export function editPlaceOpenTime(placeId, openTime) {
    return {
        type: EDIT_PLACE_OPEN_TIME,
        placeId,
        openTime
    }
}

export function editPlaceCloseTime(placeId, closeTime) {
    return {
        type: EDIT_PLACE_CLOSE_TIME,
        placeId,
        closeTime
    }
}

export function togglePhotosEdit(isPhotosEditOpen) {
    return {
        type: TOGGLE_PHOTOS_EDIT,
        isPhotosEditOpen
    }
}

export function setActivePhotoId(activePhotoId) {
    return {
        type: SET_ACTIVE_PHOTO_ID,
        activePhotoId
    }
}

export function togglePhotoDetail(isPhotoDetailOpen) {
    return {
        type: TOGGLE_PHOTO_DETAIL,
        isPhotoDetailOpen
    }
}

export function changePhotoPosition(placeId, fromIndex, toIndex) {
    return {
        type: CHANGE_PHOTO_POSITION,
        placeId,
        fromIndex,
        toIndex
    }
}

export function toggleSelectPhoto(photoId, isPhotoSelect) {
    return {
        type: TOGGLE_SELECT_PHOTO,
        photoId,
        isPhotoSelect
    }
}

export function selectAllPhoto(placeId) {
    return {
        type: SELECT_ALL_PHOTO,
        placeId
    }
}

export function deselectAllPhoto(placeId) {
    return {
        type: DESELECT_ALL_PHOTO,
        placeId
    }
}

export function deleteSelectedPhotos(placeId) {
    return {
        type: DELETE_SELECTED_PHOTOS,
        placeId
    }
}

export function uploadPhotos(placeId, acceptedFiles) {
    return {
        type: UPLOAD_PHOTOS,
        placeId,
        acceptedFiles
    }
}

export function toggleSuccessSnackbar(isSuccessSnackbarOpen) {
    return {
        type: TOGGLE_SUCCESS_SNACKBAR,
        isSuccessSnackbarOpen
    }
}

export function toggleErrorSnackbar(isErrorSnackbarOpen) {
    return {
        type: TOGGLE_ERROR_SNACKBAR,
        isErrorSnackbarOpen
    }
}

export function setSnackbarMessage(snackbarMessage) {
    return {
        type: SET_SNACKBAR_MESSAGE,
        snackbarMessage
    }
}

export function setProjectUpdateErrors(errors) {
    return {
        type: SET_PROJECT_UPDATE_ERRORS,
        errors
    }
}

export function toggleChosenMenuEdit(isChosenMenuEditOpen) {
    return {
        type: TOGGLE_CHOSEN_MENU_EDIT,
        isChosenMenuEditOpen
    }
}

export function toggleMenuFileEdit(isMenuFileEditOpen) {
    return {
        type: TOGGLE_MENU_FILE_EDIT,
        isMenuFileEditOpen
    }
}

export function togglePlaceTypeEdit(isPlaceTypeEditOpen) {
    return {
        type: TOGGLE_PLACE_TYPE_EDIT,
        isPlaceTypeEditOpen
    }
}

export function editChosenMenuName(chosenMenuId, categoryId, placeId, value) {
    return {
        type: EDIT_CHOSEN_MENU_NAME,
        chosenMenuId,
        categoryId,
        placeId,
        value
    }
}

export function editChosenMenuPrice(chosenMenuId, categoryId, placeId, value) {
    return {
        type: EDIT_CHOSEN_MENU_PRICE,
        chosenMenuId,
        categoryId,
        placeId,
        value
    }
}

export function deleteChosenMenu(chosenMenuId, categoryId, placeId) {
    return {
        type: DELETE_CHOSEN_MENU,
        chosenMenuId,
        categoryId,
        placeId
    }
}

export function deleteChosenMenuAll(placeId) {
    return {
        type: DELETE_CHOSEN_MENU_ALL,
        placeId
    }
}

export function editMenuFileName(menuFileId, value) {
    return {
        type: EDIT_MENU_FILE_NAME,
        menuFileId,
        value
    }
}

export function addMenuFile(placeId) {
    return {
        type: ADD_MENU_FILE,
        placeId
    }
}

export function deleteMenuFile(id, placeId) {
    return {
        type: DELETE_MENU_FILE,
        id,
        placeId
    }
}

export function changeMenuFilePosition(placeId, fromIndex, toIndex) {
    return {
        type: CHANGE_MENU_FILE_POSITION,
        placeId,
        fromIndex,
        toIndex
    }
}

export function changeMenuFileRubrics(menuFileId, rubricIds) {
    return {
        type: CHANGE_MENU_FILE_RUBRICS,
        menuFileId,
        rubricIds
    }
}

export function uploadMedia(menuFileId, file) {
    return {
        type: UPLOAD_MEDIA,
        menuFileId,
        file
    }
}

export function addPlaceType(placeId) {
    return {
        type: ADD_PLACE_TYPE,
        placeId
    }
}

export function deletePlaceType(id, placeId) {
    return {
        type: DELETE_PLACE_TYPE,
        id,
        placeId
    }
}

export function changePlaceTypePosition(placeId, fromIndex, toIndex) {
    return {
        type: CHANGE_PLACE_TYPE_POSITION,
        placeId,
        fromIndex,
        toIndex
    }
}

export function toggleShowInMeta(placeTypeId, showInMeta) {
    return {
        type: TOGGLE_SHOW_IN_META,
        placeTypeId,
        showInMeta
    }
}

export function changePlaceType(placeTypeId, placeType) {
    return {
        type: CHANGE_PLACE_TYPE,
        placeTypeId,
        placeType
    }
}

export function changeAverageBill(placeId, averageBill) {
    return {
        type: CHANGE_AVERAGE_BILL,
        placeId,
        averageBill
    }
}

export function toggleCuisineEdit(isCuisineEditOpen) {
    return {
        type: TOGGLE_CUISINE_EDIT,
        isCuisineEditOpen
    }
}

export function addCuisine(placeId) {
    return {
        type: ADD_CUISINE,
        placeId
    }
}

export function changeCuisinePosition(placeId, fromIndex, toIndex) {
    return {
        type: CHANGE_CUISINE_POSITION,
        placeId,
        fromIndex,
        toIndex
    }
}

export function deleteCuisine(id, placeId) {
    return {
        type: DELETE_CUISINE,
        id,
        placeId
    }
}

export function changePlaceCuisine(cuisineId, cuisine) {
    return {
        type: CHANGE_PLACE_CUISINE,
        cuisineId,
        cuisine
    }
}

export function fetchProjects() {
    return function (dispatch) {
        dispatch(requestProjects());

        return axios.get('/api/actualization/projects')
            .then(response => {
                dispatch(receiveProjects(response.data));
            });
    }
}

export function fetchProject(slug, id, page, limit) {
    return function (dispatch, getState) {
        dispatch(requestProject());

        const filter = getState().filter.current;
        page = page ? page : getState().pagination.page;
        limit = limit ? limit : getState().pagination.rowsPerPage;

        return axios.get(`/api/actualization/projects/${slug}/${id}`, {
            params: {
                page,
                limit,
                filter
            },
            paramsSerializer: params => stringify(params)
        }).then(response => {
            dispatch(receiveProject(response.data));
            dispatch(setCount(response.data.count))
        });
    }
}

export function fetchFeatures(slug, id) {
    return function (dispatch) {
        dispatch(requestFeatures());

        return axios.get(`/api/actualization/projects/${slug}/${id}/features`)
            .then(response => {
                dispatch(receiveFeatures(response.data));
            });
    }
}


export function fetchStatistic(slug, id) {
    return function (dispatch, getState) {
        const filter = getState().filter.current;

        return axios.get(`/api/actualization/projects/${slug}/${id}/statistic`, {
            params: {
                filter
            },
            paramsSerializer: params => stringify(params)
        }).then(response => {
            dispatch(receiveStatistic(response.data));
        });
    }
}

export function placeComment(slug, id, placeId, comment) {
    return function (dispatch) {
        return axios.post(`/api/actualization/projects/${slug}/${id}/comment`, {
            slug,
            placeId,
            comment
        }).then(response => {
            dispatch(editComment(placeId, response.data.comment));
            dispatch(fetchStatistic(slug, id));
            dispatch(toggleSuccessSnackbar(true));
            dispatch(setSnackbarMessage(response.data.message));
        }).catch(error => {
            dispatch(toggleErrorSnackbar(true));
            dispatch(setSnackbarMessage(error.response.data.message));
        });
    }
}

export function placeUpdate(slug, id, placeId) {
    return function (dispatch, getState) {
        dispatch(setActivePlaceId(placeId));

        const placesEntities = getState().project.placesEntities;

        const data = new FormData();

        data.append('placeId', placeId);

        const featuresIds = placesEntities.getIn(['places', placeId, 'features'], []);
        if (featuresIds !== null && featuresIds.length) {
            data.append('features', JSON.stringify(featuresIds));
        }

        const phoneIds = placesEntities.getIn(['places', placeId, 'phones'], []);
        if (phoneIds !== null && phoneIds.length) {
            const phones = [];
            phoneIds.forEach(phoneId => phones.push(placesEntities.getIn(['phones', phoneId], {})));

            data.append('phones', JSON.stringify(phones));
        }

        const workTimeIds = placesEntities.getIn(['places', placeId, 'work_time'], []);
        if (workTimeIds !== null && workTimeIds.length) {
            const workTime = [];
            workTimeIds.forEach(workTimeId => workTime.push(placesEntities.getIn(['workTime', workTimeId], {})));

            data.append('work_time', JSON.stringify(workTime));
        }

        const photoIds = placesEntities.getIn(['places', placeId, 'photos'], []);
        if (photoIds !== null && photoIds.length) {
            const photos = [];
            let size = 0;
            photoIds.forEach(photoId => {
                const photo = placesEntities.getIn(['photos', photoId], {});
                if (photo.file !== undefined) {
                    size += photo.file.size;
                    data.append(`new_photos[${photo.id}]`, photo.file);
                }
                photos.push(photo);
            });

            data.append('photos', JSON.stringify(photos));

            if ((size / BYTES) > MAX_REQUEST_SIZE) {
                dispatch(toggleErrorSnackbar(true));
                dispatch(setSnackbarMessage(`Размер загружаемых фото не должен превышать ${MAX_REQUEST_SIZE} МБ`));
                return;
            }
        }

        const menuFileIds = placesEntities.getIn(['places', placeId, 'menu_files'], []);
        if (menuFileIds !== null && menuFileIds.length) {
            const menuFiles = [];
            menuFileIds.forEach(menuFileId => {
                const menuFile = placesEntities.getIn(['menuFiles', menuFileId], {});

                if (menuFile.media instanceof File) {
                    data.append(`new_media[${menuFileId}]`, menuFile.media);
                }

                menuFiles.push(menuFile)
            });
            data.append('menu_files', JSON.stringify(menuFiles));
        }

        const chosenMenus = placesEntities.getIn(['places', placeId, 'chosen_menu'], {});
        if (chosenMenus !== null && Object.keys(chosenMenus).length) {
            data.append('chosen_menu', JSON.stringify(chosenMenus));
        }

        const placeTypeIds = placesEntities.getIn(['places', placeId, 'place_types'], []);
        if (placeTypeIds !== null && placeTypeIds.length) {
            const placeTypes = [];
            placeTypeIds.forEach(placeTypeId => placeTypes.push(placesEntities.getIn(['placeTypes', placeTypeId], {})));

            data.append('place_types', JSON.stringify(placeTypes));
        }

        const averageBill = placesEntities.getIn(['places', placeId, 'average_bill']);
        if (averageBill !== null) {
            data.append('average_bill', averageBill);
        }

        const cuisineIds = placesEntities.getIn(['places', placeId, 'cuisines'], []);
        if (cuisineIds !== null && cuisineIds.length) {
            const cuisines = [];
            cuisineIds.forEach(cuisineId => cuisines.push(placesEntities.getIn(['cuisines', cuisineId], {})));

            data.append('cuisines', JSON.stringify(cuisines));
        }

        return axios.post(`/api/actualization/projects/${slug}/${id}/update`, data).then(response => {
            dispatch(fetchProject(slug, id));
            dispatch(fetchStatistic(slug, id));
            dispatch(toggleSuccessSnackbar(true));
            dispatch(setSnackbarMessage(response.data.message));
            dispatch(setProjectUpdateErrors({
                phones: {},
                average_bill: false
            }));
        }).catch(error => {
            dispatch(toggleErrorSnackbar(true));
            dispatch(setSnackbarMessage(error.response.data.message));
            if (error.response.data.errors !== undefined) {
                dispatch(setProjectUpdateErrors(error.response.data.errors));
            }
        });
    }
}

export function fetchChosenCategories(slug, id) {
    return function (dispatch) {
        dispatch(requestChosenCategories());

        return axios.get(`/api/actualization/projects/${slug}/${id}/chosen/categories`)
            .then(response => {
                dispatch(receiveChosenCategories(response.data));
            });
    }
}

export function fetchRubrics(slug, id) {
    return function (dispatch) {
        dispatch(requestRubrics());

        return axios.get(`/api/actualization/projects/${slug}/${id}/rubrics`)
            .then(response => {
                dispatch(receiveRubrics(response.data));
            });
    }
}

export function fetchPlaceTypes(slug, id) {
    return function (dispatch) {
        dispatch(requestPlaceTypes());

        return axios.get(`/api/actualization/projects/${slug}/${id}/placeTypes`)
            .then(response => {
                dispatch(receivePlaceTypes(response.data));
            });
    }
}

export function fetchCuisines(slug, id) {
    return function (dispatch) {
        dispatch(requestCuisines());

        return axios.get(`/api/actualization/projects/${slug}/${id}/cuisines`)
            .then(response => {
                dispatch(receiveCuisines(response.data));
            });
    }
}