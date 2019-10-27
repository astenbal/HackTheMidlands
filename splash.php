<?php include 'backend/connection.php'; if(!isset($_SESSION['token'])){header('Location: login.php');}?>

<html>
    <head>
      <!--Title on the tab-->
        <title>Hackatank</title>
        <!--Link to the css file-->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel = "stylesheet" type = "text/css" href = "style/main.css" />
        <link rel = "stylesheet" type = "text/css" href = "style/splash.css" />
    </head>

    <body>
      <!--The top bar that displays the game name-->
      <nav id='topBar'>
        <article id='topTitle' class='col-12'>Hackatank</article>
      </nav>
      <main class='mainArea' id='splashMain'>
        <article id='splashText'>A tank game created in 24 hours!</article>
        <section id='splashNav'>
          <a href='index.php'><article class='splashOption'>Play</article></a>
          <a href='index.php?multiplayer'><article class='splashOption'>Multiplayer</article></a>
          <a href='highscore.php'><article class='splashOption'>Highscores</article></a>
        </section>
      </main>
      <?php include ("includes/footer.php"); ?>
    </body>
</html>
