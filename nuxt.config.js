export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ecommerce',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    script:[
      {
        src: 'https://js.stripe.com/v3/'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles/app.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],
  auth:{

    strategies: {
      'laravelJWT': {
        provider: 'laravel/jwt',
        url: 'http://ecommerce-vue-laravel.com/api',
        endpoints: {
          login:{
            url:'/auth/login',
            method: 'post',
          },
          logout:{
            url:'/auth/logout',
            method: 'post',
          },
          user: {
            url: '/auth/me',
            method: 'get',
          },
          refresh: {
            url: '/auth/refresh',
            method: 'get',
          }
        },
        token: {
          property: 'meta.access_token',
          maxAge: 60 * 60
        },
        refreshToken: {
          property: 'meta.access_token',
          maxAge: 20160 * 60
        },
      },
    }
    // strategies: {
    //   local: {
    //     token:{
    //       property: 'meta.access_token',
    //       global: true,
    //       required: true,
    //       type: 'Bearer'
    //     },
    //     user: {
    //       property: 'data',
    //       autoFetch: true
    //     },
    //     endpoints:{
    //       login:{
    //         url:'/auth/login',
    //         method: 'post',
    //       },
    //       logout:{
    //         url:'/auth/logout',
    //         method: 'post',
    //       },
    //       user: {
    //         url: '/auth/me',
    //         method: 'get',
    //       }
    //     }
    //   }
    // }
  },
  axios: {
   baseURL: 'http://ecommerce-vue-laravel.com/api',
    // proxy: true
  },
  // proxy: {
  //   '/laravel': {
  //     target: 'http://ecommerce-vue-laravel.com/api',
  //     pathRewrite: { '^/laravel': '/' }
  //   }
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
