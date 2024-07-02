<?php

namespace App\Services;

class App
{
  public static function start()
  {
    self::libs();
    self::db("prod");
  }

  public static function libs()
  {
    $config = require_once "config/app.php";

    foreach ($config["libs"] as $lib) {
      require_once "libs/{$lib}.php";
    }
  }

  public static function db($env)
  {
    if ($env === "prod") {
      $config_prod = require_once "config/db_prod.php";

      if ($config_prod["port"]) {
        \R::setup(
          "mysql:host={$config_prod['host']};
            port={$config_prod['port']};
            dbname={$config_prod['db']}",
          $config_prod["username"],
          $config_prod["password"]
        );
      }
      else {
        \R::setup(
          "mysql:host={$config_prod["host"]};
            dbname={$config_prod["db"]}",
          $config_prod["username"],
          $config_prod["password"]
        );
      }

    } else if ($env === "test") {
      $config_test = require_once "config/db_test.php";

      \R::setup(
        "mysql:host={$config_test['host']};
          port={$config_test['port']};
          dbname={$config_test['db']}",
        $config_test["username"],
        $config_test["password"]
      );
    }

    if (!\R::testConnection()) {
      die("Connection error");
    }
  }
}
