

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


describe('ScrapeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FIRECRAWL_TEST_LIVE=TRUE.
  afterEach(liveDelay('FIRECRAWL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FirecrawlSDK.test()
    const ent = testsdk.Scrape()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FIRECRAWL_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'scrape.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"actions":{"a":true,"h":"Actions","n":"actions","r":false,"sh":"Results of the actions specified in the `actions` parameter.","t":"`$OBJECT`","key$":"actions","index$":0},"changeTracking":{"a":true,"h":"Change Tracking","n":"changeTracking","r":false,"sh":"Change tracking information if `changeTracking` is in `formats`.","t":"`$OBJECT`","key$":"changeTracking","index$":1},"html":{"a":true,"h":"Html","n":"html","r":false,"sh":"HTML version of the content on page if `html` is in `formats`","t":"`$STRING`","key$":"html","index$":2},"links":{"a":true,"h":"Links","n":"links","r":false,"sh":"List of links on the page if `links` is in `formats`","t":"`$ARRAY`","key$":"links","index$":3},"markdown":{"a":true,"h":"Markdown","n":"markdown","r":false,"t":"`$STRING`","key$":"markdown","index$":4},"metadata":{"a":true,"h":"Metadata","n":"metadata","r":false,"t":"`$OBJECT`","key$":"metadata","index$":5},"rawHtml":{"a":true,"h":"Raw Html","n":"rawHtml","r":false,"sh":"Raw HTML content of the page if `rawHtml` is in `formats`","t":"`$STRING`","key$":"rawHtml","index$":6},"screenshot":{"a":true,"h":"Screenshot","n":"screenshot","r":false,"sh":"Screenshot of the page if `screenshot` is in `formats`","t":"`$STRING`","key$":"screenshot","index$":7},"summary":{"a":true,"h":"Summary","n":"summary","r":false,"sh":"Summary of the page if `summary` is in `formats`","t":"`$STRING`","key$":"summary","index$":8},"warning":{"a":true,"h":"Warning","n":"warning","r":false,"sh":"Can be displayed when using LLM Extraction.","t":"`$STRING`","key$":"warning","index$":9}},"name":"scrape","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /scrape","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/scrape","q":{},"r":{},"s":[{"lit":"scrape"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"scrape","name__orig":"scrape","Name":"Scrape","name_":"scrape","name-":"scrape","NAME":"SCRAPE","index$":7}, {"active":true,"entity":"scrape","key$":"BasicScrapeFlow","kind":"basic","name":"BasicScrapeFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"scrape_ref01"},"m":{},"o":"create","s":[],"v":[]}]}, 'Scrape', {"POST /scrape":{"protocol":"http","requestBody":{"required":true,"content":{"application/json":{"schema":{"allOf":[{"type":"object","properties":{"url":{"type":"string","format":"uri","description":"The URL to scrape"}},"required":["url"]},{"type":"object","properties":{"formats":{"default":["markdown"],"description":"Output formats to include in the response. You can specify one or more formats, either as strings (e.g., `'markdown'`) or as objects with additional options (e.g., `{ type: 'json', schema: {...} }`). Some formats require specific options to be set. Example: `['markdown', { type: 'json', schema: {...} }]`.","items":{"oneOf":[]},"type":"array","x-ref":"#/components/schemas/Formats"},"onlyMainContent":{"default":true,"description":"Only return the main content of the page excluding headers, navs, footers, etc.","type":"boolean"},"includeTags":{"description":"Tags to include in the output.","items":{"type":"string"},"type":"array"},"excludeTags":{"description":"Tags to exclude from the output.","items":{"type":"string"},"type":"array"},"maxAge":{"default":172800000,"description":"Returns a cached version of the page if it is younger than this age in milliseconds. If a cached version of the page is older than this value, the page will be scraped. If you do not need extremely fresh data, enabling this can speed up your scrapes by 500%. Defaults to 2 days.","type":"integer"},"headers":{"description":"Headers to send with the request. Can be used to send cookies, user-agent, etc.","type":"object"},"waitFor":{"default":0,"description":"Specify a delay in milliseconds before fetching the content, allowing the page sufficient time to load.","type":"integer"},"mobile":{"default":false,"description":"Set to true if you want to emulate scraping from a mobile device. Useful for testing responsive pages and taking mobile screenshots.","type":"boolean"},"skipTlsVerification":{"default":true,"description":"Skip TLS certificate verification when making requests","type":"boolean"},"timeout":{"description":"Timeout in milliseconds for the request.","type":"integer"},"parsers":{"default":["pdf"],"description":"Controls how files are processed during scraping. When \"pdf\" is included (default), the PDF content is extracted and converted to markdown format, with billing based on the number of pages (1 credit per page). When an empty array is passed, the PDF file is returned in base64 encoding with a flat rate of 1 credit total.","items":{"enum":[],"type":"string"},"type":"array"},"actions":{"description":"Actions to perform on the page before grabbing the content","items":{"oneOf":[]},"type":"array"},"location":{"description":"Location settings for the request. When specified, this will use an appropriate proxy if available and emulate the corresponding language and timezone settings. Defaults to 'US' if not specified.","properties":{"country":{},"languages":{}},"type":"object"},"removeBase64Images":{"default":true,"description":"Removes all base 64 images from the output, which may be overwhelmingly long. The image's alt text remains in the output, but the URL is replaced with a placeholder.","type":"boolean"},"blockAds":{"default":true,"description":"Enables ad-blocking and cookie popup blocking.","type":"boolean"},"proxy":{"default":"auto","description":"Specifies the type of proxy to use.\n\n - **basic**: Proxies for scraping sites with none to basic anti-bot solutions. Fast and usually works.\n - **enhanced**: Enhanced proxies for scraping sites with advanced anti-bot solutions. Slower, but more reliable on certain sites. Billed at the same credit cost as basic.\n - **auto**: Firecrawl will automatically retry scraping with enhanced proxies if the basic proxy fails. Enhanced proxies carry no credit surcharge, so either way only the regular cost is billed.\n\nIf you do not specify a proxy, Firecrawl will default to auto.","enum":["basic","enhanced","auto"],"type":"string"},"storeInCache":{"default":true,"description":"If true, the page will be stored in the Firecrawl index and cache. Setting this to false is useful if your scraping activity may have data protection concerns. Using some parameters associated with sensitive scraping (actions, headers) will force this parameter to be false.","type":"boolean"}},"x-ref":"#/components/schemas/ScrapeOptions"},{"type":"object","properties":{"zeroDataRetention":{"type":"boolean","default":false,"description":"If true, this will enable zero data retention for this scrape. To enable this feature, please contact help@firecrawl.dev"}}}],"index$":1}}}},"parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const scrape_ref01_ent = client.Scrape()
    let scrape_ref01_data = setup.data.new.scrape['scrape_ref01']

    scrape_ref01_data = (await scrape_ref01_ent.create(scrape_ref01_data)).data()
    assert(null != scrape_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/scrape/ScrapeTestData.json')

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
    ['scrape01','scrape02','scrape03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FIRECRAWL_TEST_SCRAPE_ENTID': idmap,
    'FIRECRAWL_TEST_LIVE': 'FALSE',
    'FIRECRAWL_TEST_EXPLAIN': 'FALSE',
    'FIRECRAWL_APIKEY': '',
  })

  idmap = env['FIRECRAWL_TEST_SCRAPE_ENTID']

  const live = 'TRUE' === env.FIRECRAWL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FIRECRAWL_TEST_SCRAPE_ENTID']
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
  
