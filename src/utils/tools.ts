import Axios from "axios";
import { message } from "antd";
export const axios = config => {
    let configCom = {
        method: config.method || "post",
        headers: {},
        ...config
    };
    const token = window.localStorage.getItem("token");
    if (!("authorization" in config) || config.authorization) {
        // 不带authorization或设为true则加入jwt
        configCom.headers["Authorization"] = `Bearer ${token}`;
    }
    return new Promise((resolve, reject) => {
        Axios(configCom)
        .then(res => {
            resolve(res);
        })
        .catch(err => {
            console.log(err)
            reject(err);
        });
    });
};
export const httpReq = async (config, setLoadding = null) => {
    setLoadding && setLoadding(true);
    try {
        var res: any = await axios(config);
        let timer = setTimeout(() => {
            clearTimeout(timer)
            setLoadding && setLoadding(false);
        }, 500)
        if (res && res.data && res.data.code === 2) {
            return Promise.resolve(res.data)
        } else if(res) {
            message.error(res && res.data ? res.data.message : "出错咯~");
            return Promise.reject(res.data)
        }
    } catch (err) {
        message.error("网络请求出错~");
        return Promise.reject(err)
    }
}
export function buffertoArrayBuffer(array) {
    var length = array.length < 0 ? 0 : array.length;
    var buf = new Uint8Array(length);
    for (var i = 0; i < length; i += 1) {
        buf[i] = array[i] & 255;
    }
    return buf;
}
export function ArrayBuffertoBuffer(ab) {
    var buf = new Buffer(ab.byteLength);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
        buf[i] = view[i];
    }
    return buf;
}
/**
* base64  to blob二进制
*/
export function dataURItoBlob(dataURI) {
   var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]; // mime类型
   var byteString = atob(dataURI.split(',')[1]); //base64 解码
   var arrayBuffer = new ArrayBuffer(byteString.length); //创建缓冲数组
   var intArray = new Uint8Array(arrayBuffer); //创建视图
   for (var i = 0; i < byteString.length; i++) {
       intArray[i] = byteString.charCodeAt(i);
   }
   return new Blob([intArray], {type: mimeString});
}
export const formatTime = (date, type = 'yy-mm-dd hh:ee:ss') => {
    date = new Date(date);
    const formatNumber = n => {
        n = n.toString();
        return n[1] ? n : "0" + n;
    };
    const year = formatNumber(date.getFullYear());
    const month = formatNumber(date.getMonth() + 1);
    const day = formatNumber(date.getDate());
    const hour = formatNumber(date.getHours());
    const minute = formatNumber(date.getMinutes());
    const second = formatNumber(date.getSeconds());
    return type.replace('yy', year).replace('mm', month).replace('dd', day).replace('hh', hour).replace('ee', minute).replace('ss', second);
};

/**
 * 节流(函数节流就是fps游戏的射速，就算一直按着鼠标射击，也只会在规定射速内射出子弹)
 * @param  fun
 */
export function throttle(fun, delay) {
    let last, deferTimer
    return function (args) {
        let that = this
        let _args = arguments
        let now = +new Date()
        if (last && now < last + delay) {
            clearTimeout(deferTimer)
            deferTimer = setTimeout(function () {
                last = now
                fun.apply(that, _args)
            }, delay)
        }else {
            last = now
            fun.apply(that,_args)
        }
    }
}

/** 
 * 获取指定时间的时间戳
*/
export const getTimes = (str) => {
    return new Date(str).getTime()
}

/**
 * @param url
 * @param name
 */
export const downloadFile = (url: string, name: string) => {
    axios({
        url,
        method: "get",
        responseType: "blob",
        // headers: {
        // "Access-Control-Allow-Origin": '*'
        // },
        authorization: false
    })
        .then((res: { data: any }) => {
            if (res.data) {
                var eleLink = document.createElement("a");
                eleLink.download = name || new Date().getTime() + ".mp4";
                eleLink.style.display = "none";
                // 字符内容转变成blob地址
                var blob = new Blob([res.data]);
                eleLink.href = URL.createObjectURL(blob);
                // 触发点击
                document.body.appendChild(eleLink);
                eleLink.click();
                // 然后移除
                document.body.removeChild(eleLink);
            }
        })
        .catch(err => {
            console.log(err);
        });
};
/**
 *
 * @param el  canvas
 */
export function makeSnow(el) {
    var ctx = el.getContext("2d");
    var width = 0;
    var height = 0;
    var particles = [];

    var Particle = function() {
        this.x = this.y = this.dx = this.dy = 0;
        this.reset();
    };

    Particle.prototype.reset = function() {
        this.y = Math.random() * height;
        this.x = Math.random() * width;
        this.dx = Math.random() * 1 - 0.5;
        this.dy = Math.random() * 0.5 + 0.5;
    };

    function createParticles(count) {
        if (count != particles.length) {
            particles = [];
            for (var i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        }
    }

    function onResize() {
        width = window.innerWidth;
        height = window.innerHeight;
        el.width = width;
        el.height = height;

        createParticles((width * height) / 10000);
    }

    function updateParticles() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "#f6f9fa";

        particles.forEach(function(particle) {
            particle.y += particle.dy;
            particle.x += particle.dx;

            if (particle.y > height) {
                particle.y = 0;
            }

            if (particle.x > width) {
                particle.reset();
                particle.y = 0;
            }

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, 5, 0, Math.PI * 2, false);
            ctx.fill();
        });

        window.requestAnimationFrame(updateParticles);
    }

    onResize();
    updateParticles();

    window.addEventListener("resize", onResize);
}
/**
 * 检测浏览器版本
 */
export const ieVersion = () => {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE =
        userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 =
        userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return 7;
        } else if (fIEVersion == 8) {
            return 8;
        } else if (fIEVersion == 9) {
            return 9;
        } else if (fIEVersion == 10) {
            return 10;
        } else {
            return 6; //IE版本<=7
        }
    } else if (isEdge) {
        return "edge"; //edge
    } else if (isIE11) {
        return 11; //IE11
    } else {
        return -1; //不是ie浏览器
    }
};
/**
 *
 * @param list 需要变换位置的数组
 * @param startIndex 变换前索引
 * @param endIndex 变化后索引
 */
export const reorder = (list: any, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

/**
 * file文件转成base64预览
 */
export function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        var image = new Image();
        image.onload=function(){
            callback(reader.result, image.width, image.height)
        };
        image.src= reader.result + '';
    });
    reader.readAsDataURL(img);
}
/**
 * 上传视频本地获取视频分辨率与视频第一帧
 * @param type domEle 寄放video的dom
 */
let loadeddataFun
export function getVideoInfo(domEle, file, cb) {
    var reader2 = new FileReader();
    try{
        reader2.addEventListener("load", () => {
            var dataUrl = reader2.result;
            domEle.src = URL.createObjectURL(new Blob([dataUrl]));
            // console.log(URL.createObjectURL(new Blob([dataUrl])))
            loadeddataFun && domEle.removeEventListener('loadeddata', loadeddataFun, false)
            loadeddataFun = function(e) {
                // console.log(e.target.duration)
                getVideoFirst(domEle, cb);
            }
            domEle.addEventListener("loadeddata",loadeddataFun, false);
        }, false); 
    }catch(err){
        console.log(err)
    }
    reader2.readAsArrayBuffer(file);
}
/***
 * 上传视频获得视频第一帧
 */
export function getVideoFirst(video, cb) {
    var canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    cb(video, canvas.toDataURL("image/png")); // 宽高 首帧
}
/**
 * 音频文件转blob
 * @param file 
 */
export function file2Bolb(file) {
    let reader = new FileReader();
    let eleAudio = document.querySelector('audio.eleAudio');
    if(eleAudio) {
        document.body.removeChild(eleAudio)
    }
    let newEleAudio = document.createElement("audio");
    newEleAudio.style.display = "none";
    newEleAudio.controls = true;
    newEleAudio.loop = false;
    newEleAudio.className = 'eleAudio'; 
    document.body.appendChild(newEleAudio);   
    reader.addEventListener("load", (e) => {
        if(reader.result) {
            let blob: any = new Blob([reader.result], {
                type: 'audio/mpeg'
            })
            // let blob: any = dataURItoBlob(reader.result)
            let src: any =  window.URL.createObjectURL(blob)
            newEleAudio.src = src
            newEleAudio.load()
        }
    })
    reader.readAsArrayBuffer(file);
}
/**
 * @param obj1 目标对象(Object Array) 注意File引用可能不通用
 * @return obj2 返回新数据 
 */
export function deepCopy(obj1) {
    var obj2 = Array.isArray(obj1) ? [] : {};
    if (obj1 && typeof obj1 === "object") {
        for (var i in obj1) {
            var prop = obj1[i]; // 避免相互引用造成死循环，如obj1.a=obj
            if (prop == obj1) {
                continue;
            }
            if (obj1.hasOwnProperty(i)) {
                // 如果子属性为引用数据类型，递归复制
                if (prop && typeof prop === "object") {
                    if(prop.constructor.name === 'File') {
                        obj2[i] = prop
                    }else{
                        obj2[i] = (prop.constructor === Array) ? [] : {};
                        obj2[i] = deepCopy(prop) // 递归调用
                    }
                } else {
                    // 如果是基本数据类型，只是简单的复制
                    obj2[i] = prop;
                }
            }
        }
    }
    return obj2;
}

/**
 * 
 * @param str 要筛选空格的字符串
 */
export function deleteWhiteHanlde (str) {
    return function (cb) {
        cb(str.replace(/\s/g, ''))
    }
}