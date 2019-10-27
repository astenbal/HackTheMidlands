<head>
  <title>Hackatank</title>
  <!--Link to the css file-->
  <link rel="stylesheet" href="style/main.css">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>

<body>
    <?php
    include 'backend/connection.php'; if(!isset($_SESSION['token'])){header('Location: login.php');}
    include 'includes/nav.php';
    echo "<main class='mainArea' id='gameOverMain'>";
    if(isset($_SESSION['gameover'])){
      if($_SESSION['gameover']=true){
        $userScore = $_SESSION['gamescore'];
        $username = $_SESSION['username'];
        $scoreQuery = "INSERT INTO score(name, score) VALUES ('$username', '$userScore')";
        $res = $conn->query($scoreQuery);
        echo 'Game over!<br>';
        echo 'Your score was: ' . $userScore;
        echo' <a href="index.php">Play again?</a>';
        $_SESSION['gameover']=false;
      }
      else{
        echo'Cheating is bad.';
      }
    }
    else{
      echo'Cheating is bad.';
    }
    ?>
  </main>
  <?php include 'includes/footer.php'; ?>
</body>
