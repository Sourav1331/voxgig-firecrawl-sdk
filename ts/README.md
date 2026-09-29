# Firecrawl TypeScript SDK



The TypeScript SDK for the Firecrawl API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.BatchScrapeStatusResponseObj()` — each with a small set of operations (`list`, `load`, `create`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/firecrawl-sdk/releases)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/voxgig-sdk/firecrawl-sdk
npm install ./firecrawl-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { FirecrawlSDK } from '@voxgig-sdk/firecrawl-sdk'

const client = new FirecrawlSDK({
  apikey: process.env.FIRECRAWL_APIKEY,
})
```

### 3. Load a batchscrapestatusresponseobj

`load()` returns the entity directly and throws on failure:

```ts
try {
  const batchscrapestatusresponseobj = await client.BatchScrapeStatusResponseObj().load({ id: 'example_id' })
  console.log(batchscrapestatusresponseobj)
} catch (err) {
  console.error('load failed:', err)
}
```

### 4. Create, update, and remove

```ts
// Create — returns the created BatchScrapeStatusResponseObj ENTITY (.data() for the record)
const created = await client.BatchScrapeStatusResponseObj().create({
  completed: 1,
  creditsUsed: 1,
})

```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const billings = await client.Billing().list()
  console.log(billings)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = FirecrawlSDK.test()

const billing = await client.Billing().list()
// billing is the entity, populated with mock response data
// — call billing.data() for the record itself
console.log(billing)
```

You can also use the instance method:

```ts
const client = new FirecrawlSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Billing()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new FirecrawlSDK({
  apikey: '...',
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
FIRECRAWL_TEST_LIVE=TRUE
FIRECRAWL_APIKEY=<your-key>
```

Then run:

```bash
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### FirecrawlSDK

#### Constructor

```ts
new FirecrawlSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `BatchScrapeStatusResponseObj(data?)` | `BatchScrapeStatusResponseObjEntity` | Create a BatchScrapeStatusResponseObj entity instance. |
| `Billing(data?)` | `BillingEntity` | Create a Billing entity instance. |
| `Crawl(data?)` | `CrawlEntity` | Create a Crawl entity instance. |
| `CrawlErrorsResponseObj(data?)` | `CrawlErrorsResponseObjEntity` | Create a CrawlErrorsResponseObj entity instance. |
| `Crawling(data?)` | `CrawlingEntity` | Create a Crawling entity instance. |
| `Extract(data?)` | `ExtractEntity` | Create an Extract entity instance. |
| `Map(data?)` | `MapEntity` | Create a Map entity instance. |
| `Scrape(data?)` | `ScrapeEntity` | Create a Scrape entity instance. |
| `Scraping(data?)` | `ScrapingEntity` | Create a Scraping entity instance. |
| `Search(data?)` | `SearchEntity` | Create a Search entity instance. |
| `tester(testopts?, sdkopts?)` | `FirecrawlSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `FirecrawlSDK.test(testopts?, sdkopts?)` | `FirecrawlSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): FirecrawlSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` and `create` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to `void`.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### BatchScrapeStatusResponseObj

| Field | Description |
| --- | --- |
| `completed` | The number of pages that have been successfully scraped. |
| `creditsUsed` | The number of credits used for the batch scrape. |
| `data` | The data of the batch scrape. |
| `expiresAt` | The date and time when the batch scrape will expire. |
| `id` |  |
| `invalidURLs` | If ignoreInvalidURLs is true, this is an array containing the invalid URLs that were specified in the request. |
| `next` | The URL to retrieve the next 10MB of data. |
| `status` | The current status of the batch scrape. |
| `success` |  |
| `total` | The total number of pages that were attempted to be scraped. |
| `url` |  |

Operations: create, load.

API path: `/batch/scrape`

#### Billing

| Field | Description |
| --- | --- |
| `apiKey` | Name of the API key used for the billing period. |
| `billingPeriodEnd` | End date of the billing period. |
| `billingPeriodStart` | Start date of the billing period. |
| `endDate` | End date of the billing period |
| `planCredits` | Number of credits in the plan. |
| `planTokens` | Number of tokens in the plan. |
| `remainingCredits` | Number of credits remaining for the team |
| `remainingTokens` | Number of tokens remaining for the team |
| `startDate` | Start date of the billing period |
| `totalCredits` | Total number of credits used in the billing period |
| `totalTokens` | Total number of tokens used in the billing period |

Operations: list, load.

API path: `/team/credit-usage/historical`

#### Crawl

| Field | Description |
| --- | --- |
| `allowExternalLinks` | Allows the crawler to follow links to external websites. |
| `allowSubdomains` | Allows the crawler to follow links to subdomains of the main domain. |
| `completed` | The number of pages that have been successfully crawled. |
| `crawlEntireDomain` | Allows the crawler to follow internal links to sibling or parent URLs rather than only child paths. |
| `creditsUsed` | The number of credits used for the crawl. |
| `data` | The data of the crawl. |
| `delay` | Delay in seconds between scrapes. |
| `excludePaths` | URL pathname regex patterns that exclude matching URLs from the crawl. |
| `expiresAt` | The date and time when the crawl will expire. |
| `id` |  |
| `ignoreQueryParameters` | Do not re-scrape the same path with different (or none) query parameters |
| `includePaths` | URL pathname regex patterns that include matching URLs in the crawl. |
| `limit` | Maximum number of pages to crawl. |
| `maxConcurrency` | Maximum number of concurrent scrapes. |
| `maxDiscoveryDepth` | Maximum depth to crawl based on discovery order. |
| `next` | The URL to retrieve the next 10MB of data. |
| `prompt` | A prompt to use to generate the crawler options (all the parameters below) from natural language. |
| `scrapeOptions` |  |
| `sitemap` | Sitemap mode when crawling. |
| `status` | The current status of the crawl. |
| `success` |  |
| `total` | The total number of pages that were attempted to be crawled. |
| `url` | The base URL to start crawling from |
| `webhook` | A webhook specification object. |
| `zeroDataRetention` | If true, this will enable zero data retention for this crawl. |

Operations: create, load, remove.

API path: `/crawl`

#### CrawlErrorsResponseObj

| Field | Description |
| --- | --- |
| `error` | Error message |
| `id` |  |
| `timestamp` | ISO timestamp of failure |
| `url` | Scraped URL |

Operations: list.

API path: `/crawl/{id}/errors`

#### Crawling

| Field | Description |
| --- | --- |
| `id` | The unique identifier of the crawl |
| `options` | The crawler options used for this crawl |
| `teamId` | The ID of the team that owns the crawl |
| `url` | The origin URL of the crawl |

Operations: list.

API path: `/crawl/active`

#### Extract

| Field | Description |
| --- | --- |
| `data` |  |
| `enableWebSearch` | When true, the extraction will use web search to find additional data |
| `expiresAt` |  |
| `id` |  |
| `ignoreInvalidURLs` | If invalid URLs are specified in the urls array, they will be ignored. |
| `ignoreSitemap` | When true, sitemap.xml files will be ignored during website scanning |
| `includeSubdomains` | When true, subdomains of the provided URLs will also be scanned |
| `invalidURLs` | If ignoreInvalidURLs is true, this is an array containing the invalid URLs that were specified in the request. |
| `prompt` | Prompt to guide the extraction process |
| `schema` | Schema to define the structure of the extracted data. |
| `scrapeOptions` |  |
| `showSources` | When true, the sources used to extract the data will be included in the response as `sources` key |
| `status` | The current status of the extract job |
| `success` |  |
| `tokensUsed` | The number of tokens used by the extract job. |
| `urls` |  |

Operations: create, load.

API path: `/extract`

#### Map

| Field | Description |
| --- | --- |
| `ignoreQueryParameters` | Do not return URLs with query parameters |
| `includeSubdomains` | Include subdomains of the website |
| `limit` | Maximum number of links to return |
| `links` |  |
| `search` | Search query to use for mapping. |
| `sitemap` | Sitemap mode when mapping. |
| `success` |  |
| `timeout` | Timeout in milliseconds. |
| `url` | The base URL to start crawling from |

Operations: create.

API path: `/map`

#### Scrape

| Field | Description |
| --- | --- |
| `actions` | Results of the actions specified in the `actions` parameter. |
| `changeTracking` | Change tracking information if `changeTracking` is in `formats`. |
| `html` | HTML version of the content on page if `html` is in `formats` |
| `links` | List of links on the page if `links` is in `formats` |
| `markdown` |  |
| `metadata` |  |
| `rawHtml` | Raw HTML content of the page if `rawHtml` is in `formats` |
| `screenshot` | Screenshot of the page if `screenshot` is in `formats` |
| `summary` | Summary of the page if `summary` is in `formats` |
| `warning` | Can be displayed when using LLM Extraction. |

Operations: create.

API path: `/scrape`

#### Scraping

| Field | Description |
| --- | --- |
| `id` |  |

Operations: remove.

API path: `/batch/scrape/{id}`

#### Search

| Field | Description |
| --- | --- |
| `data` | The search results. |
| `ignoreInvalidURLs` | Excludes URLs from the search results that are invalid for other Firecrawl endpoints. |
| `limit` | Maximum number of results to return |
| `location` | Location parameter for search results |
| `query` | The search query |
| `scrapeOptions` | Options for scraping search results |
| `sources` | Sources to search. |
| `success` |  |
| `tbs` | Time-based search parameter. |
| `timeout` | Timeout in milliseconds |
| `warning` | Warning message if any issues occurred |

Operations: create.

API path: `/search`



## Entities


### BatchScrapeStatusResponseObj

Create an instance: `const batch_scrape_status_response_obj = client.BatchScrapeStatusResponseObj()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `completed` | `number` | The number of pages that have been successfully scraped. |
| `creditsUsed` | `number` | The number of credits used for the batch scrape. |
| `data` | `any[]` | The data of the batch scrape. |
| `expiresAt` | `string` | The date and time when the batch scrape will expire. |
| `id` | `string` |  |
| `invalidURLs` | `any[]` | If ignoreInvalidURLs is true, this is an array containing the invalid URLs that were specified in the request. |
| `next` | `string` | The URL to retrieve the next 10MB of data. |
| `status` | `string` | The current status of the batch scrape. |
| `success` | `boolean` |  |
| `total` | `number` | The total number of pages that were attempted to be scraped. |
| `url` | `string` |  |

#### Example: Load

```ts
const batch_scrape_status_response_obj = await client.BatchScrapeStatusResponseObj().load({ id: 'batch_scrape_status_response_obj_id' })
```

#### Example: Create

```ts
const batch_scrape_status_response_obj = await client.BatchScrapeStatusResponseObj().create({
})
```


### Billing

Create an instance: `const billing = client.Billing()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `apiKey` | `string` | Name of the API key used for the billing period. |
| `billingPeriodEnd` | `string` | End date of the billing period. |
| `billingPeriodStart` | `string` | Start date of the billing period. |
| `endDate` | `string` | End date of the billing period |
| `planCredits` | `number` | Number of credits in the plan. |
| `planTokens` | `number` | Number of tokens in the plan. |
| `remainingCredits` | `number` | Number of credits remaining for the team |
| `remainingTokens` | `number` | Number of tokens remaining for the team |
| `startDate` | `string` | Start date of the billing period |
| `totalCredits` | `number` | Total number of credits used in the billing period |
| `totalTokens` | `number` | Total number of tokens used in the billing period |

#### Example: Load

```ts
const billing = await client.Billing().load()
```

#### Example: List

```ts
const billings = await client.Billing().list()
```


### Crawl

Create an instance: `const crawl = client.Crawl()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `allowExternalLinks` | `boolean` | Allows the crawler to follow links to external websites. |
| `allowSubdomains` | `boolean` | Allows the crawler to follow links to subdomains of the main domain. |
| `completed` | `number` | The number of pages that have been successfully crawled. |
| `crawlEntireDomain` | `boolean` | Allows the crawler to follow internal links to sibling or parent URLs rather than only child paths. |
| `creditsUsed` | `number` | The number of credits used for the crawl. |
| `data` | `any[]` | The data of the crawl. |
| `delay` | `number` | Delay in seconds between scrapes. |
| `excludePaths` | `any[]` | URL pathname regex patterns that exclude matching URLs from the crawl. |
| `expiresAt` | `string` | The date and time when the crawl will expire. |
| `id` | `string` |  |
| `ignoreQueryParameters` | `boolean` | Do not re-scrape the same path with different (or none) query parameters |
| `includePaths` | `any[]` | URL pathname regex patterns that include matching URLs in the crawl. |
| `limit` | `number` | Maximum number of pages to crawl. |
| `maxConcurrency` | `number` | Maximum number of concurrent scrapes. |
| `maxDiscoveryDepth` | `number` | Maximum depth to crawl based on discovery order. |
| `next` | `string` | The URL to retrieve the next 10MB of data. |
| `prompt` | `string` | A prompt to use to generate the crawler options (all the parameters below) from natural language. |
| `scrapeOptions` | `Record<string, any>` |  |
| `sitemap` | `string` | Sitemap mode when crawling. |
| `status` | `string` | The current status of the crawl. |
| `success` | `boolean` |  |
| `total` | `number` | The total number of pages that were attempted to be crawled. |
| `url` | `string` | The base URL to start crawling from |
| `webhook` | `Record<string, any>` | A webhook specification object. |
| `zeroDataRetention` | `boolean` | If true, this will enable zero data retention for this crawl. |

#### Example: Load

```ts
const crawl = await client.Crawl().load({ id: 'crawl_id' })
```

#### Example: Create

```ts
const crawl = await client.Crawl().create({
  webhook: {},
})
```


### CrawlErrorsResponseObj

Create an instance: `const crawl_errors_response_obj = client.CrawlErrorsResponseObj()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `error` | `string` | Error message |
| `id` | `string` |  |
| `timestamp` | `string` | ISO timestamp of failure |
| `url` | `string` | Scraped URL |

#### Example: List

```ts
const crawl_errors_response_objs = await client.CrawlErrorsResponseObj().list({ scrape_id: "example" })
```


### Crawling

Create an instance: `const crawling = client.Crawling()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | The unique identifier of the crawl |
| `options` | `Record<string, any>` | The crawler options used for this crawl |
| `teamId` | `string` | The ID of the team that owns the crawl |
| `url` | `string` | The origin URL of the crawl |

#### Example: List

```ts
const crawlings = await client.Crawling().list()
```


### Extract

Create an instance: `const extract = client.Extract()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `Record<string, any>` |  |
| `enableWebSearch` | `boolean` | When true, the extraction will use web search to find additional data |
| `expiresAt` | `string` |  |
| `id` | `string` |  |
| `ignoreInvalidURLs` | `boolean` | If invalid URLs are specified in the urls array, they will be ignored. |
| `ignoreSitemap` | `boolean` | When true, sitemap.xml files will be ignored during website scanning |
| `includeSubdomains` | `boolean` | When true, subdomains of the provided URLs will also be scanned |
| `invalidURLs` | `any[]` | If ignoreInvalidURLs is true, this is an array containing the invalid URLs that were specified in the request. |
| `prompt` | `string` | Prompt to guide the extraction process |
| `schema` | `Record<string, any>` | Schema to define the structure of the extracted data. |
| `scrapeOptions` | `Record<string, any>` |  |
| `showSources` | `boolean` | When true, the sources used to extract the data will be included in the response as `sources` key |
| `status` | `string` | The current status of the extract job |
| `success` | `boolean` |  |
| `tokensUsed` | `number` | The number of tokens used by the extract job. |
| `urls` | `any[]` |  |

#### Example: Load

```ts
const extract = await client.Extract().load({ id: 'extract_id' })
```

#### Example: Create

```ts
const extract = await client.Extract().create({
  urls: [],
})
```


### Map

Create an instance: `const map = client.Map()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ignoreQueryParameters` | `boolean` | Do not return URLs with query parameters |
| `includeSubdomains` | `boolean` | Include subdomains of the website |
| `limit` | `number` | Maximum number of links to return |
| `links` | `any[]` |  |
| `search` | `string` | Search query to use for mapping. |
| `sitemap` | `string` | Sitemap mode when mapping. |
| `success` | `boolean` |  |
| `timeout` | `number` | Timeout in milliseconds. |
| `url` | `string` | The base URL to start crawling from |

#### Example: Create

```ts
const map = await client.Map().create({
  url: 'example_url',
})
```


### Scrape

Create an instance: `const scrape = client.Scrape()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `actions` | `Record<string, any>` | Results of the actions specified in the `actions` parameter. |
| `changeTracking` | `Record<string, any>` | Change tracking information if `changeTracking` is in `formats`. |
| `html` | `string` | HTML version of the content on page if `html` is in `formats` |
| `links` | `any[]` | List of links on the page if `links` is in `formats` |
| `markdown` | `string` |  |
| `metadata` | `Record<string, any>` |  |
| `rawHtml` | `string` | Raw HTML content of the page if `rawHtml` is in `formats` |
| `screenshot` | `string` | Screenshot of the page if `screenshot` is in `formats` |
| `summary` | `string` | Summary of the page if `summary` is in `formats` |
| `warning` | `string` | Can be displayed when using LLM Extraction. |

#### Example: Create

```ts
const scrape = await client.Scrape().create({
})
```


### Scraping

Create an instance: `const scraping = client.Scraping()`

#### Operations

| Method | Description |
| --- | --- |
| `remove(match)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |


### Search

Create an instance: `const search = client.Search()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `Record<string, any>` | The search results. |
| `ignoreInvalidURLs` | `boolean` | Excludes URLs from the search results that are invalid for other Firecrawl endpoints. |
| `limit` | `number` | Maximum number of results to return |
| `location` | `string` | Location parameter for search results |
| `query` | `string` | The search query |
| `scrapeOptions` | `any` | Options for scraping search results |
| `sources` | `any[]` | Sources to search. |
| `success` | `boolean` |  |
| `tbs` | `string` | Time-based search parameter. |
| `timeout` | `number` | Timeout in milliseconds |
| `warning` | `string` | Warning message if any issues occurred |

#### Example: Create

```ts
const search = await client.Search().create({
  query: 'example_query',
})
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | Test transport |

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


## Open types

5 fields are carried as open values rather than typed structures.
This follows from the API definition, not from a gap in this SDK: the
definition describes them with untagged unions —
`oneOf`/`anyOf` branches with no `discriminator` — so it never states which
variant a given value is. Nothing can select a branch reliably, so the SDK
passes the value through unchanged rather than assert a shape the API does not
guarantee.

| Entity | Field | Variants | Nesting |
| --- | --- | --- | --- |
| `crawl` | `scrapeOptions` | 9 | 3 levels |
| `crawling` | `options` | 9 | 5 levels |
| `extract` | `scrapeOptions` | 9 | 3 levels |
| `search` | `scrapeOptions` | 9 | 5 levels |
| `search` | `sources` | 3 | 1 level |

These values round-trip unchanged — read them, modify them, send them back. If
the API adds a `discriminator` to the definition, regenerating will type them.
Every other field is typed normally.

## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: Test transport

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
firecrawl/
├── src/
│   ├── FirecrawlSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { FirecrawlSDK } from '@voxgig-sdk/firecrawl-sdk'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const billing = client.Billing()
await billing.list()

// billing.data() now returns the billing data from the last `list`
// billing.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
