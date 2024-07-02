<?php
use App\Services\Component;

?>

<li
  class="content"
  id="content-admin">

  <?php if ($_SESSION["user"]["role"] === "admin"): ?>

  <?php Component::add("users") ?>
  <?php Component::add("info_config") ?>

  <?php endif; ?>
</li>
