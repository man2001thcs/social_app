<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/Book.php';
require_once '../../model/Author.php';
require_once '../../model/User.php';
require_once '../../model/Voucher.php';

if (!isset($user)) {
	$user = new User();
}

//if (!$user->isLoggedIn() || !$user->isAdmin()) {
//	Helper::redirect_err();
//}

$book = new Book();
$author = new Author();
$voucher = new Voucher();
$id = $_POST['id'];
$this_data = $book->findById($id);
//echo json_encode($this_data);

if (isset($_POST)) {

	$voucher_string = "";

	$author_string = "";

	if (isset($_POST['voucher_id']) && ($_POST['voucher_id'] != null) && ($_POST['voucher_id'] != "")){
		$voucher_this = json_decode($_POST['voucher_id'], true);

		//echo json_encode($voucher_this);
	
		usort($voucher_this, function($a, $b) {return strcmp($a['WpVoucher']['id'], $b['WpVoucher']['id']);});
		
		$voucher_string = "";
	
		foreach ($voucher_this as $item){
			//echo json_encode($item);
			//echo $item['WpVoucher']['id'];
			$temp = $voucher_string;
			$voucher_string = $temp . strval($item['WpVoucher']['id']) . ';';
		}
	} else {
		$voucher_string = $this_data['WpBook']['voucher_id'];
	}

	//echo json_encode($_POST['author_id']);

	if (isset($_POST['author_id']) && ($_POST['author_id'] != null) && ($_POST['author_id'] != "")){
		$author_this = json_decode($_POST['author_id'], true);

		//echo json_encode($author_this);
	
		usort($author_this, function($a, $b) {return strcmp($a['WpAuthor']['id'], $b['WpAuthor']['id']);});
		
		$author_string = "";
	
		foreach ($author_this as $item){
			//echo json_encode($item);
			//echo $item['WpVoucher']['id'];
			$temp = $author_string;
			$author_string = $temp . strval($item['WpAuthor']['id']) . ';';
		}
	} else {
		$author_string = $this_data['WpBook']['author_id'];
	}

	
	$dataSub = array(
		'WpBook' => array(
			'id' => $_POST['id'] ?? $this_data['WpBook']['id'],
			'name' => $_POST['name'] ?? $this_data['WpBook']['name'],
			'price' => $_POST['price'] ?? $this_data['WpBook']['price'],	
			'page_number' => $_POST['page_number'] ?? $this_data['WpBook']['page_number'],
			'remain_number' => $_POST['remain_number'] ?? $this_data['WpBook']['remain_number'],
			'bought_number' => $_POST['bought_number'] ?? $this_data['WpBook']['bought_number'],
			'type' => 	$_POST['type'] ?? $this_data['WpBook']['type'],
			'description' => $_POST['description'] ?? $this_data['WpBook']['description'],
			'created' => $this_data['WpBook']['created'],	
			'modified' => date('Y-m-d H:i:s') ?? $this_data['WpBook']['modified'],
			'author_id' =>  $author_string ?? $this_data['WpBook']['author_id'],
			'voucher_id' => $voucher_string ?? $this_data['WpBook']['voucher_id'],
			'image_number' => $this_data['WpBook']['image_number']
			)
	);
	//echo json_encode($dataSub);
	if (strcmp($user->login_code($_POST['emailS']) ?? "", $_POST['codeS']) == 0  && $user->is_admin($_POST['emailS'])){

		if ($book->save($dataSub)) {
				$linku = './log_session/user_book.json';
				$resultU = $book->findAll();
				file_put_contents($linku, json_encode($resultU));	
				//header('Location: ' . CLIENT_URL . 'book/list');	
				echo 1;
		} else {
			//header('Location: ' . CLIENT_URL . 'book/edit?book_id=' . $_POST['id'] . '&success=0');
			echo 0;
		}
	}	
	else {
		//header('Location: ' . CLIENT_URL . 'book/edit?book_id=' . $_POST['id'] . '&success=0');
		echo 0;
	}
	
}
?>