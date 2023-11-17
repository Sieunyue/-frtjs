import { BrowserClient, BrowserOptionsType } from './src/client'
import { jsErrorPlugin, promiseErrorPlugin, ResErrorPlugin, xhrErrorPlugin } from './src/plugins'
import { BasePluginType } from '@/types'

const init = (options: BrowserOptionsType) => {
  const browser = new BrowserClient(options)
  
  browser.use(jsErrorPlugin).use(ResErrorPlugin).use(xhrErrorPlugin as BasePluginType).use(promiseErrorPlugin)
  
  return browser
}
const frtjs = { init }
export default frtjs
