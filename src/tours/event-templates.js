module.exports = [{
  target: '#event-templates',
  title: 'tours.event-templates.TEMPLATES_LABEL',
  content: 'tours.event-templates.TEMPLATE_DEFINITION_LABEL',
  params: {
    placement: 'bottom'
  }
}, {
  target: '#search-event-template',
  content: 'tours.event-templates.SEARCH_LABEL',
  params: {
    placement: 'bottom'
  }
}, {
  target: '#event-template-sorter',
  title: 'tours.event-templates.SORT_LABEL',
  params: {
    placement: 'left',
    clickOn: '#event-template-sorter',
    clickDelay: 500,
    clickOnNext: '#event-sorter',
    clickOnPrevious: '#event-sorter'
  }
}, {
  target: '#create-event-template',
  content: 'tours.event-templates.NEW_TEMPLATE_LABEL',
  link: 'tours.event-templates.CREATE_TEMPLATE_LINK_LABEL',
  params: {
    placement: 'left',
    blockOnMiss: 'div.q-card.q-card--bordered',
    route: { name: 'create-event-template' }
  }
}, {
  target: 'div.q-card.q-card--bordered',
  content: 'tours.event-templates.TEMPLATE_CARD_LABEL',
  params: {
    placement: 'right'
  }
}, {
  target: '#edit-event-template',
  content: 'tours.event-templates.UPDATE_TEMPLATE_LABEL',
  params: {
    placement: 'bottom'
  }
}, {
  target: '#copy-event-template',
  content: 'tours.event-templates.COPY_TEMPLATE_LABEL',
  params: {
    placement: 'bottom'
  }
}, {
  target: '#remove-event-template',
  title: 'tours.event-templates.REMOVE_TEMPLATE_LABEL',
  content: 'tours.event-templates.REMOVE_CONFIRMATION_LABEL',
  params: {
    placement: 'left'
  }
}]
