export interface BatchScrapeStatusResponseObj {
    completed?: number;
    creditsUsed?: number;
    data?: any[];
    expiresAt?: string;
    id?: string;
    invalidURLs?: any[];
    next?: string;
    status?: string;
    success?: boolean;
    total?: number;
    url?: string;
}
export interface BatchScrapeStatusResponseObjLoadMatch {
    id: string;
}
export interface BatchScrapeStatusResponseObjCreateData {
    completed?: number;
    creditsUsed?: number;
    data?: any[];
    expiresAt?: string;
    id?: string;
    invalidURLs?: any[];
    next?: string;
    status?: string;
    success?: boolean;
    total?: number;
    url?: string;
}
export interface Billing {
    apiKey?: string;
    billingPeriodEnd?: string;
    billingPeriodStart?: string;
    endDate?: string;
    planCredits?: number;
    planTokens?: number;
    remainingCredits?: number;
    remainingTokens?: number;
    startDate?: string;
    totalCredits?: number;
    totalTokens?: number;
}
export interface BillingLoadMatch {
    apiKey?: string;
    billingPeriodEnd?: string;
    billingPeriodStart?: string;
    endDate?: string;
    planCredits?: number;
    planTokens?: number;
    remainingCredits?: number;
    remainingTokens?: number;
    startDate?: string;
    totalCredits?: number;
    totalTokens?: number;
}
export interface BillingListMatch {
    by_api_key?: boolean;
}
export interface Crawl {
    allowExternalLinks?: boolean;
    allowSubdomains?: boolean;
    completed?: number;
    crawlEntireDomain?: boolean;
    creditsUsed?: number;
    data?: any[];
    delay?: number;
    excludePaths?: any[];
    expiresAt?: string;
    id?: string;
    ignoreQueryParameters?: boolean;
    includePaths?: any[];
    limit?: number;
    maxConcurrency?: number;
    maxDiscoveryDepth?: number;
    next?: string;
    prompt?: string;
    scrapeOptions?: Record<string, any>;
    sitemap?: string;
    status?: string;
    success?: boolean;
    total?: number;
    url?: string;
    webhook: Record<string, any>;
    zeroDataRetention?: boolean;
}
export interface CrawlLoadMatch {
    id: string;
}
export interface CrawlCreateData {
    allowExternalLinks?: boolean;
    allowSubdomains?: boolean;
    completed?: number;
    crawlEntireDomain?: boolean;
    creditsUsed?: number;
    data?: any[];
    delay?: number;
    excludePaths?: any[];
    expiresAt?: string;
    id?: string;
    ignoreQueryParameters?: boolean;
    includePaths?: any[];
    limit?: number;
    maxConcurrency?: number;
    maxDiscoveryDepth?: number;
    next?: string;
    prompt?: string;
    scrapeOptions?: Record<string, any>;
    sitemap?: string;
    status?: string;
    success?: boolean;
    total?: number;
    url?: string;
    webhook: Record<string, any>;
    zeroDataRetention?: boolean;
}
export interface CrawlRemoveMatch {
    id: string;
}
export interface CrawlErrorsResponseObj {
    error?: string;
    id?: string;
    timestamp?: string;
    url?: string;
}
export interface CrawlErrorsResponseObjListMatch {
    scrape_id: string;
    $action?: string;
    [action: string]: any;
}
export interface Crawling {
    id: string;
    options: Record<string, any>;
    teamId: string;
    url: string;
}
export interface CrawlingListMatch {
    id?: string;
    options?: Record<string, any>;
    teamId?: string;
    url?: string;
}
export interface ExtractType {
    data?: Record<string, any>;
    enableWebSearch?: boolean;
    expiresAt?: string;
    id?: string;
    ignoreInvalidURLs?: boolean;
    ignoreSitemap?: boolean;
    includeSubdomains?: boolean;
    invalidURLs?: any[];
    prompt?: string;
    schema?: Record<string, any>;
    scrapeOptions?: Record<string, any>;
    showSources?: boolean;
    status?: string;
    success?: boolean;
    tokensUsed?: number;
    urls: any[];
}
export interface ExtractLoadMatch {
    id: string;
}
export interface ExtractCreateData {
    data?: Record<string, any>;
    enableWebSearch?: boolean;
    expiresAt?: string;
    id?: string;
    ignoreInvalidURLs?: boolean;
    ignoreSitemap?: boolean;
    includeSubdomains?: boolean;
    invalidURLs?: any[];
    prompt?: string;
    schema?: Record<string, any>;
    scrapeOptions?: Record<string, any>;
    showSources?: boolean;
    status?: string;
    success?: boolean;
    tokensUsed?: number;
    urls: any[];
}
export interface MapType {
    ignoreQueryParameters?: boolean;
    includeSubdomains?: boolean;
    limit?: number;
    links?: any[];
    search?: string;
    sitemap?: string;
    success?: boolean;
    timeout?: number;
    url: string;
}
export interface MapCreateData {
    ignoreQueryParameters?: boolean;
    includeSubdomains?: boolean;
    limit?: number;
    links?: any[];
    search?: string;
    sitemap?: string;
    success?: boolean;
    timeout?: number;
    url: string;
}
export interface Scrape {
    actions?: Record<string, any>;
    changeTracking?: Record<string, any>;
    html?: string;
    links?: any[];
    markdown?: string;
    metadata?: Record<string, any>;
    rawHtml?: string;
    screenshot?: string;
    summary?: string;
    warning?: string;
}
export interface ScrapeCreateData {
    actions?: Record<string, any>;
    changeTracking?: Record<string, any>;
    html?: string;
    links?: any[];
    markdown?: string;
    metadata?: Record<string, any>;
    rawHtml?: string;
    screenshot?: string;
    summary?: string;
    warning?: string;
}
export interface Scraping {
    id?: string;
}
export interface ScrapingRemoveMatch {
    id: string;
}
export interface Search {
    data?: Record<string, any>;
    ignoreInvalidURLs?: boolean;
    limit?: number;
    location?: string;
    query: string;
    scrapeOptions?: any;
    sources?: any[];
    success?: boolean;
    tbs?: string;
    timeout?: number;
    warning?: string;
}
export interface SearchCreateData {
    data?: Record<string, any>;
    ignoreInvalidURLs?: boolean;
    limit?: number;
    location?: string;
    query: string;
    scrapeOptions?: any;
    sources?: any[];
    success?: boolean;
    tbs?: string;
    timeout?: number;
    warning?: string;
}
