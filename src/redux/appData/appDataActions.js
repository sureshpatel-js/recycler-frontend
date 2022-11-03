import { SAVE_APP_DATA_DETAILS, SET_LOADER } from "./appDataConstants"
export const saveAppData = (payload) => {
    return {
        type: SAVE_APP_DATA_DETAILS,
        payload
    }
}

export const setLoader = (payload) => {
    return {
        type: SET_LOADER,
        payload
    }
}