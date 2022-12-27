<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/Book.php';
require_once '../../model/User.php';

if (!isset($user)) {
	$user = new User();
}

//if (!$user->isLoggedIn() || !$user->isAdmin()) {
//	Helper::redirect_err();
//}

$book = new Book();

$id = isset($_POST['id']) ? intval($_POST['id']) : null;

if (strcmp($user->login_code($_POST['emailS']), $_POST['codeS']) == 0  && $user->is_admin($_POST['emailS'])){
	if ($book->deleteById($id)){
		$linku = './log_session/user_book.json';
		$resultU = $book->findAll();
		file_put_contents($linku, json_encode($resultU));	
		echo 1;
	} else {
		echo 0;
		//header('Location: ' . CLIENT_URL . '/book/list?success=0');
	}
}
?>

