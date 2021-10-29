
import * as qiniu from 'qiniu'
import { auth } from '../util';

export function download(args, ctx, next) {
    const { options, fileName, Domain } = args[1]

    const mac = new qiniu.auth.digest.Mac(ctx.config.accessKey, ctx.config.secretKey);
    const config = new qiniu.conf.Config();
    const bucketManager = new qiniu.rs.BucketManager(mac, config);
    // const publicBucketDomain = 'http://if-pbl.qiniudn.com';
    // const privateBucketDomain = 'http://if-pri.qiniudn.com';
    
    var publicDownloadUrl = bucketManager.publicDownloadUrl(Domain, fileName);

    const deadline = parseInt((Date.now() / 1000) + '') + 3600; // 1小时过期
    var privateDownloadUrl = bucketManager.privateDownloadUrl(Domain, fileName, deadline);
}