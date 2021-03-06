const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')
const path = require('path')

import config from './config/general'

module.exports = {

  /*
  |--------------------------------------------------------------------------
  | Head
  |--------------------------------------------------------------------------
  */

  head: {
    titleTemplate: '%s - ' + config.app.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxtify Demo' },
      { name: 'msapplication-TileColor', content: '#ffffff'},
      { name: 'theme-color', content: '#ffffff'},
      { property: 'og:image', content: '/thumbnail.jpg'},
      { property: 'og:type', content: 'website'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#000000' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/2.6.95/css/materialdesignicons.min.css' },
    ],
  },

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  loading: { color: '#1100FF' },

  /*
  |--------------------------------------------------------------------------
  | CSS
  |--------------------------------------------------------------------------
  */

  css: [
    '@/assets/sass/main.scss',
  ],

  /*
  |--------------------------------------------------------------------------
  | Cache
  |--------------------------------------------------------------------------
  */

  cache: true,

  /*
  |--------------------------------------------------------------------------
  | Build config
  |--------------------------------------------------------------------------
  */

  build: {

    analyze: false,
    extractCSS: true,
    
    extend (config, { isDev }) {
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      if (!isDev) {
        config.plugins.push(
          new PurgecssPlugin({
            paths: glob.sync([
              path.join(__dirname, './pages/**/*.vue'),
              path.join(__dirname, './layouts/**/*.vue'),
              path.join(__dirname, './components/**/*.vue')
            ]),
            whitelist: ['html', 'body'],
            whitelistPatterns: [/nuxt-/, /-enter$/, /-leave-active$/, /-enter-active$/, /aos/]
          })
        );
      }
    }
  },

  /*
  |--------------------------------------------------------------------------
  | Router
  |--------------------------------------------------------------------------
  */

  router: {
    scrollBehavior: function (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  },

  /*
  |--------------------------------------------------------------------------
  | Plugins
  |--------------------------------------------------------------------------
  */

  plugins: [
    '~/plugins/global.js',
    //'~/plugins/disqus',
    //'~/plugins/kentico',
    //{ src: '~plugins/crisp.js', ssr: false }
  ],

  /*
  |--------------------------------------------------------------------------
  | Modules
  |--------------------------------------------------------------------------
  */

  modules: [
    '@nuxtjs/component-cache',
    //'@nuxtjs/sentry',
    //'@nuxtjs/google-gtag',
    //'nuxt-facebook-pixel-module',
    ['nuxt-i18n', {
      defaultLocale: 'en',
      locales: [
        {
          code: 'en',
          iso: 'en-US',
          name: 'English',
          file: 'en.js'
        },
        {
          code: 'fr',
          iso: 'fr-FR',
          name: 'Français',
          file: 'fr.js'
        },
      ],
      lazy: true,
      langDir: 'lang/',
      vueI18n: {
        fallbackLocale: 'en'
      }
    }]
  ],

  /*
  |--------------------------------------------------------------------------
  | Sentry config
  |--------------------------------------------------------------------------
  */

  sentry: {
    dsn: 'PRIVATE_DNS',
    public_dns: 'PUBLIC_DNS',
    disabled: process.env.NODE_ENV !== 'production',
    disableClientSide: process.env.NODE_ENV !== 'production',
  },

  /*
  |--------------------------------------------------------------------------
  | Facebook Pixel config
  |--------------------------------------------------------------------------
  */

  facebook: {
    track: 'PageView',
    pixelId: 'FACEBOOK_PIXEL_ID',
    disabled: false
  },

  /*
  |--------------------------------------------------------------------------
  | Google Tag config
  |--------------------------------------------------------------------------
  */

  'google-tag': {
    id: 'GOOGLE_ID'
  }
}
