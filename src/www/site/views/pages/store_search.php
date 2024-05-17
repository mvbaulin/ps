<?php
use App\Services\Component;
use App\Services\Router;
?>

<?php Component::add('store_header'); ?>

<main>
  <input type="text" placeholder="Поиск">

  <div class="container">
    <a href="store/item" class=""></a>
  </div>
</main>

<script>
  let tg = window.Telegram.WebApp;
  tg.BackButton.show()

  tg.BackButton.onClick(function() {
      window.location.replace("https://testtrtr.ru/store");
      tg.BackButton.hide();
  });
</script>


<?php Component::add('store_footer'); ?>
