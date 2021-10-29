import * as qiniu from 'qiniu'


export function auth(accessKey: string, secretKey: string, options?: any) {
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    return { uploadToken, mac }
}

// 校验存储服务上传回调的Authorization
// @param mac           AK&SK对象
// @param requestURI   回调的URL中的requestURI
// @param reqBody      请求Body，仅当请求的ContentType为
//                     application/x-www-form-urlencoded时才需要传入该参数
// @param callbackAuth 回调时请求的Authorization头部值
export function isQiniuCallback(mac, requestURI, reqBody, callbackAuth) {
    var auth = exports.generateAccessToken(mac, requestURI, reqBody);
    return auth === callbackAuth;
}