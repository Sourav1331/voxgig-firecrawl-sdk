import { FirecrawlEntityBase } from '../FirecrawlEntityBase';
import type { FirecrawlSDK } from '../FirecrawlSDK';
import type { Control } from '../types';
import type { Search, SearchCreateData } from '../FirecrawlTypes';
declare class SearchEntity extends FirecrawlEntityBase<Search> {
    constructor(client: FirecrawlSDK, entopts: any);
    make(this: SearchEntity): SearchEntity;
    create(this: any, reqdata?: SearchCreateData, ctrl?: Control): Promise<SearchEntity>;
}
export { SearchEntity };
