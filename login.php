<?php include 'backend/connection.php'; ?>
<head>
  <title>Hackatank</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <link rel = "stylesheet" type = "text/css" href = "style/login.css" />
</head>

<body>
  <main>
    <article id='loginText'>Login</article>
    <form method='post'>
      <input type='text' name='username' placeholder='Username...'>
      <input type='password' name='password' placeholder='Password...'>
      <input type='submit' name='login'>
    </form>
    Don't have an account? <a href='register.php'>Register</a>

    <?php include 'backend/login.php'; ?>

  </main>
</body>
