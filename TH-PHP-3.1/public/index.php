<?php
// CONFIG
require '../config/config.php';


// CONTROLLER
require '../core/controller/HomeController.php';


$url= isset($_GET['url'])? $_GET['url'] : '';

$url = rtrim($url, '/');
$url = explode('/', $url);

$controllerName = !empty($url[0]) ? ucfirst($url[0]) . 'Controller' : 'HomeController';
$controllerFile = '../core/controller/' . $controllerName . '.php';

if (file_exists($controllerFile)) {
    require_once $controllerFile;
    $controller = new $controllerName();

    if (isset($url[1])) {
        $controller->{$url[1]}();
    } else {
        $controller->index();
    }
} else {
    echo "404 Not Found";
}
?>