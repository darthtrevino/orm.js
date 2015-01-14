path = require('path')
async = require('async')
os = require('os')

module.exports = (grunt) ->
  grunt.util.async = async

  require('jit-grunt') grunt, {}
  require('time-grunt') grunt

  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

  grunt.registerTask 'default', ->
    console.log "TEST BUILD"
