// Google Analytics
/*jshint eqeqeq: false*/
/*jshint strict: false*/
var _gaq = _gaq || [];
_gaq.push(["_setAccount", "UA-XXXXXXXX-X"]);
_gaq.push(["_trackPageview"]);
(function() {
	var ga = document.createElement("script"); ga.type = "text/javascript"; ga.async = true;
	ga.src = ("https:" == document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";
	var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ga, s);
})();

(function() {
	"use strict";

	var redmine = {};

	redmine.init = function() {

		this.updateMarkup();

		// Override
		// Fix multiple value custom fields if the issue form is updated.
		window.updateIssueFrom = function(url) {
			$.ajax({
				url: url,
				type: "post",
				data: $("#issue-form").serialize(),
				success: function() {
					redmine.updateMarkup();
				}
			});
		};
	};

	redmine.updateMarkup = function() {
		this.fixMultipleValueCustomFields();
	};

	redmine.fixMultipleValueCustomFields = function() {

		// I don't like how multiple value fields look, but can't uncheck that box.
		//  1: Operating system
		//  7: Browser
		// 12: Mobile device
		var customFieldIndices = [1, 7, 12];

		for (var i = 0; i < customFieldIndices.length; i++) {
			this.fixMultipleValueCustomField("issue_custom_field_values_" + customFieldIndices[i]);
		}
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

		// If no options have been selected, then select the empty option.
		if (!selected) {
			$select.val("");
		}
	};

	$(document).ready(function() {
		redmine.init();
	});
}());
