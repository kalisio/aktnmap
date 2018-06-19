import _ from 'lodash'
import { iff } from 'feathers-hooks-common'

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    // When updating attachments on events we need to transfer the notification parameter in query
    // However on create the parameters are sent via form data
    create: [ iff(hook => hook.data.notification, (hook) => {
      _.set(hook, 'params.query.notification', hook.data.notification)
      return hook
    }) ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
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