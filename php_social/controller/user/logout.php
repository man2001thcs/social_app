<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/Book.php';
require_once '../../model/User.php';


$user = new User();
$link = strval($_POST['codeS']) . '.json';
$linka ='./log_session/' . $link;
$linkd ='../buy_log/log_session/' . $link;
$linke ='../receive/log_session/' . $link;

$account = $_POST['emailS'];

if ($user->logout($account)){
    unlink($linka);
    unlink($linkd);
    unlink($linke);
    echo 1;
    //header('Location: ' . CLIENT_URL, true, 301);
} else { echo 0;}


