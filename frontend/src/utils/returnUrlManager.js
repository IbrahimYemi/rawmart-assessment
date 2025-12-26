import { APP_CONSTANTS } from "./appConstants";

export function setReturnUrl(returnUrl = null) {
    localStorage.setItem(
        APP_CONSTANTS.STORAGE_KEYS.RETURN_URL,
        returnUrl || window.location.href
    );
}

export function retrieveReturnUrl() {
    const url = localStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.RETURN_URL);

    localStorage.removeItem(APP_CONSTANTS.STORAGE_KEYS.RETURN_URL);
    return url;
}
