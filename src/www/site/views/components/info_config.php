<div class="content__container">
  <div class="content__wrapper">
    <h2 class="title content__title">Управление</h2>
  </div>

  <?php $cur_info = \R::findOne("v_info"); ?>

  <div class="card">
    <header
      class="title card__title center">
      Сообщение дня
    </header>

    <form
      class=""
      action="/set_info"
      method="POST"
      enctype="multipart/form-data">
        <input
          type="text"
          class="input
          card__input"
          name="title"
          id="title"
          placeholder="<?php
            if ($cur_info && $cur_info["title"]) {
              echo $cur_info["title"];
            }
            else {
              echo "Заголовок";
            }
          ?>">
        <textarea
          class="input card__input"
          cols=80
          rows=10
          id="text"
          name="text"
          placeholder="<?php
            if ($cur_info && $cur_info["text"]) {
              echo $cur_info["text"];
            }
            else {
              echo "Текст";
            }
          ?>"></textarea>
        <input
          class="button card__button"
          type="submit"
          value="Изменить сообщение"
          >
    </form>

    <form
      class=""
      action="/disable_info"
      method="POST"
      enctype="multipart/form-data">
      <input
        class="button card__button button--cancel-no-fill"
        type="submit"
        name="disable_info"
        value="Удалить сообщение">
    </form>
  </div>
</div>
