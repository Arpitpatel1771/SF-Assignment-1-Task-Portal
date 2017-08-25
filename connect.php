<?php
    ob_start();
    session_start();
    $db = 'adminportal';
    $dbhost = 'localhost';
    $dbusrname = 'root';
    $dbpass = '';

    try{
        $dbcon = new PDO("mysql:host={$dbhost};dbname={$db}",$dbusrname,$dbpass);
        $dbcon->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    }catch(PDOException $e){
        echo $e->getMessage();
        die('Oops! Something went wrong! Try refreshing the page :(');
    }
    require_once 'class.user.php';
    $user = new USER($dbcon);
?>