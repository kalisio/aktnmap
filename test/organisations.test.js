// Page models
import * as pages from './page-models'

fixture`organisations`// declare the fixture
  .page`${pages.getUrl()}`  // specify the start page
  // test.before/test.after overrides fixture.beforeEach/fixture.afterEach hook,
  // so implement one in your test if you'd like another behaviour
  .beforeEach(async test => {
    // mock geolocation
    await pages.mockLocationAPI()
  })

const screens = new pages.Screens()
const layout = new pages.Layout()
const account = new pages.Account()
const organisations = new pages.Organisations()

const data = {
  user: { name: 'Organisations owner', email: 'organisations-owner@kalisio.xyz', password: 'Pass;word1' },
  organisation: { name: 'Test Organisation', description: 'An organisation test' }
}

test('Create user and check default organisation', async test => {
  await screens.goToRegisterScreen(test)
  await screens.register(test, data.user)
  await layout.closeSignupAlert(test)
  await layout.closeWelcomeDialog(test)
  await layout.clickLeftOpener(test)
  await layout.clickLeftPaneAction(test, pages.Organisations.ENTRY, pages.Organisations.LONG_WAIT)
  await organisations.checkCount(test, 1)
  await pages.checkNoClientError(test)
})

test('Forbid additional free org creation', async test => {
  await screens.login(test, data.user)
  await layout.closeSignupAlert(test)
  await layout.closeWelcomeDialog(test)
  await layout.clickLeftOpener(test)
  await layout.clickLeftPaneAction(test, pages.Organisations.ENTRY, pages.Organisations.LONG_WAIT)
  await organisations.create(test, data.organisation.name, data.organisation.description)
  const error = await organisations.isErrorVisible()
  await test.expect(error).ok('Forbidden error should be displayed')
  await pages.checkClientError(test)
})

test('Delete default organisation', async test => {
  await screens.login(test, data.user)
  await layout.closeSignupAlert(test)
  await layout.closeWelcomeDialog(test)
  await layout.clickLeftOpener(test)
  await layout.clickLeftPaneAction(test, pages.Organisations.ENTRY, pages.Organisations.LONG_WAIT)
  await organisations.delete(test, data.user.name)
  await organisations.checkCount(test, 0)
  await pages.checkNoClientError(test)
})

test('Create organisation', async test => {
  await screens.login(test, data.user)
  await layout.closeSignupAlert(test)
  await layout.closeWelcomeDialog(test)
  await layout.clickLeftOpener(test)
  await layout.clickLeftPaneAction(test, pages.Organisations.ENTRY, pages.Organisations.LONG_WAIT)
  await organisations.create(test, data.organisation.name, data.organisation.description)
  await organisations.checkCount(test, 1)
  await pages.checkNoClientError(test)
})

test('Forbid account deletion', async test => {
  await screens.login(test, data.user)
  await layout.closeSignupAlert(test)
  await layout.closeWelcomeDialog(test)
  await layout.clickLeftOpener(test)  
  await layout.clickLeftPaneAction(test, pages.Account.MANAGE_ACCOUNT)
  await layout.clickTopPaneAction(test, pages.Account.DANGER_ZONE)
  await account.delete(test, data.user.name)
  const error = await organisations.isErrorVisible()
  await test.expect(error).ok('Forbidden error should be displayed')
  await pages.checkClientError(test)
})

test('Delete created organisation', async test => {
  await screens.login(test, data.user)
  await layout.closeSignupAlert(test)
  await layout.closeWelcomeDialog(test)
  await layout.clickLeftOpener(test)
  await layout.clickLeftPaneAction(test, pages.Organisations.ENTRY, pages.Organisations.LONG_WAIT)
  await organisations.delete(test, data.organisation.name)
  await organisations.checkCount(test, 0)
  await pages.checkNoClientError(test)
})

test('Delete user', async test => {
  await screens.login(test, data.user)
  await layout.closeSignupAlert(test)
  await layout.closeWelcomeDialog(test)
  await layout.clickLeftOpener(test)  
  await layout.clickLeftPaneAction(test, pages.Account.MANAGE_ACCOUNT)
  await layout.clickTopPaneAction(test, pages.Account.DANGER_ZONE)
  await account.delete(test, data.user.name)
  await pages.checkNoClientError(test)
})
