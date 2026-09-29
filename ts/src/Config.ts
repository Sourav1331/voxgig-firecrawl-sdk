
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Firecrawl',
        slug: "firecrawl",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },

  }


  options = {
    base: "https://api.firecrawl.dev/v2",

    auth: {
      prefix: 'Bearer',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        batch_scrape_status_response_obj: {
        },
  
        billing: {
        },
  
        crawl: {
        },
  
        crawl_errors_response_obj: {
        },
  
        crawling: {
        },
  
        extract: {
        },
  
        map: {
        },
  
        scrape: {
        },
  
        scraping: {
        },
  
        search: {
        },
  
    }
  }


  entity = {
    "batch_scrape_status_response_obj": {
      "fields": [
        {
          "name": "completed",
          "title": "Completed",
          "type": "`$INTEGER`",
          "short": "The number of pages that have been successfully scraped."
        },
        {
          "name": "creditsUsed",
          "title": "Credits Used",
          "type": "`$INTEGER`",
          "short": "The number of credits used for the batch scrape."
        },
        {
          "name": "data",
          "title": "Data",
          "type": "`$ARRAY`",
          "short": "The data of the batch scrape."
        },
        {
          "name": "expiresAt",
          "title": "Expires At",
          "type": "`$STRING`",
          "short": "The date and time when the batch scrape will expire.",
          "format": "date-time"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "invalidURLs",
          "title": "Invalid Ur Ls",
          "type": "`$ARRAY`",
          "short": "If ignoreInvalidURLs is true, this is an array containing the invalid URLs that were specified in the request."
        },
        {
          "name": "next",
          "title": "Next",
          "type": "`$STRING`",
          "short": "The URL to retrieve the next 10MB of data."
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$STRING`",
          "short": "The current status of the batch scrape."
        },
        {
          "name": "success",
          "title": "Success",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "total",
          "title": "Total",
          "type": "`$INTEGER`",
          "short": "The total number of pages that were attempted to be scraped."
        },
        {
          "name": "url",
          "title": "Url",
          "type": "`$STRING`",
          "format": "uri"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "batch_scrape_status_response_obj",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/batch/scrape",
              "segments": [
                {
                  "lit": "batch"
                },
                {
                  "lit": "scrape"
                }
              ],
              "parts": [
                "batch",
                "scrape"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/batch/scrape/{id}",
              "segments": [
                {
                  "lit": "batch"
                },
                {
                  "lit": "scrape"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "batch",
                "scrape",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "billing": {
      "fields": [
        {
          "name": "apiKey",
          "title": "Api Key",
          "type": "`$STRING`",
          "short": "Name of the API key used for the billing period."
        },
        {
          "name": "billingPeriodEnd",
          "title": "Billing Period End",
          "type": "`$STRING`",
          "short": "End date of the billing period.",
          "format": "date-time"
        },
        {
          "name": "billingPeriodStart",
          "title": "Billing Period Start",
          "type": "`$STRING`",
          "short": "Start date of the billing period.",
          "format": "date-time"
        },
        {
          "name": "endDate",
          "title": "End Date",
          "type": "`$STRING`",
          "short": "End date of the billing period",
          "format": "date-time"
        },
        {
          "name": "planCredits",
          "title": "Plan Credits",
          "type": "`$NUMBER`",
          "short": "Number of credits in the plan."
        },
        {
          "name": "planTokens",
          "title": "Plan Tokens",
          "type": "`$NUMBER`",
          "short": "Number of tokens in the plan."
        },
        {
          "name": "remainingCredits",
          "title": "Remaining Credits",
          "type": "`$NUMBER`",
          "short": "Number of credits remaining for the team"
        },
        {
          "name": "remainingTokens",
          "title": "Remaining Tokens",
          "type": "`$NUMBER`",
          "short": "Number of tokens remaining for the team"
        },
        {
          "name": "startDate",
          "title": "Start Date",
          "type": "`$STRING`",
          "short": "Start date of the billing period",
          "format": "date-time"
        },
        {
          "name": "totalCredits",
          "title": "Total Credits",
          "type": "`$INTEGER`",
          "short": "Total number of credits used in the billing period"
        },
        {
          "name": "totalTokens",
          "title": "Total Tokens",
          "type": "`$INTEGER`",
          "short": "Total number of tokens used in the billing period"
        }
      ],
      "name": "billing",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/team/credit-usage/historical",
              "segments": [
                {
                  "lit": "team"
                },
                {
                  "lit": "credit-usage"
                },
                {
                  "lit": "historical"
                }
              ],
              "parts": [
                "team",
                "credit-usage",
                "historical"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.periods`"
              },
              "args": {
                "query": [
                  {
                    "name": "by_api_key",
                    "orig": "byApiKey",
                    "type": "`$BOOLEAN`",
                    "kind": "query",
                    "example": false
                  }
                ]
              },
              "select": {
                "exist": [
                  "by_api_key"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/team/token-usage/historical",
              "segments": [
                {
                  "lit": "team"
                },
                {
                  "lit": "token-usage"
                },
                {
                  "lit": "historical"
                }
              ],
              "parts": [
                "team",
                "token-usage",
                "historical"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.periods`"
              },
              "args": {
                "query": [
                  {
                    "name": "by_api_key",
                    "orig": "byApiKey",
                    "type": "`$BOOLEAN`",
                    "kind": "query",
                    "example": false
                  }
                ]
              },
              "select": {
                "exist": [
                  "by_api_key"
                ]
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/team/credit-usage",
              "segments": [
                {
                  "lit": "team"
                },
                {
                  "lit": "credit-usage"
                }
              ],
              "parts": [
                "team",
                "credit-usage"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {},
              "select": {}
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/team/token-usage",
              "segments": [
                {
                  "lit": "team"
                },
                {
                  "lit": "token-usage"
                }
              ],
              "parts": [
                "team",
                "token-usage"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "crawl": {
      "fields": [
        {
          "name": "allowExternalLinks",
          "title": "Allow External Links",
          "type": "`$BOOLEAN`",
          "short": "Allows the crawler to follow links to external websites."
        },
        {
          "name": "allowSubdomains",
          "title": "Allow Subdomains",
          "type": "`$BOOLEAN`",
          "short": "Allows the crawler to follow links to subdomains of the main domain."
        },
        {
          "name": "completed",
          "title": "Completed",
          "type": "`$INTEGER`",
          "short": "The number of pages that have been successfully crawled."
        },
        {
          "name": "crawlEntireDomain",
          "title": "Crawl Entire Domain",
          "type": "`$BOOLEAN`",
          "short": "Allows the crawler to follow internal links to sibling or parent URLs, including child paths."
        },
        {
          "name": "creditsUsed",
          "title": "Credits Used",
          "type": "`$INTEGER`",
          "short": "The number of credits used for the crawl."
        },
        {
          "name": "data",
          "title": "Data",
          "type": "`$ARRAY`",
          "short": "The data of the crawl."
        },
        {
          "name": "delay",
          "title": "Delay",
          "type": "`$NUMBER`",
          "short": "Delay in seconds between scrapes."
        },
        {
          "name": "excludePaths",
          "title": "Exclude Paths",
          "type": "`$ARRAY`",
          "short": "URL pathname regex patterns that exclude matching URLs from the crawl."
        },
        {
          "name": "expiresAt",
          "title": "Expires At",
          "type": "`$STRING`",
          "short": "The date and time when the crawl will expire.",
          "format": "date-time"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "ignoreQueryParameters",
          "title": "Ignore Query Parameters",
          "type": "`$BOOLEAN`",
          "short": "Do not re-scrape the same path with different (or none) query parameters"
        },
        {
          "name": "includePaths",
          "title": "Include Paths",
          "type": "`$ARRAY`",
          "short": "URL pathname regex patterns that include matching URLs in the crawl."
        },
        {
          "name": "limit",
          "title": "Limit",
          "type": "`$INTEGER`",
          "short": "Maximum number of pages to crawl."
        },
        {
          "name": "maxConcurrency",
          "title": "Max Concurrency",
          "type": "`$INTEGER`",
          "short": "Maximum number of concurrent scrapes."
        },
        {
          "name": "maxDiscoveryDepth",
          "title": "Max Discovery Depth",
          "type": "`$INTEGER`",
          "short": "Maximum depth to crawl based on discovery order."
        },
        {
          "name": "next",
          "title": "Next",
          "type": "`$STRING`",
          "short": "The URL to retrieve the next 10MB of data."
        },
        {
          "name": "prompt",
          "title": "Prompt",
          "type": "`$STRING`",
          "short": "A prompt to use to generate the crawler options (all the parameters below) from natural language."
        },
        {
          "name": "scrapeOptions",
          "title": "Scrape Options",
          "type": "`$OBJECT`"
        },
        {
          "name": "sitemap",
          "title": "Sitemap",
          "type": "`$STRING`",
          "short": "Sitemap mode when crawling."
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$STRING`",
          "short": "The current status of the crawl."
        },
        {
          "name": "success",
          "title": "Success",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "total",
          "title": "Total",
          "type": "`$INTEGER`",
          "short": "The total number of pages that were attempted to be crawled."
        },
        {
          "name": "url",
          "title": "Url",
          "type": "`$STRING`",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "short": "The base URL to start crawling from",
          "format": "uri"
        },
        {
          "name": "webhook",
          "title": "Webhook",
          "type": "`$OBJECT`",
          "req": true,
          "short": "A webhook specification object."
        },
        {
          "name": "zeroDataRetention",
          "title": "Zero Data Retention",
          "type": "`$BOOLEAN`",
          "short": "If true, this will enable zero data retention for this crawl."
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "crawl",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/crawl",
              "segments": [
                {
                  "lit": "crawl"
                }
              ],
              "parts": [
                "crawl"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/crawl/{id}",
              "segments": [
                {
                  "lit": "crawl"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "crawl",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/crawl/{id}",
              "segments": [
                {
                  "lit": "crawl"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "crawl",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "crawl_errors_response_obj": {
      "fields": [
        {
          "name": "error",
          "title": "Error",
          "type": "`$STRING`",
          "short": "Error message"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "timestamp",
          "title": "Timestamp",
          "type": "`$STRING`",
          "short": "ISO timestamp of failure"
        },
        {
          "name": "url",
          "title": "Url",
          "type": "`$STRING`",
          "short": "Scraped URL"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "crawl_errors_response_obj",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/crawl/{id}/errors",
              "segments": [
                {
                  "lit": "crawl"
                },
                {
                  "var": "id"
                },
                {
                  "lit": "errors"
                }
              ],
              "parts": [
                "crawl",
                "{id}",
                "errors"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.errors`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "$action": "errors",
                "exist": [
                  "id"
                ]
              }
            },
            {
              "kind": "http",
              "method": "GET",
              "orig": "/batch/scrape/{id}/errors",
              "segments": [
                {
                  "lit": "batch"
                },
                {
                  "lit": "scrape"
                },
                {
                  "var": "scrape_id"
                },
                {
                  "lit": "errors"
                }
              ],
              "parts": [
                "batch",
                "scrape",
                "{scrape_id}",
                "errors"
              ],
              "rename": {
                "param": {
                  "id": "scrape_id"
                }
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.errors`"
              },
              "args": {
                "params": [
                  {
                    "name": "scrape_id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "scrape_id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "$.main.kit.entity.scrape"
          ]
        ]
      }
    },
    "crawling": {
      "fields": [
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`",
          "req": true,
          "short": "The unique identifier of the crawl",
          "format": "uuid"
        },
        {
          "name": "options",
          "title": "Options",
          "type": "`$OBJECT`",
          "req": true,
          "short": "The crawler options used for this crawl"
        },
        {
          "name": "teamId",
          "title": "Team Id",
          "type": "`$STRING`",
          "req": true,
          "short": "The ID of the team that owns the crawl"
        },
        {
          "name": "url",
          "title": "Url",
          "type": "`$STRING`",
          "req": true,
          "short": "The origin URL of the crawl",
          "format": "uri"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "crawling",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/crawl/active",
              "segments": [
                {
                  "lit": "crawl"
                },
                {
                  "lit": "active"
                }
              ],
              "parts": [
                "crawl",
                "active"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.crawls`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "extract": {
      "fields": [
        {
          "name": "data",
          "title": "Data",
          "type": "`$OBJECT`"
        },
        {
          "name": "enableWebSearch",
          "title": "Enable Web Search",
          "type": "`$BOOLEAN`",
          "short": "When true, the extraction will use web search to find additional data"
        },
        {
          "name": "expiresAt",
          "title": "Expires At",
          "type": "`$STRING`",
          "format": "date-time"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        },
        {
          "name": "ignoreInvalidURLs",
          "title": "Ignore Invalid Ur Ls",
          "type": "`$BOOLEAN`",
          "short": "If invalid URLs are specified in the urls array, they will be ignored."
        },
        {
          "name": "ignoreSitemap",
          "title": "Ignore Sitemap",
          "type": "`$BOOLEAN`",
          "short": "When true, sitemap.xml files will be ignored during website scanning"
        },
        {
          "name": "includeSubdomains",
          "title": "Include Subdomains",
          "type": "`$BOOLEAN`",
          "short": "When true, subdomains of the provided URLs will also be scanned"
        },
        {
          "name": "invalidURLs",
          "title": "Invalid Ur Ls",
          "type": "`$ARRAY`",
          "short": "If ignoreInvalidURLs is true, this is an array containing the invalid URLs that were specified in the request."
        },
        {
          "name": "prompt",
          "title": "Prompt",
          "type": "`$STRING`",
          "short": "Prompt to guide the extraction process"
        },
        {
          "name": "schema",
          "title": "Schema",
          "type": "`$OBJECT`",
          "short": "Schema to define the structure of the extracted data."
        },
        {
          "name": "scrapeOptions",
          "title": "Scrape Options",
          "type": "`$OBJECT`"
        },
        {
          "name": "showSources",
          "title": "Show Sources",
          "type": "`$BOOLEAN`",
          "short": "When true, the sources used to extract the data will be included in the response as `sources` key"
        },
        {
          "name": "status",
          "title": "Status",
          "type": "`$STRING`",
          "short": "The current status of the extract job"
        },
        {
          "name": "success",
          "title": "Success",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "tokensUsed",
          "title": "Tokens Used",
          "type": "`$INTEGER`",
          "short": "The number of tokens used by the extract job."
        },
        {
          "name": "urls",
          "title": "Urls",
          "type": "`$ARRAY`",
          "req": true
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "extract",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/extract",
              "segments": [
                {
                  "lit": "extract"
                }
              ],
              "parts": [
                "extract"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/extract/{id}",
              "segments": [
                {
                  "lit": "extract"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "extract",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "map": {
      "fields": [
        {
          "name": "ignoreQueryParameters",
          "title": "Ignore Query Parameters",
          "type": "`$BOOLEAN`",
          "short": "Do not return URLs with query parameters"
        },
        {
          "name": "includeSubdomains",
          "title": "Include Subdomains",
          "type": "`$BOOLEAN`",
          "short": "Include subdomains of the website"
        },
        {
          "name": "limit",
          "title": "Limit",
          "type": "`$INTEGER`",
          "short": "Maximum number of links to return"
        },
        {
          "name": "links",
          "title": "Links",
          "type": "`$ARRAY`"
        },
        {
          "name": "search",
          "title": "Search",
          "type": "`$STRING`",
          "short": "Search query to use for mapping."
        },
        {
          "name": "sitemap",
          "title": "Sitemap",
          "type": "`$STRING`",
          "short": "Sitemap mode when mapping."
        },
        {
          "name": "success",
          "title": "Success",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "timeout",
          "title": "Timeout",
          "type": "`$INTEGER`",
          "short": "Timeout in milliseconds."
        },
        {
          "name": "url",
          "title": "Url",
          "type": "`$STRING`",
          "req": true,
          "short": "The base URL to start crawling from",
          "format": "uri"
        }
      ],
      "name": "map",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/map",
              "segments": [
                {
                  "lit": "map"
                }
              ],
              "parts": [
                "map"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "scrape": {
      "fields": [
        {
          "name": "actions",
          "title": "Actions",
          "type": "`$OBJECT`",
          "short": "Results of the actions specified in the `actions` parameter."
        },
        {
          "name": "changeTracking",
          "title": "Change Tracking",
          "type": "`$OBJECT`",
          "short": "Change tracking information if `changeTracking` is in `formats`."
        },
        {
          "name": "html",
          "title": "Html",
          "type": "`$STRING`",
          "short": "HTML version of the content on page if `html` is in `formats`"
        },
        {
          "name": "links",
          "title": "Links",
          "type": "`$ARRAY`",
          "short": "List of links on the page if `links` is in `formats`"
        },
        {
          "name": "markdown",
          "title": "Markdown",
          "type": "`$STRING`"
        },
        {
          "name": "metadata",
          "title": "Metadata",
          "type": "`$OBJECT`"
        },
        {
          "name": "rawHtml",
          "title": "Raw Html",
          "type": "`$STRING`",
          "short": "Raw HTML content of the page if `rawHtml` is in `formats`"
        },
        {
          "name": "screenshot",
          "title": "Screenshot",
          "type": "`$STRING`",
          "short": "Screenshot of the page if `screenshot` is in `formats`"
        },
        {
          "name": "summary",
          "title": "Summary",
          "type": "`$STRING`",
          "short": "Summary of the page if `summary` is in `formats`"
        },
        {
          "name": "warning",
          "title": "Warning",
          "type": "`$STRING`",
          "short": "Can be displayed when using LLM Extraction."
        }
      ],
      "name": "scrape",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/scrape",
              "segments": [
                {
                  "lit": "scrape"
                }
              ],
              "parts": [
                "scrape"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "scraping": {
      "fields": [
        {
          "name": "id",
          "title": "Id",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "scraping",
      "op": {
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "kind": "http",
              "method": "DELETE",
              "orig": "/batch/scrape/{id}",
              "segments": [
                {
                  "lit": "batch"
                },
                {
                  "lit": "scrape"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "batch",
                "scrape",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$STRING`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "search": {
      "fields": [
        {
          "name": "data",
          "title": "Data",
          "type": "`$OBJECT`",
          "short": "The search results."
        },
        {
          "name": "ignoreInvalidURLs",
          "title": "Ignore Invalid Ur Ls",
          "type": "`$BOOLEAN`",
          "short": "Excludes URLs from the search results that are invalid for other Firecrawl endpoints."
        },
        {
          "name": "limit",
          "title": "Limit",
          "type": "`$INTEGER`",
          "short": "Maximum number of results to return"
        },
        {
          "name": "location",
          "title": "Location",
          "type": "`$STRING`",
          "short": "Location parameter for search results"
        },
        {
          "name": "query",
          "title": "Query",
          "type": "`$STRING`",
          "req": true,
          "short": "The search query"
        },
        {
          "name": "scrapeOptions",
          "title": "Scrape Options",
          "type": "`$ANY`",
          "short": "Options for scraping search results"
        },
        {
          "name": "sources",
          "title": "Sources",
          "type": "`$ARRAY`",
          "short": "Sources to search."
        },
        {
          "name": "success",
          "title": "Success",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "tbs",
          "title": "Tbs",
          "type": "`$STRING`",
          "short": "Time-based search parameter."
        },
        {
          "name": "timeout",
          "title": "Timeout",
          "type": "`$INTEGER`",
          "short": "Timeout in milliseconds"
        },
        {
          "name": "warning",
          "title": "Warning",
          "type": "`$STRING`",
          "short": "Warning message if any issues occurred"
        }
      ],
      "name": "search",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "kind": "http",
              "method": "POST",
              "orig": "/search",
              "segments": [
                {
                  "lit": "search"
                }
              ],
              "parts": [
                "search"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

