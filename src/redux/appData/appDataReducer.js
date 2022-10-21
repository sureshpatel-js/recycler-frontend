import { SAVE_APP_DATA_DETAILS } from "./appDataConstants";
const initialState = {
}
export const appDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_APP_DATA_DETAILS:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};