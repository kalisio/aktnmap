<template>
  <div>
    <k-signup-alert v-if="user" :isVerified="user.isVerified" :email="user.email" />
    <k-tour ref="tour" />
    <k-welcome />
    <router-view></router-view>
  </div>
</template>

<script>
import logger from 'loglevel'
import { Loading, Dialog } from 'quasar'
import { permissions, mixins, beforeGuard } from '@kalisio/kdk/core.client'

import config from 'config'
import utils from '../utils'

export default {
  name: 'index',
  // authorisation mixin is required to automatically update user' abilities on update
  mixins: [mixins.authentication, mixins.authorisation],
  methods: {
    async redirect (user) {
      this.user = user
      // Run registered guards to redirect accordingly if required
      const result = beforeGuard(this.$route)
      if (typeof result === 'string') {
        // When there is a single organisation directly go to the event activity, no need for the organisation dashboard
        if (user && (result === 'home')) {
          const response = await this.$api.getService(this.$config('context.service')).find({ query: {}, $limit: 1 })
          if (response.total === 1) {
            this.$router.push({ name: 'context', params: { contextId: response.data[0]._id } })
            return
          }
        }
        // Redirect to a given route based on authentication state
        this.$router.push({ name: result })
      } else if (!result) {
        // This route was previously allowed but due to changes in authorisations it is not anymore
        this.$router.push({ name: (this.user ? 'home' : 'login') })
      }
      // The first time initialize guards after the app has been correctly setup,
      // ie either with or without a restored user
      if (!this.initialized) {
        this.$router.beforeEach(beforeGuard)
        this.initialized = true
      }
      // Check if we'd like to redirect to an organisation
      let organisation = _.get(this.$route, 'query.organisation', '').toLowerCase()
      const permission = permissions.Roles[organisation]
      if (user && organisation) {
        const organisations = _.get(user, 'organisations', [])
        organisation = _.find(organisations, org => {
          // Redirect on target org or any org with the right permissions
          if (!_.isNil(permission)) {
            if (permissions.Roles[org.permissions] >= permission) return true
          } else if (org._id === organisation) return true
          return false
        })
        if (organisation) {
          // Stop any running tour as we will redirect
          //this.$refs.tour.getTour().stop()
          this.$router.replace({
            name: _.get(this.$route, 'query.route', 'context'),
            params: Object.assign({
              contextId: organisation._id,
              page: _.get(this.$route, 'query.page')
            }, _.get(this.$route, 'params', {})),
            query: _.omit(_.get(this.$route, 'query', {}), ['organisation', 'page'])
          })
        } else {
          this.$toast({ message: this.$t('Index.ORGANISATION_NOT_FOUND') })
        }
      }
    }
  },
  data () {
    return {
      user: null
    }
  },
  async created () {
    this.$options.components['k-signup-alert'] = utils.loadComponent('account/KSignupAlert')
    this.$options.components['k-welcome'] = utils.loadComponent('layout/KWelcome')
    this.$options.components['k-tour'] = utils.loadComponent('layout/KTour')
    // initialize the user
    this.user = this.$store.get('user')
    if (this.$api.socket) {
      // Display error message if we cannot contact the server
      this.$api.socket.on('reconnect_error', () => {
        // Display it only the first time the error appears because multiple attempts will be tried
        if (!this.pendingReconnection) {
          logger.error(new Error('Socket has been disconnected'))
          // This will ensure any operation in progress will not keep a "dead" loading indicator
          // as this error might appear under-the-hood without notifying service operations
          Loading.hide()
          this.pendingReconnection = Dialog.create({
            title: this.$t('Index.ALERT'),
            message: this.$t('Index.DISCONNECT'),
            html: true,
            persistent: true
          }).onDismiss(() => { this.pendingReconnection = null })
        }
      })
      // Handle reconnection correctly, otherwise auth seems to be lost
      // Also easier to perform a full refresh instead of handling this specifically on each activity
      this.$api.socket.on('reconnect', () => {
        // Dismiss pending reconnection error message
        if (this.pendingReconnection) {
          this.pendingReconnection.hide()
        }
        // Causes problems with hot reload in dev
        if (this.$config('flavor') !== 'dev') {
          Loading.show({ message: this.$t('Index.RECONNECT') })
          setTimeout(() => {
            window.location.reload()
          }, 3000)
        } else {
          logger.error(new Error('Socket disconnected, not trying to reconnect automatically in development mode please refresh page manually'))
        }
      })
      // Display error message if we have been banned from the server
      this.$api.socket.on('rate-limit', (error) => {
        Dialog.create({
          title: this.$t('Index.ALERT'),
          title: this.$t('Index.REFUSED'),
          html: true,
          ok: {
            label: this.$t('Index.RETRY'),
            flat: true
          }
        }).onOk(() => window.location.reload())
      })
    }
    // Check for API version, this one is not a service but a basic route so we don't use Feathers client
    this.$store.set('capabilities.client', {
      version: config.version,
      buildNumber: config.buildNumber,
      domain: config.domain
    })
    const response = await window.fetch(this.$api.getBaseUrl() + config.apiPath + '/capabilities')
    const api = await response.json()
    this.$store.set('capabilities.api', api)
    // FIXME: we should elaborate a more complex check between compatible versions
    if (api.version === config.version) {
      if (this.$config('flavor') === 'prod') return
      // Local dev has not the concept of build number
      else if (!api.buildNumber) return
      // On staging check it because we do not increase version number on each change
      // and would like to know if the mobile client is up-to-date
      else if (api.buildNumber === config.buildNumber) return
    }
    this.$toast({ message: this.$t('Index.VERSION_MISMATCH') })
  },
  async mounted () {
    // Check if we need to redirect based on the fact there is an authenticated user
    this.$events.$on('user-changed', this.redirect)

    try {
      // No need to update/redirect here since the user should be managed by event handler above
      await this.restoreSession()
    } catch (_) {
      // Check if we need to redirect based on the fact there is no authenticated user
      this.redirect(null)
    }
  },
  beforeDestroy () {
    this.$events.$off('user-changed', this.redirect)
  }
}
</script>
