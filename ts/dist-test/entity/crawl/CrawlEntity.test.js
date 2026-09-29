"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('CrawlEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when FIRECRAWL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('FIRECRAWL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.FirecrawlSDK.test();
        const ent = testsdk.Crawl();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.FIRECRAWL_TEST_LIVE;
        for (const op of ['create', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'crawl.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "allowExternalLinks": { "a": true, "h": "Allow External Links", "n": "allowExternalLinks", "r": false, "sh": "Allows the crawler to follow links to external websites.", "t": "`$BOOLEAN`", "key$": "allowExternalLinks", "index$": 0 }, "allowSubdomains": { "a": true, "h": "Allow Subdomains", "n": "allowSubdomains", "r": false, "sh": "Allows the crawler to follow links to subdomains of the main domain.", "t": "`$BOOLEAN`", "key$": "allowSubdomains", "index$": 1 }, "completed": { "a": true, "h": "Completed", "n": "completed", "r": false, "sh": "The number of pages that have been successfully crawled.", "t": "`$INTEGER`", "key$": "completed", "index$": 2 }, "crawlEntireDomain": { "a": true, "h": "Crawl Entire Domain", "n": "crawlEntireDomain", "r": false, "sh": "Allows the crawler to follow internal links to sibling or parent URLs, including child paths.", "t": "`$BOOLEAN`", "key$": "crawlEntireDomain", "index$": 3 }, "creditsUsed": { "a": true, "h": "Credits Used", "n": "creditsUsed", "r": false, "sh": "The number of credits used for the crawl.", "t": "`$INTEGER`", "key$": "creditsUsed", "index$": 4 }, "data": { "a": true, "h": "Data", "n": "data", "r": false, "sh": "The data of the crawl.", "t": "`$ARRAY`", "key$": "data", "index$": 5 }, "delay": { "a": true, "h": "Delay", "n": "delay", "r": false, "sh": "Delay in seconds between scrapes.", "t": "`$NUMBER`", "key$": "delay", "index$": 6 }, "excludePaths": { "a": true, "h": "Exclude Paths", "n": "excludePaths", "r": false, "sh": "URL pathname regex patterns that exclude matching URLs from the crawl.", "t": "`$ARRAY`", "key$": "excludePaths", "index$": 7 }, "expiresAt": { "a": true, "fo": "date-time", "h": "Expires At", "n": "expiresAt", "r": false, "sh": "The date and time when the crawl will expire.", "t": "`$STRING`", "key$": "expiresAt", "index$": 8 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 9 }, "ignoreQueryParameters": { "a": true, "h": "Ignore Query Parameters", "n": "ignoreQueryParameters", "r": false, "sh": "Do not re-scrape the same path with different (or none) query parameters", "t": "`$BOOLEAN`", "key$": "ignoreQueryParameters", "index$": 10 }, "includePaths": { "a": true, "h": "Include Paths", "n": "includePaths", "r": false, "sh": "URL pathname regex patterns that include matching URLs in the crawl.", "t": "`$ARRAY`", "key$": "includePaths", "index$": 11 }, "limit": { "a": true, "h": "Limit", "n": "limit", "r": false, "sh": "Maximum number of pages to crawl.", "t": "`$INTEGER`", "key$": "limit", "index$": 12 }, "maxConcurrency": { "a": true, "h": "Max Concurrency", "n": "maxConcurrency", "r": false, "sh": "Maximum number of concurrent scrapes.", "t": "`$INTEGER`", "key$": "maxConcurrency", "index$": 13 }, "maxDiscoveryDepth": { "a": true, "h": "Max Discovery Depth", "n": "maxDiscoveryDepth", "r": false, "sh": "Maximum depth to crawl based on discovery order.", "t": "`$INTEGER`", "key$": "maxDiscoveryDepth", "index$": 14 }, "next": { "a": true, "h": "Next", "n": "next", "r": false, "sh": "The URL to retrieve the next 10MB of data.", "t": "`$STRING`", "key$": "next", "index$": 15 }, "prompt": { "a": true, "h": "Prompt", "n": "prompt", "r": false, "sh": "A prompt to use to generate the crawler options (all the parameters below) from natural language.", "t": "`$STRING`", "key$": "prompt", "index$": 16 }, "scrapeOptions": { "a": true, "h": "Scrape Options", "n": "scrapeOptions", "r": false, "t": "`$OBJECT`", "union": { "branches": 9, "count": 2, "depth": 3 }, "key$": "scrapeOptions", "index$": 17 }, "sitemap": { "a": true, "h": "Sitemap", "n": "sitemap", "r": false, "sh": "Sitemap mode when crawling.", "t": "`$STRING`", "key$": "sitemap", "index$": 18 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "sh": "The current status of the crawl.", "t": "`$STRING`", "key$": "status", "index$": 19 }, "success": { "a": true, "h": "Success", "n": "success", "r": false, "t": "`$BOOLEAN`", "key$": "success", "index$": 20 }, "total": { "a": true, "h": "Total", "n": "total", "r": false, "sh": "The total number of pages that were attempted to be crawled.", "t": "`$INTEGER`", "key$": "total", "index$": 21 }, "url": { "a": true, "fo": "uri", "h": "Url", "n": "url", "op": { "create": { "req": true, "type": "`$STRING`" } }, "r": false, "sh": "The base URL to start crawling from", "t": "`$STRING`", "key$": "url", "index$": 22 }, "webhook": { "a": true, "h": "Webhook", "n": "webhook", "r": true, "sh": "A webhook specification object.", "t": "`$OBJECT`", "key$": "webhook", "index$": 23 }, "zeroDataRetention": { "a": true, "h": "Zero Data Retention", "n": "zeroDataRetention", "r": false, "sh": "If true, this will enable zero data retention for this crawl.", "t": "`$BOOLEAN`", "key$": "zeroDataRetention", "index$": 24 } }, "id": { "field": "id", "name": "id" }, "name": "crawl", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /crawl", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/crawl", "q": {}, "r": {}, "s": [{ "lit": "crawl" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /crawl/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/crawl/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "crawl" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /crawl/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/crawl/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "crawl" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" } }, "relations": { "ancestors": [] }, "key$": "crawl", "name__orig": "crawl", "Name": "Crawl", "name_": "crawl", "name-": "crawl", "NAME": "CRAWL", "index$": 2 }, { "active": true, "entity": "crawl", "key$": "BasicCrawlFlow", "kind": "basic", "name": "BasicCrawlFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "crawl_ref01" }, "m": {}, "o": "create", "s": [], "v": [] }, { "a": true, "d": {}, "i": { "ref": "crawl_ref01", "srcdatavar": "crawl_ref01_data", "suffix": "_dt0" }, "m": { "id": "crawl01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-crawl_ref01" } }] }, { "a": true, "d": {}, "i": { "ref": "crawl_ref01", "suffix": "_rm0" }, "m": { "id": "crawl01" }, "o": "remove", "s": [], "v": [] }] }, 'Crawl', { "POST /crawl": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "url": { "type": "string", "format": "uri", "description": "The base URL to start crawling from", "key$": "url" }, "prompt": { "type": "string", "description": "A prompt to use to generate the crawler options (all the parameters below) from natural language. Explicitly set parameters will override the generated equivalents.", "key$": "prompt" }, "excludePaths": { "type": "array", "items": { "type": "string" }, "description": "URL pathname regex patterns that exclude matching URLs from the crawl. For example, if you set \"excludePaths\": [\"blog/.*\"] for the base URL firecrawl.dev, any results matching that pattern will be excluded, such as https://www.firecrawl.dev/blog/firecrawl-launch-week-1-recap.", "key$": "excludePaths" }, "includePaths": { "type": "array", "items": { "type": "string" }, "description": "URL pathname regex patterns that include matching URLs in the crawl. Only the paths that match the specified patterns will be included in the response. For example, if you set \"includePaths\": [\"blog/.*\"] for the base URL firecrawl.dev, only results matching that pattern will be included, such as https://www.firecrawl.dev/blog/firecrawl-launch-week-1-recap.", "key$": "includePaths" }, "maxDiscoveryDepth": { "type": "integer", "description": "Maximum depth to crawl based on discovery order. The root site and sitemapped pages has a discovery depth of 0. For example, if you set it to 1, and you set ignoreSitemap, you will only crawl the entered URL and all URLs that are linked on that page.", "key$": "maxDiscoveryDepth" }, "sitemap": { "type": "string", "enum": ["skip", "include"], "description": "Sitemap mode when crawling. If you set it to 'skip', the crawler will ignore the website sitemap and only crawl the entered URL and discover pages from there onwards.", "default": "include", "key$": "sitemap" }, "ignoreQueryParameters": { "type": "boolean", "description": "Do not re-scrape the same path with different (or none) query parameters", "default": false, "key$": "ignoreQueryParameters" }, "limit": { "type": "integer", "description": "Maximum number of pages to crawl. Default limit is 10000.", "default": 10000, "key$": "limit" }, "crawlEntireDomain": { "type": "boolean", "description": "Allows the crawler to follow internal links to sibling or parent URLs, including child paths.\n\nfalse: Only crawls deeper (child) URLs.\n→ e.g. /features/feature-1 → /features/feature-1/tips ✅\n→ Won't follow /pricing or / ❌\n\ntrue: Crawls any internal links, including siblings and parents.\n→ e.g. /features/feature-1 → /pricing, /, etc. ✅\n\nUse true for broader internal coverage beyond nested paths.", "default": false, "key$": "crawlEntireDomain" }, "allowExternalLinks": { "type": "boolean", "description": "Allows the crawler to follow links to external websites.", "default": false, "key$": "allowExternalLinks" }, "allowSubdomains": { "type": "boolean", "description": "Allows the crawler to follow links to subdomains of the main domain.", "default": false, "key$": "allowSubdomains" }, "delay": { "type": "number", "description": "Delay in seconds between scrapes. This helps respect website rate limits.", "key$": "delay" }, "maxConcurrency": { "type": "integer", "description": "Maximum number of concurrent scrapes. This parameter allows you to set a concurrency limit for this crawl. If not specified, the crawl adheres to your team's concurrency limit.", "key$": "maxConcurrency" }, "webhook": { "type": "object", "description": "A webhook specification object.", "properties": { "url": { "type": "string", "description": "The URL to send the webhook to. This will trigger for crawl started (crawl.started), every page crawled (crawl.page) and when the crawl is completed (crawl.completed or crawl.failed). The response will be the same as the `/scrape` endpoint." }, "headers": { "type": "object", "description": "Headers to send to the webhook URL.", "additionalProperties": { "type": "string" } }, "metadata": { "type": "object", "description": "Custom metadata that will be included in all webhook payloads for this crawl", "additionalProperties": true }, "events": { "type": "array", "description": "Type of events that should be sent to the webhook URL. (default: all)", "items": { "type": "string", "enum": [] } } }, "required": ["url"], "key$": "webhook" }, "scrapeOptions": { "type": "object", "properties": { "formats": { "default": ["markdown"], "description": "Output formats to include in the response. You can specify one or more formats, either as strings (e.g., `'markdown'`) or as objects with additional options (e.g., `{ type: 'json', schema: {...} }`). Some formats require specific options to be set. Example: `['markdown', { type: 'json', schema: {...} }]`.", "items": { "oneOf": [] }, "type": "array", "x-ref": "#/components/schemas/Formats" }, "onlyMainContent": { "default": true, "description": "Only return the main content of the page excluding headers, navs, footers, etc.", "type": "boolean" }, "includeTags": { "description": "Tags to include in the output.", "items": { "type": "string" }, "type": "array" }, "excludeTags": { "description": "Tags to exclude from the output.", "items": { "type": "string" }, "type": "array" }, "maxAge": { "default": 172800000, "description": "Returns a cached version of the page if it is younger than this age in milliseconds. If a cached version of the page is older than this value, the page will be scraped. If you do not need extremely fresh data, enabling this can speed up your scrapes by 500%. Defaults to 2 days.", "type": "integer" }, "headers": { "description": "Headers to send with the request. Can be used to send cookies, user-agent, etc.", "type": "object" }, "waitFor": { "default": 0, "description": "Specify a delay in milliseconds before fetching the content, allowing the page sufficient time to load.", "type": "integer" }, "mobile": { "default": false, "description": "Set to true if you want to emulate scraping from a mobile device. Useful for testing responsive pages and taking mobile screenshots.", "type": "boolean" }, "skipTlsVerification": { "default": true, "description": "Skip TLS certificate verification when making requests", "type": "boolean" }, "timeout": { "description": "Timeout in milliseconds for the request.", "type": "integer" }, "parsers": { "default": ["pdf"], "description": "Controls how files are processed during scraping. When \"pdf\" is included (default), the PDF content is extracted and converted to markdown format, with billing based on the number of pages (1 credit per page). When an empty array is passed, the PDF file is returned in base64 encoding with a flat rate of 1 credit total.", "items": { "enum": [], "type": "string" }, "type": "array" }, "actions": { "description": "Actions to perform on the page before grabbing the content", "items": { "oneOf": [] }, "type": "array" }, "location": { "description": "Location settings for the request. When specified, this will use an appropriate proxy if available and emulate the corresponding language and timezone settings. Defaults to 'US' if not specified.", "properties": { "country": {}, "languages": {} }, "type": "object" }, "removeBase64Images": { "default": true, "description": "Removes all base 64 images from the output, which may be overwhelmingly long. The image's alt text remains in the output, but the URL is replaced with a placeholder.", "type": "boolean" }, "blockAds": { "default": true, "description": "Enables ad-blocking and cookie popup blocking.", "type": "boolean" }, "proxy": { "default": "auto", "description": "Specifies the type of proxy to use.\n\n - **basic**: Proxies for scraping sites with none to basic anti-bot solutions. Fast and usually works.\n - **enhanced**: Enhanced proxies for scraping sites with advanced anti-bot solutions. Slower, but more reliable on certain sites. Billed at the same credit cost as basic.\n - **auto**: Firecrawl will automatically retry scraping with enhanced proxies if the basic proxy fails. Enhanced proxies carry no credit surcharge, so either way only the regular cost is billed.\n\nIf you do not specify a proxy, Firecrawl will default to auto.", "enum": ["basic", "enhanced", "auto"], "type": "string" }, "storeInCache": { "default": true, "description": "If true, the page will be stored in the Firecrawl index and cache. Setting this to false is useful if your scraping activity may have data protection concerns. Using some parameters associated with sensitive scraping (actions, headers) will force this parameter to be false.", "type": "boolean" } }, "x-ref": "#/components/schemas/ScrapeOptions", "key$": "scrapeOptions" }, "zeroDataRetention": { "type": "boolean", "default": false, "description": "If true, this will enable zero data retention for this crawl. To enable this feature, please contact help@firecrawl.dev", "key$": "zeroDataRetention" } }, "required": ["url"], "index$": 1 } } } }, "parameters": [] }, "GET /crawl/{id}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "description": "The ID of the crawl job", "required": true, "schema": { "type": "string", "format": "uuid" }, "index$": 0 }] }, "DELETE /crawl/{id}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "description": "The ID of the crawl job", "required": true, "schema": { "type": "string", "format": "uuid" }, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const crawl_ref01_ent = client.Crawl();
        let crawl_ref01_data = setup.data.new.crawl['crawl_ref01'];
        crawl_ref01_data = (await crawl_ref01_ent.create(crawl_ref01_data)).data();
        (0, node_assert_1.default)(null != crawl_ref01_data.id);
        // LOAD
        const crawl_ref01_match_dt0 = {};
        crawl_ref01_match_dt0.id = crawl_ref01_data.id;
        const crawl_ref01_data_dt0 = (await crawl_ref01_ent.load(crawl_ref01_match_dt0)).data();
        (0, node_assert_1.default)(crawl_ref01_data_dt0.id === crawl_ref01_data.id);
        // REMOVE
        const crawl_ref01_match_rm0 = { id: crawl_ref01_data.id };
        await crawl_ref01_ent.remove(crawl_ref01_match_rm0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/crawl/CrawlTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.FirecrawlSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['crawl01', 'crawl02', 'crawl03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'FIRECRAWL_TEST_CRAWL_ENTID': idmap,
        'FIRECRAWL_TEST_LIVE': 'FALSE',
        'FIRECRAWL_TEST_EXPLAIN': 'FALSE',
        'FIRECRAWL_APIKEY': '',
    });
    idmap = env['FIRECRAWL_TEST_CRAWL_ENTID'];
    const live = 'TRUE' === env.FIRECRAWL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['FIRECRAWL_TEST_CRAWL_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.FirecrawlSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.FIRECRAWL_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.FIRECRAWL_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=CrawlEntity.test.js.map