<?php

namespace App\Controllers;

use App\Services\Router;

class Lib
{
  public function set_info($data)
  {
    if ($data && $data["title"] && $data["text"]) {
      $title = $data["title"];
      $text = $data["text"];

      $info = \R::dispense('info');

      $info->title = $title;
      $info->text = $text;

      \R::store($info);
    }

    Router::redirect("dashboard");
  }

  public function disable_info($data)
  {
    if ($data && $data["disable_info"] &&
      $_SESSION["user"]["role"] == "admin") {
      $info = \R::dispense('info');

      \R::store($info);

      Router::redirect("dashboard");
    }
  }
}
