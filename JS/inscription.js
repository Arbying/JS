$(document).ready(function () {
  // Afficher le formulaire d'inscription lorsque le bouton est cliqué
  $("#inscriptionBtn").click(function () {
    $(".inscription-form").show();
  });



  
  // Validation du formulaire d'inscription
  $("#inscriptionForm").submit(function (event) {
    event.preventDefault();

    // Récupération des valeurs des champs du formulaire
    var login = $("#login").val();
    var password = $("#password").val();
    var passwordCheck = $("#passwordCheck").val();
    var email = $("#email").val();

    // Vérification des champs du formulaire
    var valid = true;

    
    if (!isValidLogin(login)) {
      $("#loginError").show();
      valid = false;
    } else {
      $("#loginError").hide();
    }

    if (!isValidPassword(password)) {
      $("#passwordError").show();
      valid = false;
    } else {
      $("#passwordError").hide();
    }

    if (password !== passwordCheck) {
      $("#passwordCheckError").show();
      valid = false;
    } else {
      $("#passwordCheckError").hide();
    }

    if (!isValidEmail(email)) {
      $("#emailError").show();
      valid = false;
    } else {
      $("#emailError").hide();
    }

    // Envoi du formulaire si tout est valide
    if (valid) {
      var data = {
        action: "inscription",
        login: login,
        password: CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64),
        email: email,
      };

      

      $.ajax({
        type: "POST",
        url: "http://localhost/JS%20-%20Copie//PHP/api.php",
        dataType: "json",
        data: JSON.stringify(data),
        success: function (response) {
          // Affichage du message d'inscription réussie
          $('.inscription-form').hide();
          $("#inscriptionMessage").show();
        },
        error: function (xhr, status, error) {
          $("#errorMessage").show();
        },
      });
    }
  });

  // Vérification de la validité du login
  function isValidLogin(login) {
    return login.length > 0 && login.length <= 25;
  }

  // Vérification de la validité du mot de passe
  function isValidPassword(password) {
    var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,25}$/;

    return regex.test(password);
  }

  // Vérification de la validité de l'adresse email
  function isValidEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
});
