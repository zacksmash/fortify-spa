const mix = require('laravel-mix');
const path = require('path');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

// Set project paths
const localDomain = 'http://CHANGE_ME.test';

mix
  // Utilities
  .sourceMaps()
  .options({
    processCssUrls: false
  })

  .alias({
    '@': path.join(__dirname, 'resources/js'),
    '~': path.join(__dirname, 'node_modules')
  })

  // Add global libraries
  .autoload({
    uikit: 'UIkit'
  })

  // Suppress success messages
  .disableSuccessNotifications()

  // Compile Javascript (ES6)
  .js('resources/js/app.js', 'public/js')
  .vue()
  .extract()

  // Compile Sass
  .sass('resources/scss/app.scss', 'public/css')

  // .copy('resources/img', 'public/img')
  // .copy('resources/fonts', 'public/fonts')

  // Setup BrowserSync
  .browserSync({
    proxy: localDomain,
    host: localDomain.replace(/^https?:\/\//, ''),
    notify: false,
    open: false,
    injectChanges: true,
    // https: {
    //   key: '/Users/YOUR_COMPUTER/.config/valet/Certificates/YOUR_SITE.test.key',
    //   cert: '/Users/YOUR_COMPUTER/.config/valet/Certificates/YOUR_SITE.test.crt'
    // }
  })

// Setup versioning (cache-busting)
if (mix.inProduction()) {
  mix.version()
}
