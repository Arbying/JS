<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Connexion à la base de données
$host = "localhost";
$user = "root";
$password = "root";
$db_name = "game";

$conn = new mysqli($host, $user, $password, $db_name);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(array("message" => "Erreur de connexion à la base de données"));
    exit();
}

// Récupération des données JSON envoyées par le client
$data = json_decode(file_get_contents("php://input"));

// Vérification du type d'action
if (isset($data->action)) {
    if ($data->action === "inscription") {
        // Inscription
        // Vérification de l'existence de l'utilisateur
        $sql = "SELECT * FROM joueurs WHERE utilisateur = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $data->login);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            http_response_code(409);
            echo json_encode(array("message" => "Login déjà utilisé"));
            exit();
        }

        // Ajout du joueur dans la base de données
        $sql = "INSERT INTO joueurs (utilisateur, MDP, Mail) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $data->login, $data->password, $data->email);

        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(array("message" => "Inscription réussie"));
        } else {
            http_response_code(500);
            echo json_encode(array("message" => "Erreur lors de l'inscription"));
        }

    } elseif ($data->action === "connexion") {
        // Connexion
        // Vérification de l'existence de l'utilisateur et du mot de passe
        $sql = "SELECT * FROM joueurs WHERE utilisateur = ? AND MDP = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $data->login, $data->password);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            http_response_code(200);
            echo json_encode(array("success" => true, "message" => "Connexion réussie"));
        } else {
            http_response_code(401);
            echo json_encode(array("success" => false, "message" => "Échec de la connexion"));
        }
    }
    elseif ($data->action === "score") {
            // Récupération meilleurs scores pour CasseBriques
            $sqlCasseBriques = "SELECT Joueur AS Pseudo, Points
                                FROM scores
                                WHERE Jeu = 'CasseBriques'
                                ORDER BY Points DESC
                                LIMIT 1";
                
            $resultCasseBriques = $conn->query($sqlCasseBriques);
            $scoreCasseBriques = $resultCasseBriques->fetch_assoc();
        
            // Récupération meilleurs scores pour Prince
            $sqlPrince = "SELECT Joueur AS Pseudo, Points
                            FROM scores
                            WHERE Jeu = 'Prince'
                            ORDER BY Points DESC
                            LIMIT 1";
        
            $resultPrince = $conn->query($sqlPrince);
            $scorePrince = $resultPrince->fetch_assoc();
        
            // Tableau pour stocker les meilleurs scores

            $bestScores = array(
                "CasseBriques" => $scoreCasseBriques,
                "Prince" => $scorePrince
            );
            
        
            // Retourner les meilleurs scores au format JSON
            http_response_code(200);
            echo json_encode($bestScores);
        } 
        
        
        elseif ($data->action === "MAJscore") {
            // Maj score dans la base de données
        
           
            $pseudo = $data->pseudo;
            $jeu = $data->jeu;
            $points = $data->points;
        
            $sqlUpdateScore = "UPDATE scores
                               SET Points = ?
                               WHERE Joueur = ? AND Jeu = ?";
        
            $stmtUpdateScore = $conn->prepare($sqlUpdateScore);
            $stmtUpdateScore->bind_param("iss", $points, $pseudo, $jeu);
        
            if ($stmtUpdateScore->execute()) {
                http_response_code(200);
                echo json_encode(array("message" => "Score mis à jour avec succès"));
            } else {
                http_response_code(500);
                echo json_encode(array("message" => "Erreur lors de la mise à jour du score"));
            }
        }
        
   
        $stmt->close();
}

$conn->close();
?>
