Voxgig / Firecrawl mini-task execution report — 2026-09-29

**Submission summary**

API selected: **Firecrawl v2**, using the supplied official OpenAPI 3.0.0 definition at `.sdk/def/firecrawl-openapi.json`. Firecrawl is a useful evaluation choice because its scraping, crawling, search and extraction operations exercise request bodies, asynchronous job identifiers, bearer authentication and response envelopes. Its composed schemas also expose a meaningful generator limitation. This is the technical rationale for the selection; no alternative API was substituted.

The initial project was created with `npm create @voxgig/sdkgen -- firecrawl --def ./firecrawl-openapi.json --target ts`. As reported during setup, its automatic installation failed with `spawn npm ENOENT`; a manual `npm install` succeeded. The interrupted scaffold left the TypeScript target unregistered. The repair retained this project and used Voxgig's installed package implementation, guide overlays and supported target-add/generate commands.

**Final submission-readiness review**

Ready as a hiring mini-task submission with the request-typing limitation disclosed. It must not be represented as a fully correct, production-ready Firecrawl TypeScript SDK.

- Package: `@voxgig-sdk/firecrawl-sdk`, version `0.0.1`, CommonJS with `dist/FirecrawlSDK.js` and `dist/FirecrawlSDK.d.ts` entry points; MIT license with the generated Voxgig copyright notice preserved.
- Source: 10 entity classes, SDK/client and entity base classes, request/response utilities, generated types and the standard test feature. There are no runtime npm dependencies. The Node-specific imports make this a Node SDK; browser compatibility was not validated.
- TypeScript: strict checking, NodeNext modules, ES2022 target, source maps, declarations and noEmitOnError; sources and tests have separate configurations. Review environment: Node 24.15.0 and npm 11.17.0. No engines constraint is declared.
- Documentation: root README.md and SUMMARY.md, plus ts/README.md, ts/REFERENCE.md and agent guides exist. These are generated documents. Their example payloads and broad type-safety claim should be read alongside this report's request-type limitation; passing offline examples do not establish valid live API payloads.
- Packaging: `npm.cmd pack --dry-run --json --ignore-scripts` succeeded, listing 242 files, including the compiled entry point, declarations, source, README and LICENSE. An actual tarball was also created and extracted in the OS temporary directory, without publishing. The packed runtime loads independently of .sdk and an ordinary consumer TypeScript call compiles with Node type definitions available. The package omits ts/REFERENCE.md and includes dist/tsconfig.tsbuildinfo; these are packaging-polish issues, not blockers for the evaluation.
- Publishing: the name, author, repository links and manual publish workflow still use generated Voxgig metadata. Access to the @voxgig-sdk npm scope was not checked and must not be assumed. Local tarball installation/use is supported; an npm release under the candidate's account requires deliberate metadata and publishing configuration. The package does not rebuild automatically during packing, so run the build first. Tests are repository assets and depend on .sdk fixtures; the published runtime does not.
- Authentication: the supplied spec declares HTTP bearer authentication. The SDK base URL is https://api.firecrawl.dev/v2; options.apikey supplies the value and auth.prefix is Bearer. The resulting authorization header was asserted using an in-memory placeholder and a stub transport, without reading the user's credential or contacting Firecrawl. Consumers must supply the option explicitly, for example from their own process environment; the SDK does not automatically load a credential file.
- Validation: the current compiled test suite was rerun offline during this review: **239 passed / 0 failed / 1 skipped**, out of 240 tests in 39 suites. The skip is the uninstalled cost feature. Both generation and build results recorded below remain successful; source was not changed during this review.
- Secret review: no local credential/config files or common Firecrawl/GitHub/private-key token patterns were found in the scanned project files outside dependencies, caches and logs. This is a bounded scan, not proof against every possible secret format. No credential values were printed. No Git repository exists yet, so nothing has been committed or pushed.
- Submission-only changes during review: expanded this report, copied it into the proposed repository root, added a precise submission-files.txt allowlist and strengthened the root .gitignore for credential files, caches, logs/build bookkeeping and unused standalone CLI model artifacts. No SDK/generator source or official definition was modified.
- GitHub Actions were inspected but not executed. The publish workflow requires manual dispatch; the review did not publish, tag, commit, initialize Git or push.

The repository root for submission is `firecrawl-sdk/`, containing this report alongside README.md, .sdk/ and ts/. The copy one directory above is retained for continuity with the original task. **submission-files.txt is the exact first-commit allowlist**; the much longer historical generation inventory at the end of this report is not a commit list. Keep ts/dist and ts/dist-test, as explicitly intended by the generated ts/.gitignore; exclude their *.tsbuildinfo files. Exclude dependencies, .jostraca caches, .sdk build output, historical warnings, local secrets and the redundant prefixed API/entity/flow models.

The allowlist contains **647 files**. All listed files exist, required generator inputs and runtime entry points are included and no excluded local artifact or common secret-token pattern was found in the selected files. `npm ls --depth=0` also succeeds for both .sdk and ts; the target uses TypeScript 5.9.3 and the generator toolchain uses TypeScript 7.0.2.

Exact request-type defect locations:

- `ts/src/FirecrawlTypes.ts:246`: `ScrapeCreateData`; reproduced independently for both missing url and missing formats. The omission also appears in `ts/dist/FirecrawlTypes.d.ts`.
- `.sdk/def/firecrawl-openapi.json:36`: `paths["/scrape"].post.requestBody.content["application/json"].schema.allOf`. Member 0 requires the url property; member 1 references `#/components/schemas/ScrapeOptions`.
- `.sdk/def/firecrawl-openapi.json:2382`: `ScrapeOptions.properties.formats` references `#/components/schemas/Formats`.
- Installed `.sdk/node_modules/@voxgig/apidef/src/transform/field.ts:768`: findFieldDefs creates an array containing response and request schemas. Its allOf check at line 778 applies to that outer array and the loop at line 789 only visits direct properties of its members, losing the request member's allOf fields.
- Installed sdkgen's opRequestShape uses the resulting entity fields and `.sdk/src/cmp/ts/EntityTypes_ts.ts:76` emits them into the create-request interface. Response fields survive while the composed request fields are absent. No any-based workaround, casts, generated-file edits or OpenAPI edits were introduced.

No live API request is required for this evaluation. A separately authorized live smoke test would POST /v2/scrape for https://example.com with formats set to markdown, checking bearer authentication, HTTP/API success and nonempty markdown; it could consume Firecrawl credits. That test was not executed.

The execution history and original generation inventory follow.

Generation, both TypeScript builds and the generated offline test suite succeed. This is not yet a fully correct typed Firecrawl client: the generated ScrapeCreateData interface rejects the required url field and the formats option. No live API calls were made.

**A. Deliberate source edits** (paths relative to firecrawl-sdk)

- `.sdk/model/guide/firecrawl-guide.aontu`: replaced the malformed single comment line with the exact includes required by installed apidef 8.20.0; added body.errors response mappings for the two error-list endpoints.
- `.sdk/model/guide/guide.aontu`: added the same two response mappings for the normal SDK pipeline.
- `.sdk/model/sdk.aontu`: prefixed six local includes with ./, as required by the installed Aontu resolver.
- `.sdk/test/test.aontu`: prefixed three local includes with ./.
- `.sdk/src/cmp/ts/Package_ts.ts`: after the supported target-add command created this component, changed the generated build cleanup to Node fs.rmSync and changed the default test glob to double quotes for Windows. Generated ts files were not edited by hand.

`npm run add-target -- ts` registered the missing TypeScript target and its standard test feature. All other project changes are normal scaffold/generation/build/install outputs. The complete file-level inventory is below: 985 added and 13 modified project files, including generated code, tests, docs, build output and Jostraca metadata. There were no pre-existing project files removed. Installed node_modules files are excluded from the inventory; npm installed three packages in ts, recorded in ts/package-lock.json. This report is an additional file outside firecrawl-sdk.

The official definition is byte-for-byte unchanged, verified against the original at ../firecrawl-openapi.json. Dependencies under .sdk were not modified. No API credentials were added, no --force dependency fixes were used and nothing was committed or pushed. The supplied directory is not a Git repository, so the inventory uses SHA-256 snapshots taken before editing rather than git diff.

**B. Exact generation/build/test commands**

Windows .cmd executables were used. Commands are listed in execution order; read-only inspection used Get-Content, Get-ChildItem, rg, Select-String and Node to inspect the installed packages and the supplied OpenAPI definition.

From `firecrawl-sdk/.sdk`:

```powershell
npx.cmd @voxgig/apidef firecrawl -f . -d def/firecrawl-openapi.json
npm.cmd run generate
npm.cmd run add-target -- ts
npm.cmd run generate
npm.cmd run build
npm.cmd test
```

The first generate failed on a bare relative include. After the include fixes and target registration, generate succeeded. The .sdk test command prints only no-test.

From `firecrawl-sdk/ts`:

```powershell
npm.cmd install
npm.cmd run build
```

The initial SDK build failed because rm was unavailable in Windows cmd. After fixing Package_ts.ts, from .sdk:

```powershell
npm.cmd run generate
```

From ts, after verifying that dist and dist-test resolve inside the ts directory:

```powershell
npm.cmd run build
$env:FIRECRAWL_TEST_LIVE = 'FALSE'; npm.cmd test > "$env:TEMP\voxgig-firecrawl-tests.log" 2>&1; $taskTestExit = $LASTEXITCODE; Get-Content "$env:TEMP\voxgig-firecrawl-tests.log" -Tail 45; exit $taskTestExit
```

That suite reported 237 passes, two error-list response failures and one skip. After adding the guide mappings, from .sdk:

```powershell
npx.cmd @voxgig/apidef firecrawl -f . -d def/firecrawl-openapi.json; if ($LASTEXITCODE -eq 0) { npm.cmd run generate }
```

Then from ts:

```powershell
$env:FIRECRAWL_TEST_LIVE = 'FALSE'; npm.cmd test > "$env:TEMP\voxgig-firecrawl-tests-final.log" 2>&1; $taskTestExit = $LASTEXITCODE; Get-Content "$env:TEMP\voxgig-firecrawl-tests-final.log" -Tail 22; exit $taskTestExit
```

The final npm test also invokes npm run build through pretest, compiling both SDK sources and test sources.

Additional in-memory request-type diagnostic, from ts (exit 1):

```powershell
node -e "const ts=require('typescript'); const path=require('node:path');const file=path.resolve('request-type-check.ts'); const opts={strict:true,noEmit:true,skipLibCheck:true,module:ts.ModuleKind.NodeNext,target:ts.ScriptTarget.ES2022}; const host=ts.createCompilerHost(opts);const read=host.readFile;host.readFile=p=>path.resolve(p)===file?'import { FirecrawlSDK } from \'./dist/FirecrawlSDK\'; new FirecrawlSDK().Scrape().create({url: \'https://example.com\', formats: [\'markdown\']});':read(p);const p=ts.createProgram([file],opts,host);const errors=ts.getPreEmitDiagnostics(p);for(const e of errors) console.log(ts.flattenDiagnosticMessageText(e.messageText,'\n'));process.exit(errors.length?1:0);"
```

An earlier version of this diagnostic compared slash-normalized paths incorrectly and reported the virtual file missing. The corrected command above reached the actual SDK typing error. It creates no file.

Additional offline runtime smoke check, from ts (exit 0):

```powershell
node -e "const assert=require('node:assert/strict'); const {FirecrawlSDK}=require('.'); const calls=[]; const client=new FirecrawlSDK({system:{fetch:async (url,init)=>{calls.push({url,init});return new Response(JSON.stringify({success:true,data:{markdown:'offline scrape'}}),{status:200,headers:{'content-type':'application/json'}})}}});(async()=>{const payload={url:'https://example.com',formats:['markdown']};const result=await client.Scrape().create(payload);assert.equal(calls.length,1);assert.equal(calls[0].url,'https://api.firecrawl.dev/v2/scrape');assert.equal(calls[0].init.method,'POST');assert.deepEqual(JSON.parse(calls[0].init.body),payload);assert.equal(result.data().markdown,'offline scrape');console.log('Offline scrape runtime check passed; no credentials or network used.');})().catch(e=>{console.error(e.message);process.exitCode=1});"
```

**C–F. Results**

| Check | Result |
| --- | --- |
| Standalone apidef | Passed, 10 entities and 18 operation points over 16 paths |
| npm run generate | Passed; TypeScript SDK emitted in ts/ |
| .sdk TypeScript component build | Passed |
| Generated SDK and test TypeScript build | Passed |
| .sdk npm test | Exit 0, but only prints no-test |
| Generated SDK npm test | 240 tests: 239 passed, 0 failed, 1 skipped |
| Offline scrape transport smoke check | Passed: POST /v2/scrape, request body and response unwrapping verified |
| Typical TypeScript scrape call | Failed: url does not exist in ScrapeCreateData |

The single skip is the cost feature corpus case; that optional feature is not installed. No tests were disabled to obtain a passing result.

**G. Remaining warnings and limitations**

- Confirmed request typing defect: ts/src/FirecrawlTypes.ts contains response fields in ScrapeCreateData but omits url and formats. The supplied POST /scrape request uses allOf. Installed @voxgig/apidef/src/transform/field.ts, findFieldDefs, combines response and request schemas into an array, then reads only each member's direct properties; it does not descend into the request member's allOf. The runtime forwards the valid payload correctly, but the normal typed call fails. No cast, permissive index signature, dependency patch or change to the official definition was used to conceal this. A complete repair requires addressing request-schema handling and request/response type separation in the generator; work stopped at this limitation to preserve the requested small scope.
- Generation emits Node DEP0176 (fs.F_OK deprecated).
- Generation warns that ./cmp/ts/ReadmeFeatures_ts and ./cmp/ts/AgentGuide_ts are missing. Installed sdkgen explicitly loads these optional overrides with ignore: true and continues with its shared documentation components.
- The existing .sdk/apidef-warnings.txt still contains the historical malformed-guide error. Its content was retained; current successful runs did not clear it.
- Standalone apidef defaults to firecrawl-prefixed model filenames; the scaffold's build/apidef.js intentionally uses unprefixed filenames and model/guide/guide.aontu. npm run generate regenerates the unprefixed model and garbage-collects the prefixed entity files. Both guide entry points have the response customization. Use npm run generate for the ongoing SDK workflow.
- Only the normal build/test Windows scripts were fixed. Optional clean/reset/test-some/coverage scripts still retain upstream shell assumptions and were not exercised.
- Live Firecrawl behavior and credentials were not tested.

## Human Work Time-Box

The hands-on work for this mini-task exceeded the requested 30-minute time-box. The additional time was mainly due to unexpected generator and environment issues encountered during setup, generation, build and validation.

Rather than bypassing these issues or hiding the resulting limitations, I used the additional time to diagnose the failures, verify the generated SDK, run the available tests, perform a live Map API smoke testand document the remaining request-typing limitation.

I understand that the 30-minute time-box was intended to evaluate the generator's developer experience. The additional time therefore reflects the practical effort required to recover from the issues encountered, rather than an attempt to expand the scope of the task.

**H. Developer-experience observation**

The model-and-guide workflow allowed targeted response fixes without editing generated SDK code and generated definition tests caught a real response-envelope mismatch. First-run recovery was less smooth: installation left the target unregistered, scaffold includes needed explicit relative paths and generated scripts assumed a Unix shell. Passing generated tests also did not guarantee usable request typings for an allOf schema.

**Complete changed-file inventory**

Paths below are relative to firecrawl-sdk. This records the final state compared with the pre-edit snapshot, excluding node_modules.

| Status | File |
| --- | --- |
| Added | `.github/workflows/docgen.yml` |
| Added | `.github/workflows/publish-ts.yml` |
| Added | `.jostraca/generated/.github/workflows/docgen.yml` |
| Added | `.jostraca/generated/.github/workflows/publish-ts.yml` |
| Added | `.jostraca/generated/.sdk/admin/setup-npm-trust.sh` |
| Added | `.jostraca/generated/.sdk/doc/generated.json` |
| Added | `.jostraca/generated/.sdk/doc/qa/pages-job.yml` |
| Added | `.jostraca/generated/.sdk/doc/qa/STYLE-GUIDE.md` |
| Added | `.jostraca/generated/.sdk/doc/qa/styles/config/vocabularies/Docgen/accept.txt` |
| Added | `.jostraca/generated/.sdk/doc/qa/styles/config/vocabularies/Docgen/reject.txt` |
| Added | `.jostraca/generated/.sdk/doc/qa/styles/Docgen/WordChoice.yml` |
| Added | `.jostraca/generated/.sdk/doc/qa/vale.ini` |
| Added | `.jostraca/generated/.sdk/doc/qa/workflow.yml` |
| Added | `.jostraca/generated/.sdk/doc/qa-manifest.json` |
| Added | `.jostraca/generated/.sdk/PUBLISHING.md` |
| Added | `.jostraca/generated/.sdk/test/entity/batch_scrape_status_response_obj/BatchScrapeStatusResponseObjTestData.json` |
| Added | `.jostraca/generated/.sdk/test/entity/billing/BillingTestData.json` |
| Added | `.jostraca/generated/.sdk/test/entity/crawl/CrawlTestData.json` |
| Added | `.jostraca/generated/.sdk/test/entity/crawl_errors_response_obj/CrawlErrorsResponseObjTestData.json` |
| Added | `.jostraca/generated/.sdk/test/entity/crawling/CrawlingTestData.json` |
| Added | `.jostraca/generated/.sdk/test/entity/extract/ExtractTestData.json` |
| Added | `.jostraca/generated/.sdk/test/entity/map/MapTestData.json` |
| Added | `.jostraca/generated/.sdk/test/entity/scrape/ScrapeTestData.json` |
| Added | `.jostraca/generated/.sdk/test/entity/scraping/ScrapingTestData.json` |
| Added | `.jostraca/generated/.sdk/test/entity/search/SearchTestData.json` |
| Added | `.jostraca/generated/AGENTS.md` |
| Added | `.jostraca/generated/CHANGELOG.md` |
| Added | `.jostraca/generated/CLAUDE.md` |
| Added | `.jostraca/generated/LICENSE` |
| Added | `.jostraca/generated/Makefile` |
| Added | `.jostraca/generated/NOTICE` |
| Added | `.jostraca/generated/README.md` |
| Added | `.jostraca/generated/SECURITY.md` |
| Added | `.jostraca/generated/SUMMARY.md` |
| Added | `.jostraca/generated/ts/.gitignore` |
| Added | `.jostraca/generated/ts/AGENTS.md` |
| Added | `.jostraca/generated/ts/CLAUDE.md` |
| Added | `.jostraca/generated/ts/LICENSE` |
| Added | `.jostraca/generated/ts/Makefile` |
| Added | `.jostraca/generated/ts/package.json` |
| Added | `.jostraca/generated/ts/README.md` |
| Added | `.jostraca/generated/ts/REFERENCE.md` |
| Added | `.jostraca/generated/ts/src/Config.ts` |
| Added | `.jostraca/generated/ts/src/Context.ts` |
| Added | `.jostraca/generated/ts/src/Control.ts` |
| Added | `.jostraca/generated/ts/src/entity/BatchScrapeStatusResponseObjEntity.ts` |
| Added | `.jostraca/generated/ts/src/entity/BillingEntity.ts` |
| Added | `.jostraca/generated/ts/src/entity/CrawlEntity.ts` |
| Added | `.jostraca/generated/ts/src/entity/CrawlErrorsResponseObjEntity.ts` |
| Added | `.jostraca/generated/ts/src/entity/CrawlingEntity.ts` |
| Added | `.jostraca/generated/ts/src/entity/ExtractEntity.ts` |
| Added | `.jostraca/generated/ts/src/entity/MapEntity.ts` |
| Added | `.jostraca/generated/ts/src/entity/ScrapeEntity.ts` |
| Added | `.jostraca/generated/ts/src/entity/ScrapingEntity.ts` |
| Added | `.jostraca/generated/ts/src/entity/SearchEntity.ts` |
| Added | `.jostraca/generated/ts/src/feature/base/BaseFeature.ts` |
| Added | `.jostraca/generated/ts/src/feature/README.md` |
| Added | `.jostraca/generated/ts/src/feature/test/AGENTS.md` |
| Added | `.jostraca/generated/ts/src/feature/test/CLAUDE.md` |
| Added | `.jostraca/generated/ts/src/feature/test/TestFeature.ts` |
| Added | `.jostraca/generated/ts/src/FirecrawlEntityBase.ts` |
| Added | `.jostraca/generated/ts/src/FirecrawlError.ts` |
| Added | `.jostraca/generated/ts/src/FirecrawlSDK.ts` |
| Added | `.jostraca/generated/ts/src/FirecrawlTypes.ts` |
| Added | `.jostraca/generated/ts/src/Operation.ts` |
| Added | `.jostraca/generated/ts/src/Point.ts` |
| Added | `.jostraca/generated/ts/src/README.md` |
| Added | `.jostraca/generated/ts/src/Response.ts` |
| Added | `.jostraca/generated/ts/src/Result.ts` |
| Added | `.jostraca/generated/ts/src/Schema.ts` |
| Added | `.jostraca/generated/ts/src/Spec.ts` |
| Added | `.jostraca/generated/ts/src/tsconfig.json` |
| Added | `.jostraca/generated/ts/src/types.ts` |
| Added | `.jostraca/generated/ts/src/utility/CleanUtility.ts` |
| Added | `.jostraca/generated/ts/src/utility/DoneUtility.ts` |
| Added | `.jostraca/generated/ts/src/utility/FeatureAddUtility.ts` |
| Added | `.jostraca/generated/ts/src/utility/FeatureHookUtility.ts` |
| Added | `.jostraca/generated/ts/src/utility/FeatureInitUtility.ts` |
| Added | `.jostraca/generated/ts/src/utility/FetcherUtility.ts` |
| Added | `.jostraca/generated/ts/src/utility/GraphqlUtility.ts` |
| Added | `.jostraca/generated/ts/src/utility/MakeContextUtility.ts` |
| Added | `.jostraca/generated/ts/src/utility/MakeErrorUtility.ts` |
| Added | `.jostraca/generated/ts/src/utility/MakeFetchDefUtility.ts` |
| Added | `.jostraca/generated/ts/src/utility/MakeOptionsUtility.ts` |
| Added | `.jostraca/generated/ts/src/utility/MakePointUtility.ts` |
| Added | `.jostraca/generated/ts/src/utility/MakeRequestUtility.ts` |
| Added | `.jostraca/generated/ts/src/utility/MakeResponseUtility.ts` |
| Added | `.jostraca/generated/ts/src/utility/MakeResultUtility.ts` |
| Added | `.jostraca/generated/ts/src/utility/MakeSpecUtility.ts` |
| Added | `.jostraca/generated/ts/src/utility/MakeUrlUtility.ts` |
| Added | `.jostraca/generated/ts/src/utility/ParamUtility.ts` |
| Added | `.jostraca/generated/ts/src/utility/PrepareAuthUtility.ts` |
| Added | `.jostraca/generated/ts/src/utility/PrepareBodyUtility.ts` |
| Added | `.jostraca/generated/ts/src/utility/PrepareHeadersUtility.ts` |
| Added | `.jostraca/generated/ts/src/utility/PrepareMethodUtility.ts` |
| Added | `.jostraca/generated/ts/src/utility/PrepareParamsUtility.ts` |
| Added | `.jostraca/generated/ts/src/utility/PreparePathUtility.ts` |
| Added | `.jostraca/generated/ts/src/utility/PrepareQueryUtility.ts` |
| Added | `.jostraca/generated/ts/src/utility/README.md` |
| Added | `.jostraca/generated/ts/src/utility/ResultBasicUtility.ts` |
| Added | `.jostraca/generated/ts/src/utility/ResultBodyUtility.ts` |
| Added | `.jostraca/generated/ts/src/utility/ResultHeadersUtility.ts` |
| Added | `.jostraca/generated/ts/src/utility/StructUtility.ts` |
| Added | `.jostraca/generated/ts/src/utility/TransformRequestUtility.ts` |
| Added | `.jostraca/generated/ts/src/utility/TransformResponseUtility.ts` |
| Added | `.jostraca/generated/ts/src/utility/Utility.ts` |
| Added | `.jostraca/generated/ts/test/definition.test.ts` |
| Added | `.jostraca/generated/ts/test/definition-runner.ts` |
| Added | `.jostraca/generated/ts/test/entity/batch_scrape_status_response_obj/BatchScrapeStatusResponseObjDirect.test.ts` |
| Added | `.jostraca/generated/ts/test/entity/batch_scrape_status_response_obj/BatchScrapeStatusResponseObjEntity.test.ts` |
| Added | `.jostraca/generated/ts/test/entity/billing/BillingDirect.test.ts` |
| Added | `.jostraca/generated/ts/test/entity/billing/BillingEntity.test.ts` |
| Added | `.jostraca/generated/ts/test/entity/crawl/CrawlDirect.test.ts` |
| Added | `.jostraca/generated/ts/test/entity/crawl/CrawlEntity.test.ts` |
| Added | `.jostraca/generated/ts/test/entity/crawl_errors_response_obj/CrawlErrorsResponseObjDirect.test.ts` |
| Added | `.jostraca/generated/ts/test/entity/crawl_errors_response_obj/CrawlErrorsResponseObjEntity.test.ts` |
| Added | `.jostraca/generated/ts/test/entity/crawling/CrawlingDirect.test.ts` |
| Added | `.jostraca/generated/ts/test/entity/crawling/CrawlingEntity.test.ts` |
| Added | `.jostraca/generated/ts/test/entity/extract/ExtractDirect.test.ts` |
| Added | `.jostraca/generated/ts/test/entity/extract/ExtractEntity.test.ts` |
| Added | `.jostraca/generated/ts/test/entity/map/MapEntity.test.ts` |
| Added | `.jostraca/generated/ts/test/entity/scrape/ScrapeEntity.test.ts` |
| Added | `.jostraca/generated/ts/test/entity/scraping/ScrapingEntity.test.ts` |
| Added | `.jostraca/generated/ts/test/entity/search/SearchEntity.test.ts` |
| Added | `.jostraca/generated/ts/test/exists.test.ts` |
| Added | `.jostraca/generated/ts/test/feature.test.ts` |
| Added | `.jostraca/generated/ts/test/feature/Corpus.test.ts` |
| Added | `.jostraca/generated/ts/test/feature/harness.ts` |
| Added | `.jostraca/generated/ts/test/live-contract.ts` |
| Added | `.jostraca/generated/ts/test/live-entity.ts` |
| Added | `.jostraca/generated/ts/test/live-runner.ts` |
| Added | `.jostraca/generated/ts/test/live-scenarios.ts` |
| Added | `.jostraca/generated/ts/test/netsim.test.ts` |
| Added | `.jostraca/generated/ts/test/omni.test.ts` |
| Added | `.jostraca/generated/ts/test/omni.ts` |
| Added | `.jostraca/generated/ts/test/pipeline.test.ts` |
| Added | `.jostraca/generated/ts/test/README.md` |
| Added | `.jostraca/generated/ts/test/readme_examples.test.ts` |
| Added | `.jostraca/generated/ts/test/ReadmeExample.test.ts` |
| Added | `.jostraca/generated/ts/test/sdk-test-control.json` |
| Added | `.jostraca/generated/ts/test/tsconfig.json` |
| Added | `.jostraca/generated/ts/test/utility.ts` |
| Added | `.jostraca/generated/ts/test/utility/Corpus.test.ts` |
| Added | `.jostraca/generated/ts/test/utility/Custom.test.ts` |
| Added | `.jostraca/generated/ts/test/utility/index.ts` |
| Added | `.jostraca/generated/ts/test/utility/PrimaryUtility.test.ts` |
| Added | `.jostraca/generated/ts/test/utility/StructUtility.test.ts` |
| Added | `.jostraca/generated/ts/test/vendor/omni/index.ts` |
| Added | `.jostraca/generated/ts/test/vendor/omni/Runner.ts` |
| Added | `.jostraca/generated/ts/test/vendor/omni/Util.ts` |
| Added | `.sdk/.jostraca/.gitignore` |
| Added | `.sdk/.jostraca/generated/model/feature/feature-index.aontu` |
| Added | `.sdk/.jostraca/generated/model/feature/test.aontu` |
| Added | `.sdk/.jostraca/generated/model/target/target-index.aontu` |
| Added | `.sdk/.jostraca/generated/model/target/ts.aontu` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/Config_ts.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/Entity_ts.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/EntityBase_ts.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/EntityOperation_ts.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/EntityTypes_ts.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/fragment/Config.data.fragment.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/fragment/Config.fragment.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/fragment/Direct.test.fragment.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/fragment/Entity.fragment.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/fragment/Entity.test.fragment.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/fragment/EntityBase.fragment.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/fragment/EntityCreateOp.fragment.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/fragment/EntityListOp.fragment.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/fragment/EntityLoadOp.fragment.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/fragment/EntityRemoveOp.fragment.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/fragment/EntityUpdateOp.fragment.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/fragment/Main.fragment.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/fragment/MainStation.fragment.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/fragment/SdkError.fragment.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/Gitignore_ts.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/Main_ts.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/MainEntity_ts.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/Package_ts.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/PrepareAuth_ts.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/ReadmeEntity_ts.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/ReadmeExamplesTest_ts.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/ReadmeExampleTest_ts.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/ReadmeExplanation_ts.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/ReadmeHowto_ts.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/ReadmeInstall_ts.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/ReadmeIntro_ts.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/ReadmeModel_ts.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/ReadmeOptions_ts.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/ReadmeQuick_ts.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/ReadmeRef_ts.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/ReadmeTopHowto_ts.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/ReadmeTopQuick_ts.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/ReadmeTopTest_ts.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/Schema_ts.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/SdkError_ts.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/Test_ts.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/TestDefinition_ts.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/TestDirect_ts.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/TestEntity_ts.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/TestLive_ts.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/TestMain_ts.ts` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/tsconfig.json` |
| Added | `.sdk/.jostraca/generated/src/cmp/ts/utility_ts.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/LICENSE` |
| Added | `.sdk/.jostraca/generated/tm/ts/Makefile` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/Context.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/Control.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/feature/base/BaseFeature.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/feature/README.md` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/feature/test/TestFeature.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/Operation.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/Point.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/README.md` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/Response.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/Result.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/Spec.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/tsconfig.json` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/types.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/utility/CleanUtility.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/utility/DoneUtility.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/utility/FeatureAddUtility.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/utility/FeatureHookUtility.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/utility/FeatureInitUtility.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/utility/FetcherUtility.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/utility/GraphqlUtility.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/utility/MakeContextUtility.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/utility/MakeErrorUtility.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/utility/MakeFetchDefUtility.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/utility/MakeOptionsUtility.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/utility/MakePointUtility.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/utility/MakeRequestUtility.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/utility/MakeResponseUtility.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/utility/MakeResultUtility.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/utility/MakeSpecUtility.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/utility/MakeUrlUtility.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/utility/ParamUtility.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/utility/PrepareBodyUtility.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/utility/PrepareHeadersUtility.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/utility/PrepareMethodUtility.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/utility/PrepareParamsUtility.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/utility/PreparePathUtility.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/utility/PrepareQueryUtility.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/utility/README.md` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/utility/ResultBasicUtility.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/utility/ResultBodyUtility.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/utility/ResultHeadersUtility.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/utility/StructUtility.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/utility/TransformRequestUtility.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/utility/TransformResponseUtility.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/src/utility/Utility.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/test/definition-runner.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/test/exists.test.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/test/feature.test.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/test/feature/Corpus.test.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/test/feature/harness.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/test/live-contract.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/test/live-entity.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/test/live-runner.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/test/live-scenarios.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/test/netsim.test.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/test/omni.test.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/test/omni.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/test/pipeline.test.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/test/README.md` |
| Added | `.sdk/.jostraca/generated/tm/ts/test/sdk-test-control.json` |
| Added | `.sdk/.jostraca/generated/tm/ts/test/tsconfig.json` |
| Added | `.sdk/.jostraca/generated/tm/ts/test/utility.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/test/utility/Corpus.test.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/test/utility/Custom.test.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/test/utility/index.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/test/utility/PrimaryUtility.test.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/test/utility/StructUtility.test.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/test/vendor/omni/index.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/test/vendor/omni/Runner.ts` |
| Added | `.sdk/.jostraca/generated/tm/ts/test/vendor/omni/Util.ts` |
| Added | `.sdk/.jostraca/jostraca.meta.log` |
| Added | `.sdk/admin/setup-npm-trust.sh` |
| Added | `.sdk/dist/cmp/ts/Config_ts.d.ts` |
| Added | `.sdk/dist/cmp/ts/Config_ts.js` |
| Added | `.sdk/dist/cmp/ts/Config_ts.js.map` |
| Added | `.sdk/dist/cmp/ts/Entity_ts.d.ts` |
| Added | `.sdk/dist/cmp/ts/Entity_ts.js` |
| Added | `.sdk/dist/cmp/ts/Entity_ts.js.map` |
| Added | `.sdk/dist/cmp/ts/EntityBase_ts.d.ts` |
| Added | `.sdk/dist/cmp/ts/EntityBase_ts.js` |
| Added | `.sdk/dist/cmp/ts/EntityBase_ts.js.map` |
| Added | `.sdk/dist/cmp/ts/EntityOperation_ts.d.ts` |
| Added | `.sdk/dist/cmp/ts/EntityOperation_ts.js` |
| Added | `.sdk/dist/cmp/ts/EntityOperation_ts.js.map` |
| Added | `.sdk/dist/cmp/ts/EntityTypes_ts.d.ts` |
| Added | `.sdk/dist/cmp/ts/EntityTypes_ts.js` |
| Added | `.sdk/dist/cmp/ts/EntityTypes_ts.js.map` |
| Added | `.sdk/dist/cmp/ts/Gitignore_ts.d.ts` |
| Added | `.sdk/dist/cmp/ts/Gitignore_ts.js` |
| Added | `.sdk/dist/cmp/ts/Gitignore_ts.js.map` |
| Added | `.sdk/dist/cmp/ts/Main_ts.d.ts` |
| Added | `.sdk/dist/cmp/ts/Main_ts.js` |
| Added | `.sdk/dist/cmp/ts/Main_ts.js.map` |
| Added | `.sdk/dist/cmp/ts/MainEntity_ts.d.ts` |
| Added | `.sdk/dist/cmp/ts/MainEntity_ts.js` |
| Added | `.sdk/dist/cmp/ts/MainEntity_ts.js.map` |
| Added | `.sdk/dist/cmp/ts/Package_ts.d.ts` |
| Added | `.sdk/dist/cmp/ts/Package_ts.js` |
| Added | `.sdk/dist/cmp/ts/Package_ts.js.map` |
| Added | `.sdk/dist/cmp/ts/PrepareAuth_ts.d.ts` |
| Added | `.sdk/dist/cmp/ts/PrepareAuth_ts.js` |
| Added | `.sdk/dist/cmp/ts/PrepareAuth_ts.js.map` |
| Added | `.sdk/dist/cmp/ts/ReadmeEntity_ts.d.ts` |
| Added | `.sdk/dist/cmp/ts/ReadmeEntity_ts.js` |
| Added | `.sdk/dist/cmp/ts/ReadmeEntity_ts.js.map` |
| Added | `.sdk/dist/cmp/ts/ReadmeExamplesTest_ts.d.ts` |
| Added | `.sdk/dist/cmp/ts/ReadmeExamplesTest_ts.js` |
| Added | `.sdk/dist/cmp/ts/ReadmeExamplesTest_ts.js.map` |
| Added | `.sdk/dist/cmp/ts/ReadmeExampleTest_ts.d.ts` |
| Added | `.sdk/dist/cmp/ts/ReadmeExampleTest_ts.js` |
| Added | `.sdk/dist/cmp/ts/ReadmeExampleTest_ts.js.map` |
| Added | `.sdk/dist/cmp/ts/ReadmeExplanation_ts.d.ts` |
| Added | `.sdk/dist/cmp/ts/ReadmeExplanation_ts.js` |
| Added | `.sdk/dist/cmp/ts/ReadmeExplanation_ts.js.map` |
| Added | `.sdk/dist/cmp/ts/ReadmeHowto_ts.d.ts` |
| Added | `.sdk/dist/cmp/ts/ReadmeHowto_ts.js` |
| Added | `.sdk/dist/cmp/ts/ReadmeHowto_ts.js.map` |
| Added | `.sdk/dist/cmp/ts/ReadmeInstall_ts.d.ts` |
| Added | `.sdk/dist/cmp/ts/ReadmeInstall_ts.js` |
| Added | `.sdk/dist/cmp/ts/ReadmeInstall_ts.js.map` |
| Added | `.sdk/dist/cmp/ts/ReadmeIntro_ts.d.ts` |
| Added | `.sdk/dist/cmp/ts/ReadmeIntro_ts.js` |
| Added | `.sdk/dist/cmp/ts/ReadmeIntro_ts.js.map` |
| Added | `.sdk/dist/cmp/ts/ReadmeModel_ts.d.ts` |
| Added | `.sdk/dist/cmp/ts/ReadmeModel_ts.js` |
| Added | `.sdk/dist/cmp/ts/ReadmeModel_ts.js.map` |
| Added | `.sdk/dist/cmp/ts/ReadmeOptions_ts.d.ts` |
| Added | `.sdk/dist/cmp/ts/ReadmeOptions_ts.js` |
| Added | `.sdk/dist/cmp/ts/ReadmeOptions_ts.js.map` |
| Added | `.sdk/dist/cmp/ts/ReadmeQuick_ts.d.ts` |
| Added | `.sdk/dist/cmp/ts/ReadmeQuick_ts.js` |
| Added | `.sdk/dist/cmp/ts/ReadmeQuick_ts.js.map` |
| Added | `.sdk/dist/cmp/ts/ReadmeRef_ts.d.ts` |
| Added | `.sdk/dist/cmp/ts/ReadmeRef_ts.js` |
| Added | `.sdk/dist/cmp/ts/ReadmeRef_ts.js.map` |
| Added | `.sdk/dist/cmp/ts/ReadmeTopHowto_ts.d.ts` |
| Added | `.sdk/dist/cmp/ts/ReadmeTopHowto_ts.js` |
| Added | `.sdk/dist/cmp/ts/ReadmeTopHowto_ts.js.map` |
| Added | `.sdk/dist/cmp/ts/ReadmeTopQuick_ts.d.ts` |
| Added | `.sdk/dist/cmp/ts/ReadmeTopQuick_ts.js` |
| Added | `.sdk/dist/cmp/ts/ReadmeTopQuick_ts.js.map` |
| Added | `.sdk/dist/cmp/ts/ReadmeTopTest_ts.d.ts` |
| Added | `.sdk/dist/cmp/ts/ReadmeTopTest_ts.js` |
| Added | `.sdk/dist/cmp/ts/ReadmeTopTest_ts.js.map` |
| Added | `.sdk/dist/cmp/ts/Schema_ts.d.ts` |
| Added | `.sdk/dist/cmp/ts/Schema_ts.js` |
| Added | `.sdk/dist/cmp/ts/Schema_ts.js.map` |
| Added | `.sdk/dist/cmp/ts/SdkError_ts.d.ts` |
| Added | `.sdk/dist/cmp/ts/SdkError_ts.js` |
| Added | `.sdk/dist/cmp/ts/SdkError_ts.js.map` |
| Added | `.sdk/dist/cmp/ts/Test_ts.d.ts` |
| Added | `.sdk/dist/cmp/ts/Test_ts.js` |
| Added | `.sdk/dist/cmp/ts/Test_ts.js.map` |
| Added | `.sdk/dist/cmp/ts/TestDefinition_ts.d.ts` |
| Added | `.sdk/dist/cmp/ts/TestDefinition_ts.js` |
| Added | `.sdk/dist/cmp/ts/TestDefinition_ts.js.map` |
| Added | `.sdk/dist/cmp/ts/TestDirect_ts.d.ts` |
| Added | `.sdk/dist/cmp/ts/TestDirect_ts.js` |
| Added | `.sdk/dist/cmp/ts/TestDirect_ts.js.map` |
| Added | `.sdk/dist/cmp/ts/TestEntity_ts.d.ts` |
| Added | `.sdk/dist/cmp/ts/TestEntity_ts.js` |
| Added | `.sdk/dist/cmp/ts/TestEntity_ts.js.map` |
| Added | `.sdk/dist/cmp/ts/TestLive_ts.d.ts` |
| Added | `.sdk/dist/cmp/ts/TestLive_ts.js` |
| Added | `.sdk/dist/cmp/ts/TestLive_ts.js.map` |
| Added | `.sdk/dist/cmp/ts/TestMain_ts.d.ts` |
| Added | `.sdk/dist/cmp/ts/TestMain_ts.js` |
| Added | `.sdk/dist/cmp/ts/TestMain_ts.js.map` |
| Added | `.sdk/dist/cmp/ts/utility_ts.d.ts` |
| Added | `.sdk/dist/cmp/ts/utility_ts.js` |
| Added | `.sdk/dist/cmp/ts/utility_ts.js.map` |
| Added | `.sdk/doc/generated.json` |
| Added | `.sdk/doc/qa/pages-job.yml` |
| Added | `.sdk/doc/qa/STYLE-GUIDE.md` |
| Added | `.sdk/doc/qa/styles/config/vocabularies/Docgen/accept.txt` |
| Added | `.sdk/doc/qa/styles/config/vocabularies/Docgen/reject.txt` |
| Added | `.sdk/doc/qa/styles/Docgen/WordChoice.yml` |
| Added | `.sdk/doc/qa/vale.ini` |
| Added | `.sdk/doc/qa/workflow.yml` |
| Added | `.sdk/doc/qa-manifest.json` |
| Added | `.sdk/model/.jostraca/.gitignore` |
| Added | `.sdk/model/.jostraca/generated/api/api-info.aontu` |
| Added | `.sdk/model/.jostraca/generated/api/firecrawl-api-info.aontu` |
| Added | `.sdk/model/.jostraca/generated/entity/batch_scrape_status_response_obj.aontu` |
| Added | `.sdk/model/.jostraca/generated/entity/billing.aontu` |
| Added | `.sdk/model/.jostraca/generated/entity/crawl.aontu` |
| Added | `.sdk/model/.jostraca/generated/entity/crawl_errors_response_obj.aontu` |
| Added | `.sdk/model/.jostraca/generated/entity/crawling.aontu` |
| Added | `.sdk/model/.jostraca/generated/entity/entity-index.aontu` |
| Added | `.sdk/model/.jostraca/generated/entity/extract.aontu` |
| Added | `.sdk/model/.jostraca/generated/entity/firecrawl-batch_scrape_status_response_obj.aontu` |
| Added | `.sdk/model/.jostraca/generated/entity/firecrawl-billing.aontu` |
| Added | `.sdk/model/.jostraca/generated/entity/firecrawl-crawl.aontu` |
| Added | `.sdk/model/.jostraca/generated/entity/firecrawl-crawl_errors_response_obj.aontu` |
| Added | `.sdk/model/.jostraca/generated/entity/firecrawl-crawling.aontu` |
| Added | `.sdk/model/.jostraca/generated/entity/firecrawl-entity-index.aontu` |
| Added | `.sdk/model/.jostraca/generated/entity/firecrawl-extract.aontu` |
| Added | `.sdk/model/.jostraca/generated/entity/firecrawl-map.aontu` |
| Added | `.sdk/model/.jostraca/generated/entity/firecrawl-scrape.aontu` |
| Added | `.sdk/model/.jostraca/generated/entity/firecrawl-scraping.aontu` |
| Added | `.sdk/model/.jostraca/generated/entity/firecrawl-search.aontu` |
| Added | `.sdk/model/.jostraca/generated/entity/map.aontu` |
| Added | `.sdk/model/.jostraca/generated/entity/scrape.aontu` |
| Added | `.sdk/model/.jostraca/generated/entity/scraping.aontu` |
| Added | `.sdk/model/.jostraca/generated/entity/search.aontu` |
| Added | `.sdk/model/.jostraca/generated/flow/BasicBatchScrapeStatusResponseObjFlow.aontu` |
| Added | `.sdk/model/.jostraca/generated/flow/BasicBillingFlow.aontu` |
| Added | `.sdk/model/.jostraca/generated/flow/BasicCrawlErrorsResponseObjFlow.aontu` |
| Added | `.sdk/model/.jostraca/generated/flow/BasicCrawlFlow.aontu` |
| Added | `.sdk/model/.jostraca/generated/flow/BasicCrawlingFlow.aontu` |
| Added | `.sdk/model/.jostraca/generated/flow/BasicExtractFlow.aontu` |
| Added | `.sdk/model/.jostraca/generated/flow/BasicMapFlow.aontu` |
| Added | `.sdk/model/.jostraca/generated/flow/BasicScrapeFlow.aontu` |
| Added | `.sdk/model/.jostraca/generated/flow/BasicScrapingFlow.aontu` |
| Added | `.sdk/model/.jostraca/generated/flow/BasicSearchFlow.aontu` |
| Added | `.sdk/model/.jostraca/generated/flow/firecrawl-BasicBatchScrapeStatusResponseObjFlow.aontu` |
| Added | `.sdk/model/.jostraca/generated/flow/firecrawl-BasicBillingFlow.aontu` |
| Added | `.sdk/model/.jostraca/generated/flow/firecrawl-BasicCrawlErrorsResponseObjFlow.aontu` |
| Added | `.sdk/model/.jostraca/generated/flow/firecrawl-BasicCrawlFlow.aontu` |
| Added | `.sdk/model/.jostraca/generated/flow/firecrawl-BasicCrawlingFlow.aontu` |
| Added | `.sdk/model/.jostraca/generated/flow/firecrawl-BasicExtractFlow.aontu` |
| Added | `.sdk/model/.jostraca/generated/flow/firecrawl-BasicMapFlow.aontu` |
| Added | `.sdk/model/.jostraca/generated/flow/firecrawl-BasicScrapeFlow.aontu` |
| Added | `.sdk/model/.jostraca/generated/flow/firecrawl-BasicScrapingFlow.aontu` |
| Added | `.sdk/model/.jostraca/generated/flow/firecrawl-BasicSearchFlow.aontu` |
| Added | `.sdk/model/.jostraca/generated/flow/firecrawl-flow-index.aontu` |
| Added | `.sdk/model/.jostraca/generated/flow/flow-index.aontu` |
| Added | `.sdk/model/.jostraca/jostraca.meta.log` |
| Added | `.sdk/model/api/firecrawl-api-info.aontu` |
| Added | `.sdk/model/entity/batch_scrape_status_response_obj.aontu` |
| Added | `.sdk/model/entity/billing.aontu` |
| Added | `.sdk/model/entity/crawl.aontu` |
| Added | `.sdk/model/entity/crawl_errors_response_obj.aontu` |
| Added | `.sdk/model/entity/crawling.aontu` |
| Added | `.sdk/model/entity/extract.aontu` |
| Added | `.sdk/model/entity/firecrawl-entity-index.aontu` |
| Added | `.sdk/model/entity/map.aontu` |
| Added | `.sdk/model/entity/scrape.aontu` |
| Added | `.sdk/model/entity/scraping.aontu` |
| Added | `.sdk/model/entity/search.aontu` |
| Added | `.sdk/model/feature/test.aontu` |
| Added | `.sdk/model/flow/BasicBatchScrapeStatusResponseObjFlow.aontu` |
| Added | `.sdk/model/flow/BasicBillingFlow.aontu` |
| Added | `.sdk/model/flow/BasicCrawlErrorsResponseObjFlow.aontu` |
| Added | `.sdk/model/flow/BasicCrawlFlow.aontu` |
| Added | `.sdk/model/flow/BasicCrawlingFlow.aontu` |
| Added | `.sdk/model/flow/BasicExtractFlow.aontu` |
| Added | `.sdk/model/flow/BasicMapFlow.aontu` |
| Added | `.sdk/model/flow/BasicScrapeFlow.aontu` |
| Added | `.sdk/model/flow/BasicScrapingFlow.aontu` |
| Added | `.sdk/model/flow/BasicSearchFlow.aontu` |
| Added | `.sdk/model/flow/firecrawl-BasicBatchScrapeStatusResponseObjFlow.aontu` |
| Added | `.sdk/model/flow/firecrawl-BasicBillingFlow.aontu` |
| Added | `.sdk/model/flow/firecrawl-BasicCrawlErrorsResponseObjFlow.aontu` |
| Added | `.sdk/model/flow/firecrawl-BasicCrawlFlow.aontu` |
| Added | `.sdk/model/flow/firecrawl-BasicCrawlingFlow.aontu` |
| Added | `.sdk/model/flow/firecrawl-BasicExtractFlow.aontu` |
| Added | `.sdk/model/flow/firecrawl-BasicMapFlow.aontu` |
| Added | `.sdk/model/flow/firecrawl-BasicScrapeFlow.aontu` |
| Added | `.sdk/model/flow/firecrawl-BasicScrapingFlow.aontu` |
| Added | `.sdk/model/flow/firecrawl-BasicSearchFlow.aontu` |
| Added | `.sdk/model/flow/firecrawl-flow-index.aontu` |
| Added | `.sdk/model/guide/base-guide.aontu` |
| Added | `.sdk/model/sdk.json` |
| Added | `.sdk/model/target/ts.aontu` |
| Added | `.sdk/PUBLISHING.md` |
| Added | `.sdk/src/cmp/ts/Config_ts.ts` |
| Added | `.sdk/src/cmp/ts/Entity_ts.ts` |
| Added | `.sdk/src/cmp/ts/EntityBase_ts.ts` |
| Added | `.sdk/src/cmp/ts/EntityOperation_ts.ts` |
| Added | `.sdk/src/cmp/ts/EntityTypes_ts.ts` |
| Added | `.sdk/src/cmp/ts/fragment/Config.data.fragment.ts` |
| Added | `.sdk/src/cmp/ts/fragment/Config.fragment.ts` |
| Added | `.sdk/src/cmp/ts/fragment/Direct.test.fragment.ts` |
| Added | `.sdk/src/cmp/ts/fragment/Entity.fragment.ts` |
| Added | `.sdk/src/cmp/ts/fragment/Entity.test.fragment.ts` |
| Added | `.sdk/src/cmp/ts/fragment/EntityBase.fragment.ts` |
| Added | `.sdk/src/cmp/ts/fragment/EntityCreateOp.fragment.ts` |
| Added | `.sdk/src/cmp/ts/fragment/EntityListOp.fragment.ts` |
| Added | `.sdk/src/cmp/ts/fragment/EntityLoadOp.fragment.ts` |
| Added | `.sdk/src/cmp/ts/fragment/EntityRemoveOp.fragment.ts` |
| Added | `.sdk/src/cmp/ts/fragment/EntityUpdateOp.fragment.ts` |
| Added | `.sdk/src/cmp/ts/fragment/Main.fragment.ts` |
| Added | `.sdk/src/cmp/ts/fragment/MainStation.fragment.ts` |
| Added | `.sdk/src/cmp/ts/fragment/SdkError.fragment.ts` |
| Added | `.sdk/src/cmp/ts/Gitignore_ts.ts` |
| Added | `.sdk/src/cmp/ts/Main_ts.ts` |
| Added | `.sdk/src/cmp/ts/MainEntity_ts.ts` |
| Added | `.sdk/src/cmp/ts/Package_ts.ts` |
| Added | `.sdk/src/cmp/ts/PrepareAuth_ts.ts` |
| Added | `.sdk/src/cmp/ts/ReadmeEntity_ts.ts` |
| Added | `.sdk/src/cmp/ts/ReadmeExamplesTest_ts.ts` |
| Added | `.sdk/src/cmp/ts/ReadmeExampleTest_ts.ts` |
| Added | `.sdk/src/cmp/ts/ReadmeExplanation_ts.ts` |
| Added | `.sdk/src/cmp/ts/ReadmeHowto_ts.ts` |
| Added | `.sdk/src/cmp/ts/ReadmeInstall_ts.ts` |
| Added | `.sdk/src/cmp/ts/ReadmeIntro_ts.ts` |
| Added | `.sdk/src/cmp/ts/ReadmeModel_ts.ts` |
| Added | `.sdk/src/cmp/ts/ReadmeOptions_ts.ts` |
| Added | `.sdk/src/cmp/ts/ReadmeQuick_ts.ts` |
| Added | `.sdk/src/cmp/ts/ReadmeRef_ts.ts` |
| Added | `.sdk/src/cmp/ts/ReadmeTopHowto_ts.ts` |
| Added | `.sdk/src/cmp/ts/ReadmeTopQuick_ts.ts` |
| Added | `.sdk/src/cmp/ts/ReadmeTopTest_ts.ts` |
| Added | `.sdk/src/cmp/ts/Schema_ts.ts` |
| Added | `.sdk/src/cmp/ts/SdkError_ts.ts` |
| Added | `.sdk/src/cmp/ts/Test_ts.ts` |
| Added | `.sdk/src/cmp/ts/TestDefinition_ts.ts` |
| Added | `.sdk/src/cmp/ts/TestDirect_ts.ts` |
| Added | `.sdk/src/cmp/ts/TestEntity_ts.ts` |
| Added | `.sdk/src/cmp/ts/TestLive_ts.ts` |
| Added | `.sdk/src/cmp/ts/TestMain_ts.ts` |
| Added | `.sdk/src/cmp/ts/tsconfig.json` |
| Added | `.sdk/src/cmp/ts/utility_ts.ts` |
| Added | `.sdk/test/entity/batch_scrape_status_response_obj/BatchScrapeStatusResponseObjTestData.json` |
| Added | `.sdk/test/entity/billing/BillingTestData.json` |
| Added | `.sdk/test/entity/crawl/CrawlTestData.json` |
| Added | `.sdk/test/entity/crawl_errors_response_obj/CrawlErrorsResponseObjTestData.json` |
| Added | `.sdk/test/entity/crawling/CrawlingTestData.json` |
| Added | `.sdk/test/entity/extract/ExtractTestData.json` |
| Added | `.sdk/test/entity/map/MapTestData.json` |
| Added | `.sdk/test/entity/scrape/ScrapeTestData.json` |
| Added | `.sdk/test/entity/scraping/ScrapingTestData.json` |
| Added | `.sdk/test/entity/search/SearchTestData.json` |
| Added | `.sdk/tm/ts/LICENSE` |
| Added | `.sdk/tm/ts/Makefile` |
| Added | `.sdk/tm/ts/src/Context.ts` |
| Added | `.sdk/tm/ts/src/Control.ts` |
| Added | `.sdk/tm/ts/src/feature/base/BaseFeature.ts` |
| Added | `.sdk/tm/ts/src/feature/README.md` |
| Added | `.sdk/tm/ts/src/feature/test/TestFeature.ts` |
| Added | `.sdk/tm/ts/src/Operation.ts` |
| Added | `.sdk/tm/ts/src/Point.ts` |
| Added | `.sdk/tm/ts/src/README.md` |
| Added | `.sdk/tm/ts/src/Response.ts` |
| Added | `.sdk/tm/ts/src/Result.ts` |
| Added | `.sdk/tm/ts/src/Spec.ts` |
| Added | `.sdk/tm/ts/src/tsconfig.json` |
| Added | `.sdk/tm/ts/src/types.ts` |
| Added | `.sdk/tm/ts/src/utility/CleanUtility.ts` |
| Added | `.sdk/tm/ts/src/utility/DoneUtility.ts` |
| Added | `.sdk/tm/ts/src/utility/FeatureAddUtility.ts` |
| Added | `.sdk/tm/ts/src/utility/FeatureHookUtility.ts` |
| Added | `.sdk/tm/ts/src/utility/FeatureInitUtility.ts` |
| Added | `.sdk/tm/ts/src/utility/FetcherUtility.ts` |
| Added | `.sdk/tm/ts/src/utility/GraphqlUtility.ts` |
| Added | `.sdk/tm/ts/src/utility/MakeContextUtility.ts` |
| Added | `.sdk/tm/ts/src/utility/MakeErrorUtility.ts` |
| Added | `.sdk/tm/ts/src/utility/MakeFetchDefUtility.ts` |
| Added | `.sdk/tm/ts/src/utility/MakeOptionsUtility.ts` |
| Added | `.sdk/tm/ts/src/utility/MakePointUtility.ts` |
| Added | `.sdk/tm/ts/src/utility/MakeRequestUtility.ts` |
| Added | `.sdk/tm/ts/src/utility/MakeResponseUtility.ts` |
| Added | `.sdk/tm/ts/src/utility/MakeResultUtility.ts` |
| Added | `.sdk/tm/ts/src/utility/MakeSpecUtility.ts` |
| Added | `.sdk/tm/ts/src/utility/MakeUrlUtility.ts` |
| Added | `.sdk/tm/ts/src/utility/ParamUtility.ts` |
| Added | `.sdk/tm/ts/src/utility/PrepareBodyUtility.ts` |
| Added | `.sdk/tm/ts/src/utility/PrepareHeadersUtility.ts` |
| Added | `.sdk/tm/ts/src/utility/PrepareMethodUtility.ts` |
| Added | `.sdk/tm/ts/src/utility/PrepareParamsUtility.ts` |
| Added | `.sdk/tm/ts/src/utility/PreparePathUtility.ts` |
| Added | `.sdk/tm/ts/src/utility/PrepareQueryUtility.ts` |
| Added | `.sdk/tm/ts/src/utility/README.md` |
| Added | `.sdk/tm/ts/src/utility/ResultBasicUtility.ts` |
| Added | `.sdk/tm/ts/src/utility/ResultBodyUtility.ts` |
| Added | `.sdk/tm/ts/src/utility/ResultHeadersUtility.ts` |
| Added | `.sdk/tm/ts/src/utility/StructUtility.ts` |
| Added | `.sdk/tm/ts/src/utility/TransformRequestUtility.ts` |
| Added | `.sdk/tm/ts/src/utility/TransformResponseUtility.ts` |
| Added | `.sdk/tm/ts/src/utility/Utility.ts` |
| Added | `.sdk/tm/ts/test/definition-runner.ts` |
| Added | `.sdk/tm/ts/test/exists.test.ts` |
| Added | `.sdk/tm/ts/test/feature.test.ts` |
| Added | `.sdk/tm/ts/test/feature/Corpus.test.ts` |
| Added | `.sdk/tm/ts/test/feature/harness.ts` |
| Added | `.sdk/tm/ts/test/live-contract.ts` |
| Added | `.sdk/tm/ts/test/live-entity.ts` |
| Added | `.sdk/tm/ts/test/live-runner.ts` |
| Added | `.sdk/tm/ts/test/live-scenarios.ts` |
| Added | `.sdk/tm/ts/test/netsim.test.ts` |
| Added | `.sdk/tm/ts/test/omni.test.ts` |
| Added | `.sdk/tm/ts/test/omni.ts` |
| Added | `.sdk/tm/ts/test/pipeline.test.ts` |
| Added | `.sdk/tm/ts/test/README.md` |
| Added | `.sdk/tm/ts/test/sdk-test-control.json` |
| Added | `.sdk/tm/ts/test/tsconfig.json` |
| Added | `.sdk/tm/ts/test/utility.ts` |
| Added | `.sdk/tm/ts/test/utility/Corpus.test.ts` |
| Added | `.sdk/tm/ts/test/utility/Custom.test.ts` |
| Added | `.sdk/tm/ts/test/utility/index.ts` |
| Added | `.sdk/tm/ts/test/utility/PrimaryUtility.test.ts` |
| Added | `.sdk/tm/ts/test/utility/StructUtility.test.ts` |
| Added | `.sdk/tm/ts/test/vendor/omni/index.ts` |
| Added | `.sdk/tm/ts/test/vendor/omni/Runner.ts` |
| Added | `.sdk/tm/ts/test/vendor/omni/Util.ts` |
| Added | `AGENTS.md` |
| Added | `CHANGELOG.md` |
| Added | `CLAUDE.md` |
| Added | `LICENSE` |
| Added | `Makefile` |
| Added | `NOTICE` |
| Added | `README.md` |
| Added | `SECURITY.md` |
| Added | `SUMMARY.md` |
| Added | `ts/.gitignore` |
| Added | `ts/AGENTS.md` |
| Added | `ts/CLAUDE.md` |
| Added | `ts/dist/Config.d.ts` |
| Added | `ts/dist/Config.js` |
| Added | `ts/dist/Config.js.map` |
| Added | `ts/dist/Context.d.ts` |
| Added | `ts/dist/Context.js` |
| Added | `ts/dist/Context.js.map` |
| Added | `ts/dist/Control.d.ts` |
| Added | `ts/dist/Control.js` |
| Added | `ts/dist/Control.js.map` |
| Added | `ts/dist/entity/BatchScrapeStatusResponseObjEntity.d.ts` |
| Added | `ts/dist/entity/BatchScrapeStatusResponseObjEntity.js` |
| Added | `ts/dist/entity/BatchScrapeStatusResponseObjEntity.js.map` |
| Added | `ts/dist/entity/BillingEntity.d.ts` |
| Added | `ts/dist/entity/BillingEntity.js` |
| Added | `ts/dist/entity/BillingEntity.js.map` |
| Added | `ts/dist/entity/CrawlEntity.d.ts` |
| Added | `ts/dist/entity/CrawlEntity.js` |
| Added | `ts/dist/entity/CrawlEntity.js.map` |
| Added | `ts/dist/entity/CrawlErrorsResponseObjEntity.d.ts` |
| Added | `ts/dist/entity/CrawlErrorsResponseObjEntity.js` |
| Added | `ts/dist/entity/CrawlErrorsResponseObjEntity.js.map` |
| Added | `ts/dist/entity/CrawlingEntity.d.ts` |
| Added | `ts/dist/entity/CrawlingEntity.js` |
| Added | `ts/dist/entity/CrawlingEntity.js.map` |
| Added | `ts/dist/entity/ExtractEntity.d.ts` |
| Added | `ts/dist/entity/ExtractEntity.js` |
| Added | `ts/dist/entity/ExtractEntity.js.map` |
| Added | `ts/dist/entity/MapEntity.d.ts` |
| Added | `ts/dist/entity/MapEntity.js` |
| Added | `ts/dist/entity/MapEntity.js.map` |
| Added | `ts/dist/entity/ScrapeEntity.d.ts` |
| Added | `ts/dist/entity/ScrapeEntity.js` |
| Added | `ts/dist/entity/ScrapeEntity.js.map` |
| Added | `ts/dist/entity/ScrapingEntity.d.ts` |
| Added | `ts/dist/entity/ScrapingEntity.js` |
| Added | `ts/dist/entity/ScrapingEntity.js.map` |
| Added | `ts/dist/entity/SearchEntity.d.ts` |
| Added | `ts/dist/entity/SearchEntity.js` |
| Added | `ts/dist/entity/SearchEntity.js.map` |
| Added | `ts/dist/feature/base/BaseFeature.d.ts` |
| Added | `ts/dist/feature/base/BaseFeature.js` |
| Added | `ts/dist/feature/base/BaseFeature.js.map` |
| Added | `ts/dist/feature/test/TestFeature.d.ts` |
| Added | `ts/dist/feature/test/TestFeature.js` |
| Added | `ts/dist/feature/test/TestFeature.js.map` |
| Added | `ts/dist/FirecrawlEntityBase.d.ts` |
| Added | `ts/dist/FirecrawlEntityBase.js` |
| Added | `ts/dist/FirecrawlEntityBase.js.map` |
| Added | `ts/dist/FirecrawlError.d.ts` |
| Added | `ts/dist/FirecrawlError.js` |
| Added | `ts/dist/FirecrawlError.js.map` |
| Added | `ts/dist/FirecrawlSDK.d.ts` |
| Added | `ts/dist/FirecrawlSDK.js` |
| Added | `ts/dist/FirecrawlSDK.js.map` |
| Added | `ts/dist/FirecrawlTypes.d.ts` |
| Added | `ts/dist/FirecrawlTypes.js` |
| Added | `ts/dist/FirecrawlTypes.js.map` |
| Added | `ts/dist/Operation.d.ts` |
| Added | `ts/dist/Operation.js` |
| Added | `ts/dist/Operation.js.map` |
| Added | `ts/dist/Point.d.ts` |
| Added | `ts/dist/Point.js` |
| Added | `ts/dist/Point.js.map` |
| Added | `ts/dist/Response.d.ts` |
| Added | `ts/dist/Response.js` |
| Added | `ts/dist/Response.js.map` |
| Added | `ts/dist/Result.d.ts` |
| Added | `ts/dist/Result.js` |
| Added | `ts/dist/Result.js.map` |
| Added | `ts/dist/Schema.d.ts` |
| Added | `ts/dist/Schema.js` |
| Added | `ts/dist/Schema.js.map` |
| Added | `ts/dist/Spec.d.ts` |
| Added | `ts/dist/Spec.js` |
| Added | `ts/dist/Spec.js.map` |
| Added | `ts/dist/tsconfig.tsbuildinfo` |
| Added | `ts/dist/types.d.ts` |
| Added | `ts/dist/types.js` |
| Added | `ts/dist/types.js.map` |
| Added | `ts/dist/utility/CleanUtility.d.ts` |
| Added | `ts/dist/utility/CleanUtility.js` |
| Added | `ts/dist/utility/CleanUtility.js.map` |
| Added | `ts/dist/utility/DoneUtility.d.ts` |
| Added | `ts/dist/utility/DoneUtility.js` |
| Added | `ts/dist/utility/DoneUtility.js.map` |
| Added | `ts/dist/utility/FeatureAddUtility.d.ts` |
| Added | `ts/dist/utility/FeatureAddUtility.js` |
| Added | `ts/dist/utility/FeatureAddUtility.js.map` |
| Added | `ts/dist/utility/FeatureHookUtility.d.ts` |
| Added | `ts/dist/utility/FeatureHookUtility.js` |
| Added | `ts/dist/utility/FeatureHookUtility.js.map` |
| Added | `ts/dist/utility/FeatureInitUtility.d.ts` |
| Added | `ts/dist/utility/FeatureInitUtility.js` |
| Added | `ts/dist/utility/FeatureInitUtility.js.map` |
| Added | `ts/dist/utility/FetcherUtility.d.ts` |
| Added | `ts/dist/utility/FetcherUtility.js` |
| Added | `ts/dist/utility/FetcherUtility.js.map` |
| Added | `ts/dist/utility/GraphqlUtility.d.ts` |
| Added | `ts/dist/utility/GraphqlUtility.js` |
| Added | `ts/dist/utility/GraphqlUtility.js.map` |
| Added | `ts/dist/utility/MakeContextUtility.d.ts` |
| Added | `ts/dist/utility/MakeContextUtility.js` |
| Added | `ts/dist/utility/MakeContextUtility.js.map` |
| Added | `ts/dist/utility/MakeErrorUtility.d.ts` |
| Added | `ts/dist/utility/MakeErrorUtility.js` |
| Added | `ts/dist/utility/MakeErrorUtility.js.map` |
| Added | `ts/dist/utility/MakeFetchDefUtility.d.ts` |
| Added | `ts/dist/utility/MakeFetchDefUtility.js` |
| Added | `ts/dist/utility/MakeFetchDefUtility.js.map` |
| Added | `ts/dist/utility/MakeOptionsUtility.d.ts` |
| Added | `ts/dist/utility/MakeOptionsUtility.js` |
| Added | `ts/dist/utility/MakeOptionsUtility.js.map` |
| Added | `ts/dist/utility/MakePointUtility.d.ts` |
| Added | `ts/dist/utility/MakePointUtility.js` |
| Added | `ts/dist/utility/MakePointUtility.js.map` |
| Added | `ts/dist/utility/MakeRequestUtility.d.ts` |
| Added | `ts/dist/utility/MakeRequestUtility.js` |
| Added | `ts/dist/utility/MakeRequestUtility.js.map` |
| Added | `ts/dist/utility/MakeResponseUtility.d.ts` |
| Added | `ts/dist/utility/MakeResponseUtility.js` |
| Added | `ts/dist/utility/MakeResponseUtility.js.map` |
| Added | `ts/dist/utility/MakeResultUtility.d.ts` |
| Added | `ts/dist/utility/MakeResultUtility.js` |
| Added | `ts/dist/utility/MakeResultUtility.js.map` |
| Added | `ts/dist/utility/MakeSpecUtility.d.ts` |
| Added | `ts/dist/utility/MakeSpecUtility.js` |
| Added | `ts/dist/utility/MakeSpecUtility.js.map` |
| Added | `ts/dist/utility/MakeUrlUtility.d.ts` |
| Added | `ts/dist/utility/MakeUrlUtility.js` |
| Added | `ts/dist/utility/MakeUrlUtility.js.map` |
| Added | `ts/dist/utility/ParamUtility.d.ts` |
| Added | `ts/dist/utility/ParamUtility.js` |
| Added | `ts/dist/utility/ParamUtility.js.map` |
| Added | `ts/dist/utility/PrepareAuthUtility.d.ts` |
| Added | `ts/dist/utility/PrepareAuthUtility.js` |
| Added | `ts/dist/utility/PrepareAuthUtility.js.map` |
| Added | `ts/dist/utility/PrepareBodyUtility.d.ts` |
| Added | `ts/dist/utility/PrepareBodyUtility.js` |
| Added | `ts/dist/utility/PrepareBodyUtility.js.map` |
| Added | `ts/dist/utility/PrepareHeadersUtility.d.ts` |
| Added | `ts/dist/utility/PrepareHeadersUtility.js` |
| Added | `ts/dist/utility/PrepareHeadersUtility.js.map` |
| Added | `ts/dist/utility/PrepareMethodUtility.d.ts` |
| Added | `ts/dist/utility/PrepareMethodUtility.js` |
| Added | `ts/dist/utility/PrepareMethodUtility.js.map` |
| Added | `ts/dist/utility/PrepareParamsUtility.d.ts` |
| Added | `ts/dist/utility/PrepareParamsUtility.js` |
| Added | `ts/dist/utility/PrepareParamsUtility.js.map` |
| Added | `ts/dist/utility/PreparePathUtility.d.ts` |
| Added | `ts/dist/utility/PreparePathUtility.js` |
| Added | `ts/dist/utility/PreparePathUtility.js.map` |
| Added | `ts/dist/utility/PrepareQueryUtility.d.ts` |
| Added | `ts/dist/utility/PrepareQueryUtility.js` |
| Added | `ts/dist/utility/PrepareQueryUtility.js.map` |
| Added | `ts/dist/utility/ResultBasicUtility.d.ts` |
| Added | `ts/dist/utility/ResultBasicUtility.js` |
| Added | `ts/dist/utility/ResultBasicUtility.js.map` |
| Added | `ts/dist/utility/ResultBodyUtility.d.ts` |
| Added | `ts/dist/utility/ResultBodyUtility.js` |
| Added | `ts/dist/utility/ResultBodyUtility.js.map` |
| Added | `ts/dist/utility/ResultHeadersUtility.d.ts` |
| Added | `ts/dist/utility/ResultHeadersUtility.js` |
| Added | `ts/dist/utility/ResultHeadersUtility.js.map` |
| Added | `ts/dist/utility/StructUtility.d.ts` |
| Added | `ts/dist/utility/StructUtility.js` |
| Added | `ts/dist/utility/StructUtility.js.map` |
| Added | `ts/dist/utility/TransformRequestUtility.d.ts` |
| Added | `ts/dist/utility/TransformRequestUtility.js` |
| Added | `ts/dist/utility/TransformRequestUtility.js.map` |
| Added | `ts/dist/utility/TransformResponseUtility.d.ts` |
| Added | `ts/dist/utility/TransformResponseUtility.js` |
| Added | `ts/dist/utility/TransformResponseUtility.js.map` |
| Added | `ts/dist/utility/Utility.d.ts` |
| Added | `ts/dist/utility/Utility.js` |
| Added | `ts/dist/utility/Utility.js.map` |
| Added | `ts/dist-test/definition.test.js` |
| Added | `ts/dist-test/definition.test.js.map` |
| Added | `ts/dist-test/definition-runner.js` |
| Added | `ts/dist-test/definition-runner.js.map` |
| Added | `ts/dist-test/entity/batch_scrape_status_response_obj/BatchScrapeStatusResponseObjDirect.test.js` |
| Added | `ts/dist-test/entity/batch_scrape_status_response_obj/BatchScrapeStatusResponseObjDirect.test.js.map` |
| Added | `ts/dist-test/entity/batch_scrape_status_response_obj/BatchScrapeStatusResponseObjEntity.test.js` |
| Added | `ts/dist-test/entity/batch_scrape_status_response_obj/BatchScrapeStatusResponseObjEntity.test.js.map` |
| Added | `ts/dist-test/entity/billing/BillingDirect.test.js` |
| Added | `ts/dist-test/entity/billing/BillingDirect.test.js.map` |
| Added | `ts/dist-test/entity/billing/BillingEntity.test.js` |
| Added | `ts/dist-test/entity/billing/BillingEntity.test.js.map` |
| Added | `ts/dist-test/entity/crawl/CrawlDirect.test.js` |
| Added | `ts/dist-test/entity/crawl/CrawlDirect.test.js.map` |
| Added | `ts/dist-test/entity/crawl/CrawlEntity.test.js` |
| Added | `ts/dist-test/entity/crawl/CrawlEntity.test.js.map` |
| Added | `ts/dist-test/entity/crawl_errors_response_obj/CrawlErrorsResponseObjDirect.test.js` |
| Added | `ts/dist-test/entity/crawl_errors_response_obj/CrawlErrorsResponseObjDirect.test.js.map` |
| Added | `ts/dist-test/entity/crawl_errors_response_obj/CrawlErrorsResponseObjEntity.test.js` |
| Added | `ts/dist-test/entity/crawl_errors_response_obj/CrawlErrorsResponseObjEntity.test.js.map` |
| Added | `ts/dist-test/entity/crawling/CrawlingDirect.test.js` |
| Added | `ts/dist-test/entity/crawling/CrawlingDirect.test.js.map` |
| Added | `ts/dist-test/entity/crawling/CrawlingEntity.test.js` |
| Added | `ts/dist-test/entity/crawling/CrawlingEntity.test.js.map` |
| Added | `ts/dist-test/entity/extract/ExtractDirect.test.js` |
| Added | `ts/dist-test/entity/extract/ExtractDirect.test.js.map` |
| Added | `ts/dist-test/entity/extract/ExtractEntity.test.js` |
| Added | `ts/dist-test/entity/extract/ExtractEntity.test.js.map` |
| Added | `ts/dist-test/entity/map/MapEntity.test.js` |
| Added | `ts/dist-test/entity/map/MapEntity.test.js.map` |
| Added | `ts/dist-test/entity/scrape/ScrapeEntity.test.js` |
| Added | `ts/dist-test/entity/scrape/ScrapeEntity.test.js.map` |
| Added | `ts/dist-test/entity/scraping/ScrapingEntity.test.js` |
| Added | `ts/dist-test/entity/scraping/ScrapingEntity.test.js.map` |
| Added | `ts/dist-test/entity/search/SearchEntity.test.js` |
| Added | `ts/dist-test/entity/search/SearchEntity.test.js.map` |
| Added | `ts/dist-test/exists.test.js` |
| Added | `ts/dist-test/exists.test.js.map` |
| Added | `ts/dist-test/feature.test.js` |
| Added | `ts/dist-test/feature.test.js.map` |
| Added | `ts/dist-test/feature/Corpus.test.js` |
| Added | `ts/dist-test/feature/Corpus.test.js.map` |
| Added | `ts/dist-test/feature/harness.js` |
| Added | `ts/dist-test/feature/harness.js.map` |
| Added | `ts/dist-test/live-contract.js` |
| Added | `ts/dist-test/live-contract.js.map` |
| Added | `ts/dist-test/live-entity.js` |
| Added | `ts/dist-test/live-entity.js.map` |
| Added | `ts/dist-test/live-runner.js` |
| Added | `ts/dist-test/live-runner.js.map` |
| Added | `ts/dist-test/live-scenarios.js` |
| Added | `ts/dist-test/live-scenarios.js.map` |
| Added | `ts/dist-test/netsim.test.js` |
| Added | `ts/dist-test/netsim.test.js.map` |
| Added | `ts/dist-test/omni.js` |
| Added | `ts/dist-test/omni.js.map` |
| Added | `ts/dist-test/omni.test.js` |
| Added | `ts/dist-test/omni.test.js.map` |
| Added | `ts/dist-test/pipeline.test.js` |
| Added | `ts/dist-test/pipeline.test.js.map` |
| Added | `ts/dist-test/readme_examples.test.js` |
| Added | `ts/dist-test/readme_examples.test.js.map` |
| Added | `ts/dist-test/ReadmeExample.test.js` |
| Added | `ts/dist-test/ReadmeExample.test.js.map` |
| Added | `ts/dist-test/tsconfig.tsbuildinfo` |
| Added | `ts/dist-test/utility.js` |
| Added | `ts/dist-test/utility.js.map` |
| Added | `ts/dist-test/utility/Corpus.test.js` |
| Added | `ts/dist-test/utility/Corpus.test.js.map` |
| Added | `ts/dist-test/utility/Custom.test.js` |
| Added | `ts/dist-test/utility/Custom.test.js.map` |
| Added | `ts/dist-test/utility/index.js` |
| Added | `ts/dist-test/utility/index.js.map` |
| Added | `ts/dist-test/utility/PrimaryUtility.test.js` |
| Added | `ts/dist-test/utility/PrimaryUtility.test.js.map` |
| Added | `ts/dist-test/utility/StructUtility.test.js` |
| Added | `ts/dist-test/utility/StructUtility.test.js.map` |
| Added | `ts/dist-test/vendor/omni/index.js` |
| Added | `ts/dist-test/vendor/omni/index.js.map` |
| Added | `ts/dist-test/vendor/omni/Runner.js` |
| Added | `ts/dist-test/vendor/omni/Runner.js.map` |
| Added | `ts/dist-test/vendor/omni/Util.js` |
| Added | `ts/dist-test/vendor/omni/Util.js.map` |
| Added | `ts/LICENSE` |
| Added | `ts/Makefile` |
| Added | `ts/package.json` |
| Added | `ts/package-lock.json` |
| Added | `ts/README.md` |
| Added | `ts/REFERENCE.md` |
| Added | `ts/src/Config.ts` |
| Added | `ts/src/Context.ts` |
| Added | `ts/src/Control.ts` |
| Added | `ts/src/entity/BatchScrapeStatusResponseObjEntity.ts` |
| Added | `ts/src/entity/BillingEntity.ts` |
| Added | `ts/src/entity/CrawlEntity.ts` |
| Added | `ts/src/entity/CrawlErrorsResponseObjEntity.ts` |
| Added | `ts/src/entity/CrawlingEntity.ts` |
| Added | `ts/src/entity/ExtractEntity.ts` |
| Added | `ts/src/entity/MapEntity.ts` |
| Added | `ts/src/entity/ScrapeEntity.ts` |
| Added | `ts/src/entity/ScrapingEntity.ts` |
| Added | `ts/src/entity/SearchEntity.ts` |
| Added | `ts/src/feature/base/BaseFeature.ts` |
| Added | `ts/src/feature/README.md` |
| Added | `ts/src/feature/test/AGENTS.md` |
| Added | `ts/src/feature/test/CLAUDE.md` |
| Added | `ts/src/feature/test/TestFeature.ts` |
| Added | `ts/src/FirecrawlEntityBase.ts` |
| Added | `ts/src/FirecrawlError.ts` |
| Added | `ts/src/FirecrawlSDK.ts` |
| Added | `ts/src/FirecrawlTypes.ts` |
| Added | `ts/src/Operation.ts` |
| Added | `ts/src/Point.ts` |
| Added | `ts/src/README.md` |
| Added | `ts/src/Response.ts` |
| Added | `ts/src/Result.ts` |
| Added | `ts/src/Schema.ts` |
| Added | `ts/src/Spec.ts` |
| Added | `ts/src/tsconfig.json` |
| Added | `ts/src/types.ts` |
| Added | `ts/src/utility/CleanUtility.ts` |
| Added | `ts/src/utility/DoneUtility.ts` |
| Added | `ts/src/utility/FeatureAddUtility.ts` |
| Added | `ts/src/utility/FeatureHookUtility.ts` |
| Added | `ts/src/utility/FeatureInitUtility.ts` |
| Added | `ts/src/utility/FetcherUtility.ts` |
| Added | `ts/src/utility/GraphqlUtility.ts` |
| Added | `ts/src/utility/MakeContextUtility.ts` |
| Added | `ts/src/utility/MakeErrorUtility.ts` |
| Added | `ts/src/utility/MakeFetchDefUtility.ts` |
| Added | `ts/src/utility/MakeOptionsUtility.ts` |
| Added | `ts/src/utility/MakePointUtility.ts` |
| Added | `ts/src/utility/MakeRequestUtility.ts` |
| Added | `ts/src/utility/MakeResponseUtility.ts` |
| Added | `ts/src/utility/MakeResultUtility.ts` |
| Added | `ts/src/utility/MakeSpecUtility.ts` |
| Added | `ts/src/utility/MakeUrlUtility.ts` |
| Added | `ts/src/utility/ParamUtility.ts` |
| Added | `ts/src/utility/PrepareAuthUtility.ts` |
| Added | `ts/src/utility/PrepareBodyUtility.ts` |
| Added | `ts/src/utility/PrepareHeadersUtility.ts` |
| Added | `ts/src/utility/PrepareMethodUtility.ts` |
| Added | `ts/src/utility/PrepareParamsUtility.ts` |
| Added | `ts/src/utility/PreparePathUtility.ts` |
| Added | `ts/src/utility/PrepareQueryUtility.ts` |
| Added | `ts/src/utility/README.md` |
| Added | `ts/src/utility/ResultBasicUtility.ts` |
| Added | `ts/src/utility/ResultBodyUtility.ts` |
| Added | `ts/src/utility/ResultHeadersUtility.ts` |
| Added | `ts/src/utility/StructUtility.ts` |
| Added | `ts/src/utility/TransformRequestUtility.ts` |
| Added | `ts/src/utility/TransformResponseUtility.ts` |
| Added | `ts/src/utility/Utility.ts` |
| Added | `ts/test/definition.test.ts` |
| Added | `ts/test/definition-runner.ts` |
| Added | `ts/test/entity/batch_scrape_status_response_obj/BatchScrapeStatusResponseObjDirect.test.ts` |
| Added | `ts/test/entity/batch_scrape_status_response_obj/BatchScrapeStatusResponseObjEntity.test.ts` |
| Added | `ts/test/entity/billing/BillingDirect.test.ts` |
| Added | `ts/test/entity/billing/BillingEntity.test.ts` |
| Added | `ts/test/entity/crawl/CrawlDirect.test.ts` |
| Added | `ts/test/entity/crawl/CrawlEntity.test.ts` |
| Added | `ts/test/entity/crawl_errors_response_obj/CrawlErrorsResponseObjDirect.test.ts` |
| Added | `ts/test/entity/crawl_errors_response_obj/CrawlErrorsResponseObjEntity.test.ts` |
| Added | `ts/test/entity/crawling/CrawlingDirect.test.ts` |
| Added | `ts/test/entity/crawling/CrawlingEntity.test.ts` |
| Added | `ts/test/entity/extract/ExtractDirect.test.ts` |
| Added | `ts/test/entity/extract/ExtractEntity.test.ts` |
| Added | `ts/test/entity/map/MapEntity.test.ts` |
| Added | `ts/test/entity/scrape/ScrapeEntity.test.ts` |
| Added | `ts/test/entity/scraping/ScrapingEntity.test.ts` |
| Added | `ts/test/entity/search/SearchEntity.test.ts` |
| Added | `ts/test/exists.test.ts` |
| Added | `ts/test/feature.test.ts` |
| Added | `ts/test/feature/Corpus.test.ts` |
| Added | `ts/test/feature/harness.ts` |
| Added | `ts/test/live-contract.ts` |
| Added | `ts/test/live-entity.ts` |
| Added | `ts/test/live-runner.ts` |
| Added | `ts/test/live-scenarios.ts` |
| Added | `ts/test/netsim.test.ts` |
| Added | `ts/test/omni.test.ts` |
| Added | `ts/test/omni.ts` |
| Added | `ts/test/pipeline.test.ts` |
| Added | `ts/test/README.md` |
| Added | `ts/test/readme_examples.test.ts` |
| Added | `ts/test/ReadmeExample.test.ts` |
| Added | `ts/test/sdk-test-control.json` |
| Added | `ts/test/tsconfig.json` |
| Added | `ts/test/utility.ts` |
| Added | `ts/test/utility/Corpus.test.ts` |
| Added | `ts/test/utility/Custom.test.ts` |
| Added | `ts/test/utility/index.ts` |
| Added | `ts/test/utility/PrimaryUtility.test.ts` |
| Added | `ts/test/utility/StructUtility.test.ts` |
| Added | `ts/test/vendor/omni/index.ts` |
| Added | `ts/test/vendor/omni/Runner.ts` |
| Added | `ts/test/vendor/omni/Util.ts` |
| Modified | `.jostraca/jostraca.meta.log` |
| Modified | `.sdk/dist/tsconfig.tsbuildinfo` |
| Modified | `.sdk/model/api/api-info.aontu` |
| Modified | `.sdk/model/entity/entity-index.aontu` |
| Modified | `.sdk/model/feature/feature-index.aontu` |
| Modified | `.sdk/model/flow/flow-index.aontu` |
| Modified | `.sdk/model/guide/firecrawl-guide.aontu` |
| Modified | `.sdk/model/guide/guide.aontu` |
| Modified | `.sdk/model/sdk.aontu` |
| Modified | `.sdk/model/target/target-index.aontu` |
| Modified | `.sdk/test/.model-config/model-config.json` |
| Modified | `.sdk/test/test.aontu` |
| Modified | `.sdk/test/test.json` |
