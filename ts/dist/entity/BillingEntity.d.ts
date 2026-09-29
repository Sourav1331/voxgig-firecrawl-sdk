import { FirecrawlEntityBase } from '../FirecrawlEntityBase';
import type { FirecrawlSDK } from '../FirecrawlSDK';
import type { Control } from '../types';
import type { Billing, BillingLoadMatch, BillingListMatch } from '../FirecrawlTypes';
declare class BillingEntity extends FirecrawlEntityBase<Billing> {
    constructor(client: FirecrawlSDK, entopts: any);
    make(this: BillingEntity): BillingEntity;
    load(this: any, reqmatch?: BillingLoadMatch, ctrl?: Control): Promise<BillingEntity>;
    list(this: any, reqmatch?: BillingListMatch, ctrl?: Control): Promise<BillingEntity[]>;
}
export { BillingEntity };
