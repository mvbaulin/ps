<?php
use App\Services\Component;
use App\Services\Router;

if (!isset($_SESSION["user"]) || !isset($_SESSION["user"]["id"])) {
  unset($_SESSION["user"]);
  Router::redirect("auth");
}
?>

<?php Component::add("header"); ?>

<main class="main main--dashboard">
  <?php Component::add("dashboard"); ?>
</main>

<?php Component::add("footer"); ?>
