$(document).ready(function () {

    var data = {
        action: "score"
      };

      $.ajax({
        type: "POST",
        url: "http://localhost/JS%20-%20Copie/PHP/api2.php",
        dataType: "json",
        data: JSON.stringify(data),
        success: function(response) {
            // Mettre à jour les cellules de la table avec les scores récupérés
            
            $('#cassebriques-score').html(response.CasseBriques.Pseudo + ": " + response.CasseBriques.Points);
            $('#prince-score').html(response.Prince.Pseudo + ": " + response.Prince.Points);
        },
        error: function() {
            $('#cassebriques-score').html("Erreur lors de la récupération des scores");
            $('#prince-score').html("Erreur lors de la récupération des scores");
        }
    });
});