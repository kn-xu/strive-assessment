let mix = require('laravel-mix');

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

mix
    .sass('resources/assets/sass/app.scss', 'public/css')
    .combine(
        [
            'node_modules/angular/angular.min.js',
            'node_modules/angular-ui-router/release/angular-ui-router.min.js',
            'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
            'node_modules/angular-ui-notification/dist/angular-ui-notification.min.js'
        ], 'public/js/library.js'
    )
    .combine(
        [
            'resources/assets/js/angular/**/*.js'
        ],
        'public/js/custom.js'
    )
    .copyDirectory('resources/views/angular', 'public/views/angular');
