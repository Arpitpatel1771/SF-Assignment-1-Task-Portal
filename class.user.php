<?php
    class USER{
        private $dbase;
        function __construct($dbcon){
            $this->dbase = $dbcon;
        }
        public function login($uname,$upass){
            try {
                $stmt = $this->db->prepare("SELECT * FROM login WHERE username=?");
                $stmt->execute(array($uname));
                $userRow=$stmt->fetch(PDO::FETCH_ASSOC);
                if($stmt->rowCount() > 0) {
                    if($upass === $userRow['password']) {
                        $_SESSION['tasma_username'] = $userRow['username'];
                        echo 'logged in';
                    } else {
                        echo 'no data found';
                    }
                }
            }catch(PDOException $e){
                echo $e->getMessage();
            }
        }
        public function is_loggedin(){
            if(isset($_SESSION['user_session'])) {
                return true;
            }
        }
        public function logout(){
            session_destroy();
            unset($_SESSION['user_session']);
            echo 'user is logged out';
        }
        public function isstudent($uname){
            try {
                $stmt = $this->db->prepare("SELECT * FROM login WHERE username=?");
                $stmt->execute(array($uname));
                $userRow=$stmt->fetch(PDO::FETCH_ASSOC);
                if($stmt->rowCount() > 0) {
                    if($userRow['student']) {
                        echo 'user is student';
                    } else {
                        echo 'user is not student';
                    }
                }
            }catch(PDOException $e){
                echo $e->getMessage();
            }
        }
    }
?>