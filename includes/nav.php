<nav id='topBar'>
  <article id='topTitle' class='col-xs-12 col-sm-6'>Hackatank</article>
  <section id='navBar' class='col-xs-12 col-sm-6'>
    <a href='index.php'><article id='navOption'>Game</article></a>
    <a href='highscore.php'><article id='navOption'>Highscores</article></a>
    <?php echo'<a href="profile.php?user='.$_SESSION['username'].'">'; ?><article id='navOption'><?php echo $_SESSION['username']; ?></article></a>
  </section>
</nav>
