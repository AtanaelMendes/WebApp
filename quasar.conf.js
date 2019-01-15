// Configuration for your app
const envparser = require('./config/envparser');

module.exports = function (ctx) {
  return {
    // app plugins (/src/plugins)
    plugins: [
      'axios',
      'vuelidate',
      'moment',
      'numeral',
      'croppa'
    ],
    css: [
      'app.styl'
    ],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons', // optional, you are not bound to it
      // 'ionicons',
      'mdi',
      'fontawesome'
    ],
    supportIE: false,
    build: {
      env: envparser(),
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      extendWebpack (cfg) {
      }
    },
    devServer: {
      // https: true,
      // port: 8080,
      open: false // opens browser window automatically
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        'QLayout',
        'QLayoutHeader',
        'QLayoutDrawer',
        'QPageContainer',
        'QPage',
        'QPageSticky',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QListHeader',
        'QItem',
        'QItemMain',
        'QItemSide',
        'QItemTile',
        'QItemSeparator',

        // adicionado
        'QTable',
        'QBtnDropdown',
        'QInfiniteScroll',
        'QLayoutFooter',
        'QFab',
        'QFabAction',
        'QBreadcrumbs',
        'QBreadcrumbsEl',
        'QTooltip',
        'QInput',
        'QCheckbox',
        'QField',
        'QRadio',
        'QOptionGroup',
        'QModal',
        'QCard',
        'QCardMain',
        'QCardTitle',
        'QCardActions',
        'QCardSeparator',
        'QCardMedia',
        'QCollapsible',
        'QToggle',
        'QRange',
        'QScrollArea',
        'QChip',
        'QPopover',
        'QRating',
        'GoBack',
        'QSelect',
        'QDatetime',
        'QTabs',
        'QTab',
        'QTabPane',
        'QRouteTab',
        'QDatetimePicker',
        'QTimeline',
        'QTimelineEntry',
        'QSearch',
        'QStepper',
        'QStep',
        'QStepperNavigation',
        'QProgress',
        'QUploader',
        'QAutocomplete',
        'QChipsInput',
        'QBtnToggle',
        'QJumbotron',
        'QDialog',
        'QSlider',
        'QParallax',
        'QModalLayout',
        'QBtnGroup'
      ],
      directives: [
        'Ripple',
        'CloseOverlay',
        'MaskedInput'
      ],
      // Quasar plugins
      plugins: [
        'Notify',
        'Dialog',
        'Loading',
        'Screen',
      ],
      // iconSet: ctx.theme.mat ? 'material-icons' : 'ionicons'
      i18n: 'pt-br' // Quasar language
    },
    // animations: 'all' --- includes all animations
    animations: [],
    ssr: {
      pwa: false
    },
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        name: 'AgroProject',
        short_name: 'AgroProject',
        description: 'Projeto Agrícola MG Papelaria!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#005f5f',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack (cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
}
