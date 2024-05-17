<?php

namespace App\Services;

class Router
{
  private static $list = [];

  public static function page($uri, $page_name)
  {
    self::$list[] = [
      "uri" => $uri,
      "page_name" => $page_name,
      "post" => false
    ];
  }

  public static function post($uri, $class, $method, $formdata = false)
  {
    self::$list[] = [
      "uri" => $uri,
      "class" => $class,
      "method" => $method,
      "post" => true,
      "formdata" => $formdata
    ];
  }

  public static function enable()
  {
    if (isset($_GET['q'])) {
      $query = $_GET['q'];
      $found = false;

      foreach (self::$list as $route) {
        if ($route["uri"] === "/{$query}") {
          if ($route["post"] && $_SERVER["REQUEST_METHOD"] === "POST") {
            $action = new $route["class"];
            $method = $route["method"];
            $action->$method($_POST);
            die();
          } elseif (isset($route["page_name"])) {
            require_once "views/pages/{$route["page_name"]}.php";
          }

          $found = true;
          break;
        }
      }

      if (!$found) {
        require_once "views/pages/404.php";
      }
    } else {
      require_once "views/pages/home.php";
    }
  }

  public static function redirect($uri)
  {
    header("Location: {$uri}");
    exit;
  }
}
