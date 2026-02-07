import axiosInstance from "./axios";
import { routes } from "./routes.js";

export const addTimeSheet = (body) => {
    return axiosInstance({
        method:routes.ADDTIMESHEET.METHOD,
        url:routes.ADDTIMESHEET.URL,
        data:body
    })
}

export const updateTimeSheet = (id,body) => {
    return axiosInstance({
        method:routes.UPDATETIMESHEET.METHOD,
        url:`${routes.UPDATETIMESHEET.URL}/${id}`,
        data:body,
    })
}


export const delteTimeSheet = (id,body) => {
    return axiosInstance({
        method:routes.DELETETIMESHEET.METHOD,
        url:`${routes.DELETETIMESHEET.URL}/${id}`,
        data:body
    })
}