import { AdaptersMap } from "../../../Ohhh/Ohhh.interface"
import { download } from "./download"
import { put, putFile, putStream } from "./upload"

/**
 * TODO: 
 * 1. upload
 * 2. download
 * 3. bucketManager
 * 4. cdnManager
 */

export const adaptersMap:AdaptersMap ={
    'upload': [putFile],
    'upload.file': [putFile],
    'upload.byte': [put],
    'upload.stream': [putStream],

    'download': [download]
    
}