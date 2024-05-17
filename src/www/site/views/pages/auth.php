<?php use App\Services\Component;?>

<?php Component::add("header"); ?>

<main class="main main--login">
  <form
    class="card card--login fixed"
    action="/login"
    method="POST"
    enctype="multipart/form-data">

    <header
      class="title card__title center">
      Авторизация
    </header>

    <input
      class="input card__input"
      type="text"
      id="login"
      name="login"
      required
      placeholder="Логин"
      >

    <input
      class="input card__input"
      type="password"
      id="password"
      name="password"
      required
      placeholder="Пароль"
      >

    <input
      class="button card__button"
      type="submit"
      value="Войти"
      >
</form>
</main>

<?php Component::add("footer"); ?>
