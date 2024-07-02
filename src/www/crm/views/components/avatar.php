<div class="avatar activitybar__avatar">
  <img
    clas="avatar__img"
    src="
    <?php
      if ($_SESSION["user"]["role"] === "admin") {
        echo "assets/img/avatar_admin.jpeg";
      }
      else {
        echo "assets/img/avatar_manager.jpeg";
      }
    ?>"
    alt="user">
</div>
