<?php

namespace App\Controllers;

use App\Services\Router;

class Auth
{
  public function login($data)
  {
    $login = $data["login"];
    $password = $data["password"];

    $user = \R::findOne("users", "login = ?", [$login]);

    if (
      $user && $user->is_active &&
      (password_verify($password, $user->password) ||
        $password === $user->password)
    ) {
      $_SESSION["user"] = [
        "id" => $user->id,
        "name" => $user->name,
        "role" => $user->role,
        "rate" => $user->rate,
        "password_date" => $user->password_date
      ];

      Router::redirect("dashboard");
    } else {
      $this->logout($data);
    }
  }

  public function logout($data)
  {
    unset($_SESSION["user"]);
    Router::redirect("auth");
  }

  public function password($data)
  {
    $user = \R::findOne('users', 'id = ?', [$_SESSION["user"]["id"]]);

    if ($data["new_password"] == $data["password"]) {
      Router::redirect("dashboard");
    } else {
      if ($data["new_password"] === $data["confirm_password"] &&
        (password_verify($data["password"], $user->password) ||
        $data["password"] === $user->password)) {

        $validation_error = $this->validate_password($data["new_password"]);
        if (!empty($validation_error)) {
          throw new \Exception($validation_error);
        } else {
          $new_password = password_hash($data["new_password"], PASSWORD_DEFAULT);
          $user->password = $new_password;
          $user->password_date = \R::isoDateTime();

          \R::store($user);

          $this->logout($data);
        }
      } else {
        throw new \Exception("Пароли не совпадают или старый пароль неверен.");
      }
    }
  }

  public function validate_password($password)
  {
    if (strlen($password) < 20) {
      return "Новый пароль должен содержать минимум 20 символов.";
    } elseif (!preg_match('/[A-Z]/', $password)) {
      return "Новый пароль должен содержать хотя бы одну заглавную букву.";
    } elseif (!preg_match('/[a-z]/', $password)) {
      return "Новый пароль должен содержать хотя бы одну строчную букву.";
    } elseif (!preg_match('/\d/', $password)) {
      return "Новый пароль должен содержать хотя бы одну цифру.";
    } elseif (!preg_match('/[^a-zA-Z0-9]/', $password)) {
      return "Новый пароль должен содержать хотя бы один специальный символ.";
    }

    return "";
  }
}
