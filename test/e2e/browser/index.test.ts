import puppeteer, { Browser, Page } from 'puppeteer'
import config from '../../../.config.json'
import { BaseJSErrorBreadcrumbType, BaseResourceBreadcrumbType, BaseTransportDataType, BaseXhrBreadcrumbType } from '../../../packages/types'
import { BrowserEventTypes, SDK_NAME, SDK_VERSION, TransportCategory } from '../../../packages/comm'

describe('Browser monitor e2e:', () => {
  let browser: Browser
  let page: Page
  const timeout = 10 * 1000
  
  const errorUploadHandler = () => {
    return new Promise((resolve, reject) => {
      page.on('requestfinished', (req) => {
        
        try{
          if(req.url() === 'http://localhost:9996/errors/upload'){
            req.response()!.json().then(r => resolve(r))
          }
        }catch (e){
          reject(e)
        }
      })
    })
  }
  
  beforeEach(async () => {
    browser = await puppeteer.launch({headless: 'new'})
    page = await browser.newPage()
    
    await page.goto(config.browserUrl)
  })

  afterEach(async () => {
    browser.close()
  })

  afterAll(() => {
    browser.close()
  })
  
  it(
    'btn click target js error, should upload this error',
    async () => {
      const p = errorUploadHandler()
      await page.click('#codeErr')
      const r = (await p) as BaseTransportDataType<BaseJSErrorBreadcrumbType>
      
      expect(r.category).toBe(TransportCategory.ERROR)
      expect(r.sdkVersion).toBe(SDK_VERSION)
      expect(r.sdkName).toBe(SDK_NAME)
      expect(r.context!.url).toBe('http://localhost:9996/browser/index.html')
      expect(r.context!.type).toBe(BrowserEventTypes.JS_ERROR)
      expect(r.context!.functionName).toBe('codeError')
    },
    timeout
  )
  
  it(
    'btn click target xhr get error, should upload this error',
    async () => {
      const p = errorUploadHandler()
      await page.click('#exceptionGetReq')
      const r = (await p) as BaseTransportDataType<BaseXhrBreadcrumbType>
      
      expect(r.category).toBe(TransportCategory.ERROR)
      expect(r.sdkVersion).toBe(SDK_VERSION)
      expect(r.sdkName).toBe(SDK_NAME)
      expect(r.context!.url).toBe('http://localhost:9996/browser/index.html')
      expect(r.context!.xhrUrl).toBe('/exception/get')
      expect(r.context!.method).toBe('get')
      expect(r.context!.type).toBe(BrowserEventTypes.XHR)
      expect(r.context!.status).toBe('404')
    },
    timeout
  )
  
  it(
    'btn click target xhr post error, should upload this error',
    async () => {
      const p = errorUploadHandler()
      await page.click('#exceptionPostReq')
      const r = (await p) as BaseTransportDataType<BaseXhrBreadcrumbType>
      
      expect(r.category).toBe(TransportCategory.ERROR)
      expect(r.sdkVersion).toBe(SDK_VERSION)
      expect(r.sdkName).toBe(SDK_NAME)
      expect(r.context!.url).toBe('http://localhost:9996/browser/index.html')
      expect(r.context!.xhrUrl).toBe('/exception/post')
      expect(r.context!.method).toBe('post')
      expect(r.context!.type).toBe(BrowserEventTypes.XHR)
      expect(r.context!.status).toBe('404')
      expect(r.context!.body).toBe(JSON.stringify({e2e: 'test'}))
    },
    timeout
  )
  
  it(
    'resource error, should upload this error',
    async () => {
      const p = errorUploadHandler()
      await page.click('#resourceError')
      const r = (await p) as BaseTransportDataType<BaseResourceBreadcrumbType>
      
      expect(r.category).toBe(TransportCategory.ERROR)
      expect(r.sdkVersion).toBe(SDK_VERSION)
      expect(r.sdkName).toBe(SDK_NAME)
      expect(r.context!.url).toBe('http://localhost:9996/browser/index.html')
      expect(r.context!.filename).toBe('http://localhost:9996/error/img')
      expect(r.context!.outerHTML).toBe('<img src="/error/img">')
      expect(r.context!.type).toBe(BrowserEventTypes.RES_ERROR)
      expect(r.context!.tagName).toBe('IMG')
    },
    timeout
  )
})
