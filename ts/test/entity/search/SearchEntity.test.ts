

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { FirecrawlSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('SearchEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FIRECRAWL_TEST_LIVE=TRUE.
  afterEach(liveDelay('FIRECRAWL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FirecrawlSDK.test()
    const ent = testsdk.Search()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FIRECRAWL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'search.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"data":{"a":true,"h":"Data","n":"data","r":false,"sh":"The search results.","t":"`$OBJECT`","key$":"data","index$":0},"ignoreInvalidURLs":{"a":true,"h":"Ignore Invalid Ur Ls","n":"ignoreInvalidURLs","r":false,"sh":"Excludes URLs from the search results that are invalid for other Firecrawl endpoints.","t":"`$BOOLEAN`","key$":"ignoreInvalidURLs","index$":1},"limit":{"a":true,"h":"Limit","n":"limit","r":false,"sh":"Maximum number of results to return","t":"`$INTEGER`","key$":"limit","index$":2},"location":{"a":true,"h":"Location","n":"location","r":false,"sh":"Location parameter for search results","t":"`$STRING`","key$":"location","index$":3},"query":{"a":true,"h":"Query","n":"query","r":true,"sh":"The search query","t":"`$STRING`","key$":"query","index$":4},"scrapeOptions":{"a":true,"h":"Scrape Options","n":"scrapeOptions","r":false,"sh":"Options for scraping search results","t":"`$ANY`","union":{"branches":9,"count":2,"depth":5},"key$":"scrapeOptions","index$":5},"sources":{"a":true,"h":"Sources","n":"sources","r":false,"sh":"Sources to search.","t":"`$ARRAY`","union":{"branches":3,"count":1,"depth":1},"key$":"sources","index$":6},"success":{"a":true,"h":"Success","n":"success","r":false,"t":"`$BOOLEAN`","key$":"success","index$":7},"tbs":{"a":true,"h":"Tbs","n":"tbs","r":false,"sh":"Time-based search parameter.","t":"`$STRING`","key$":"tbs","index$":8},"timeout":{"a":true,"h":"Timeout","n":"timeout","r":false,"sh":"Timeout in milliseconds","t":"`$INTEGER`","key$":"timeout","index$":9},"warning":{"a":true,"h":"Warning","n":"warning","r":false,"sh":"Warning message if any issues occurred","t":"`$STRING`","key$":"warning","index$":10}},"name":"search","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /search","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/search","q":{},"r":{},"s":[{"lit":"search"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"search","name__orig":"search","Name":"Search","name_":"search","name-":"search","NAME":"SEARCH","index$":9}, {"active":true,"entity":"search","key$":"BasicSearchFlow","kind":"basic","name":"BasicSearchFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"search_ref01"},"m":{},"o":"create","s":[],"v":[]}]}, 'Search', {"POST /search":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"query":{"type":"string","description":"The search query","key$":"query"},"limit":{"type":"integer","description":"Maximum number of results to return","default":5,"maximum":100,"minimum":1,"key$":"limit"},"sources":{"type":"array","items":{"oneOf":[{"type":"object","title":"Web","properties":{},"required":[]},{"type":"object","title":"Images","properties":{},"required":[]},{"type":"object","title":"News","properties":{},"required":[]}]},"description":"Sources to search. Will determine the arrays available in the response.","default":["web"],"key$":"sources"},"tbs":{"type":"string","description":"Time-based search parameter. Supports predefined time ranges (`qdr:h`, `qdr:d`, `qdr:w`, `qdr:m`, `qdr:y`) and custom date ranges (`cdr:1,cd_min:MM/DD/YYYY,cd_max:MM/DD/YYYY`)","key$":"tbs"},"location":{"type":"string","description":"Location parameter for search results","key$":"location"},"timeout":{"type":"integer","description":"Timeout in milliseconds","default":60000,"key$":"timeout"},"ignoreInvalidURLs":{"type":"boolean","description":"Excludes URLs from the search results that are invalid for other Firecrawl endpoints. This helps reduce errors if you are piping data from search into other Firecrawl API endpoints.","default":false,"key$":"ignoreInvalidURLs"},"scrapeOptions":{"allOf":[{"type":"object","properties":{"formats":{},"onlyMainContent":{},"includeTags":{},"excludeTags":{},"maxAge":{},"headers":{},"waitFor":{},"mobile":{},"skipTlsVerification":{},"timeout":{},"parsers":{},"actions":{},"location":{},"removeBase64Images":{},"blockAds":{},"proxy":{},"storeInCache":{}},"x-ref":"#/components/schemas/ScrapeOptions"}],"description":"Options for scraping search results","default":{},"key$":"scrapeOptions"}},"required":["query"],"index$":1}}}},"parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const search_ref01_ent = client.Search()
    let search_ref01_data = setup.data.new.search['search_ref01']

    search_ref01_data = (await search_ref01_ent.create(search_ref01_data)).data()
    assert(null != search_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/search/SearchTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = FirecrawlSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['search01','search02','search03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FIRECRAWL_TEST_SEARCH_ENTID': idmap,
    'FIRECRAWL_TEST_LIVE': 'FALSE',
    'FIRECRAWL_TEST_EXPLAIN': 'FALSE',
    'FIRECRAWL_APIKEY': '',
  })

  idmap = env['FIRECRAWL_TEST_SEARCH_ENTID']

  const live = 'TRUE' === env.FIRECRAWL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FIRECRAWL_TEST_SEARCH_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new FirecrawlSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
