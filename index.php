<?php include 'backend/connection.php'; if(!isset($_SESSION['token'])){header('Location: login.php');}?>
<?php
if(isset($_GET['multiplayer'])){
  $_SESSION['multi']=true;
}
else{
  $_SESSION['multi']=false;
}
?>
<html>
    <head>
      <!--Title on the tab-->
        <title>Hackatank</title>
        <!--Link to the css file-->
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel = "stylesheet" type = "text/css" href = "style/main.css" />
    </head>

    <body>
      <!--The top bar that displays the game name-->
      <?php include 'includes/nav.php';?>
      <!--Start of game code-->
      <canvas id="game">
      </canvas>
      <div id="images" style="display:none">
          <img id="player" src="images/tankBlue.png">
          <img id="wall" src="images/wall.png">
          <img id="wallBreaking" src="images/wallBreaking.png">
          <img id="enemy" src="images/tankRed.png">
          <img id="bullet" src="images/bullet.png">
          <img id="folEnemy" src="images/tankYellow.png">
          <img id="bulEnemy" src="images/tankTop.png">
          <img id="def" src="images/defence.png">
          <img id="str" src="images/strength.png">
          <img id="speed" src="images/speed.png">
          <img id="hitp" src="images/health.png">
          <img id="coin" src="images/coin.png">
      </div>
      <script>var url = window.location.href;
        var multiplayer = url.includes('multiplayer');
      </script>
      <script src= "https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.js"></script>
      <script src="src/object/gameobject.js"></script>
      <script src="src/object/obstacle/obstacle.js"></script>
      <script src="src/object/obstacle/wall.js"></script>
      <script src="src/object/playable/playable.js"></script>
      <script src="src/object/playable/player.js"></script>
      <script src="src/object/playable/multiplayer.js"></script>
      <script src="src/object/playable/enemy/enemy.js"></script>
      <script src="src/object/playable/enemy/randomenemy.js"></script>
      <script src="src/object/playable/enemy/followenemy.js"></script>
      <script src="src/object/playable/enemy/bulletenemy.js"></script>
      <script src="src/object/bullet/bullet.js"></script>
      <script src="src/object/menu/menuobject.js"></script>
      <script src="src/object/menu/statmenu.js"></script>
      <script src="src/game.js"></script>
      <script>Main();</script>
    </body>
    <?php include ("includes/footer.php"); ?>
</html>
