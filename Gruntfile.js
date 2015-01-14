var path = require('path'),
    async = require('async'),
    os = require('os');

module.exports = function (grunt) {
  grunt.util.async = async;
  require('jit-grunt')(grunt, {});
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    /**
     * JSHinting
     */
    jshint: {
      gruntfile: ['Gruntfile.js'],
      main: ['lib/**/*.js'],
      test: ['test/**/*.js']
    },

    /**
     * Mocha Tests
     */
    mochaTest: {
      unit_test: {
        options: {
          reporter: 'spec',
          timeout: 10000,
          bail: true
        },
        src: [
          "test/node/**/" + (grunt.option('spec') || '') + "*.spec.js"
        ]
      }
    }
  });

  grunt.registerTask('test', [
    'jshint:gruntfile',
    'mochaTest'
  ]);
  grunt.registerTask("default", 'test');
};
