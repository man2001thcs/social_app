<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/Post.php';
require_once '../../model/User.php';

if (!isset($user)) {
	$user = new User();
}

//if (!$user->isLoggedIn() || !$user->isAdmin()) {
//	Helper::redirect_err();
//}

$post = new Post();
$author = new Author();
$voucher_string = "";
$author_string = "";

if (isset($_POST)) {

	$voucher_array = json_decode($_POST['voucher_id'], true);
	usort($voucher_array, function($a, $b) {return strcmp($a['WpVoucher']['id'], $b['WpVoucher']['id']);});
	foreach ($voucher_array as $item){
		//echo json_encode($item);
		//echo $item['WpVoucher']['id'];
		$temp = $voucher_string;
		$voucher_string = $temp . strval($item['WpVoucher']['id']) . ';';
	}

	$author_array = json_decode($_POST['author_id'], true);
	usort($author_array, function($a, $b) {return strcmp($a['WpAuthor']['id'], $b['WpAuthor']['id']);});
	foreach ($author_array as $item){
		//echo json_encode($item);
		//echo $item['WpVoucher']['id'];
		$temp = $author_string;
		$author_string = $temp . strval($item['WpAuthor']['id']) . ';';
	}

	$dataSub = array(
		'WpPost' => array(
			'name' => $_POST['name'] ?? '',
			'price' => $_POST['price']  ?? '', 	
			'page_number' => $_POST['page_number']  ?? '',
			'bought_number' => $_POST['bought_number']  ?? '',
			'remain_number' => $_POST['remain_number']  ?? '',
			'description' => $_POST['description']  ?? '',
			'type' => $_POST['type']  ?? '',
			'created' => date('Y-m-d H:i:s'),
			'modified' => date('Y-m-d H:i:s'),			
			'author_id' => $author_string ?? "",
			'voucher_id' => $voucher_string ?? "",
			'image_number' => 1
			)
	);

	if (strcmp($user->login_code($_POST['emailS']), $_POST['codeS']) == 0  && $user->is_admin($_POST['emailS'])){
		if ($Post->save($dataSub)) {
			if ($_POST['codeS']){
				//header('Location: ' . SERVER_URL . 'controller/Post/list.php?codeLogin=' . $_POST["codeS"]);
				$linku = './log_session/user_Post.json';
				$resultU = $Post->findAll();
				file_put_contents($linku, json_encode($resultU));	
				//header('Location: ' . CLIENT_URL . 'post/list');	
				echo 1;
			}			
		} else {
			//header('Location: ' . CLIENT_URL . '/post/input?success=0');}
			echo 0;
		}	
	}
	else{
		//header('Location: ' . CLIENT_URL . '/post/input?success=0');
		echo 0;
	}
}
?>