import Axios from "axios";

export const axios = (config) => {
    return new Promise((resolve,reject) => {
        Axios.create({
            method: config.method || 'post',
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err);
        })
    })
}