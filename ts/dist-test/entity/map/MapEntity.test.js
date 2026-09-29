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
(0, node_test_1.describe)('MapEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when FIRECRAWL_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('FIRECRAWL_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.FirecrawlSDK.test();
        const ent = testsdk.Map();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.FIRECRAWL_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'map.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "ignoreQueryParameters": { "a": true, "h": "Ignore Query Parameters", "n": "ignoreQueryParameters", "r": false, "sh": "Do not return URLs with query parameters", "t": "`$BOOLEAN`", "key$": "ignoreQueryParameters", "index$": 0 }, "includeSubdomains": { "a": true, "h": "Include Subdomains", "n": "includeSubdomains", "r": false, "sh": "Include subdomains of the website", "t": "`$BOOLEAN`", "key$": "includeSubdomains", "index$": 1 }, "limit": { "a": true, "h": "Limit", "n": "limit", "r": false, "sh": "Maximum number of links to return", "t": "`$INTEGER`", "key$": "limit", "index$": 2 }, "links": { "a": true, "h": "Links", "n": "links", "r": false, "t": "`$ARRAY`", "key$": "links", "index$": 3 }, "search": { "a": true, "h": "Search", "n": "search", "r": false, "sh": "Search query to use for mapping.", "t": "`$STRING`", "key$": "search", "index$": 4 }, "sitemap": { "a": true, "h": "Sitemap", "n": "sitemap", "r": false, "sh": "Sitemap mode when mapping.", "t": "`$STRING`", "key$": "sitemap", "index$": 5 }, "success": { "a": true, "h": "Success", "n": "success", "r": false, "t": "`$BOOLEAN`", "key$": "success", "index$": 6 }, "timeout": { "a": true, "h": "Timeout", "n": "timeout", "r": false, "sh": "Timeout in milliseconds.", "t": "`$INTEGER`", "key$": "timeout", "index$": 7 }, "url": { "a": true, "fo": "uri", "h": "Url", "n": "url", "r": true, "sh": "The base URL to start crawling from", "t": "`$STRING`", "key$": "url", "index$": 8 } }, "name": "map", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /map", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/map", "q": {}, "r": {}, "s": [{ "lit": "map" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "map", "name__orig": "map", "Name": "Map", "name_": "map", "name-": "map", "NAME": "MAP", "index$": 6 }, { "active": true, "entity": "map", "key$": "BasicMapFlow", "kind": "basic", "name": "BasicMapFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "map_ref01" }, "m": {}, "o": "create", "s": [], "v": [] }] }, 'Map', { "POST /map": { "protocol": "http", "requestBody": { "required": true, "content": { "application/json": { "schema": { "type": "object", "properties": { "url": { "type": "string", "format": "uri", "description": "The base URL to start crawling from", "key$": "url" }, "search": { "type": "string", "description": "Search query to use for mapping. During the Alpha phase, the 'smart' part of the search functionality is limited to 500 search results. However, if map finds more results, there is no limit applied.", "key$": "search" }, "sitemap": { "type": "string", "enum": ["skip", "include", "only"], "description": "Sitemap mode when mapping. If you set it to `skip`, the sitemap won't be used to find URLs. If you set it to `only`, only URLs that are in the sitemap will be returned. By default (`include`), the sitemap and other methods will be used together to find URLs.", "default": "include", "key$": "sitemap" }, "includeSubdomains": { "type": "boolean", "description": "Include subdomains of the website", "default": true, "key$": "includeSubdomains" }, "ignoreQueryParameters": { "type": "boolean", "description": "Do not return URLs with query parameters", "default": true, "key$": "ignoreQueryParameters" }, "limit": { "type": "integer", "description": "Maximum number of links to return", "default": 5000, "maximum": 30000, "key$": "limit" }, "timeout": { "type": "integer", "description": "Timeout in milliseconds. There is no timeout by default.", "key$": "timeout" } }, "required": ["url"], "index$": 1 } } } }, "parameters": [] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const map_ref01_ent = client.Map();
        let map_ref01_data = setup.data.new.map['map_ref01'];
        map_ref01_data = (await map_ref01_ent.create(map_ref01_data)).data();
        (0, node_assert_1.default)(null != map_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/map/MapTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.FirecrawlSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['map01', 'map02', 'map03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'FIRECRAWL_TEST_MAP_ENTID': idmap,
        'FIRECRAWL_TEST_LIVE': 'FALSE',
        'FIRECRAWL_TEST_EXPLAIN': 'FALSE',
        'FIRECRAWL_APIKEY': '',
    });
    idmap = env['FIRECRAWL_TEST_MAP_ENTID'];
    const live = 'TRUE' === env.FIRECRAWL_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['FIRECRAWL_TEST_MAP_ENTID'];
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
//# sourceMappingURL=MapEntity.test.js.map