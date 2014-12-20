module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 9001,
                    hostname: 'localhost',
                    base: '.',
                    open: {
                        target: 'http://localhost:9001',
                        appname: 'open'
                    }
                }
            }
        },
        jshint: {
            all: ['src/*'],
            options: {
                node: true,
            }
        },
        watch: {
            reload: {
                files: ['index.html','src/*.js'],
                tasks: [],
                options: {
                    livereload: true 
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('dev', ['connect','watch']);

};
