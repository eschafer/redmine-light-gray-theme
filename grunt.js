/*global module:false*/

(function() {
	"use strict";

	module.exports = function(grunt) {

		// Project configuration.
		grunt.initConfig({

			// List of files to be linted with JSHint.
			lint: {
				files: ["grunt.js", "javascripts/theme.js"]
			},

			jshint: {
				options: {

					// Enforcing options
					bitwise: true,
					curly: true,
					eqeqeq: true,
					forin: true,
					immed: true,
					latedef: true,
					newcap: true,
					noarg: true,
					noempty: true,
					nonew: true,
					regexp: true,
					undef: true,
					strict: true,
					trailing: true,
					// maxlen ignored for now

					// Environments
					browser: true,
					devel: true,
					jquery: true,
					nonstandard: true
				},

				globals: {
					
				}
			},

			sass: {
				dev: {
					files: {
						"stylesheets/application.css": "stylesheets/application.scss"
					}
				}
			}
		});

		grunt.loadNpmTasks('grunt-contrib-sass');

		// Default task.
		grunt.registerTask("default", "lint sass");
	};
}());