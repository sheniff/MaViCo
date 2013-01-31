/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    lint: {
      files: ['grunt.js', 'src/**/*.js', 'spec/**/*.js']
    },
    qunit: {
      files: ['test/**/*.html']
    },
    coffee: {
      app: {
        src: 'src/coffee/**/*.coffee',
        dest: 'src/js'
      }
    },
    concat: {
      dist: {
        src: [
          '<banner:meta.banner>',
          //'<file_strip_banner:src/<%= pkg.name %>.js>',
          'src/js/**/*.js'
        ],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    'jasmine' : {
      src: [
        'lib/jquery/jquery.min.js',
        'lib/jasmine-dom/lib/jasmine-dom-fixtures.js',
        'lib/jasmine-dom/lib/jasmine-dom-matchers.js',
        'src/**/*.js'
      ],
      specs : 'spec/**/*.js',
      helpers : 'specs/specHelpers.js',
      timeout : 10000,
      junit : {
        output : 'junit/'
      },
      phantomjs : {
        'ignore-ssl-errors' : true
      }
    },
    'jasmine-server' : {
      browser : true
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint qunit'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {}
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'lint qunit concat min');

  grunt.loadNpmTasks('grunt-jasmine-runner');

  grunt.loadNpmTasks('grunt-coffee');
};
