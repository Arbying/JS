// deconnection.js

$(document).ready(function() {
    $("#deconnexionBtn").click(function(event) {
      event.preventDefault();
  
      // Supprimez le cookie de connexion
      document.cookie = "userLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  
      // Réinitialisez le formulaire de connexion
      $("#loginForm").show();
      $("#deconnexionBtn").hide();
      $(".game-image").hide();
      $("#img1").hide();
      $("#img2").hide();
      $("#img11").hide();
      $("#img22").hide();
      document.getElementById("welcomeTitle").innerHTML = "Bienvenue sur Mini-Jeux";
      document.getElementById("loginInput").value = "";
      document.getElementById("passwordInput").value = "";
    });
  });
  