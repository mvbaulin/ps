<?php

use App\Services\App;

session_start();
session_regenerate_id(true);

require_once __DIR__ . "/vendor/autoload.php";
App::start();
require_once __DIR__ . "/router/routes.php";
