

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


describe('CrawlingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FIRECRAWL_TEST_LIVE=TRUE.
  afterEach(liveDelay('FIRECRAWL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FirecrawlSDK.test()
    const ent = testsdk.Crawling()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FIRECRAWL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'crawling.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"fo":"uuid","h":"Id","n":"id","r":true,"sh":"The unique identifier of the crawl","t":"`$STRING`","key$":"id","index$":0},"options":{"a":true,"h":"Options","n":"options","r":true,"sh":"The crawler options used for this crawl","t":"`$OBJECT`","union":{"branches":9,"count":2,"depth":5},"key$":"options","index$":1},"teamId":{"a":true,"h":"Team Id","n":"teamId","r":true,"sh":"The ID of the team that owns the crawl","t":"`$STRING`","key$":"teamId","index$":2},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":true,"sh":"The origin URL of the crawl","t":"`$STRING`","key$":"url","index$":3}},"id":{"field":"id","name":"id"},"name":"crawling","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /crawl/active","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/crawl/active","q":{},"r":{},"s":[{"lit":"crawl"},{"lit":"active"}],"t":{"req":"`reqdata`","res":"`body.crawls`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"crawling","name__orig":"crawling","Name":"Crawling","name_":"crawling","name-":"crawling","NAME":"CRAWLING","index$":4}, {"active":true,"entity":"crawling","key$":"BasicCrawlingFlow","kind":"basic","name":"BasicCrawlingFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"crawling_ref01"}}]}]}, 'Crawling', {"GET /crawl/active":{"protocol":"http","parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let crawling_ref01_data = Object.values(setup.data.existing.crawling)[0] as any

    // LIST
    const crawling_ref01_ent = client.Crawling()
    const crawling_ref01_match: any = {}

    const crawling_ref01_list = (await crawling_ref01_ent.list(crawling_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/crawling/CrawlingTestData.json')

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
    ['crawling01','crawling02','crawling03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FIRECRAWL_TEST_CRAWLING_ENTID': idmap,
    'FIRECRAWL_TEST_LIVE': 'FALSE',
    'FIRECRAWL_TEST_EXPLAIN': 'FALSE',
    'FIRECRAWL_APIKEY': '',
  })

  idmap = env['FIRECRAWL_TEST_CRAWLING_ENTID']

  const live = 'TRUE' === env.FIRECRAWL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FIRECRAWL_TEST_CRAWLING_ENTID']
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
  
