<?php
    require_once 'connect.php';
    if($user->is_loggedin()!=''){
        echo 'user is logged in';
    }
?>