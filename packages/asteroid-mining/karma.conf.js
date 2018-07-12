module.exports = function (config) {
    config.set({

        basePath: "",

        frameworks: ["jasmine", "karma-typescript"],

        files: ["src/**/*.tsx"],

        exclude: [],

        preprocessors: {
            "**/*.tsx": "karma-typescript"
        },

        reporters: ["mocha", "karma-typescript"],

        port: 9876,

        colors: true,

        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        autoWatch: true,

        browsers: ["Chrome"],

        singleRun: false,

        concurrency: Infinity
    })
};
