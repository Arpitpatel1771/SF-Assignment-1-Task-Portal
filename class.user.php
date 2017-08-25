<?php
    class USER{
        private $dbase;
        function __construct($dbcon){
            $this->dbase = $dbcon;
        }
        public function login($uname,$upass){
            try {
                $stmt = $this->dbase->prepare("SELECT * FROM login WHERE username=?");
                $stmt->execute(array($uname));
                $userRow=$stmt->fetch(PDO::FETCH_ASSOC);
                if($stmt->rowCount() > 0) {
                    if($upass === $userRow['password']) {
                        $_SESSION['tasma_username'] = $userRow['username'];
                        echo 'logged in';
                    } else {
                        echo 'pwd doesnt match';
                    }
                }else{
                    echo 'usrname not found';
                }
            }catch(PDOException $e){
                echo $e->getMessage();
            }
        }
        public function is_loggedin(){
            if(isset($_SESSION['tasma_username'])) {
                return true;
            }
        }
        public function logout(){
            session_destroy();
            unset($_SESSION['tasma_username']);
            return true;
        }
        public function isstudent(){
            try {
                $uname = $_SESSION['tasma_username'];
                $stmt = $this->dbase->prepare("SELECT * FROM login WHERE username=?");
                $stmt->execute(array($uname));
                $userRow=$stmt->fetch(PDO::FETCH_ASSOC);
                if($stmt->rowCount() > 0) {
                    if($userRow['student']) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }catch(PDOException $e){
                echo $e->getMessage();
            }
        }
    }
?>