<?php include 'backend/connection.php'; if(!isset($_SESSION['token'])){header('Location: login.php');}?>
<html>
    <head>
      <!--Title on the tab-->
        <title>Hackatank</title>
        <!--Link to the css file-->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel = "stylesheet" type = "text/css" href = "style/main.css" />
        <link rel = "stylesheet" type = "text/css" href = "style/highscore.css" />
    </head>

    <body>
      <!--The top bar that displays the game name-->
      <?php include 'includes/nav.php';?>

      <main class='mainArea'>
        <article id='tableTitle'>Highscores</article>
        <table>
          <tr id='tblTitles'>
            <th>Pos</th>
            <th>Name</th>
            <th>Score</th>
          </tr>

          <?php
          $user = $_GET['user'];
          $sql = "SELECT * FROM score WHERE name = '$user' ORDER BY score DESC";
          $res = $conn->query($sql);
          $counter = 1;
          echo $user;
          while($row=$res->fetch_assoc()){
            $name = $row['name'];
            $score = $row['score'];
            echo'
            <tr class="score">
              <td> #'.$counter.'</td>
              <td>'.$name.'</td>
              <td>'.$score.'</td>
            </tr>
            ';
            $counter++;
          }
          ?>
        </table>
      </main>
      <?php include ("includes/footer.php"); ?>
    </body>
</html>
