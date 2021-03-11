module.exports = {
  login: require('./core/login'),
  'send-reset-password': require('./core/send-reset-password'),
  register: require('./core/register'),
  'organisations': require('./organisations'),
  'create-organisation': require('./core/create-organisation'),
  'organisation-properties': require('./organisation-properties'),
  'organisation-billing': require('./organisation-billing'),
  'organisation-dz': require('./organisation-dz'),
  'account-profile': require('./core/account-profile'),
  'account-security': require('./core/account-security'),
  'account-dz': require('./core/account-dz'),
  'change-password': require('./core/change-password'),
  'send-change-identity': require('./core/send-change-identity'),
  groups: require('./core/groups'),
  'create-group': require('./core/create-group'),
  members: require('./core/members'),
  'add-member': require('./core/add-member'),
  'invite-member': require('./core/invite-member'),
  'join-group': require('./core/join-group'),
  'tag-member': require('./core/tag-member'),
  tags: require('./core/tags'),
  'side-nav': require('./side-nav'),
  dashboard: require('./dashboard'),
  context: require('./context'),
  events: require('./events'),
  'create-event': require('./create-event'),
  'event-templates': require('./event-templates'),
  'create-event-templates': require('./create-event-templates'),
  catalog: require('./catalog'),
  'navigation-bar': require('./map/navigation-bar'),
  'catalog-panel': require('./map/catalog-panel'),
  'timeline': require('./map/timeline'),
  'fab': require('./map/fab'),
  'archived-events': require('./archived-events'),
  'archived-events-chart': require('./archived-events-chart'),
  'archived-events-map': require('./archived-events-map')
}

