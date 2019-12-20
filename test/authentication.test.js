// Page models
import * as pages from './page-models'

fixture`authentication`// declare the fixture
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

test('Invalid login', async test => {
  await app.login(test)
  let user = await pages.getFromStore('user')
  await test.expect(user).notOk('User should not be populated')
  await test.expect(app.isErrorVisible()).ok('Error should be displayed')
})

test.page`${pages.getUrl('register')}`
('Registration', async test => {
  await app.register(test)
})

test('Local login', async test => {
  await app.login(test)

  const signupAlert = await app.signupAlert.getVue()
  await test.wait(1000)
  let user = await pages.getFromStore('user')
  // We should have at least a populated user and an unverified email
  await test.expect(user).ok('User should be populated')
  await test.expect(signupAlert.props.isVerified).notOk('User should not be verified')

  await app.logout(test)

  let screen = await app.logoutScreen.getVue()
  // We should have at least an unpopulated user
  user = await pages.getFromStore('user')
  await test.expect(user).notOk('User should not be populated')
  // The home page should be the logout screen
  await test.expect(screen.props.title).ok('Your are now logged out')
})

test('Cleanup local user', async test => {
  await app.login(test)

  let user = await pages.getFromStore('user')
  await pages.api.remove('organisations', user._id)
  await pages.api.remove('users', user._id)

  await app.logout(test)
})

test.skip('Google login', async test => {
  await app.loginGoogle(test)

  const signupAlert = await app.signupAlert.getVue()
  let user = await pages.getFromStore('user')
  // We should have at least a populated user and a verified email
  await test.expect(user).ok('User should be populated')
  await test.expect(signupAlert.props.isVerified).ok('User should be verified')

  await app.logout(test)
})

test.skip('Cleanup Google user', async test => {
  await app.loginGoogle(test)

  let user = await pages.getFromStore('user')
  await pages.api.remove('organisations', user._id)
  await pages.api.remove('users', user._id)

  await app.logout(test)
})

test.skip('GitHub login', async test => {
  await app.loginGitHub(test)

  const signupAlert = await app.signupAlert.getVue()
  let user = await pages.getFromStore('user')
  // We should have at least a populated user and a verified email
  await test.expect(user).ok('User should be populated')
  await test.expect(signupAlert.props.isVerified).ok('User should be verified')

  await app.logout(test)
})

test.skip('Cleanup GitHub user', async test => {
  await app.loginGitHub(test)

  let user = await pages.getFromStore('user')
  await pages.api.remove('organisations', user._id)
  await pages.api.remove('users', user._id)

  await app.logout(test)
})
