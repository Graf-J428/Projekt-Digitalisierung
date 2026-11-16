/**
 * Controller der Root-View. Setzt die Inhaltsdichte passend zum Gerät.
 */
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/Device"
], function (Controller, Device) {
	"use strict";

	return Controller.extend("de.hsrm.personalportal.controller.App", {
		onInit: function () {
			// Kompakt bei Maus-Bedienung, großzügig bei Touch
			this.getView().addStyleClass(Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact");
		}
	});
});
