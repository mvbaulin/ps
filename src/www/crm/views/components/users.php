<div class="content__container">
  <div class="content__wrapper">
    <h2 class="title content__title">Пользователи</h2>
  </div>

  <div class="table content__table">
    <table class="table__table">
      <caption class="table__caption">Менеджеры</caption>
      <tr class="table__row">
        <th class="table__head">id</th>
        <th class="table__head">Логин</th>
        <th class="table__head">Имя</th>
        <th class="table__head">Пароль действует (дней)</th>
        <th class="table__head">Рейтинг</th>
        <th class="table__head">Заказы (сегодня)</th>
        <th class="table__head">Заказы (всего)</th>
        <th class="table__head">Отменено заказов</th>
      </tr>

      <?php
        $managers = \R::findAll("v_managers");

        foreach ($managers as $manager) {
          $td = '<td class="table__cell">';

          echo '<tr class="table__row">';
          echo $td . $manager->id . '</td>';
          echo $td . $manager->login . '</td>';
          echo $td . $manager->name . '</td>';
          echo $td . $manager->password_age . '</td>';
          echo $td . $manager->rate . '</td>';
          echo $td . $manager->orders_today . '</td>';
          echo $td . $manager->orders_all . '</td>';
          echo $td . $manager->orders_cancelled . '</td>';
          echo "</tr>";
        }
      ?>
    </table>
  </div>
</div>
