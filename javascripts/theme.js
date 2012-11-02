// Google Analytics
/*jshint eqeqeq: false*/
/*jshint strict: false*/
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-XXXXXXXX-X']);
_gaq.push(['_trackPageview']);
(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

(function() {
	"use strict";

	var redmine = {};

	redmine.init = function() {

		// I don't like how multiple value fields look, but can't uncheck that box.
		// TODO: If you're updating the issue, and change the project, tracker,
		// or status, the custom fields reload with the original display. I could
		// also just modify the database to fix the issue...
		this.fixMultipleValueCustomFields();

		// Override
		// Fix multiple value custom fields if the issue form is updated.
		window.updateIssueFrom = function(url) {
			$.ajax({
				url: url,
				type: 'post',
				data: $('#issue-form').serialize(),
				success: function() {
					redmine.fixMultipleValueCustomFields();
				}
			});
		};
	};

	redmine.fixMultipleValueCustomFields = function() {

		// Operating system.
		this.fixMultipleValueCustomField("issue_custom_field_values_1");

		// Browser.
		this.fixMultipleValueCustomField("issue_custom_field_values_7");

		// Mobile device.
		this.fixMultipleValueCustomField("issue_custom_field_values_12");
	};

	redmine.fixMultipleValueCustomField = function(id) {
		var selected = false;
		var $select = $("#" + id);

		// Check to see if one of the options has been selected.
		$select.children().each(function() {
			if ($(this).attr("selected") === "selected") {
				selected = true;
			}
		});

		// Turn of multiple selection, and add an empty option.
		$select.removeAttr("multiple").prepend("<option value=\"\"></option>");

		// If no options have been selected, then the empty option will be.
		if (!selected) {
			$select.val("");
		}
	};

	$(document).ready(function() {
		redmine.init();
	});
}());
