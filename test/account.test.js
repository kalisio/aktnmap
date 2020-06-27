import path from 'path'
import * as pages from './page-models'

fixture`account`// declare the fixture
  .page`${pages.getUrl()}`  // specify the start page
  .beforeEach(async test => {
    // mock geolocation
    await pages.mockLocationAPI()
  })
  .afterEach(async test => {
    // check for console error messages
    // FIXME: Storage error
    // await pages.checkNoClientError(test)
  })

const screens = new pages.Screens()
const layout = new pages.Layout()
const sideNav = new pages.SideNav()
const organisationSettings = new pages.OrganisationSettings()
const account = new pages.Account()

const data = {
  user: { name: 'account user', email: 'account-user@kalisio.xyz', password: 'Pass;word1' },
  newName: 'account newuser',
  newPassword: 'Pass;word1-new1',
  newEmail: 'account-other@kalisio.com',
  avatar: 'avatar.png'
}

test('Create account', async test => {
  await screens.goToRegisterScreen(test)
  await screens.register(test, data.user)
})

test('Update profile', async test => {
  await screens.login(test, data.user)
  await layout.closeSignupAlert(test)
  await layout.clickLeading(test)
  await sideNav.clickIdentity(test)
  await account.updateProfile(test, path.join(__dirname, 'assets', data.avatar), data.newName)
  await layout.clickLeading(test)
  await sideNav.logout(test)
})

test('Update password', async test => {
  await screens.login(test, data.user)
  await layout.closeSignupAlert(test)
  await layout.clickLeading(test)
  await sideNav.clickIdentity(test)
  await layout.clickTabBar(test, pages.Account.SECURITY_TAB)
  await account.updatePassword(test, data.user.password, data.newPassword)
  await pages.goBack()
  await layout.clickLeading(test)
  await sideNav.logout(test)
})

test('Ensure login with old password fails', async test => {
  await screens.login(test, data.user)
  const error = await screens.isErrorVisible()
  await test.expect(error).ok('Error should be displayed')
  data.user.password = data.newPassword
})

test('Update email', async test => {
  await screens.login(test, data.user)
  await layout.closeSignupAlert(test)
  await layout.clickLeading(test)
  await sideNav.clickIdentity(test)
  await layout.clickTabBar(test, pages.Account.SECURITY_TAB)
  await account.updateEmail(test, data.newEmail, data.user.password)
  await pages.goBack()
  await layout.clickLeading(test)  
  await sideNav.logout(test)
})

test.skip('Ensure login with old email fails', async test => {
  await screens.login(test, data.user)
  const error = await screens.isErrorVisible()
  await test.expect(error).ok('Error should be displayed')
  data.user.email = data.newEmail
})

test('Delete account', async test => {
  await screens.login(test, data.user)
  await layout.closeSignupAlert(test)
  await layout.clickOverflowMenu(test, pages.OrganisationSettings.OVERFLOW_MENU_ENTRY)
  await layout.clickTabBar(test, pages.OrganisationSettings.DANGER_ZONE_TAB)
  await organisationSettings.delete(test, data.user.name)
  await layout.clickLeading(test)
  await sideNav.clickIdentity(test)
  await layout.clickTabBar(test, pages.Account.DANGER_ZONE_TAB)
  await account.delete(test, data.user.name)
})

test('Ensure login with deleted account fails', async test => {
  await screens.login(test, data.user)
  const error = await screens.isErrorVisible()
  await test.expect(error).ok('Error should be displayed')
})
