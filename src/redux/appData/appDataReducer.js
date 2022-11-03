import { SAVE_APP_DATA_DETAILS, SET_LOADER } from "./appDataConstants";
const initialState = {
    loader: false,
    appData: {}

}
export const appDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_APP_DATA_DETAILS:
            return {
                ...state,
                ...action.payload,
            };
        case SET_LOADER:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};