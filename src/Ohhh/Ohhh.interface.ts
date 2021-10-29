export interface ContentInterface {
    /**
    * oss配置
    */
    config: any
}

export type Next = () => Promise<any> | any
export type Adapter = (playload: any[], content: ContentInterface, next?: Next) => void
export type Adapters = Adapter[]
export type AdaptersMap = {
}

export type option_qiniu_upload = {

}
export interface OhhhInterface extends ContentInterface {
    adaptersMap: AdaptersMap

    useAdapter(middleware: Adapter, name: string)
    bindAdaptersMap(adaptersMap: AdaptersMap)
    action: (name: string, playload?: any) => void
}

