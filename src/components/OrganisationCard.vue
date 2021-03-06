<template>
  <k-card 
    v-bind="$props" 
    :header="header"
    :actions="itemActions" 
    :bind-actions="false">
    <!--
      Card avatar
    -->
    <div slot="card-avatar">
      <k-avatar class="q-pa-sm" :object="item" :contextId="item._id" size="4rem" />
    </div>
    <!--
      Card content
     -->
    <div slot="card-content">
      <k-card-section :title="$t('OrganisationCard.EVENTS_SECTION')">
        <!-- Events section -->
        <div class="full-width row justify-between items-center no-wrap">
          <k-action 
            id= "organisation-events"
            icon= "las la-fire"
            :label="$t('OrganisationCard.EVENTS_LABEL', { count: eventsCount })"
            @triggered="routeTo('events-activity')" />
          <q-space />
          <k-action 
            v-if="canAccessCatalog"
            id= "organisation-catalog"
            icon= "las la-map"
            :tooltip="$t('OrganisationCard.VIEW_CATALOG')"
            @triggered="routeTo('catalog-activity')"  />
          <k-action
            v-if="canAccessArchivedEvents"
            id= "organisation-archived-events"
            icon= "las la-clipboard-list"
            :tooltip="$t('OrganisationCard.VIEW_ARCHIVED_EVENTS')"
            @triggered="routeTo('archived-events-activity')"   />
        </div>
      </k-card-section>
      <!-- Plans section -->
      <k-card-section v-if="canAccessPlans" :title="$t('OrganisationCard.PLANS_SECTION')">
        <div class="full-width row justify-between items-center no-wrap">
          <k-action 
            id= "organisation-plans"
            icon= "las la-stream"
            :label="$t('OrganisationCard.PLANS_LABEL', { count: plansCount })"
            @triggered="routeTo('plans-activity')" />
          <q-space />
          <k-action
            v-if="canAccessArchivedPlans"
            id= "organisation-archived-plans"
            icon= "las la-archive"
            :tooltip="$t('OrganisationCard.VIEW_ARCHIVED_PLANS')"
            @triggered="routeTo('archived-plans-activity')" />
        </div>
      </k-card-section>
      <!-- Structure section -->
      <k-card-section icon="las la-cog" :title="$t('OrganisationCard.STRUCTURE_SECTION')" :expandable="true" @section-opened="onStructureSectionOpened">
        <template v-for="element in structure">
          <div :key="element.key" class="full-width row justify-between items-center no-wrap q-pa-xs">
            <k-action
              :id="`organisation-${element.name}`"
              :icon="element.icon"
              :label="$t(`OrganisationCard.${element.key}`, { count: counters[element.name] })"
              @triggered="routeTo(`${element.name}-activity`)" />
            <q-badge :label="`${quotas[element.name]} max`" color="grey-7" />
          </div>
        </template>
        <q-separator />
        <k-card-section v-if="canAccessBilling" :title="$t('OrganisationCard.SUBSCRIPTIONS_LABEL')" :actions="[{ 
          id: 'edit-billing', icon: 'las la-edit', size: 'sm', tooltip: 'OrganisationCard.EDIT_ACTION', 
          route: { name: 'edit-organisation-billing', params: { objectId: item._id, perspective: 'billing', title: item.name } } 
        }]">
              <div class="row items-center">
              <template v-for="subscription in subscriptions">
                <div :key="subscription" class="q-pl-sm">
                  <q-badge :label="$t(`${subscription}_LABEL`)" color="grey-7" />
                </div>
              </template>
            </div>
        </k-card-section>
      </k-card-section>
    </div>
  </k-card>
</template>

<script>
import logger from 'loglevel'
import { permissions } from '@kalisio/kdk/core.common'
import { mixins as kCoreMixins } from '@kalisio/kdk/core.client'

export default {
  name: 'organisation-card',
  mixins: [kCoreMixins.baseItem],
  data () {
    return {
      eventsCount: 0,
      plansCount: 0,
      billing: null,
      quotas: {},
      counters: {},
      structure: [ 
        { key: 'MEMBERS', name: 'members', icon: 'las la-user-friends' },
        { key: 'TAGS', name: 'tags', icon: 'las la-tag' },
        { key: 'GROUPS', name: 'groups', icon: 'las la-sitemap' },
        { key: 'EVENT_TEMPLATES', name: 'event-templates', icon: 'las la-project-diagram' },
        { key: 'PLAN_TEMPLATES', name: 'plan-templates', icon: 'las la-stream' }
      ]
    }
  },
  computed: {
    header () {
      let components = _.filter(this.itemActions, { scope: 'header' })
      components.splice(0, 0, 
        { component: 'QBadge', label: this.getUserRoleLabel(), color: 'grey-7' },
        { component: 'frame/KSpot', color: this.item.color, width: '20px', borderRadius: '5px' },
        { component: 'QSpace' })
      return components
    },
    canAccessPlans () {
      return this.$can('service', 'plans', this.item._id)
    },
    canAccessArchivedPlans () {
      return this.$can('service', 'archived-plans', this.item._id)
    },
    canAccessCatalog () {
      return this.$can('update', 'catalog', this.item._id)
    },
    canAccessArchivedEvents () {
      return this.$can('service', 'archived-events', this.item._id)
    },
    canAccessBilling () {
      return this.$can('update', 'organisations', null, { _id: this.item._id })
    },
    subscriptions () {
      const plan = `plans.${_.get(this.billing, 'subscription.plan')}`
      const options = _.get(this.billing, 'options')
      if (options)  return _.concat([plan], _.map(options, (option) => { return `options.${option.plan}` }))
      return [plan]
    }
  },
  methods: {
    routeTo (activity, planId = null) {
      let route = { name: activity, params: { contextId: this.item._id } }
      if (planId) route = Object.assign(route, { query: { plan: planId } })
      this.$router.push(route)
    },
    getUserRoleLabel () {
      const userRole = permissions.getRoleForOrganisation(this.$store.get('user'), this.item._id)
      return this.$t(_.upperCase(userRole))
    },
    async countItems (serviceName, query = {}) {
      const service = this.$api.getService(serviceName, this.item._id)
      const response = await service.find({ query, $limit: 0 })
      return response.total
    },
    async loadBilling () {
      const organisationsService = this.$api.getService('organisations')
      const response = await organisationsService.get(this.item._id, { query: { $select: ['billing'] } })
      this.billing = _.get(response, 'billing', null)
      if (!this.billing) {
        logger.debug('No billing found for the organisation ID: ', this.item._id)
      }
      if (!_.get(this.billing, 'subscription.plan')) {
        logger.debug('No subscription plan found for the organisation ID: ', this.item._id)
      }
    },
    async onStructureSectionOpened () {
      // Retrieve the quotas
      if (!this.billing) await this.loadBilling()
      const subscription = this.billing.subscription.plan
      const orgQuotas = _.get(this.billing, 'quotas')
      const appQuotas = this.$store.get('capabilities.api.quotas', {})
      if (_.isEmpty(appQuotas)) {
        logger.debug('No application quotas found')
        return
      }
      this.quotas = appQuotas[subscription]
      _.merge(this.quota, orgQuotas)
      // Counts the different elements
      for (let i = 0; i < this.structure.length; ++i) {
        const service = this.structure[i].name
        this.$set(this.counters, service, await this.countItems(service))
      }
    }
  },
  beforeCreate () {
     // Load the required components
    this.$options.components['k-card'] = this.$load('collection/KCard')
    this.$options.components['k-card-section'] = this.$load('collection/KCardSection')
    this.$options.components['k-avatar'] = this.$load('frame/KAvatar')
    this.$options.components['k-panel'] = this.$load('frame/KPanel')
    this.$options.components['k-action'] = this.$load('frame/KAction')
    this.$options.components['k-list'] = this.$load('collection/KList')
  },
  async created () {
    // Counts the number of orphan events
    this.eventsCount = await this.countItems('events', { plan: { $eq: null } } )
    this.plansCount = await this.countItems('plans', { plan: { $eq: null } } )
  }
}
</script>

