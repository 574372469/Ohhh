import * as qiniu from 'qiniu'
import { auth } from '../util';
/** 
 * 将内存中的字节数组上传到空间中
 * @param args 
 * @param ctx 
 * @param next 
 */
export function put(args, ctx, next) {
    const { options, localFile, fileName, extraParams, mimeType, crc32, checkCrc } = args[1]
    if (!localFile) {
        return Promise.reject(new Error('localFile unknown'))
    }
    if (!fileName) {
        return Promise.reject(new Error('fileName unknown'))
    }

    const { uploadToken } = auth(ctx.config.accessKey, ctx.config.secretKey, options)
    const config = new qiniu.conf.Config({ zone: options.zone });
    const formUploader = new qiniu.form_up.FormUploader(config);
    var putExtra = new qiniu.form_up.PutExtra('fileName', extraParams, mimeType, crc32, checkCrc);

    // 文件上传
    formUploader.putFile(uploadToken, fileName, localFile, putExtra, function (respErr,
        respBody, respInfo) {
        const reply = {
            error: respErr,
            info: respInfo,
            body: respBody
        }
        if (respInfo.statusCode == 200) {
            return Promise.resolve(reply)
        } else {
            return Promise.reject(reply)
        }
    });
}

/** 
 * 上传本地文件
 * @param args 
 * @param ctx 
 * @param next 
 */
export function putFile(args, ctx, next) {
    const { options, localFile, fileName, extraParams, mimeType, crc32, checkCrc } = args[1]
    if (!localFile) {
        return Promise.reject(new Error('localFile unknown'))
    }
    if (!fileName) {
        return Promise.reject(new Error('fileName unknown'))
    }

    const { uploadToken } = auth(ctx.config.accessKey, ctx.config.secretKey, options)
    const config = new qiniu.conf.Config({ zone: options.zone });
    const formUploader = new qiniu.form_up.FormUploader(config);
    var putExtra = new qiniu.form_up.PutExtra('fileName', extraParams, mimeType, crc32, checkCrc);

    // 文件上传
    formUploader.putFile(uploadToken, fileName, localFile, putExtra, function (respErr,
        respBody, respInfo) {
        const reply = {
            error: respErr,
            info: respInfo,
            body: respBody
        }
        if (respInfo.statusCode == 200) {
            return Promise.resolve(reply)
        } else {
            return Promise.reject(reply)
        }
    });
}


/** 
 * 数据流上传，将ReadableStream对象的上传。
 * @param args 
 * @param ctx 
 * @param next 
 */
export function putStream(args, ctx, next) {
    const { options, localFile, fileName, extraParams, mimeType, crc32, checkCrc } = args[1]
    if (!localFile) {
        return Promise.reject(new Error('localFile unknown'))
    }
    if (!fileName) {
        return Promise.reject(new Error('fileName unknown'))
    }

    const { uploadToken } = auth(ctx.config.accessKey, ctx.config.secretKey, options)
    const config = new qiniu.conf.Config({ zone: options.zone });
    const formUploader = new qiniu.form_up.FormUploader(config);
    var putExtra = new qiniu.form_up.PutExtra('fileName', extraParams, mimeType, crc32, checkCrc);

    // 文件上传
    formUploader.putFile(uploadToken, fileName, localFile, putExtra, function (respErr,
        respBody, respInfo) {
        const reply = {
            error: respErr,
            info: respInfo,
            body: respBody
        }
        if (respInfo.statusCode == 200) {
            return Promise.resolve(reply)
        } else {
            return Promise.reject(reply)
        }
    });
}

