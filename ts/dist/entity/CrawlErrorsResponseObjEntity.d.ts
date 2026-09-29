import { FirecrawlEntityBase } from '../FirecrawlEntityBase';
import type { FirecrawlSDK } from '../FirecrawlSDK';
import type { Control } from '../types';
import type { CrawlErrorsResponseObj, CrawlErrorsResponseObjListMatch } from '../FirecrawlTypes';
declare class CrawlErrorsResponseObjEntity extends FirecrawlEntityBase<CrawlErrorsResponseObj> {
    constructor(client: FirecrawlSDK, entopts: any);
    make(this: CrawlErrorsResponseObjEntity): CrawlErrorsResponseObjEntity;
    list(this: any, reqmatch?: CrawlErrorsResponseObjListMatch, ctrl?: Control): Promise<CrawlErrorsResponseObjEntity[]>;
}
export { CrawlErrorsResponseObjEntity };
