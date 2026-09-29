import { BatchScrapeStatusResponseObjEntity } from './entity/BatchScrapeStatusResponseObjEntity';
import { BillingEntity } from './entity/BillingEntity';
import { CrawlEntity } from './entity/CrawlEntity';
import { CrawlErrorsResponseObjEntity } from './entity/CrawlErrorsResponseObjEntity';
import { CrawlingEntity } from './entity/CrawlingEntity';
import { ExtractEntity } from './entity/ExtractEntity';
import { MapEntity } from './entity/MapEntity';
import { ScrapeEntity } from './entity/ScrapeEntity';
import { ScrapingEntity } from './entity/ScrapingEntity';
import { SearchEntity } from './entity/SearchEntity';
export type * from './FirecrawlTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { FirecrawlEntityBase } from './FirecrawlEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class FirecrawlSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    BatchScrapeStatusResponseObj(entopts?: Record<string, any>): BatchScrapeStatusResponseObjEntity;
    Billing(entopts?: Record<string, any>): BillingEntity;
    Crawl(entopts?: Record<string, any>): CrawlEntity;
    CrawlErrorsResponseObj(entopts?: Record<string, any>): CrawlErrorsResponseObjEntity;
    Crawling(entopts?: Record<string, any>): CrawlingEntity;
    Extract(entopts?: Record<string, any>): ExtractEntity;
    Map(entopts?: Record<string, any>): MapEntity;
    Scrape(entopts?: Record<string, any>): ScrapeEntity;
    Scraping(entopts?: Record<string, any>): ScrapingEntity;
    Search(entopts?: Record<string, any>): SearchEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): FirecrawlSDK;
    tester(testopts?: any, sdkopts?: any): FirecrawlSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof FirecrawlSDK;
export { stdutil, config, BaseFeature, FirecrawlEntityBase, FirecrawlSDK, SDK, };
