# Firecrawl API

API for interacting with Firecrawl services to perform web scraping and crawling tasks.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 10 entities and 18 HTTP routes. There are 1 SDK targets.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### BatchScrapeStatusResponseObj

Results: Successful response.

SDK operations: `create`, `load`.

Key fields to recognise:

- `completed`: The number of pages that have been successfully scraped.
- `creditsUsed`: The number of credits used for the batch scrape.
- `data`: The data of the batch scrape.
- `expiresAt`: The date and time when the batch scrape will expire.
- `invalidURLs`: If ignoreInvalidURLs is true, this is an array containing the invalid URLs that were specified in the request. If there were no invalid URLs, this will be an empty array. If ignoreInvalidURLs is false, this field will be undefined.

### Billing

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `apiKey`: Name of the API key used for the billing period. null if byApiKey is false (default)
- `billingPeriodEnd`: End date of the billing period. null if using the free plan
- `billingPeriodStart`: Start date of the billing period. null if using the free plan
- `endDate`: End date of the billing period
- `planCredits`: Number of credits in the plan. This does not include coupon credits or credits added by pay-as-you-go.

### Crawl

Results: Successful response; Successful cancellation.

SDK operations: `create`, `load`, `remove`.

Key fields to recognise:

- `allowExternalLinks`: Allows the crawler to follow links to external websites.
- `allowSubdomains`: Allows the crawler to follow links to subdomains of the main domain.
- `completed`: The number of pages that have been successfully crawled.
- `crawlEntireDomain`: Allows the crawler to follow internal links to sibling or parent URLs, not just child paths.
- `creditsUsed`: The number of credits used for the crawl.

### CrawlErrorsResponseObj

Results: Successful response.

SDK operations: `list`.

Key fields to recognise:

- `error`: Error message
- `timestamp`: ISO timestamp of failure
- `url`: Scraped URL

### Crawling

Results: Successful response.

SDK operations: `list`.

Key fields to recognise:

- `id`: The unique identifier of the crawl
- `options`: The crawler options used for this crawl
- `teamId`: The ID of the team that owns the crawl
- `url`: The origin URL of the crawl

### Extract

Results: Successful extraction; Successful response.

SDK operations: `create`, `load`.

Key fields to recognise:

- `enableWebSearch`: When true, the extraction will use web search to find additional data
- `ignoreInvalidURLs`: If invalid URLs are specified in the urls array, they will be ignored.
- `ignoreSitemap`: When true, sitemap.xml files will be ignored during website scanning
- `includeSubdomains`: When true, subdomains of the provided URLs will also be scanned
- `invalidURLs`: If ignoreInvalidURLs is true, this is an array containing the invalid URLs that were specified in the request. If there were no invalid URLs, this will be an empty array. If ignoreInvalidURLs is false, this field will be undefined.

### Map

Results: Successful response.

SDK operations: `create`.

Key fields to recognise:

- `ignoreQueryParameters`: Do not return URLs with query parameters
- `includeSubdomains`: Include subdomains of the website
- `limit`: Maximum number of links to return
- `search`: Search query to use for mapping.
- `sitemap`: Sitemap mode when mapping.

### Scrape

Results: Successful response.

SDK operations: `create`.

Key fields to recognise:

- `actions`: Results of the actions specified in the `actions` parameter. Only present if the `actions` parameter was provided in the request
- `changeTracking`: Change tracking information if `changeTracking` is in `formats`. Only present when the `changeTracking` format is requested.
- `html`: HTML version of the content on page if `html` is in `formats`
- `links`: List of links on the page if `links` is in `formats`
- `rawHtml`: Raw HTML content of the page if `rawHtml` is in `formats`

### Scraping

Results: Successful cancellation.

SDK operations: `remove`.

### Search

Results: Successful response.

SDK operations: `create`.

Key fields to recognise:

- `data`: The search results. The arrays available will depend on the sources you specified in the request. By default, the `web` array will be returned.
- `ignoreInvalidURLs`: Excludes URLs from the search results that are invalid for other Firecrawl endpoints.
- `limit`: Maximum number of results to return
- `location`: Location parameter for search results
- `query`: The search query

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| BatchScrapeStatusResponseObj | `create` | `POST /batch/scrape` | Required |
| BatchScrapeStatusResponseObj | `load` | `GET /batch/scrape/{id}` | Required |
| Billing | `list` | `GET /team/credit-usage/historical` | Required |
| Billing | `list` | `GET /team/token-usage/historical` | Required |
| Billing | `load` | `GET /team/credit-usage` | Required |
| Billing | `load` | `GET /team/token-usage` | Required |
| Crawl | `create` | `POST /crawl` | Required |
| Crawl | `load` | `GET /crawl/{id}` | Required |
| Crawl | `remove` | `DELETE /crawl/{id}` | Required |
| CrawlErrorsResponseObj | `list` | `GET /crawl/{id}/errors` | Required |
| CrawlErrorsResponseObj | `list` | `GET /batch/scrape/{id}/errors` | Required |
| Crawling | `list` | `GET /crawl/active` | Required |
| Extract | `create` | `POST /extract` | Required |
| Extract | `load` | `GET /extract/{id}` | Required |
| Map | `create` | `POST /map` | Required |
| Scrape | `create` | `POST /scrape` | Required |
| Scraping | `remove` | `DELETE /batch/scrape/{id}` | Required |
| Search | `create` | `POST /search` | Required |

## Connect to the API

- API server: `https://api.firecrawl.dev/v2`

The default credential is sent in the `Authorization` header with the `Bearer` prefix.

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `test`: In-memory mock transport for testing without a live server

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

