/**
 * Controller der Startseite.
 * Zeigt nur die Kacheln an, für die der angemeldete Benutzer laut
 * Berechtigungsmatrix (model/permissions.json) freigegeben ist.
 */
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("de.hsrm.personalportal.controller.Home", {

		onInit: function () {
			this.getView().setModel(new JSONModel({ selfTiles: [], managerTiles: [], adminTiles: [] }), "homeView");
			this.getOwnerComponent().getRouter().getRoute("home")
				.attachPatternMatched(this._onRouteMatched, this);
		},

		/**
		 * Wird bei jedem Aufruf der Startseite ausgeführt.
		 */
		_onRouteMatched: function () {
			var oComponent = this.getOwnerComponent();
			var oRouter = oComponent.getRouter();

			// Schutz 1: ohne Login keine Startseite (KAN-49)
			if (!oComponent.getModel("session").getProperty("/loggedIn")) {
				oRouter.navTo("login", {}, true);
				return;
			}

			// Schutz 2: Rolle muss die Startseite sehen dürfen (KAN-50)
			if (!oComponent.hasPermission("home")) {
				oRouter.navTo("notAuthorized", {}, true);
				return;
			}

			// Kacheln nach Berechtigung filtern
			var aAllowed = (oComponent.getModel("tiles").getProperty("/tiles") || [])
				.filter(function (oTile) {
					return oComponent.hasPermission(oTile.permission);
				});
			var fnArea = function (sArea) {
				return aAllowed.filter(function (t) { return t.area === sArea; });
			};

			this.getView().getModel("homeView").setData({
				selfTiles: fnArea("self"),
				managerTiles: fnArea("manager"),
				adminTiles: fnArea("admin")
			});
		},

		/**
		 * Klick auf eine Kachel. Die Zielseiten folgen in späteren Sprints.
		 */
		onTilePress: function (oEvent) {
			var sTitle = oEvent.getSource().getHeader();
			var oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
			MessageToast.show(oBundle.getText("tileNotYet", [sTitle]));
		},

		/**
		 * Logout (KAN-25).
		 */
		onLogout: function () {
			this.getOwnerComponent().logout(false);
		}
	});
});
