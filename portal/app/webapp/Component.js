/**
 * Root-Component des Personal-Portals.
 * Lädt die Konfiguration aus der manifest.json, legt das Session-Modell an,
 * prüft Berechtigungen anhand der Matrix (model/permissions.json, KAN-27),
 * überwacht die Inaktivität (Session-Timeout) und startet den Router.
 */
sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel"
], function (UIComponent, JSONModel) {
	"use strict";

	// Nach 5 Minuten ohne Maus-, Tastatur- oder Touch-Eingabe wird automatisch abgemeldet.
	// Zum Testen lokal z. B. index.html?timeout=15 aufrufen (Wert in Sekunden).
	var DEFAULT_TIMEOUT_SECONDS = 5 * 60;
	var CHECK_INTERVAL_MS = 1000;
	var ACTIVITY_EVENTS = ["mousemove", "mousedown", "keydown", "touchstart", "wheel", "scroll"];

	return UIComponent.extend("de.hsrm.personalportal.Component", {
		metadata: {
			manifest: "json",
			interfaces: ["sap.ui.core.IAsyncContentCreation"]
		},

		init: function () {
			// Basisklasse initialisieren (Modelle aus dem Manifest werden hier angelegt)
			UIComponent.prototype.init.apply(this, arguments);

			// Session-Modell: merkt sich, wer angemeldet ist und welche Rollen er hat
			this.setModel(new JSONModel(this.getEmptySession()), "session");

			// Inaktivität überwachen
			this._iTimeoutMs = this._readTimeoutSeconds() * 1000;
			this._startActivityWatch();

			// Router starten: leere URL (#) zeigt die Login-Seite
			this.getRouter().initialize();
		},

		/**
		 * Leerer Zustand = niemand angemeldet.
		 * @param {boolean} [bTimedOut] true, wenn wegen Inaktivität abgemeldet wurde
		 * @returns {object} leere Session
		 */
		getEmptySession: function (bTimedOut) {
			return {
				loggedIn: false,
				timedOut: !!bTimedOut,
				username: "",
				name: "",
				orgUnit: "",
				roles: [],
				roleText: ""
			};
		},

		/**
		 * Wird nach erfolgreichem Login aufgerufen.
		 * @param {object} oUser Benutzer aus den Testdaten
		 * @param {string} sRoleText lesbarer Name der höchsten Rolle
		 */
		login: function (oUser, sRoleText) {
			this.getModel("session").setData({
				loggedIn: true,
				timedOut: false,
				username: oUser.username,
				name: oUser.name,
				orgUnit: oUser.orgUnit,
				roles: oUser.roles.slice(),
				roleText: sRoleText
			});
			this._iLastActivity = Date.now();
			this.getRouter().navTo("home", {}, true);
		},

		/**
		 * Abmelden: Session leeren und zurück zum Login.
		 * @param {boolean} [bTimedOut] true bei automatischer Abmeldung
		 */
		logout: function (bTimedOut) {
			this.getModel("session").setData(this.getEmptySession(bTimedOut));
			this.getRouter().navTo("login", {}, true);
		},

		/**
		 * Prüft anhand der Berechtigungsmatrix, ob der angemeldete Benutzer
		 * eine Funktion nutzen darf (mindestens eine seiner Rollen ist erlaubt).
		 * @param {string} sPermission Schlüssel aus permissions.json, z. B. "genehmigungen"
		 * @returns {boolean}
		 */
		hasPermission: function (sPermission) {
			var aAllowed = this.getModel("permissions").getProperty("/" + sPermission) || [];
			var aRoles = this.getModel("session").getProperty("/roles") || [];
			return aRoles.some(function (sRole) {
				return aAllowed.indexOf(sRole) !== -1;
			});
		},

		/**
		 * Merkt sich jede Benutzeraktivität und prüft jede Sekunde,
		 * ob die erlaubte Inaktivitätszeit überschritten ist.
		 */
		_startActivityWatch: function () {
			var that = this;
			this._iLastActivity = Date.now();
			this._fnActivity = function () {
				that._iLastActivity = Date.now();
			};
			ACTIVITY_EVENTS.forEach(function (sEvent) {
				document.addEventListener(sEvent, that._fnActivity, { passive: true, capture: true });
			});
			this._iTimer = setInterval(function () {
				var bLoggedIn = that.getModel("session").getProperty("/loggedIn");
				if (bLoggedIn && Date.now() - that._iLastActivity >= that._iTimeoutMs) {
					that.logout(true);
				}
			}, CHECK_INTERVAL_MS);
		},

		_readTimeoutSeconds: function () {
			var iParam = parseInt(new URLSearchParams(window.location.search).get("timeout"), 10);
			return iParam > 0 ? iParam : DEFAULT_TIMEOUT_SECONDS;
		},

		destroy: function () {
			var that = this;
			clearInterval(this._iTimer);
			ACTIVITY_EVENTS.forEach(function (sEvent) {
				document.removeEventListener(sEvent, that._fnActivity, { capture: true });
			});
			UIComponent.prototype.destroy.apply(this, arguments);
		}
	});
});
