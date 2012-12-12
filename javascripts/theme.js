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
		this.addBugDescriptionDefaultText();
		this.fixMultipleValueCustomFields();
	};

	redmine.addBugDescriptionDefaultText = function() {
		var defaultText = "*URL:*\r\n\r\n\r\n*Steps to reproduce:*\r\n# \r\n# \r\n\r\n*Observed result:*\r\n\r\n\r\n*Expected result:*\r\n\r\n\r\n*Notes:*\r\n";

		// Check to see if we're on the new bug page.
		var regex = /\/redmine\/projects\/[a-z0-9\-_]+\/issues\/new/;
		var success = regex.exec(window.location.pathname);
		if (success) {

			// Check to see which tracker is selected.
			$("#issue_tracker_id").children().each(function() {
				var $issueDescription = $("#issue_description");

				if ($(this).text() === "Bug" && $(this).attr("selected") === "selected") {

					// If the bug tracker is selected, and no description has been entered,
					// fill with default text.
					if ($issueDescription.text() === "") {
						$issueDescription.text(defaultText);
					}
				} else if ($(this).text() !== "Bug" && $(this).attr("selected") === "selected") {

					// If the another tracker is selected, and the description is filled
					// with the default bug text, clear it.
					if ($issueDescription.text().split(/\r\n|\r|\n/).join("") === defaultText.split(/\r\n|\r|\n/).join("")) {
						$issueDescription.text("");
					}
				}
			});
		}
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
