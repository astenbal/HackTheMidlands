<?php include 'backend/connection.php'; ?>
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
      <nav id='topBar'>
        <article id='topTitle' class='col-xs-12 col-sm-6'>Hackatank</article>
        <section id='navBar' class='col-xs-12 col-sm-6'>
          <a href='index.html'><article id='navOption'>Game</article></a>
          <a href='highscore.html'><article id='navOption'>Highscore</article></a>
        </section>
      </nav>
      <main class='mainArea'>
        <article id='tableTitle'>Highscores</article>
        <table>
          <tr id='tblTitles'>
            <th>Pos</th>
            <th>Name</th>
            <th>Score</th>
          </tr>

          <?php
          $sql = "SELECT * FROM score ORDER BY score DESC";
          $res = $conn->query($sql);
          $counter = 1;
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
      <footer>
        Created by [Team name]
      </footer>
    </body>
</html>
