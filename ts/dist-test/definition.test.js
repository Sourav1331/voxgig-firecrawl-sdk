"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "batch_scrape_status_response_obj",
        "accessor": "BatchScrapeStatusResponseObj",
        "op": "create",
        "method": "POST",
        "path": "/batch/scrape",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "success": true,
            "id": "x",
            "url": "x",
            "invalidURLs": [
                "x"
            ]
        },
        "idField": "id"
    },
    {
        "entity": "batch_scrape_status_response_obj",
        "accessor": "BatchScrapeStatusResponseObj",
        "op": "load",
        "method": "GET",
        "path": "/batch/scrape/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "status": "x",
            "total": 1,
            "completed": 1,
            "creditsUsed": 1,
            "expiresAt": "2026-01-01T00:00:00Z",
            "next": "x",
            "data": [
                {
                    "markdown": "x",
                    "html": "x",
                    "rawHtml": "x",
                    "links": [
                        "x"
                    ],
                    "screenshot": "x",
                    "metadata": {
                        "title": "x",
                        "description": "x",
                        "language": "x",
                        "sourceURL": "x",
                        "<any other metadata> ": "x",
                        "statusCode": 1,
                        "error": "x"
                    }
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "crawl",
        "accessor": "Crawl",
        "op": "create",
        "method": "POST",
        "path": "/crawl",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "success": true,
            "id": "x",
            "url": "x"
        },
        "idField": "id"
    },
    {
        "entity": "crawl",
        "accessor": "Crawl",
        "op": "load",
        "method": "GET",
        "path": "/crawl/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "status": "x",
            "total": 1,
            "completed": 1,
            "creditsUsed": 1,
            "expiresAt": "2026-01-01T00:00:00Z",
            "next": "x",
            "data": [
                {
                    "markdown": "x",
                    "html": "x",
                    "rawHtml": "x",
                    "links": [
                        "x"
                    ],
                    "screenshot": "x",
                    "metadata": {
                        "title": "x",
                        "description": "x",
                        "language": "x",
                        "sourceURL": "x",
                        "<any other metadata> ": "x",
                        "statusCode": 1,
                        "error": "x"
                    }
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "crawl",
        "accessor": "Crawl",
        "op": "remove",
        "method": "DELETE",
        "path": "/crawl/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "status": "cancelled"
        },
        "idField": "id"
    },
    {
        "entity": "crawl_errors_response_obj",
        "accessor": "CrawlErrorsResponseObj",
        "op": "list",
        "method": "GET",
        "path": "/crawl/{id}/errors",
        "action": "errors",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "errors": [
                {
                    "error": "x",
                    "id": "x",
                    "timestamp": "x",
                    "url": "x"
                }
            ],
            "robotsBlocked": [
                "x"
            ]
        },
        "idField": "id"
    },
    {
        "entity": "crawl_errors_response_obj",
        "accessor": "CrawlErrorsResponseObj",
        "op": "list",
        "method": "GET",
        "path": "/batch/scrape/{id}/errors",
        "args": [
            {
                "name": "scrape_id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "errors": [
                {
                    "error": "x",
                    "id": "x",
                    "timestamp": "x",
                    "url": "x"
                }
            ],
            "robotsBlocked": [
                "x"
            ]
        },
        "idField": "id"
    },
    {
        "entity": "crawling",
        "accessor": "Crawling",
        "op": "list",
        "method": "GET",
        "path": "/crawl/active",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "success": true,
            "crawls": [
                {
                    "id": "x",
                    "options": {
                        "scrapeOptions": {
                            "actions": [],
                            "blockAds": true,
                            "excludeTags": [
                                "x"
                            ],
                            "formats": [],
                            "headers": {},
                            "includeTags": [
                                "x"
                            ],
                            "location": {
                                "country": "x",
                                "languages": []
                            },
                            "maxAge": 1,
                            "mobile": true,
                            "onlyMainContent": true,
                            "parsers": [
                                "pdf"
                            ],
                            "proxy": "basic",
                            "removeBase64Images": true,
                            "skipTlsVerification": true,
                            "storeInCache": true,
                            "timeout": 1,
                            "waitFor": 1
                        }
                    },
                    "teamId": "x",
                    "url": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "extract",
        "accessor": "Extract",
        "op": "create",
        "method": "POST",
        "path": "/extract",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "success": true,
            "id": "x",
            "invalidURLs": [
                "x"
            ]
        },
        "idField": "id"
    },
    {
        "entity": "extract",
        "accessor": "Extract",
        "op": "load",
        "method": "GET",
        "path": "/extract/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "success": true,
            "data": {},
            "status": "completed",
            "expiresAt": "2026-01-01T00:00:00Z",
            "tokensUsed": 1
        },
        "idField": "id"
    },
    {
        "entity": "map",
        "accessor": "Map",
        "op": "create",
        "method": "POST",
        "path": "/map",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "success": true,
            "links": [
                "x"
            ]
        },
        "idField": "id"
    },
    {
        "entity": "scrape",
        "accessor": "Scrape",
        "op": "create",
        "method": "POST",
        "path": "/scrape",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "success": true,
            "data": {
                "markdown": "x",
                "summary": "x",
                "html": "x",
                "rawHtml": "x",
                "screenshot": "x",
                "links": [
                    "x"
                ],
                "actions": {
                    "screenshots": [
                        "x"
                    ],
                    "scrapes": [
                        {
                            "url": "x",
                            "html": "x"
                        }
                    ],
                    "javascriptReturns": [
                        {
                            "type": "x"
                        }
                    ],
                    "pdfs": [
                        "x"
                    ]
                },
                "metadata": {
                    "title": "x",
                    "description": "x",
                    "language": "x",
                    "sourceURL": "x",
                    "<any other metadata> ": "x",
                    "statusCode": 1,
                    "error": "x"
                },
                "warning": "x",
                "changeTracking": {
                    "previousScrapeAt": "2026-01-01T00:00:00Z",
                    "changeStatus": "new",
                    "visibility": "visible",
                    "diff": "x",
                    "json": {}
                }
            }
        },
        "idField": "id"
    },
    {
        "entity": "scraping",
        "accessor": "Scraping",
        "op": "remove",
        "method": "DELETE",
        "path": "/batch/scrape/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "success": true,
            "message": "Batch scrape job successfully cancelled."
        },
        "idField": "id"
    },
    {
        "entity": "search",
        "accessor": "Search",
        "op": "create",
        "method": "POST",
        "path": "/search",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "authorization",
                    "scheme": "bearer"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "success": true,
            "data": {
                "web": [
                    {
                        "title": "x",
                        "description": "x",
                        "url": "x",
                        "markdown": "x",
                        "html": "x",
                        "rawHtml": "x",
                        "links": [
                            "x"
                        ],
                        "screenshot": "x",
                        "metadata": {
                            "title": "x",
                            "description": "x",
                            "sourceURL": "x",
                            "statusCode": 1,
                            "error": "x"
                        }
                    }
                ],
                "images": [
                    {
                        "title": "x",
                        "imageUrl": "x",
                        "imageWidth": 1,
                        "imageHeight": 1,
                        "url": "x",
                        "position": 1
                    }
                ],
                "news": [
                    {
                        "title": "x",
                        "snippet": "x",
                        "url": "x",
                        "date": "x",
                        "imageUrl": "x",
                        "position": 1,
                        "markdown": "x",
                        "html": "x",
                        "rawHtml": "x",
                        "links": [
                            "x"
                        ],
                        "screenshot": "x",
                        "metadata": {
                            "title": "x",
                            "description": "x",
                            "sourceURL": "x",
                            "statusCode": 1,
                            "error": "x"
                        }
                    }
                ]
            },
            "warning": "x"
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map