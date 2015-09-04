module.exports = {
    browserSync: {
        development: {
            server: {
                baseDir: ['./public']
            },
            port: 7777,
            open: false
        }
    },

    jade: {
        src:'./views/**/!(_)*.jade',
        dest: './public'
    },

    sass: {
        src:'./scss/**.*.scss',
        dest:'./public',
        options: {
            outputStyle: 'nested'
        }
    },

    autoPreFixer: {
        browsers: [
            'last 2 versions',
            'safari 5',
            'ie 8',
            'ie 9',
            'opera 12.1',
            'ios 6',
            'android 4'
        ],
        cascade: true
    },

    concat: {
        css: {
            dest: './public/css',
            links: [
               './lib/bootstrap/dist/css/bootstrap.min.css',
               './lib/bootstrap/dist/css/bootstrap-theme.min.css',
               './scss/style.scss'
            ]
        },
        js: {
            dest: './public/js',
            links: [
                './lib/modernizr/modernizr.js',
                './lib/jquery/jquery.js',
                './lib/jquery/jquery-migrate.js',
                './lib/bootstrap/dist/js/bootstrap.js',
                './lib/script.js'
            ]
        }
    }
};
