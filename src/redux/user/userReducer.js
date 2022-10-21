import { SAVE_USER_DETAILS } from "./userConstants";
const initialState = {
}
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_USER_DETAILS:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};