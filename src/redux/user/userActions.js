import { SAVE_USER_DETAILS } from "./userConstants"
export const saveUserData = (payload) => {
    return {
        type: SAVE_USER_DETAILS,
        payload
    }
}