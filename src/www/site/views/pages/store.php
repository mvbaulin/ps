<?php
use App\Services\Component;
use App\Services\Router;
?>

<?php Component::add('store_header'); ?>

<style>
  :root {
    /* Common */

    --font-family: "Roboto", sans-serif;
    --font-size: 13px;
    --font-color: #ffffff;
    --font-weight: 400;

    --bg-color: #1a202b;
    --bg-element: #313741;
    --bg-active: rgba(52, 199, 89, 1);
    --bg-badge: rgba(217, 217, 217, 1);

    --main-btn-color: #53c85f;

    --padding-container: 16px;
    --gap-element: 10px;
    --gap-section: 32px;
  }

  /* Reset */

  * {
    box-sizing: border-box;
  }

  *:focus {
    outline: none;
  }

  body {
    background: var(--bg-color);
    color: var(--font-color);
  }

  img {
    display: block;
    width: 100%;
    height: auto;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .section {
    padding: calc(var(--gap-section) / 2) 0px;
    min-width: 100%;
  }

  .container {
    margin: 0 auto;
    padding: 0 var(--padding-container);
  }

  .title {
    margin: 0;
    margin-bottom: var(--gap-section);
    padding: 0;

    font-family: inherit;
    font-size: 28px;
    font-weight: 800;
    line-height: 1;
    text-align: left;
  }

  /* Header */

  .main-header {
    display: flex;
    justify-content: space-between;
    padding: var(--padding-container);
  }

  .main-header__button {
    position: relative;
    margin: 0;
    padding: 0;
    display: block;
    min-width: 40px;
    width: 40px;
    height: 40px;
    background: var(--bg-element);
    border: none;
    cursor: pointer;
    border-radius: 10px;
    background: var(--bg-element);
    margin-right: var(--gap-element);
  }

  .main-header__button::before {
    position: absolute;
    content: '';
    width: 36px;
    height: 36px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
    background-position: center;
    background-repeat: no-repeat;
  }

  .main-header__button:last-child {
    margin-right: 0px;
  }

  .search {
    position: relative;
    display: block;
    margin-right: var(--gap-element);
    padding: 8px 16px;
    border: none;
    background: var(--bg-element);
    border-radius: 10px;
    width: 100%;
  }

  .search__placeholder {
    position: absolute;
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
    color: rgba(125, 126, 132, 1);
    top: 50%;
    left: 40px;
    transform: translateY(-50%);
  }

  .search__placeholder::before {
    position: absolute;
    content: '';
    width: 20px;
    height: 20px;
    top: 50%;
    left: -26px;
    transform: translateY(-50%);
    background-image: url('/assets/img/store/icon_search.svg');
    background-repeat: no-repeat;
    background-size: 100%;
  }

  .cart-button__badge {
    position: absolute;
    display: block;
    width: 16px;
    height: 16px;
    background-color: var(--bg-active);
    top: -5px;
    right: -5px;
    border-radius: 50%;
    font-size: 12px;
    color: var(--font-color);
    line-height: 1;
    padding-top: 2px;
  }

  .cart-button::before {
    background-image: url('/assets/img/store/icon_cart.svg');
  }

  .privacy-button::before {
    background-image: url('/assets/img/store/icon_privacy.svg');
  }

  /* Slider */

  .slider {

  }

  .slider--main {
    display: none;
  }

  .slider__window {

  }

  .slider__item {

  }

  .slider__wraper {

  }

  .slider__image {

  }

  /* Subscription */

  .subscription {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--padding-container);
    border-radius: 20px;
    margin-bottom: var(--gap-element);
  }

  .subscription:last-child {
    margin-bottom: 0;
  }

  .subscription__inner {
    width: calc(50% - (var(--padding-container) / 2));
  }

  .subscription__logo {
    margin: 0 auto;
  }

  .subscription__button {
    margin-left: auto;
    display: block;
    border-radius: 20px;
    padding: var(--padding-container);
    /* max-width: 190px;
    width: 190px; */
    width: calc(100vw / 2 - calc(--var(--padding-container) * 2) - 10xp);
  }

  .subscription__wrapper {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .subscription__price {
    display: block;
    margin-right: var(--gap-element);
    font-family: inherit;
    font-size: 16px;
    font-weight: 500;
    line-height: 1;
  }

  .subscription__badge {
    display: inline-block;
    padding: 3px 6px;
    background: var(--bg-badge);
    border-radius: 10px;
    font-family: inherit;
    font-size: 10px;
    font-weight: 500;
    line-height: 1;
    color: #000000;
  }

  .subscription__description {
    display: block;
    text-align: center;
  }


  /* Ubisoft */

  .subscription--ubisoft {
    background: linear-gradient(84.36deg, rgba(3, 9, 23, 0.8) 0%, rgba(9, 52, 118, 0.8) 100%);
    color: #ffffff;
  }

  .subscription--ubisoft .subscription__button {
    background: rgba(68, 140, 222, 1);
  }

  .subscription--ubisoft .subscription__logo {
    width: 122px;
    height: 22px;
  }

  /* Gta plus */

  .subscription--gta {
    background-image: url('/assets/img/store/bg_gta.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
    color: #000000;
  }

  .subscription--gta .subscription__button {
    background: rgba(255, 176, 2, 1);
  }

  .subscription--gta .subscription__logo {
    width: 79px;
    height: 56px;
  }

  /* Ea play */

  .subscription--ea {
    background: linear-gradient(228.75deg, #FF4747 -51.59%, #0D1042 71.08%);
    color: #ffffff;
  }

  .subscription--ea .subscription__button {
    background: rgba(255, 71, 71, 1);
  }

  .subscription--ea .subscription__button:first-child {
    margin-bottom: var(--gap-element);
  }

  .subscription--ea .subscription__logo {
    width: 117px;
    height: 40px;
  }


</style>

<?php Component::add('store_nav'); ?>

<main>
  <!-- <?php Component::add('store_leaders'); ?> -->

  <?php Component::add('store_subscriptions'); ?>
</main>
































<script type="text/javascript">
  let tg = window.Telegram.WebApp;
  tg.expand();
</script>

<?php Component::add('store_footer'); ?>
