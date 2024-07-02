<?php
use App\Services\Component;

$current_path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if (strpos($current_path, '/dashboard') !== false) {
  $display_info = true;
} else {
  $display_info = false;
}

?>

<footer class="footer">
  <?php
    if ($display_info) {
      Component::add("info");
    }
  ?>
</footer>
<script src="assets/js/main.js"></script>
</body>

</html>
