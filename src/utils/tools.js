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
export function buffertoArrayBuffer(array) {
    var length = array.length < 0 ? 0 : array.length
    var buf = new Uint8Array(length)
    for (var i = 0; i < length; i += 1) {
      buf[i] = array[i] & 255
    }
    return buf
}
export function ArrayBuffertoBuffer(ab) {
    var buf = new Buffer(ab.byteLength);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
        buf[i] = view[i];
    }
    return buf;
}