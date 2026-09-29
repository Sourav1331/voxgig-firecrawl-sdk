

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


describe('CrawlErrorsResponseObjEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FIRECRAWL_TEST_LIVE=TRUE.
  afterEach(liveDelay('FIRECRAWL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FirecrawlSDK.test()
    const ent = testsdk.CrawlErrorsResponseObj()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FIRECRAWL_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'crawl_errors_response_obj.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"error":{"a":true,"h":"Error","n":"error","r":false,"sh":"Error message","t":"`$STRING`","key$":"error","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"timestamp":{"a":true,"h":"Timestamp","n":"timestamp","r":false,"sh":"ISO timestamp of failure","t":"`$STRING`","key$":"timestamp","index$":2},"url":{"a":true,"h":"Url","n":"url","r":false,"sh":"Scraped URL","t":"`$STRING`","key$":"url","index$":3}},"id":{"field":"id","name":"id"},"name":"crawl_errors_response_obj","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /crawl/{id}/errors","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/crawl/{id}/errors","q":{"$action":"errors","exist":["id"]},"r":{},"s":[{"lit":"crawl"},{"var":"id"},{"lit":"errors"}],"t":{"req":"`reqdata`","res":"`body.errors`"},"index$":0},{"a":true,"co":{"id":"GET /batch/scrape/{id}/errors","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"scrape_id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/batch/scrape/{id}/errors","q":{"exist":["scrape_id"]},"r":{"param":{"id":"scrape_id"}},"s":[{"lit":"batch"},{"lit":"scrape"},{"var":"scrape_id"},{"lit":"errors"}],"t":{"req":"`reqdata`","res":"`body.errors`"},"index$":1}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.scrape"]]},"key$":"crawl_errors_response_obj","name__orig":"crawl_errors_response_obj","Name":"CrawlErrorsResponseObj","name_":"crawl_errors_response_obj","name-":"crawl-errors-response-obj","NAME":"CRAWL_ERRORS_RESPONSE_OBJ","index$":3}, {"active":true,"entity":"crawl_errors_response_obj","key$":"BasicCrawlErrorsResponseObjFlow","kind":"basic","name":"BasicCrawlErrorsResponseObjFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"scrape_id":"scrape01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"crawl_errors_response_obj_ref01"}}]}]}, 'CrawlErrorsResponseObj', {"GET /crawl/{id}/errors":{"protocol":"http","parameters":[{"name":"id","in":"path","description":"The ID of the crawl job","required":true,"schema":{"type":"string","format":"uuid"},"index$":0}]},"GET /batch/scrape/{id}/errors":{"protocol":"http","parameters":[{"name":"id","in":"path","description":"The ID of the batch scrape job","required":true,"schema":{"type":"string","format":"uuid"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let crawl_errors_response_obj_ref01_data = Object.values(setup.data.existing.crawl_errors_response_obj)[0] as any

    // LIST
    const crawl_errors_response_obj_ref01_ent = client.CrawlErrorsResponseObj()
    const crawl_errors_response_obj_ref01_match: any = {}
    crawl_errors_response_obj_ref01_match['scrape_id'] = setup.idmap['scrape01']

    const crawl_errors_response_obj_ref01_list = (await crawl_errors_response_obj_ref01_ent.list(crawl_errors_response_obj_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/crawl_errors_response_obj/CrawlErrorsResponseObjTestData.json')

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
    ['crawl_errors_response_obj01','crawl_errors_response_obj02','crawl_errors_response_obj03','scrape01','scrape02','scrape03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FIRECRAWL_TEST_CRAWL_ERRORS_RESPONSE_OBJ_ENTID': idmap,
    'FIRECRAWL_TEST_LIVE': 'FALSE',
    'FIRECRAWL_TEST_EXPLAIN': 'FALSE',
    'FIRECRAWL_APIKEY': '',
  })

  idmap = env['FIRECRAWL_TEST_CRAWL_ERRORS_RESPONSE_OBJ_ENTID']

  const live = 'TRUE' === env.FIRECRAWL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FIRECRAWL_TEST_CRAWL_ERRORS_RESPONSE_OBJ_ENTID']
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
  
