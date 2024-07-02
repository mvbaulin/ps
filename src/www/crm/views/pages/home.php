<?php
use App\Services\Component;
use App\Services\Router;

unset($_SESSION["user"]);
Router::redirect("auth");
?>

<?php Component::add("header"); ?>

<main class="main">
  <h1>HOME</h1>
</main>

<?php Component::add("footer"); ?>
