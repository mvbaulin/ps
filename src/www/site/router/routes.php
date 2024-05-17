<?php

use App\Services\Router;
use App\Controllers\Auth;
use App\Controllers\Lib;

Router::page("/", "home");
Router::page("/auth", "auth");
Router::page("/dashboard", "dashboard");

Router::page("/store", "store");
Router::page("/store/search", "store_search");

Router::post("/login", Auth::class, "login", true);
Router::post("/logout", Auth::class, "logout", true);
Router::post("/password", Auth::class, "password", true);
Router::post("/set_info", Lib::class, "set_info", true);
Router::post("/disable_info", Lib::class, "disable_info", true);

Router::enable();
