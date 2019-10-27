<?php
if(!empty($_POST['register'])){
  $username = $_POST['username'];
  $password = $_POST['password'];
  $confpass = $_POST['confPassword'];

  if(strlen($username)>12){
    echo'Your username must be less than 13 characters.';
  }
  else{
    if($confpass == $password){
      $encryptPass = password_hash($password, PASSWORD_DEFAULT);
      $userSearch = "SELECT * FROM users WHERE username='$username'";
      $userQuery = $conn->query($userSearch);

      if($userQuery->num_rows>0){
        echo'That user already exists.';
      }
      else{
        $addQuery = "INSERT INTO users(username,password) VALUES ('$username', '$encryptPass')";
        $addAccount = $conn->query($addQuery);
        echo'Account created, please <a href="login.php">login.</a>';
      }
    }
    else{
      echo'Passwords do not match.';
    }
  }
}


?>
