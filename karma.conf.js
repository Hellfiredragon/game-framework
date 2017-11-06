module.exports = function (config) {
// noinspection JSUnusedGlobalSymbols
    config.set({
        /**
         * frameworks to use
         * available frameworks: https://npmjs.org/browse/keyword/karma-adapter
         */
        frameworks: ["jasmine-ajax", "jasmine", "detectBrowsers"],

        /**
         * configuration of jasmine
         * sets the test order to random to determine when tests depend on other tests
         */
        client: {
            jasmine: {
                random: true
            }
        },

        /**
         * list of files / patterns to load in the browser
         */
        files: [
            {pattern: "dist/index.css", watched: true, nocache: true},
            {pattern: 'test-target/**/*.spec*(s).js', watched: true},
            {pattern: "node_modules/font-awesome/css/font-awesome.min.css", watched: false},
            {pattern: "node_modules/font-awesome/fonts/fontawesome-webfont.woff2", included: false}

        ],

        /**
         * pre process matching files before serving them to the browser
         */
        preprocessors: {
            "test-target/**/*.spec*(s).js": ["webpack"]
        },

        /**
         * use mocha for nice output on console
         * use junit for jenkins builds
         */
        reporters: ["mocha", "junit"],

        /**
         * configuration of junit test reporter
         */
        junitReporter: {
            outputDir: 'test-reports/'
        },

        /**
         * configuration of mocha test reporter
         */
        mochaReporter: {
            maxLogLines: 3
        },

        /**
         * web server port of karma
         */
        port: 9876,

        /**
         * enable / disable colors in the output (reporters and logs)
         */
        colors: true,

        /**
         * level of logging
         * possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
         */
        logLevel: config.LOG_INFO,

        /**
         * enable / disable watching file and executing tests whenever any file changes
         * gulp start test runs manually
         */
        autoWatch: true,

        /**
         * detect the browsers and use the first available for tests
         */
        detectBrowsers: {
            postDetection: function (availableBrowsers) {
                if (availableBrowsers.length > 1) {
                    const phantomAvailable = availableBrowsers.indexOf('PhantomJS') !== -1;
                    const chromeAvailable = availableBrowsers.indexOf('Chrome') !== -1;
                    const firefoxAvailable = availableBrowsers.indexOf('Firefox') !== -1;
                    const edgeAvailable = availableBrowsers.indexOf('Edge') !== -1;
                    const ieAvailable = availableBrowsers.indexOf('IE') !== -1;

// prefer any "real" browser over PhantomJS, but use only one of them
                    if (chromeAvailable) return ["Chrome"];
                    if (firefoxAvailable) return ["Firefox"];
                    if (edgeAvailable) return ["Edge"];
                    if (ieAvailable) return ["IE"];
                    if (phantomAvailable) return ["PhantomJS"];

// if none of these are available, use whatever is there
                    return availableBrowsers;
                } else {
                    return availableBrowsers;
                }
            }
        },

        /**
         * Continuous Integration mode
         * if true, Karma captures browsers, runs the tests and exits
         * configured by gulp
         */
        singleRun: false,

        /**
         * Concurrency level
         * how many browser should be started simultaneous
         */
        concurrency: Infinity
    })
};
