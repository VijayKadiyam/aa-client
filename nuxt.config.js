const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
      { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,300i,400,400i,500,500i,600,600i,700,700i&amp;subset=latin-ext' },
      { rel: 'stylesheet', href: '/css/dashboard.css' },
      { rel: 'stylesheet', href: '/plugins/charts-c3/plugin.css' },
      { rel: 'stylesheet', href: '/plugins/maps-google/plugin.css' },
    ],
    script: [
      { src: '/javascripts/ckeditor/ckeditor.js' },
      { src: '/js/require.min.js' },
      { src: '/js/dashboard.js' },
      { src: '/plugins/charts-c3/plugin.js' },
      { src: '/plugins/maps-google/plugin.js' },
      { src: '/plugins/input-mask/plugin.js' },
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { 
    continuous: 'true',
    color: 'red',
    height: '4px'
  },

  /*
  ** Global CSS
  */
  css: [
  ],

  router: {
    middleware: [
      'clearValidationErrors',
      'auth',
      'organization'
    ]
  },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/mixins/validation',
    '@/plugins/mixins/auth',
    '@/plugins/mixins/settings',
    '@/plugins/axios',
    '@/plugins/charts',
    { src: '@/plugins/vue-json-excel', ssr: false },
    { src: "@/plugins/vue2-google-maps.js", ssr: false}
  ],

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {url: '/login', method: 'post', propertyName: 'token'},
          logout: {url: '/logout', method: 'get'},
          user: {url: '/me', method: 'get', propertyName: 'data'},
        }
      }
    },
    redirect: {
      login: '/auth/login',
      logout: '/auth/login',
      home: '/'
    }
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  /*
  ** Axios module configuration
  */
  // axios: {
  //   baseURL: 'http://localhost:8080/api'
  // },
  axios: {
    // baseURL: 'http://localhost:8080/api'
    baseURL: 'http://13.232.172.243:8080/api'
  },
  

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    },
  },
}
