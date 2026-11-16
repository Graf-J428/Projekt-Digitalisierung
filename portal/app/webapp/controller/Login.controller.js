/**
 * Controller der Login-Seite.
 * Prüft Benutzer und Passwort gegen die Testbenutzer (model/users.json),
 * ermittelt die Rolle und leitet zur Startseite weiter.
 * Später wird die Prüfung durch die Anmeldung am SAP-System ersetzt.
 */
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("de.hsrm.personalportal.controller.Login", {

		onInit: function () {
			// Lokales Modell nur für diese Seite (Eingaben und Fehlermeldung)
			this.getView().setModel(new JSONModel({ username: "", password: "", errorText: "" }), "loginView");

			// Bei jedem Aufruf der Login-Seite die Felder leeren
			this.getOwnerComponent().getRouter().getRoute("login")
				.attachPatternMatched(this._resetForm, this);
		},

		/**
		 * Klick auf "Anmelden" oder Enter in einem Eingabefeld.
		 */
		onLoginPress: function () {
			var oForm = this.getView().getModel("loginView");
			var sUser = (oForm.getProperty("/username") || "").trim().toUpperCase();
			var sPassword = oForm.getProperty("/password") || "";

			// 1. Pflichtfelder prüfen
			if (!sUser || !sPassword) {
				oForm.setProperty("/errorText", this._text("loginErrorEmpty"));
				return;
			}

			// 2. Benutzer in den Testdaten suchen
			var aUsers = this.getOwnerComponent().getModel("users").getProperty("/users") || [];
			var oUser = aUsers.find(function (u) {
				return u.username === sUser && u.password === sPassword;
			});

			if (!oUser) {
				oForm.setProperty("/errorText", this._text("loginErrorWrong"));
				oForm.setProperty("/password", "");
				return;
			}

			// 3. Session setzen und zur Startseite (siehe Component.login).
			//    Angezeigt wird die höchste Rolle: HR vor MSS vor ESS.
			var sTopRole = ["HR", "MSS", "ESS"].find(function (r) {
				return oUser.roles.indexOf(r) !== -1;
			});
			this.getOwnerComponent().login(oUser, this._text(sTopRole ? "role_" + sTopRole : "role_NONE"));
		},

		_resetForm: function () {
			this.getView().getModel("loginView").setData({ username: "", password: "", errorText: "" });
		},

		_text: function (sKey) {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle().getText(sKey);
		}
	});
});
