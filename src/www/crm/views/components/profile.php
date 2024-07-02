<?php
use App\Services\Component;

?>

<li
  class="content"
  id="content-profile">
  <div class="content__container">
    <div class="content__wrapper">
      <h2 class="title content__title">Настройки</h2>
      <p class="content__additional">
        Дата смены пароля:
        <b>
          <?php
            $password_date = $_SESSION["user"]["password_date"];

            if ($password_date) {
              echo $password_date;
            }
            else {
              echo "не менялся";
            }
          ?>
        </b>
      </p>
    </div>
    <ul class="content__items">
      <li class="content__item content__item--profile">
        <form
          class="card content__card"
          action="/password"
          method="POST"
          enctype="multipart/form-data">

          <header
            class="title card__title center">
            Сменить пароль
          </header>

          <input
            class="input card__input"
            type="text"
            id="password"
            name="password"
            required
            placeholder="Старый пароль">

          <input
            class="input card__input"
            type="password"
            id="new_password"
            name="new_password"
            required
            placeholder="Новый пароль">

          <input
            class="input card__input"
            type="password"
            id="confirm_password"
            name="confirm_password"
            required
            placeholder="Подтвердить пароль">

          <input
            class="button card__button"
            type="submit"
            value="Применить">
          </form>
      </li>

      <li class="content__item">
        <div class="card content__card">
          <header
            class="title card__title center">
            Последняя смена пароля
          </header>
          <p class="card__text center">
            <?php
              $password_age = R::getCell(
                "SELECT get_password_age(?)", [$_SESSION["user"]["id"]]
              );

              if ($password_age === null) {
                echo "Не менялся";
              }
              else if ($password_age == 0) {
                echo "Сегодня";
              }
              else if ($password_age == 1) {
                echo "Вчера";
              }
              else {
                echo "$password_age дней назад";
              }
            ?>
          </p>
        </div>

        <div class="card card--pass-memory content__card">
          <header
            class="title card__title center">
            Важно
          </header>
          <p class="card__text center">
            Пароль необходимо менять каждые 30 дней, в случае если вы не
            смените пароль - вам будет заблокирован доступ к личному
            кабинету. В случае, если вы были заблокированы -
            необходимо обратиться к администрации.
          </p>
        </div>
      </li>
    </ul>

    <?php Component::add("logout") ?>
  </div>
</li>
