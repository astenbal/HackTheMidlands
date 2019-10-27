<?php
include 'backend/connection.php';
if($_SESSION['multi'] == true){
  header("Location: gameover.php");
}
else{
  $_SESSION['gameover']=true;
  $_SESSION['gamescore']=$_GET['score'];
  header("Location: gameover.php");
}

?>
