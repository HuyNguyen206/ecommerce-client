export default function ({app, redirect, route}) {
  if (app.$auth.loggedIn) {
     redirect({
      name: 'index'
    })
  }
}
