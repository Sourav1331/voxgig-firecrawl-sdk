import { FirecrawlEntityBase } from '../FirecrawlEntityBase';
import type { FirecrawlSDK } from '../FirecrawlSDK';
import type { Control } from '../types';
import type { BatchScrapeStatusResponseObj, BatchScrapeStatusResponseObjLoadMatch, BatchScrapeStatusResponseObjCreateData } from '../FirecrawlTypes';
declare class BatchScrapeStatusResponseObjEntity extends FirecrawlEntityBase<BatchScrapeStatusResponseObj> {
    constructor(client: FirecrawlSDK, entopts: any);
    make(this: BatchScrapeStatusResponseObjEntity): BatchScrapeStatusResponseObjEntity;
    load(this: any, reqmatch?: BatchScrapeStatusResponseObjLoadMatch, ctrl?: Control): Promise<BatchScrapeStatusResponseObjEntity>;
    create(this: any, reqdata?: BatchScrapeStatusResponseObjCreateData, ctrl?: Control): Promise<BatchScrapeStatusResponseObjEntity>;
}
export { BatchScrapeStatusResponseObjEntity };
