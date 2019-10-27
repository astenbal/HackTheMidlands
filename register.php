<?php include'backend/connection.php'; ?>
<head>
  <title>Hackatank</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  <link rel = "stylesheet" type = "text/css" href = "style/login.css" />
</head>

<body>
  <main>
    <article id='loginText'>Register</article>
    <form method='post'>
      <input type='text' name='username' placeholder='Username...'>
      <input type='password' name='password' placeholder='Password...'>
      <input type='password' name='confPassword' placeholder='Confirm password...'>
      <input type='submit' name='register'>
    </form>

    <?php include 'backend/register.php'; ?>

  </main>
</body>
