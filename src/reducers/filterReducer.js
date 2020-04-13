import * as actionTypes from '../actions';

const initialFilter = {
    user: 'null',
    completion: false,
    comment: 'null',
    commentText: '',
    places: []
};
const initialOptions = {
    userOptions: [
        {
            label: 'Все',
            value: 'null'
        }
    ],
    completionOptions: [
        {
            label: 'Все',
            value: 'null'
        },
        {
            label: 'В работе',
            value: false
        },
        {
            label: 'Выполнено',
            value: true
        }
    ]
};


const initialState = {
    isOpen: false,
    isLoadingPlaces: false,
    initial: { ...initialFilter },
    current: { ...initialFilter },
    options: { ...initialOptions },
    placeQuery: '',
    placesSuggestions: [],
};

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_FILTER:
            return {
                ...state,
                isOpen: action.isOpen,
            };

        case actionTypes.CHANGE_FILTER:
            return {
                ...state,
                current: {
                    ...state.current,
                    [action.field]: action.value
                }
            };

        case actionTypes.CLEAR_FILTER:
            return {
                ...state,
                current: { ...state.initial }
            };

        case actionTypes.RECEIVE_FILTER_OPTIONS:
            return {
                ...state,
                options: {
                    ...state.options,
                    userOptions: [
                        ...initialOptions.userOptions,
                        ...action.options.userOptions
                    ]
                }
            };

        case actionTypes.REQUEST_PLACES:
            return {
                ...state,
                isLoadingPlaces: true,
            };

        case actionTypes.RECEIVE_PLACES:
            return {
                ...state,
                isLoadingPlaces: false,
                placesSuggestions: [ ...action.places ]
            };

        default:
            return state;
    }
};

export default filterReducer;