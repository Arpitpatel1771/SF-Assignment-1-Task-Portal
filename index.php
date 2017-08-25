<?php
    require 'connect.php';
?>
<html>
<head>
    <title><?php echo 'Tasma'; ?></title>
    <!-- jquery, css and scripts -->
    <script src="jquery.js" type="text/javascript"></script>
    <!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js" type="text/javascript" ></script>-->
    <link rel="stylesheet" href="index.css" type="text/css" />
    <script src="index.js" type="text/javascript "></script>
</head>
<body>
<?php
    if($user->is_loggedin()){
        if($user->isstudent()){
            echo 'show dashboard for students'.$_SESSION['tasma_username'];
        }else{
            echo 'show dashboard for profs'.$_SESSION['tasma_username'];
        }
    }else{
        echo '<div class="content login">
                <form action="" method="post" enctype="multipart/form-data" id="loginform">
                   <input type="text" name="username" minlength="5" maxlength="12" required="required" placeholder="Username"/>
                   <input type="password" name="password" minlength="8" maxlength="15" required="required" placeholder="Password"/>
                   <input type="submit" value="Submit"/>
                </form> 
              </div>';
    }
?>
</body>
</html>
