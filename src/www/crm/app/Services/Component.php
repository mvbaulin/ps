<?php
namespace App\Services;

class Component
{
  public static function add($component)
  {
    require_once "views/components/{$component}.php";
  }
}
