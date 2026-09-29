import { FirecrawlEntityBase } from '../FirecrawlEntityBase';
import type { FirecrawlSDK } from '../FirecrawlSDK';
import type { Control } from '../types';
import type { ExtractType, ExtractLoadMatch, ExtractCreateData } from '../FirecrawlTypes';
declare class ExtractEntity extends FirecrawlEntityBase<ExtractType> {
    constructor(client: FirecrawlSDK, entopts: any);
    make(this: ExtractEntity): ExtractEntity;
    load(this: any, reqmatch?: ExtractLoadMatch, ctrl?: Control): Promise<ExtractEntity>;
    create(this: any, reqdata?: ExtractCreateData, ctrl?: Control): Promise<ExtractEntity>;
}
export { ExtractEntity };
