<?php
  $rows = \R::findAll("v_info");
  $info = reset($rows);
?>

<div
  class="card card--info footer__card
  <?php
    if ($_SESSION["user"]["role"] === "admin" || !$info["title"]) {
      echo "hidden";
    }
  ?>
  ">
  <header class="title card__title center">
    <?php
      if ($info) {
        echo $info->title;
      }
    ?>
  </header>
  <p class="card__text center">
    <?php
      if ($info) {
        echo $info->text;
      }
    ?>
  </p>
  <button class="close card__close"></button>
</div>
