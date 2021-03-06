import { disallow } from 'feathers-hooks-common'
import { hooks as coreHooks } from '@kalisio/kdk/core.api'
import { hooks as mapHooks } from '@kalisio/kdk/map.api'

module.exports = {
  before: {
    all: [
      coreHooks.convertObjectIDs(['plan']),
      coreHooks.convertToString(['alert.conditions'])
    ],
    find: [mapHooks.marshallSpatialQuery, coreHooks.marshallComparisonQuery, coreHooks.distinct],
    get: [],
    create: [
      disallow('external'),
      coreHooks.convertDates(['createdAt', 'updatedAt', 'expireAt']),
      coreHooks.convertObjectIDs(['layer', 'feature'])
    ],
    update: [
      disallow('external'),
      coreHooks.convertDates(['createdAt', 'updatedAt', 'expireAt']),
      coreHooks.convertObjectIDs(['layer', 'feature'])
    ],
    patch: [
      disallow('external'),
      coreHooks.convertDates(['createdAt', 'updatedAt', 'expireAt']),
      coreHooks.convertObjectIDs(['layer', 'feature'])
    ],
    remove: [disallow('external')]
  },

  after: {
    all: [coreHooks.convertToJson(['alert.conditions'])],
    find: [mapHooks.asGeoJson({
      longitudeProperty: 'location.longitude',
      latitudeProperty: 'location.latitude',
      geometryProperty: 'location',
      asFeatureCollection: false
    })],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
