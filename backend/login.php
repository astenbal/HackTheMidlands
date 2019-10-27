<?php
if(!empty($_POST['login'])){
  $user = $_POST['username'];
  $pass = $_POST['password'];
  $userQuery = "SELECT * FROM users WHERE username = '$user'";
  $userResult = $conn->query($userQuery);
  $fetchAcc = $userResult->fetch_assoc();
  if($userResult -> num_rows > 0){
    $encryptPass = $fetchAcc['password'];
    $verPass = password_verify($pass, $encryptPass);
    if($verPass){
      $_SESSION['token']=true;
      $_SESSION['username']=$user;
      echo '<a href="splash.php">Lets play</a> ';
    }
    else{
      echo'Password incorrect.';
    }
  }
  else{
    echo'No username found.';
  }
}

?>
