import { SAVE_APP_DATA_DETAILS  } from "./appDataConstants"
export const saveAppData = (payload) => {
    return {
        type: SAVE_APP_DATA_DETAILS,
        payload
    }
}