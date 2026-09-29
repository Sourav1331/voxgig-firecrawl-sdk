

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


describe('ExtractEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FIRECRAWL_TEST_LIVE=TRUE.
  afterEach(liveDelay('FIRECRAWL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FirecrawlSDK.test()
    const ent = testsdk.Extract()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FIRECRAWL_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'extract.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"data":{"a":true,"h":"Data","n":"data","r":false,"t":"`$OBJECT`","key$":"data","index$":0},"enableWebSearch":{"a":true,"h":"Enable Web Search","n":"enableWebSearch","r":false,"sh":"When true, the extraction will use web search to find additional data","t":"`$BOOLEAN`","key$":"enableWebSearch","index$":1},"expiresAt":{"a":true,"fo":"date-time","h":"Expires At","n":"expiresAt","r":false,"t":"`$STRING`","key$":"expiresAt","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":3},"ignoreInvalidURLs":{"a":true,"h":"Ignore Invalid Ur Ls","n":"ignoreInvalidURLs","r":false,"sh":"If invalid URLs are specified in the urls array, they will be ignored.","t":"`$BOOLEAN`","key$":"ignoreInvalidURLs","index$":4},"ignoreSitemap":{"a":true,"h":"Ignore Sitemap","n":"ignoreSitemap","r":false,"sh":"When true, sitemap.xml files will be ignored during website scanning","t":"`$BOOLEAN`","key$":"ignoreSitemap","index$":5},"includeSubdomains":{"a":true,"h":"Include Subdomains","n":"includeSubdomains","r":false,"sh":"When true, subdomains of the provided URLs will also be scanned","t":"`$BOOLEAN`","key$":"includeSubdomains","index$":6},"invalidURLs":{"a":true,"h":"Invalid Ur Ls","n":"invalidURLs","r":false,"sh":"If ignoreInvalidURLs is true, this is an array containing the invalid URLs that were specified in the request.","t":"`$ARRAY`","key$":"invalidURLs","index$":7},"prompt":{"a":true,"h":"Prompt","n":"prompt","r":false,"sh":"Prompt to guide the extraction process","t":"`$STRING`","key$":"prompt","index$":8},"schema":{"a":true,"h":"Schema","n":"schema","r":false,"sh":"Schema to define the structure of the extracted data.","t":"`$OBJECT`","key$":"schema","index$":9},"scrapeOptions":{"a":true,"h":"Scrape Options","n":"scrapeOptions","r":false,"t":"`$OBJECT`","union":{"branches":9,"count":2,"depth":3},"key$":"scrapeOptions","index$":10},"showSources":{"a":true,"h":"Show Sources","n":"showSources","r":false,"sh":"When true, the sources used to extract the data will be included in the response as `sources` key","t":"`$BOOLEAN`","key$":"showSources","index$":11},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"The current status of the extract job","t":"`$STRING`","key$":"status","index$":12},"success":{"a":true,"h":"Success","n":"success","r":false,"t":"`$BOOLEAN`","key$":"success","index$":13},"tokensUsed":{"a":true,"h":"Tokens Used","n":"tokensUsed","r":false,"sh":"The number of tokens used by the extract job.","t":"`$INTEGER`","key$":"tokensUsed","index$":14},"urls":{"a":true,"h":"Urls","n":"urls","r":true,"t":"`$ARRAY`","key$":"urls","index$":15}},"id":{"field":"id","name":"id"},"name":"extract","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /extract","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/extract","q":{},"r":{},"s":[{"lit":"extract"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /extract/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/extract/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"extract"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"extract","name__orig":"extract","Name":"Extract","name_":"extract","name-":"extract","NAME":"EXTRACT","index$":5}, {"active":true,"entity":"extract","key$":"BasicExtractFlow","kind":"basic","name":"BasicExtractFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"extract_ref01"},"m":{},"o":"create","s":[],"v":[]},{"a":true,"d":{},"i":{"ref":"extract_ref01","srcdatavar":"extract_ref01_data","suffix":"_dt0"},"m":{"id":"extract01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-extract_ref01"}}]}]}, 'Extract', {"POST /extract":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"urls":{"type":"array","items":{"type":"string","format":"uri","description":"The URLs to extract data from. URLs should be in glob format."},"key$":"urls"},"prompt":{"type":"string","description":"Prompt to guide the extraction process","key$":"prompt"},"schema":{"type":"object","description":"Schema to define the structure of the extracted data. Must conform to [JSON Schema](https://json-schema.org/).","key$":"schema"},"enableWebSearch":{"type":"boolean","description":"When true, the extraction will use web search to find additional data","default":false,"key$":"enableWebSearch"},"ignoreSitemap":{"type":"boolean","description":"When true, sitemap.xml files will be ignored during website scanning","default":false,"key$":"ignoreSitemap"},"includeSubdomains":{"type":"boolean","description":"When true, subdomains of the provided URLs will also be scanned","default":true,"key$":"includeSubdomains"},"showSources":{"type":"boolean","description":"When true, the sources used to extract the data will be included in the response as `sources` key","default":false,"key$":"showSources"},"scrapeOptions":{"type":"object","properties":{"formats":{"default":["markdown"],"description":"Output formats to include in the response. You can specify one or more formats, either as strings (e.g., `'markdown'`) or as objects with additional options (e.g., `{ type: 'json', schema: {...} }`). Some formats require specific options to be set. Example: `['markdown', { type: 'json', schema: {...} }]`.","items":{"oneOf":[]},"type":"array","x-ref":"#/components/schemas/Formats"},"onlyMainContent":{"default":true,"description":"Only return the main content of the page excluding headers, navs, footers, etc.","type":"boolean"},"includeTags":{"description":"Tags to include in the output.","items":{"type":"string"},"type":"array"},"excludeTags":{"description":"Tags to exclude from the output.","items":{"type":"string"},"type":"array"},"maxAge":{"default":172800000,"description":"Returns a cached version of the page if it is younger than this age in milliseconds. If a cached version of the page is older than this value, the page will be scraped. If you do not need extremely fresh data, enabling this can speed up your scrapes by 500%. Defaults to 2 days.","type":"integer"},"headers":{"description":"Headers to send with the request. Can be used to send cookies, user-agent, etc.","type":"object"},"waitFor":{"default":0,"description":"Specify a delay in milliseconds before fetching the content, allowing the page sufficient time to load.","type":"integer"},"mobile":{"default":false,"description":"Set to true if you want to emulate scraping from a mobile device. Useful for testing responsive pages and taking mobile screenshots.","type":"boolean"},"skipTlsVerification":{"default":true,"description":"Skip TLS certificate verification when making requests","type":"boolean"},"timeout":{"description":"Timeout in milliseconds for the request.","type":"integer"},"parsers":{"default":["pdf"],"description":"Controls how files are processed during scraping. When \"pdf\" is included (default), the PDF content is extracted and converted to markdown format, with billing based on the number of pages (1 credit per page). When an empty array is passed, the PDF file is returned in base64 encoding with a flat rate of 1 credit total.","items":{"enum":[],"type":"string"},"type":"array"},"actions":{"description":"Actions to perform on the page before grabbing the content","items":{"oneOf":[]},"type":"array"},"location":{"description":"Location settings for the request. When specified, this will use an appropriate proxy if available and emulate the corresponding language and timezone settings. Defaults to 'US' if not specified.","properties":{"country":{},"languages":{}},"type":"object"},"removeBase64Images":{"default":true,"description":"Removes all base 64 images from the output, which may be overwhelmingly long. The image's alt text remains in the output, but the URL is replaced with a placeholder.","type":"boolean"},"blockAds":{"default":true,"description":"Enables ad-blocking and cookie popup blocking.","type":"boolean"},"proxy":{"default":"auto","description":"Specifies the type of proxy to use.\n\n - **basic**: Proxies for scraping sites with none to basic anti-bot solutions. Fast and usually works.\n - **enhanced**: Enhanced proxies for scraping sites with advanced anti-bot solutions. Slower, but more reliable on certain sites. Billed at the same credit cost as basic.\n - **auto**: Firecrawl will automatically retry scraping with enhanced proxies if the basic proxy fails. Enhanced proxies carry no credit surcharge, so either way only the regular cost is billed.\n\nIf you do not specify a proxy, Firecrawl will default to auto.","enum":["basic","enhanced","auto"],"type":"string"},"storeInCache":{"default":true,"description":"If true, the page will be stored in the Firecrawl index and cache. Setting this to false is useful if your scraping activity may have data protection concerns. Using some parameters associated with sensitive scraping (actions, headers) will force this parameter to be false.","type":"boolean"}},"x-ref":"#/components/schemas/ScrapeOptions","key$":"scrapeOptions"},"ignoreInvalidURLs":{"type":"boolean","default":true,"description":"If invalid URLs are specified in the urls array, they will be ignored. Instead of them failing the entire request, an extract using the remaining valid URLs will be performed, and the invalid URLs will be returned in the invalidURLs field of the response.","key$":"ignoreInvalidURLs"}},"required":["urls"],"index$":1}}}},"parameters":[]},"GET /extract/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","description":"The ID of the extract job","required":true,"schema":{"type":"string","format":"uuid"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const extract_ref01_ent = client.Extract()
    let extract_ref01_data = setup.data.new.extract['extract_ref01']

    extract_ref01_data = (await extract_ref01_ent.create(extract_ref01_data)).data()
    assert(null != extract_ref01_data.id)


    // LOAD
    const extract_ref01_match_dt0: any = {}
    extract_ref01_match_dt0.id = extract_ref01_data.id
    const extract_ref01_data_dt0 = (await extract_ref01_ent.load(extract_ref01_match_dt0)).data()
    assert(extract_ref01_data_dt0.id === extract_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/extract/ExtractTestData.json')

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
    ['extract01','extract02','extract03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FIRECRAWL_TEST_EXTRACT_ENTID': idmap,
    'FIRECRAWL_TEST_LIVE': 'FALSE',
    'FIRECRAWL_TEST_EXPLAIN': 'FALSE',
    'FIRECRAWL_APIKEY': '',
  })

  idmap = env['FIRECRAWL_TEST_EXTRACT_ENTID']

  const live = 'TRUE' === env.FIRECRAWL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FIRECRAWL_TEST_EXTRACT_ENTID']
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
  
