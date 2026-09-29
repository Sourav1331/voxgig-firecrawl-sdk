import { FirecrawlEntityBase } from '../FirecrawlEntityBase';
import type { FirecrawlSDK } from '../FirecrawlSDK';
import type { Control } from '../types';
import type { Crawl, CrawlLoadMatch, CrawlCreateData, CrawlRemoveMatch } from '../FirecrawlTypes';
declare class CrawlEntity extends FirecrawlEntityBase<Crawl> {
    constructor(client: FirecrawlSDK, entopts: any);
    make(this: CrawlEntity): CrawlEntity;
    load(this: any, reqmatch?: CrawlLoadMatch, ctrl?: Control): Promise<CrawlEntity>;
    create(this: any, reqdata?: CrawlCreateData, ctrl?: Control): Promise<CrawlEntity>;
    remove(this: any, reqmatch?: CrawlRemoveMatch, ctrl?: Control): Promise<CrawlEntity>;
}
export { CrawlEntity };
