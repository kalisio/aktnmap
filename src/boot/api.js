import 'whatwg-fetch'
import appHooks from '../app.hooks'
import services from '../services'
import plugin from '../vue-kdk'
import { kalisio, beforeGuard, authenticationGuard } from '@kalisio/kdk-core/client'

export default async ({ app, router, Vue }) => {
  let api = kalisio()

  api.declareService('alerts', { context: true })

  // Setup app hooks
  api.hooks(appHooks)
  // Then all services
  services.call(api)

  Vue.use(plugin, { api })

  // Add global guard
  beforeGuard.registerGuard(authenticationGuard)
}
