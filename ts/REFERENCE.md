# Firecrawl TypeScript SDK Reference

Complete API reference for the Firecrawl TypeScript SDK.


## FirecrawlSDK

### Constructor

```ts
new FirecrawlSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `FirecrawlSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = FirecrawlSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `FirecrawlSDK` instance in test mode.


### Instance Methods

#### `BatchScrapeStatusResponseObj(data?: object)`

Create a new `BatchScrapeStatusResponseObj` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BatchScrapeStatusResponseObjEntity` instance.

#### `Billing(data?: object)`

Create a new `Billing` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BillingEntity` instance.

#### `Crawl(data?: object)`

Create a new `Crawl` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CrawlEntity` instance.

#### `CrawlErrorsResponseObj(data?: object)`

Create a new `CrawlErrorsResponseObj` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CrawlErrorsResponseObjEntity` instance.

#### `Crawling(data?: object)`

Create a new `Crawling` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CrawlingEntity` instance.

#### `Extract(data?: object)`

Create a new `Extract` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ExtractEntity` instance.

#### `Map(data?: object)`

Create a new `Map` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MapEntity` instance.

#### `Scrape(data?: object)`

Create a new `Scrape` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ScrapeEntity` instance.

#### `Scraping(data?: object)`

Create a new `Scraping` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ScrapingEntity` instance.

#### `Search(data?: object)`

Create a new `Search` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SearchEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `FirecrawlSDK.test()`.

**Returns:** `FirecrawlSDK` instance in test mode.


---

## BatchScrapeStatusResponseObjEntity

```ts
const batch_scrape_status_response_obj = client.BatchScrapeStatusResponseObj()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `completed` | `number` | No | The number of pages that have been successfully scraped. |
| `creditsUsed` | `number` | No | The number of credits used for the batch scrape. |
| `data` | `any[]` | No | The data of the batch scrape. |
| `expiresAt` | `string` | No | The date and time when the batch scrape will expire. |
| `id` | `string` | No |  |
| `invalidURLs` | `any[]` | No | If ignoreInvalidURLs is true, this is an array containing the invalid URLs that were specified in the request. |
| `next` | `string` | No | The URL to retrieve the next 10MB of data. |
| `status` | `string` | No | The current status of the batch scrape. |
| `success` | `boolean` | No |  |
| `total` | `number` | No | The total number of pages that were attempted to be scraped. |
| `url` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.BatchScrapeStatusResponseObj().create({
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.BatchScrapeStatusResponseObj().load({ id: 'batch_scrape_status_response_obj_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BatchScrapeStatusResponseObjEntity` instance with the same client and
options.

#### `client()`

Return the parent `FirecrawlSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BillingEntity

```ts
const billing = client.Billing()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `apiKey` | `string` | No | Name of the API key used for the billing period. |
| `billingPeriodEnd` | `string` | No | End date of the billing period. |
| `billingPeriodStart` | `string` | No | Start date of the billing period. |
| `endDate` | `string` | No | End date of the billing period |
| `planCredits` | `number` | No | Number of credits in the plan. |
| `planTokens` | `number` | No | Number of tokens in the plan. |
| `remainingCredits` | `number` | No | Number of credits remaining for the team |
| `remainingTokens` | `number` | No | Number of tokens remaining for the team |
| `startDate` | `string` | No | Start date of the billing period |
| `totalCredits` | `number` | No | Total number of credits used in the billing period |
| `totalTokens` | `number` | No | Total number of tokens used in the billing period |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Billing().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Billing().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BillingEntity` instance with the same client and
options.

#### `client()`

Return the parent `FirecrawlSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CrawlEntity

```ts
const crawl = client.Crawl()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `allowExternalLinks` | `boolean` | No | Allows the crawler to follow links to external websites. |
| `allowSubdomains` | `boolean` | No | Allows the crawler to follow links to subdomains of the main domain. |
| `completed` | `number` | No | The number of pages that have been successfully crawled. |
| `crawlEntireDomain` | `boolean` | No | Allows the crawler to follow internal links to sibling or parent URLs rather than only child paths. |
| `creditsUsed` | `number` | No | The number of credits used for the crawl. |
| `data` | `any[]` | No | The data of the crawl. |
| `delay` | `number` | No | Delay in seconds between scrapes. |
| `excludePaths` | `any[]` | No | URL pathname regex patterns that exclude matching URLs from the crawl. |
| `expiresAt` | `string` | No | The date and time when the crawl will expire. |
| `id` | `string` | No |  |
| `ignoreQueryParameters` | `boolean` | No | Do not re-scrape the same path with different (or none) query parameters |
| `includePaths` | `any[]` | No | URL pathname regex patterns that include matching URLs in the crawl. |
| `limit` | `number` | No | Maximum number of pages to crawl. |
| `maxConcurrency` | `number` | No | Maximum number of concurrent scrapes. |
| `maxDiscoveryDepth` | `number` | No | Maximum depth to crawl based on discovery order. |
| `next` | `string` | No | The URL to retrieve the next 10MB of data. |
| `prompt` | `string` | No | A prompt to use to generate the crawler options (all the parameters below) from natural language. |
| `scrapeOptions` | `Record<string, any>` | No |  |
| `sitemap` | `string` | No | Sitemap mode when crawling. |
| `status` | `string` | No | The current status of the crawl. |
| `success` | `boolean` | No |  |
| `total` | `number` | No | The total number of pages that were attempted to be crawled. |
| `url` | `string` | No | The base URL to start crawling from |
| `webhook` | `Record<string, any>` | Yes | A webhook specification object. |
| `zeroDataRetention` | `boolean` | No | If true, this will enable zero data retention for this crawl. |

### Field Usage by Operation

| Field | load | create | remove |
| --- | --- | --- | --- |
| `allowExternalLinks` | - | - | - |
| `allowSubdomains` | - | - | - |
| `completed` | - | - | - |
| `crawlEntireDomain` | - | - | - |
| `creditsUsed` | - | - | - |
| `data` | - | - | - |
| `delay` | - | - | - |
| `excludePaths` | - | - | - |
| `expiresAt` | - | - | - |
| `id` | - | - | - |
| `ignoreQueryParameters` | - | - | - |
| `includePaths` | - | - | - |
| `limit` | - | - | - |
| `maxConcurrency` | - | - | - |
| `maxDiscoveryDepth` | - | - | - |
| `next` | - | - | - |
| `prompt` | - | - | - |
| `scrapeOptions` | - | - | - |
| `sitemap` | - | - | - |
| `status` | - | - | - |
| `success` | - | - | - |
| `total` | - | - | - |
| `url` | - | Yes | - |
| `webhook` | - | - | - |
| `zeroDataRetention` | - | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Crawl().create({
  webhook: {},
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Crawl().load({ id: 'crawl_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Crawl().remove({ id: 'crawl_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CrawlEntity` instance with the same client and
options.

#### `client()`

Return the parent `FirecrawlSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CrawlErrorsResponseObjEntity

```ts
const crawl_errors_response_obj = client.CrawlErrorsResponseObj()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `error` | `string` | No | Error message |
| `id` | `string` | No |  |
| `timestamp` | `string` | No | ISO timestamp of failure |
| `url` | `string` | No | Scraped URL |

### Actions

This entity exposes custom API actions in addition to the standard
operations. Select one with `$action` in the call's argument; the
remaining keys are sent as that action's payload.

| Action | Route | Call |
| --- | --- | --- |
| `errors` | `/crawl/{id}/errors` | `client.CrawlErrorsResponseObj().list({ $action: 'errors', ... })` |

An action returns that action's OWN response, which is not necessarily a
CrawlErrorsResponseObj record — check the API definition for its shape.

```ts
const result = await client.CrawlErrorsResponseObj().list({
  $action: 'errors',
  /* ...the action's own arguments */
})
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.CrawlErrorsResponseObj().list({ scrape_id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CrawlErrorsResponseObjEntity` instance with the same client and
options.

#### `client()`

Return the parent `FirecrawlSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CrawlingEntity

```ts
const crawling = client.Crawling()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | Yes | The unique identifier of the crawl |
| `options` | `Record<string, any>` | Yes | The crawler options used for this crawl |
| `teamId` | `string` | Yes | The ID of the team that owns the crawl |
| `url` | `string` | Yes | The origin URL of the crawl |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Crawling().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CrawlingEntity` instance with the same client and
options.

#### `client()`

Return the parent `FirecrawlSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ExtractEntity

```ts
const extract = client.Extract()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Record<string, any>` | No |  |
| `enableWebSearch` | `boolean` | No | When true, the extraction will use web search to find additional data |
| `expiresAt` | `string` | No |  |
| `id` | `string` | No |  |
| `ignoreInvalidURLs` | `boolean` | No | If invalid URLs are specified in the urls array, they will be ignored. |
| `ignoreSitemap` | `boolean` | No | When true, sitemap.xml files will be ignored during website scanning |
| `includeSubdomains` | `boolean` | No | When true, subdomains of the provided URLs will also be scanned |
| `invalidURLs` | `any[]` | No | If ignoreInvalidURLs is true, this is an array containing the invalid URLs that were specified in the request. |
| `prompt` | `string` | No | Prompt to guide the extraction process |
| `schema` | `Record<string, any>` | No | Schema to define the structure of the extracted data. |
| `scrapeOptions` | `Record<string, any>` | No |  |
| `showSources` | `boolean` | No | When true, the sources used to extract the data will be included in the response as `sources` key |
| `status` | `string` | No | The current status of the extract job |
| `success` | `boolean` | No |  |
| `tokensUsed` | `number` | No | The number of tokens used by the extract job. |
| `urls` | `any[]` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Extract().create({
  urls: [],
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Extract().load({ id: 'extract_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ExtractEntity` instance with the same client and
options.

#### `client()`

Return the parent `FirecrawlSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MapEntity

```ts
const map = client.Map()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ignoreQueryParameters` | `boolean` | No | Do not return URLs with query parameters |
| `includeSubdomains` | `boolean` | No | Include subdomains of the website |
| `limit` | `number` | No | Maximum number of links to return |
| `links` | `any[]` | No |  |
| `search` | `string` | No | Search query to use for mapping. |
| `sitemap` | `string` | No | Sitemap mode when mapping. |
| `success` | `boolean` | No |  |
| `timeout` | `number` | No | Timeout in milliseconds. |
| `url` | `string` | Yes | The base URL to start crawling from |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Map().create({
  url: 'example_url',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MapEntity` instance with the same client and
options.

#### `client()`

Return the parent `FirecrawlSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ScrapeEntity

```ts
const scrape = client.Scrape()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `actions` | `Record<string, any>` | No | Results of the actions specified in the `actions` parameter. |
| `changeTracking` | `Record<string, any>` | No | Change tracking information if `changeTracking` is in `formats`. |
| `html` | `string` | No | HTML version of the content on page if `html` is in `formats` |
| `links` | `any[]` | No | List of links on the page if `links` is in `formats` |
| `markdown` | `string` | No |  |
| `metadata` | `Record<string, any>` | No |  |
| `rawHtml` | `string` | No | Raw HTML content of the page if `rawHtml` is in `formats` |
| `screenshot` | `string` | No | Screenshot of the page if `screenshot` is in `formats` |
| `summary` | `string` | No | Summary of the page if `summary` is in `formats` |
| `warning` | `string` | No | Can be displayed when using LLM Extraction. |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Scrape().create({
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ScrapeEntity` instance with the same client and
options.

#### `client()`

Return the parent `FirecrawlSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ScrapingEntity

```ts
const scraping = client.Scraping()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Scraping().remove({ id: 'id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ScrapingEntity` instance with the same client and
options.

#### `client()`

Return the parent `FirecrawlSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SearchEntity

```ts
const search = client.Search()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Record<string, any>` | No | The search results. |
| `ignoreInvalidURLs` | `boolean` | No | Excludes URLs from the search results that are invalid for other Firecrawl endpoints. |
| `limit` | `number` | No | Maximum number of results to return |
| `location` | `string` | No | Location parameter for search results |
| `query` | `string` | Yes | The search query |
| `scrapeOptions` | `any` | No | Options for scraping search results |
| `sources` | `any[]` | No | Sources to search. |
| `success` | `boolean` | No |  |
| `tbs` | `string` | No | Time-based search parameter. |
| `timeout` | `number` | No | Timeout in milliseconds |
| `warning` | `string` | No | Warning message if any issues occurred |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Search().create({
  query: 'example_query',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SearchEntity` instance with the same client and
options.

#### `client()`

Return the parent `FirecrawlSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```ts
const client = new FirecrawlSDK({
  feature: {
    test: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

