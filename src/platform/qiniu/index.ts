import { tsExportAssignment } from '@babel/types';
import * as qiniu from 'qiniu'
import { Ohhh } from "../../Ohhh/Ohhh";
import { OhhhInterface } from "../../Ohhh/Ohhh.interface";
import { adaptersMap } from './adapters';
// 适配器


export interface QiniuConfig {
    SDK: 'qiniu'
    accessKey: string,
    secretKey: string,
}

export function newQiniu(config: QiniuConfig): OhhhInterface {
    const ohhh = new Ohhh(config, (ctx) => { // 初始化

    })

    ohhh.bindAdaptersMap(adaptersMap)
    return ohhh
}