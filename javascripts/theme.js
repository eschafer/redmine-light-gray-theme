(function() {
	"use strict";

	$(document).ready(function() {

		// I don't like how multiple value fields look, but can't uncheck that box.
		function fixMultipleValueCustomField(id) {
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
		}

		// Operating system.
		fixMultipleValueCustomField("issue_custom_field_values_1");
		
		// Browser.
		fixMultipleValueCustomField("issue_custom_field_values_7");

		// Mobile device.
		fixMultipleValueCustomField("issue_custom_field_values_12");
	});
}());
