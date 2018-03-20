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
            {pattern: "node_modules/font-awesome/css/font-awesome.min.css", watched: false},
            {pattern: "node_modules/font-awesome/fonts/fontawesome-webfont.woff2", included: false},
            {pattern: 'test-target/**/*.spec*(s).js', watched: true}
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
        reporters: ["mocha"],

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
                    const chromeAvailable = availableBrowsers.indexOf('Chrome') !== -1;
                    const firefoxAvailable = availableBrowsers.indexOf('Firefox') !== -1;
                    const edgeAvailable = availableBrowsers.indexOf('Edge') !== -1;

                    if (chromeAvailable) return ["Chrome"];
                    if (firefoxAvailable) return ["Firefox"];
                    if (edgeAvailable) return ["Edge"];

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
