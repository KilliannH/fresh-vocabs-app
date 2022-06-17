import * as config from "./config";
import {decode} from "./services/authService";

const constants = {
    appName: "Fresh Vocab",
}

export function checkExpiry(exp) {
    const currentDateTime = new Date();
    const now = currentDateTime.getTime() / 1000;
    return now < exp;
}

export default constants;