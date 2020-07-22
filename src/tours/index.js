module.exports = {
  login: require('./core/login'),
  'send-reset-password': require('./core/send-reset-password'),
  register: require('./core/register'),
  'create-organisation': require('./core/create-organisation'),
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
  home: require('./home'),
  'organisation-properties': require('./organisation-properties'),
  'organisation-billing': require('./organisation-billing'),
  'organisation-dz': require('./organisation-dz'),
  dashboard: require('./dashboard'),
  context: require('./context'),
  events: require('./events'),
  'create-event': require('./create-event'),
  'event-templates': require('./event-templates'),
  'create-event-templates': require('./create-event-templates')
  /*,
  'archived-events': require('./archived-events'),
  catalog: require('./catalog')
  */
}

