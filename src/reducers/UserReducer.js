import { CHANGE_PAGE_SIZE, CHANGE_SEARCH_VALUE, CLEAR_SEARCH_VALUE, COMPLETED_USERS_REQ, INITIALIZE_USERS_REQ, SUCCESS_USERS_REQ, FILTER_USERS } from "../userActions";

export const reducer = (state, action) => {
    switch (action.type) {
        case INITIALIZE_USERS_REQ:
            return { ...state, loading: true }
        case SUCCESS_USERS_REQ:
            return { ...state, loading: false, users: action.payload }
        case COMPLETED_USERS_REQ:
            return { ...state, loading: false }
        case CHANGE_PAGE_SIZE:
            return { ...state, users: action.payload.users, pageSize: action.payload.pageSize }
        case CHANGE_SEARCH_VALUE:
            return { ...state, search: action.payload }
           case CLEAR_SEARCH_VALUE:
            return { ...state, search: '' }
        case FILTER_USERS:
            return {...state, filterUsers: action.payload}
        default:
            return state;
    }
}

