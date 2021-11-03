import { compose } from "./compose";
import { AdaptersMap, Adapter, Adapters, ContentInterface, OhhhInterface } from "./Ohhh.interface";

export class Content implements ContentInterface {
    config: any
    constructor(config) {
        this.config = config
    }
}

export class Ohhh extends Content implements OhhhInterface {
    adaptersMap = {}

    constructor(config, init?: (ContentInterface) => void) {
        super(config)
        if (init) init(this)
    }

    // 绑定适配器
    useAdapter(adapter: Adapter, name: string): Ohhh {
        if (typeof adapter !== 'function') throw new TypeError('Adapter must be composed of functions!')

        if (this.adaptersMap[name]) {
            this.adaptersMap[name].push(adapter)
        } else {
            this.adaptersMap[name] = []
            this.adaptersMap[name].push(adapter)
        }
        return this
    }

    // 绑定全部适配器
    bindAdaptersMap(adaptersMap: AdaptersMap) {
        Object.keys(adaptersMap).forEach((key)=>{
            if (!Array.isArray(adaptersMap[key])) throw new TypeError('Middleware stack must be an array!')
            for (const fn of adaptersMap[key]) {
                if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
            }
        })
       

        Object.assign(this.adaptersMap, adaptersMap)
        return this
    }

    // 执行动作
    action(name: string): Promise<any> {
        if (this.adaptersMap[name]) {
            return compose(this.adaptersMap[name])([...arguments], this)
        } else {
            return Promise.reject(new Error('unknown action'))
        }
    }
}
