<?php
use App\Services\Component;

?>

<li class="content" id="content-orders">
  <div class="content__container">
    <div class="content__wrapper">
      <h2 class="title content__title">Заказы</h2>
    </div>

    <div class="table content__table">
    <table class="table__table">
      <caption class="table__caption">Заказы</caption>
      <tr class="table__row">
        <th class="table__head">id</th>
        <th class="table__head">Менеджер</th>
      </tr>

      <?php
        $managers = \R::findAll("v_managers");

        foreach ($managers as $manager) {
          $td = '<td class="table__cell">';

          echo '<tr class="table__row">';
          echo $td . $manager->id . '</td>';
          echo $td . $manager->name . '</td>';
          echo "</tr>";
        }
        ?>
    </table>
  </div>
</li>
