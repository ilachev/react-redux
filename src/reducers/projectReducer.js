import * as actionTypes from '../actions';
import { Map, removeIn, setIn, updateIn, getIn } from 'immutable';
import { v1 as uuid } from 'uuid';
import { useArrayMove } from "../utils";
import moment from "moment";

const initialState = {
    isFetching: false,
    isCommentEditOpen: false,
    isWorkTimeEditOpen: false,
    isPhotosEditOpen: false,
    isPhotoDetailOpen: false,
    isSuccessSnackbarOpen: false,
    isErrorSnackbarOpen: false,
    isChosenMenuEditOpen: false,
    isMenuFileEditOpen: false,
    isPlaceTypeEditOpen: false,
    isCuisineEditOpen: false,
    snackbarMessage: '',
    activePlaceId: 0,
    activePhotoId: 0,
    list: [],
    placesResult: [],
    placesEntities: Map({}),
    featuresResult: [],
    featuresEntities: Map({}),
    project: [],
    features: [],
    chosenCategories: [],
    rubricsResult: [],
    rubricsEntities: Map({}),
    placeTypesResult: [],
    placeTypesEntities: Map({}),
    cuisinesResult: [],
    cuisinesEntities: Map({}),
    statistic: {
        withFilter: {
            allCount: 0,
            doneCount: 0,
            withCommentCount: 0,
            groupedByUserCount: [],
            photoUploadCount: 0
        },
        withoutFilter: {
            allCount: 0,
            doneCount: 0,
            withCommentCount: 0,
            groupedByUserCount: [],
            photoUploadCount: 0
        },
    },
    errors: {
        phones: {},
        menu_files: {},
        chosen_menu: {},
        place_types: {},
        average_bill: false,
        cuisines: {}
    }
};

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REQUEST_PROJECTS: {
            return {
                ...state,
                isFetching: true,
            };
        }

        case actionTypes.RECEIVE_PROJECTS: {
            return {
                ...state,
                list: action.projects,
                isFetching: false,
            };
        }

        case actionTypes.REQUEST_PROJECT: {
            return {
                ...state,
                isFetching: true,
            };
        }

        case actionTypes.RECEIVE_PROJECT: {
            return {
                ...state,
                placesResult: action.places.result,
                placesEntities: Map(action.places.entities),
                project: action.project,
                isFetching: false,
            };
        }

        case actionTypes.REQUEST_FEATURES: {
            return {
                ...state,
                isFetching: true,
            };
        }

        case actionTypes.RECEIVE_FEATURES: {
            return {
                ...state,
                featuresResult: action.features.result,
                featuresEntities: Map(action.features.entities),
                isFetching: false,
            };
        }

        case actionTypes.RECEIVE_STATISTIC: {
            return {
                ...state,
                statistic: {
                    ...state.statistic,
                    ...action.statistic
                }
            }
        }

        case actionTypes.TOGGLE_COMMENT_EDIT: {
            return {
                ...state,
                isCommentEditOpen: action.isCommentEditOpen,
            };
        }

        case actionTypes.ADD_PHONE: {

            const nextPhoneKey = uuid();
            const placesEntities = updateIn(state.placesEntities,
                ['places', action.placeId, 'phones'],
                arr => arr.concat([nextPhoneKey])
            ).updateIn(['phones'], arr => Object.assign({ ...arr }, {
                [nextPhoneKey]: { id: nextPhoneKey, number: '' }
            }));

            return {
                ...state,
                placesEntities
            };
        }

        case actionTypes.DELETE_PHONE: {

            const phoneIdx = state.placesEntities
                .getIn(['places', action.placeId, 'phones'])
                .findIndex(el => el === action.id);
            const placesEntities = removeIn(state.placesEntities, ['places', action.placeId, 'phones', phoneIdx])
                .removeIn(['phones', action.id]);

            return {
                ...state,
                placesEntities
            };

        }

        case actionTypes.CHANGE_PHONE: {

            const placesEntities = setIn(
                state.placesEntities,
                ['phones', action.id, 'number'],
                action.value
            );

            return {
                ...state,
                placesEntities
            };

        }

        case actionTypes.ADD_FEATURE: {

            const placesEntities = updateIn(state.placesEntities,
                ['places', action.placeId, 'features'],
                arr => arr.concat([action.id])
            );

            return {
                ...state,
                placesEntities
            };
        }

        case actionTypes.DELETE_FEATURE: {

            const featureIdx = state.placesEntities
                .getIn(['places', action.placeId, 'features'])
                .findIndex(el => el === action.id);
            const placesEntities = removeIn(
                state.placesEntities,
                ['places', action.placeId, 'features', featureIdx]
            );

            return {
                ...state,
                placesEntities
            };

        }

        case actionTypes.SET_ACTIVE_PLACE_ID: {
            return {
                ...state,
                activePlaceId: action.placeId
            };
        }

        case actionTypes.EDIT_COMMENT: {

            const placesEntities = setIn(
                state.placesEntities,
                ['places', action.placeId, 'comment'],
                action.comment
            );

            return {
                ...state,
                placesEntities
            };

        }

        case actionTypes.TOGGLE_WORK_TIME_EDIT: {
            return {
                ...state,
                isWorkTimeEditOpen: action.isWorkTimeEditOpen,
            };
        }

        case actionTypes.EDIT_OPEN_TIME: {
            const openTime = action.openTime instanceof moment ? action.openTime.format() : action.openTime;
            const placesEntities = setIn(
                state.placesEntities,
                ['workTime', action.workTimeId, 'openTime'],
                openTime
            );

            return {
                ...state,
                placesEntities
            };
        }

        case actionTypes.EDIT_CLOSE_TIME: {
            const closeTime = action.closeTime instanceof moment ? action.closeTime.format() : action.closeTime;
            const placesEntities = setIn(
                state.placesEntities,
                ['workTime', action.workTimeId, 'closeTime'],
                closeTime
            );

            return {
                ...state,
                placesEntities
            };
        }

        case actionTypes.EDIT_KITCHEN_OPEN_TIME: {
            const kitchenOpenTime = action.kitchenOpenTime instanceof moment ? action.kitchenOpenTime.format() : action.kitchenOpenTime;
            const placesEntities = setIn(
                state.placesEntities,
                ['workTime', action.workTimeId, 'kitchenOpenTime'],
                kitchenOpenTime
            );

            return {
                ...state,
                placesEntities
            };
        }

        case actionTypes.EDIT_KITCHEN_CLOSE_TIME: {
            const kitchenCloseTime = action.kitchenCloseTime instanceof moment ? action.kitchenCloseTime.format() : action.kitchenCloseTime;
            const placesEntities = setIn(
                state.placesEntities,
                ['workTime', action.workTimeId, 'kitchenCloseTime'],
                kitchenCloseTime
            );

            return {
                ...state,
                placesEntities
            };
        }

        case actionTypes.TOGGLE_DAY_OFF: {
            const placesEntities = setIn(
                state.placesEntities,
                ['workTime', action.workTimeId, 'dayOff'],
                action.dayOff
            );

            return {
                ...state,
                placesEntities
            };
        }

        case actionTypes.TOGGLE_LAST_CLIENT: {
            const placesEntities = setIn(
                state.placesEntities,
                ['workTime', action.workTimeId, 'lastClient'],
                action.lastClient
            );

            return {
                ...state,
                placesEntities
            };
        }

        case actionTypes.TOGGLE_ON_REQUEST: {
            const placesEntities = setIn(
                state.placesEntities,
                ['workTime', action.workTimeId, 'onRequest'],
                action.onRequest
            );

            return {
                ...state,
                placesEntities
            };
        }

        case actionTypes.EDIT_PLACE_OPEN_TIME: {
            const workTimeIds = getIn(
                state.placesEntities,
                ['places', action.placeId, 'work_time'],
                []
            );

            const placesEntities = state.placesEntities;
            const openTime = action.openTime instanceof moment ? action.openTime.format() : action.openTime;
            workTimeIds.map(workTimeId => placesEntities.updateIn(
                ['workTime'],
                arr => arr[workTimeId].openTime = openTime
            ));

            return {
                ...state,
                placesEntities
            };
        }

        case actionTypes.EDIT_PLACE_CLOSE_TIME: {
            const workTimeIds = getIn(
                state.placesEntities,
                ['places', action.placeId, 'work_time'],
                []
            );

            const placesEntities = state.placesEntities;
            const closeTime = action.closeTime instanceof moment ? action.closeTime.format() : action.closeTime;
            workTimeIds.map(workTimeId => placesEntities.updateIn(
                ['workTime'],
                arr => arr[workTimeId].closeTime = closeTime
            ));

            return {
                ...state,
                placesEntities
            };
        }

        case actionTypes.TOGGLE_PHOTOS_EDIT: {
            return {
                ...state,
                isPhotosEditOpen: action.isPhotosEditOpen,
            };
        }

        case actionTypes.TOGGLE_PHOTO_DETAIL: {
            return {
                ...state,
                isPhotoDetailOpen: action.isPhotoDetailOpen,
            };
        }

        case actionTypes.SET_ACTIVE_PHOTO_ID: {
            return {
                ...state,
                activePhotoId: action.activePhotoId
            };
        }

        case actionTypes.CHANGE_PHOTO_POSITION: {
            const placesEntities = updateIn(state.placesEntities,
                ['places', action.placeId, 'photos'],
                (arr, { fromIndex, toIndex } = action) => useArrayMove(arr, fromIndex, toIndex)
            );

            return {
                ...state,
                placesEntities
            };
        }

        case actionTypes.TOGGLE_SELECT_PHOTO: {
            const placesEntities = setIn(state.placesEntities,
                ['photos', action.photoId, 'select'],
                action.isPhotoSelect
            );

            return {
                ...state,
                placesEntities
            };
        }

        case actionTypes.SELECT_ALL_PHOTO: {
            const photoIds = getIn(state.placesEntities,
                ['places', action.placeId, 'photos'],
                []
            );

            const placesEntities = state.placesEntities;
            photoIds.map(photoId => placesEntities.updateIn(
                ['photos'],
                arr => arr[photoId].select = true
            ));

            return {
                ...state,
                placesEntities
            };
        }

        case actionTypes.DESELECT_ALL_PHOTO: {
            const photoIds = getIn(state.placesEntities,
                ['places', action.placeId, 'photos'],
                []
            );

            const placesEntities = state.placesEntities;
            photoIds.map(photoId => placesEntities.updateIn(
                ['photos'],
                arr => arr[photoId].select = false
            ));

            return {
                ...state,
                placesEntities
            };
        }

        case actionTypes.DELETE_SELECTED_PHOTOS: {
            const photoIds = getIn(state.placesEntities,
                ['places', action.placeId, 'photos'],
                []
            );

            let placesEntities = state.placesEntities;
            photoIds.forEach(photoId => {
                const photo = placesEntities.getIn(
                    ['photos', photoId],
                    []
                );
                if (photo.select) {
                    if (photo.file !== undefined) {
                        URL.revokeObjectURL(photo.file);
                    }

                    const photoIdx = placesEntities
                        .getIn(['places', action.placeId, 'photos'])
                        .findIndex(el => el === photoId);

                    placesEntities = removeIn(
                        placesEntities,
                        ['places', action.placeId, 'photos', photoIdx]
                    );
                }
            });

            return {
                ...state,
                placesEntities
            };
        }

        case actionTypes.UPLOAD_PHOTOS: {

            let placesEntities = state.placesEntities;
            action.acceptedFiles.forEach(file => {
                const preview = URL.createObjectURL(file);

                const newPhotoId = uuid();
                placesEntities = updateIn(
                    placesEntities,
                    ['places', action.placeId, 'photos'],
                    arr => arr.concat([newPhotoId])
                ).updateIn(['photos'], arr => Object.assign({ ...arr }, {
                    [newPhotoId]: {
                        id: newPhotoId,
                        name: file.name,
                        src: {
                            big: preview,
                            small: preview
                        },
                        select: false,
                        file: file
                    }
                }));
            });

            return {
                ...state,
                placesEntities
            };
        }

        case actionTypes.TOGGLE_SUCCESS_SNACKBAR: {
            return {
                ...state,
                isSuccessSnackbarOpen: action.isSuccessSnackbarOpen,
            };
        }

        case actionTypes.TOGGLE_ERROR_SNACKBAR: {
            return {
                ...state,
                isErrorSnackbarOpen: action.isErrorSnackbarOpen,
            };
        }

        case actionTypes.SET_SNACKBAR_MESSAGE: {
            return {
                ...state,
                snackbarMessage: action.snackbarMessage
            };
        }

        case actionTypes.SET_PROJECT_UPDATE_ERRORS: {
            const { menu_files, chosen_menu, place_types, cuisines } = action.errors;

            let modalStates = {};
            if (chosen_menu) {
                modalStates = {
                    ...modalStates,
                    isChosenMenuEditOpen: true,
                }
            }
            if (menu_files) {
                modalStates = {
                    ...modalStates,
                    isMenuFileEditOpen: true,
                }
            }
            if (place_types) {
                modalStates = {
                    ...modalStates,
                    isPlaceTypeEditOpen: true,
                }
            }
            if (cuisines) {
                modalStates = {
                    ...modalStates,
                    isCuisineEditOpen: true,
                }
            }

            return {
                ...state,
                ...modalStates,
                errors: {
                    ...state.errors,
                    ...action.errors
                }
            };
        }

        case actionTypes.TOGGLE_CHOSEN_MENU_EDIT: {
            return {
                ...state,
                isChosenMenuEditOpen: action.isChosenMenuEditOpen,
            };
        }

        case actionTypes.TOGGLE_MENU_FILE_EDIT: {
            return {
                ...state,
                isMenuFileEditOpen: action.isMenuFileEditOpen,
            };
        }

        case actionTypes.TOGGLE_PLACE_TYPE_EDIT: {
            return {
                ...state,
                isPlaceTypeEditOpen: action.isPlaceTypeEditOpen,
            };
        }

        case actionTypes.REQUEST_CHOSEN_CATEGORIES: {
            return {
                ...state,
                isFetching: true,
            };
        }

        case actionTypes.RECEIVE_CHOSEN_CATEGORIES: {
            return {
                ...state,
                chosenCategories: action.chosenCategories,
                isFetching: false,
            };
        }

        case actionTypes.REQUEST_RUBRICS: {
            return {
                ...state,
                isFetching: true,
            };
        }

        case actionTypes.RECEIVE_RUBRICS: {
            return {
                ...state,
                rubricsResult: action.rubrics.result,
                rubricsEntities: Map(action.rubrics.entities),
                isFetching: false,
            };
        }

        case actionTypes.REQUEST_PLACE_TYPES: {
            return {
                ...state,
                isFetching: true,
            };
        }

        case actionTypes.RECEIVE_PLACE_TYPES: {
            return {
                ...state,
                placeTypesResult: action.placeTypes.result,
                placeTypesEntities: Map(action.placeTypes.entities),
                isFetching: false,
            };
        }

        case actionTypes.REQUEST_CUISINES: {
            return {
                ...state,
                isFetching: true,
            };
        }

        case actionTypes.RECEIVE_CUISINES: {
            return {
                ...state,
                cuisinesResult: action.cuisines.result,
                cuisinesEntities: Map(action.cuisines.entities),
                isFetching: false,
            };
        }

        case actionTypes.EDIT_CHOSEN_MENU_NAME: {
            let placesEntities = state.placesEntities;
            const chosenMenuIdx = placesEntities
                .getIn(['places', action.placeId, 'chosen_menu', action.categoryId])
                .findIndex(el => el.id === action.chosenMenuId);

            placesEntities = setIn(
                placesEntities,
                ['places', action.placeId, 'chosen_menu', action.categoryId, chosenMenuIdx, 'name'],
                action.value
            );

            return {
                ...state,
                placesEntities
            };
        }

        case actionTypes.EDIT_CHOSEN_MENU_PRICE: {
            let placesEntities = state.placesEntities;
            const chosenMenuIdx = placesEntities
                .getIn(['places', action.placeId, 'chosen_menu', action.categoryId])
                .findIndex(el => el.id === action.chosenMenuId);

            placesEntities = setIn(
                placesEntities,
                ['places', action.placeId, 'chosen_menu', action.categoryId, chosenMenuIdx, 'price'],
                action.value
            );

            return {
                ...state,
                placesEntities
            };
        }

        case actionTypes.DELETE_CHOSEN_MENU: {
            let placesEntities = state.placesEntities;
            const chosenMenuIdx = placesEntities
                .getIn(['places', action.placeId, 'chosen_menu', action.categoryId])
                .findIndex(el => el.id === action.chosenMenuId);

            placesEntities = placesEntities
                .setIn(
                    ['places', action.placeId, 'chosen_menu', action.categoryId, chosenMenuIdx, 'name'],
                    ''
                )
                .setIn(
                    ['places', action.placeId, 'chosen_menu', action.categoryId, chosenMenuIdx, 'price'],
                    ''
                );

            return {
                ...state,
                placesEntities
            };
        }

        case actionTypes.DELETE_CHOSEN_MENU_ALL: {
            let placesEntities = state.placesEntities;
            const chosenMenus = placesEntities
                .getIn(['places', action.placeId, 'chosen_menu'], {});

            Object.keys(chosenMenus).forEach((categoryKey) => {
                Object.keys(chosenMenus[categoryKey]).forEach(index => {
                    placesEntities = placesEntities
                        .setIn(
                            ['places', action.placeId, 'chosen_menu', categoryKey, index, 'name'],
                            ''
                        )
                        .setIn(
                            ['places', action.placeId, 'chosen_menu', categoryKey, index, 'price'],
                            ''
                        );
                });

            });

            return {
                ...state,
                placesEntities
            };
        }

        case actionTypes.ADD_MENU_FILE: {

            const nextMenuFileKey = uuid();
            const placesEntities = updateIn(state.placesEntities,
                ['places', action.placeId, 'menu_files'],
                arr => arr.concat([nextMenuFileKey])
            ).updateIn(['menuFiles'], arr => Object.assign({ ...arr }, {
                [nextMenuFileKey]: {
                    id: nextMenuFileKey,
                    name: '',
                    position: '',
                    actualizedAt: '',
                    rubrics: [],
                    media: {
                        name: '',
                        path: ''
                    }
                }
            }));

            return {
                ...state,
                placesEntities
            };
        }

        case actionTypes.DELETE_MENU_FILE: {

            const menuFileIdx = state.placesEntities
                .getIn(['places', action.placeId, 'menu_files'])
                .findIndex(el => el === action.id);
            const placesEntities = removeIn(state.placesEntities, ['places', action.placeId, 'menu_files', menuFileIdx])
                .removeIn(['menuFiles', action.id]);

            return {
                ...state,
                placesEntities
            };

        }

        case actionTypes.CHANGE_MENU_FILE_POSITION: {
            const placesEntities = updateIn(state.placesEntities,
                ['places', action.placeId, 'menu_files'],
                (arr, { fromIndex, toIndex } = action) => useArrayMove(arr, fromIndex, toIndex)
            );

            return {
                ...state,
                placesEntities
            };
        }

        case actionTypes.EDIT_MENU_FILE_NAME: {
            const placesEntities = setIn(state.placesEntities,
                ['menuFiles', action.menuFileId, 'name'], action.value
            );

            return {
                ...state,
                placesEntities
            };
        }

        case actionTypes.CHANGE_MENU_FILE_RUBRICS: {
            const placesEntities = setIn(state.placesEntities,
                ['menuFiles', action.menuFileId, 'rubrics'], action.rubricIds
            );

            return {
                ...state,
                placesEntities
            };
        }

        case actionTypes.UPLOAD_MEDIA: {
            const placesEntities = setIn(state.placesEntities,
                ['menuFiles', action.menuFileId, 'media'],
                action.file
            );

            return {
                ...state,
                placesEntities
            };
        }

        case actionTypes.ADD_PLACE_TYPE: {

            const nextPlaceTypeKey = uuid();
            const placesEntities = updateIn(state.placesEntities,
                ['places', action.placeId, 'place_types'],
                arr => arr.concat([nextPlaceTypeKey])
            ).updateIn(['placeTypes'], arr => Object.assign({ ...arr }, {
                [nextPlaceTypeKey]: {
                    id: nextPlaceTypeKey,
                    position: '',
                    showInMeta: false,
                    type: null,
                }
            }));

            return {
                ...state,
                placesEntities
            };
        }

        case actionTypes.DELETE_PLACE_TYPE: {

            const placeTypeIdx = state.placesEntities
                .getIn(['places', action.placeId, 'place_types'])
                .findIndex(el => el === action.id);
            const placesEntities = removeIn(state.placesEntities, ['places', action.placeId, 'place_types', placeTypeIdx])
                .removeIn(['placeTypes', action.id]);

            return {
                ...state,
                placesEntities
            };

        }

        case actionTypes.CHANGE_PLACE_TYPE_POSITION: {
            const placesEntities = updateIn(state.placesEntities,
                ['places', action.placeId, 'place_types'],
                (arr, { fromIndex, toIndex } = action) => useArrayMove(arr, fromIndex, toIndex)
            );

            return {
                ...state,
                placesEntities
            };
        }

        case actionTypes.TOGGLE_SHOW_IN_META: {

            const placesEntities = setIn(
                state.placesEntities,
                ['placeTypes', action.placeTypeId, 'showInMeta'],
                action.showInMeta
            );

            return {
                ...state,
                placesEntities
            };

        }

        case actionTypes.CHANGE_PLACE_TYPE: {

            const placesEntities = setIn(state.placesEntities,
                ['placeTypes', action.placeTypeId, 'type'], action.placeType
            );

            return {
                ...state,
                placesEntities
            };

        }

        case actionTypes.CHANGE_AVERAGE_BILL: {

            const placesEntities = setIn(state.placesEntities,
                ['places', action.placeId, 'average_bill'], action.averageBill
            );

            return {
                ...state,
                placesEntities
            };

        }

        case actionTypes.TOGGLE_CUISINE_EDIT: {
            return {
                ...state,
                isCuisineEditOpen: action.isCuisineEditOpen,
            };
        }

        case actionTypes.ADD_CUISINE: {

            const nextCuisineKey = uuid();
            const placesEntities = updateIn(state.placesEntities,
                ['places', action.placeId, 'cuisines'],
                arr => arr.concat([nextCuisineKey])
            ).updateIn(['cuisines'], arr => Object.assign({ ...arr }, {
                [nextCuisineKey]: {
                    id: nextCuisineKey,
                    position: '',
                    cuisine: null,
                }
            }));

            return {
                ...state,
                placesEntities
            };
        }

        case actionTypes.CHANGE_CUISINE_POSITION: {
            const placesEntities = updateIn(state.placesEntities,
                ['places', action.placeId, 'cuisines'],
                (arr, { fromIndex, toIndex } = action) => useArrayMove(arr, fromIndex, toIndex)
            );

            return {
                ...state,
                placesEntities
            };
        }

        case actionTypes.DELETE_CUISINE: {

            const cuisineIdx = state.placesEntities
                .getIn(['places', action.placeId, 'cuisines'])
                .findIndex(el => el === action.id);
            const placesEntities = removeIn(state.placesEntities, ['places', action.placeId, 'cuisines', cuisineIdx])
                .removeIn(['cuisines', action.id]);

            return {
                ...state,
                placesEntities
            };

        }


        case actionTypes.CHANGE_PLACE_CUISINE: {

            const placesEntities = setIn(state.placesEntities,
                ['cuisines', action.cuisineId, 'cuisine'], action.cuisine
            );

            return {
                ...state,
                placesEntities
            };

        }

        default:
            return state;

    }
};

export default projectReducer;