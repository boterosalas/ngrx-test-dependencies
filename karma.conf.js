// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      // require('karma-coverage-istanbul-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
      jasmine: {
        random: false,
        timeoutInterval: 15000,
      },
    },
    coverageReporter: {
      dir: 'coverage',
      subdir: '.',
      reporters:[
        {type: 'html'},
        {type: 'lcov'},
        {type: 'lcovonly'},
      ],
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    // browsers: ['Chrome'],
    //singleRun: false,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    customLaunchers: {
      ChromeDebug: {
        base: 'Chrome',
        flags: ['--remote-debugging-port=9333'],
      },
    },
    restartOnFileChange: true,
    restartOnFileChange: true,
    captureTimeout: 210000,
    browserDisconnectTolerance: 3,
    browserDisconnectTimeout: 310000,
    browserNoActivityTimeout: 310000,
  });
};
