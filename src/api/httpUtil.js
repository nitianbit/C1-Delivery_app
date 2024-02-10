import { ApiHandler } from "./apiHandler";
import { API_METHODS } from "./constants";



export const doGET = async function (url, token) {
    const reqParam = {};
    const method = API_METHODS.GET;
    const endPoint = url;
    try {
        const response = await ApiHandler({ reqParam, method, endPoint, token });
        return response;
    } catch (err) {
        throw new Error(err.message);
    }
};

export const doPOST = async function (url, data) {
    const reqParam = data;
    const method = API_METHODS.POST;
    const endPoint = url;
    try {
        const response = await ApiHandler({ reqParam, method, endPoint });
        return response;
    } catch (err) {
        throw new Error(err.message);
    }
};
