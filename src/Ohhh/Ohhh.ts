import { compose } from "./compose";
import { AdaptersMap, Adapter, Adapters, ContentInterface, OhhhInterface } from "./Ohhh.interface";

export class Content implements ContentInterface {
    config: any
    constructor(config) {
        this.config = config
    }
}

// const _adaptersMap_ = {
//     'buckets': [],
//     'mkbucket': [],
//     'domainList': [],
//     'drop': [],

//     'putbucketTagging': [],
//     'getbucketTagging': [],
//     'deletebucketTagging': [],

//     'upload': [],
//     'mkblk': [],
//     'bput': [],
//     'mkfile': [],
//     'stat': [],
//     'chgm': [],
//     'move': [],
//     'copy': [],
//     'delete': [],
//     'list': [],
//     'fetch': [],
//     'batch': [],
//     'prefetch': [],
//     'image': [],

//     'deleteAfterDays': [],
//     'chtype': [],
//     'restoreAr': [],
// }




export class Ohhh extends Content implements OhhhInterface {
    adaptersMap={}

    constructor(config, init?: (ContentInterface) => void) {
        super(config)
        if (init) init(this)
    }

    // 适配器绑定 方法
    useAdapter(adapter: Adapter, name: string): Ohhh {
        if (this.adaptersMap[name]) {
            this.adaptersMap[name].push(adapter)
        } else {
            this.adaptersMap[name] = []
            this.adaptersMap[name].push(adapter)
        }
        return this
    }

    // 适配器绑定全部方法
    bindAdaptersMap(adaptersMap: AdaptersMap) {
        Object.assign(this.adaptersMap, adaptersMap)
        return this
    }

    // oss执行动作
    action(name: string) {
        if (this.adaptersMap[name]) {
            return compose(this.adaptersMap[name])([...arguments], this)
        } else {
            throw 'Error: undefined action'
        }
    }



}