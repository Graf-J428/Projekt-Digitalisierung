// Login – Klick-Dummy: nur Oberflächenverhalten, keine Anmeldung, kein Backend.

(function () {
  "use strict";

  // Formular absenden: verhindert das Neuladen der Seite, sonst passiert nichts.
  // Hier wird später die Anmeldung gegen SAP HCM angebunden.
  document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();
  });

  // "Passwort vergessen?" führt im Klick-Dummy nirgendwohin.
  document.getElementById("forgot-link").addEventListener("click", function (event) {
    event.preventDefault();
  });

  // Passwort anzeigen / verbergen (reines Oberflächenverhalten).
  var toggle = document.getElementById("password-toggle");
  var password = document.getElementById("password");
  toggle.addEventListener("click", function () {
    var show = password.type === "password";
    password.type = show ? "text" : "password";
    toggle.setAttribute("aria-pressed", String(show));
    toggle.setAttribute("aria-label", show ? "Passwort verbergen" : "Passwort anzeigen");
  });
})();
