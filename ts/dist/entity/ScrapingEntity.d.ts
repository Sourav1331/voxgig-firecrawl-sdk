import { FirecrawlEntityBase } from '../FirecrawlEntityBase';
import type { FirecrawlSDK } from '../FirecrawlSDK';
import type { Control } from '../types';
import type { Scraping, ScrapingRemoveMatch } from '../FirecrawlTypes';
declare class ScrapingEntity extends FirecrawlEntityBase<Scraping> {
    constructor(client: FirecrawlSDK, entopts: any);
    make(this: ScrapingEntity): ScrapingEntity;
    remove(this: any, reqmatch?: ScrapingRemoveMatch, ctrl?: Control): Promise<ScrapingEntity>;
}
export { ScrapingEntity };
