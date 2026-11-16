/**
 * Controller der Seite "Keine Berechtigung".
 * Wird angezeigt, wenn ein angemeldeter Benutzer eine Seite ohne passende Rolle aufruft.
 */
sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("de.hsrm.personalportal.controller.NotAuthorized", {

		onInit: function () {
			this.getOwnerComponent().getRouter().getRoute("notAuthorized")
				.attachPatternMatched(function () {
					// Ohne Login direkt zurück zum Login
					if (!this.getOwnerComponent().getModel("session").getProperty("/loggedIn")) {
						this.getOwnerComponent().getRouter().navTo("login", {}, true);
					}
				}, this);
		},

		onLogout: function () {
			this.getOwnerComponent().logout(false);
		}
	});
});
