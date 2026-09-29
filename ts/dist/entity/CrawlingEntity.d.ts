import { FirecrawlEntityBase } from '../FirecrawlEntityBase';
import type { FirecrawlSDK } from '../FirecrawlSDK';
import type { Control } from '../types';
import type { Crawling, CrawlingListMatch } from '../FirecrawlTypes';
declare class CrawlingEntity extends FirecrawlEntityBase<Crawling> {
    constructor(client: FirecrawlSDK, entopts: any);
    make(this: CrawlingEntity): CrawlingEntity;
    list(this: any, reqmatch?: CrawlingListMatch, ctrl?: Control): Promise<CrawlingEntity[]>;
}
export { CrawlingEntity };
