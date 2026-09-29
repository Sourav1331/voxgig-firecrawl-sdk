

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


describe('BillingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FIRECRAWL_TEST_LIVE=TRUE.
  afterEach(liveDelay('FIRECRAWL_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FirecrawlSDK.test()
    const ent = testsdk.Billing()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FIRECRAWL_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'billing.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"apiKey":{"a":true,"h":"Api Key","n":"apiKey","r":false,"sh":"Name of the API key used for the billing period.","t":"`$STRING`","key$":"apiKey","index$":0},"billingPeriodEnd":{"a":true,"fo":"date-time","h":"Billing Period End","n":"billingPeriodEnd","r":false,"sh":"End date of the billing period.","t":"`$STRING`","key$":"billingPeriodEnd","index$":1},"billingPeriodStart":{"a":true,"fo":"date-time","h":"Billing Period Start","n":"billingPeriodStart","r":false,"sh":"Start date of the billing period.","t":"`$STRING`","key$":"billingPeriodStart","index$":2},"endDate":{"a":true,"fo":"date-time","h":"End Date","n":"endDate","r":false,"sh":"End date of the billing period","t":"`$STRING`","key$":"endDate","index$":3},"planCredits":{"a":true,"h":"Plan Credits","n":"planCredits","r":false,"sh":"Number of credits in the plan.","t":"`$NUMBER`","key$":"planCredits","index$":4},"planTokens":{"a":true,"h":"Plan Tokens","n":"planTokens","r":false,"sh":"Number of tokens in the plan.","t":"`$NUMBER`","key$":"planTokens","index$":5},"remainingCredits":{"a":true,"h":"Remaining Credits","n":"remainingCredits","r":false,"sh":"Number of credits remaining for the team","t":"`$NUMBER`","key$":"remainingCredits","index$":6},"remainingTokens":{"a":true,"h":"Remaining Tokens","n":"remainingTokens","r":false,"sh":"Number of tokens remaining for the team","t":"`$NUMBER`","key$":"remainingTokens","index$":7},"startDate":{"a":true,"fo":"date-time","h":"Start Date","n":"startDate","r":false,"sh":"Start date of the billing period","t":"`$STRING`","key$":"startDate","index$":8},"totalCredits":{"a":true,"h":"Total Credits","n":"totalCredits","r":false,"sh":"Total number of credits used in the billing period","t":"`$INTEGER`","key$":"totalCredits","index$":9},"totalTokens":{"a":true,"h":"Total Tokens","n":"totalTokens","r":false,"sh":"Total number of tokens used in the billing period","t":"`$INTEGER`","key$":"totalTokens","index$":10}},"name":"billing","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /team/credit-usage/historical","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":false,"k":"query","n":"by_api_key","or":"byApiKey","r":false,"t":"`$BOOLEAN`","index$":0}]},"k":"http","m":"GET","o":"/team/credit-usage/historical","q":{"exist":["by_api_key"]},"r":{},"s":[{"lit":"team"},{"lit":"credit-usage"},{"lit":"historical"}],"t":{"req":"`reqdata`","res":"`body.periods`"},"index$":0},{"a":true,"co":{"id":"GET /team/token-usage/historical","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":false,"k":"query","n":"by_api_key","or":"byApiKey","r":false,"t":"`$BOOLEAN`","index$":0}]},"k":"http","m":"GET","o":"/team/token-usage/historical","q":{"exist":["by_api_key"]},"r":{},"s":[{"lit":"team"},{"lit":"token-usage"},{"lit":"historical"}],"t":{"req":"`reqdata`","res":"`body.periods`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /team/credit-usage","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/team/credit-usage","q":{},"r":{},"s":[{"lit":"team"},{"lit":"credit-usage"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0},{"a":true,"co":{"id":"GET /team/token-usage","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/team/token-usage","q":{},"r":{},"s":[{"lit":"team"},{"lit":"token-usage"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"billing","name__orig":"billing","Name":"Billing","name_":"billing","name-":"billing","NAME":"BILLING","index$":1}, {"active":true,"entity":"billing","key$":"BasicBillingFlow","kind":"basic","name":"BasicBillingFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"billing_ref01"}}]},{"a":true,"d":{},"i":{"ref":"billing_ref01","srcdatavar":"billing_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-billing_ref01"}}]}]}, 'Billing', {"GET /team/credit-usage/historical":{"protocol":"http","parameters":[{"name":"byApiKey","in":"query","description":"Get historical credit usage by API key","required":false,"schema":{"type":"boolean","default":false},"index$":0}]},"GET /team/token-usage/historical":{"protocol":"http","parameters":[{"name":"byApiKey","in":"query","description":"Get historical token usage by API key","required":false,"schema":{"type":"boolean","default":false},"index$":0}]},"GET /team/credit-usage":{"protocol":"http","parameters":[]},"GET /team/token-usage":{"protocol":"http","parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let billing_ref01_data = Object.values(setup.data.existing.billing)[0] as any

    // LIST
    const billing_ref01_ent = client.Billing()
    const billing_ref01_match: any = {}

    const billing_ref01_list = (await billing_ref01_ent.list(billing_ref01_match)).map((e: any) => e.data())


    // LOAD
    const billing_ref01_match_dt0: any = {}
    const billing_ref01_data_dt0 = (await billing_ref01_ent.load(billing_ref01_match_dt0)).data()
    assert(null != billing_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/billing/BillingTestData.json')

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
    ['billing01','billing02','billing03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FIRECRAWL_TEST_BILLING_ENTID': idmap,
    'FIRECRAWL_TEST_LIVE': 'FALSE',
    'FIRECRAWL_TEST_EXPLAIN': 'FALSE',
    'FIRECRAWL_APIKEY': '',
  })

  idmap = env['FIRECRAWL_TEST_BILLING_ENTID']

  const live = 'TRUE' === env.FIRECRAWL_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FIRECRAWL_TEST_BILLING_ENTID']
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
  
