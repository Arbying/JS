// Fonction pour vérifier si un utilisateur est connecté
function checkUserLoggedIn() {
  var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)userLoggedIn\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  if (cookieValue === "true") {
    // Cachez le formulaire de connexion
    $("#loginForm").hide();
    $("#loginError").hide();
    $("#deconnexionBtn").show();
    $(".game-image").show();
    $("#img1").show();
    $("#img2").show();
    $("#img11").show();
    $("#img22").show();
    document.getElementById("welcomeTitle").innerHTML = "Bienvenue, " + getCookie("userLogin");
  } else {
    // Affichez le formulaire de connexion
    $("#loginForm").show();
    $("#deconnexionBtn").hide();
    $(".game-image").hide();
    $("#img1").hide();
    $("#img2").hide();
    $("#img11").hide();
    $("#img22").hide();
  }
}

// Fonction pour récupérer la valeur d'un cookie
function getCookie(cookieName) {
  var name = cookieName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(';');
  for(var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i];
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) == 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
}

$(document).ready(function() {
  // Vérifiez si l'utilisateur est connecté au chargement de la page
  checkUserLoggedIn();

  $("#loginForm").submit(function(event) {
    event.preventDefault();

    var login = $("#loginInput").val();
    var password = $("#passwordInput").val();

    var data = {
      action: "connexion",
      login: login,
      password: CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64)
    };

    $.ajax({
      type: "POST",
      url: "PHP/api.php",
      dataType: "json",
      data: JSON.stringify(data),
      success: function(response) {
        $("#loginForm").hide();
        $("#loginError").hide();
        $('.inscription-form').hide();
        $("#deconnexionBtn").show();
        $(".game-image").show();
        $("#img1").show();
        $("#img2").show();
        $("#img11").show();
        $("#img22").show();
        document.getElementById("welcomeTitle").innerHTML = "Bienvenue, " + login;
        document.cookie = "userLoggedIn=true; path=/";
        document.cookie = "userLogin=" + login + "; path=/";
      },
      error: function(xhr, status, error) {
        $("#loginForm").addClass("border-danger");
        $("#loginError").show();
      }
    });
  });




  
  $("#deconnexionBtn").click(function() {
    document.cookie = "userLoggedIn=false; path=/";
    document.cookie = "userLogin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    location.reload();
  });
});