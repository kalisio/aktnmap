import path from 'path'
// Page models
import * as pages from './page-models'

fixture`Account`// declare the fixture
  .page`${pages.getUrl()}`  // specify the start page
  // test.before/test.after overrides fixture.beforeEach/fixture.afterEach hook,
  // so implement one in your test if you'd like another behaviour
  .beforeEach(async test => {
    // mock geolocation
    await pages.mockLocationAPI()
  })
  .afterEach(async test => {
    // check for console error messages
    await pages.checkNoClientError(test)
  })

const app = new pages.Application()
const organisations = new pages.Organisations()
const account = new pages.Account()

const newPassword = 'Pass;word1-new1'
const newEmail = 'kalisio@kalisio.com'

test.page`${pages.getUrl('register')}`
('Registration', async test => {
  await app.register(test)
})

test('Edit profile', async test => {
  await app.login(test)
  await account.editProfile(test, { name: 'toto', avatar: path.join(__dirname, 'assets', 'avatar.png') })
  await account.checkIdentity(test, 'toto')
})

test('Edit password', async test => {
  await app.login(test)
  await account.updatePassword(test, { password: 'Pass;word1', newPassword })
  await pages.goBack()
  await app.logout(test)
  // We should login with new credentials
  await test.navigateTo(pages.getUrl('login'))
  await app.login(test, { password: newPassword })
})

test('Edit email', async test => {
  await app.login(test, { password: newPassword })
  await account.updateEmail(test, { password: newPassword, newEmail })
  await pages.goBack()
  await app.logout(test)
  // We should not be able to login with new email because it requires validation
  await test.navigateTo(pages.getUrl('login'))
  await app.login(test, { email: newEmail, password: newPassword })
  await test.expect(app.isErrorVisible()).ok('Error should be displayed')
  // FIXME: how could we validate the change ?
})

test('Delete account', async test => {
  await app.login(test, { password: newPassword })
  await organisations.deleteOrganisation(test, 'Kalisio')
  await account.removeAccount(test, 'toto')

  let screen = await app.logoutScreen.getVue()
  await test.wait(1000)
  // The home page should be the logout screen
  await test.expect(screen.props.title).ok('Your are now logged out')
  // And we cannot login anymore
  await test.navigateTo(pages.getUrl('login'))
  await app.login(test, { password: newPassword })
  await test.expect(app.isErrorVisible()).ok('Error should be displayed')
})
