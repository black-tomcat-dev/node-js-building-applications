module.exports = function(grunt) {

    grunt.initConfig({
          pkg: grunt.file.readJSON('package.json'),
  
          watch: {
               target: {
                       files:['js/*.js','css/*.css'],
                       tasks:['uglify','cssmin']
               }
          },
          cssmin: {
                   combine: {
                             files: {
                                    'public/stylesheets/combined.css': ['public/stylesheets/custom.css', 'public/stylesheets/index.css', 'public/stylesheets/main.css']
                                    }
                            }
          },
          uglify: {
                  options: {
                            mangle: false
                           },
                  target: {
                            files: {
                           'public/js/combined.min.js': ['public/js/main.js','public/js/module1.js', 'public/js/module6.js']
                                   }
                             }
                  }
    });
      grunt.loadNpmTasks('grunt-contrib-cssmin');
      grunt.loadNpmTasks('grunt-contrib-uglify');
      grunt.loadNpmTasks('grunt-contrib-watch');
      grunt.registerTask('default',['watch']);
  }
  