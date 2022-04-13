export default function ({app, redirect, route}) {
  if (!app.$auth.loggedIn) {
     redirect({
      name: 'auth-signin',
      query: {
        redir: route.fullpath
      }
    })
  }
}
