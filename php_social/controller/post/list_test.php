<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/Post.php';
require_once '../../model/Friend_relation.php';

date_default_timezone_set('Asia/Ho_Chi_Minh');


//if (!$user->isLoggedIn() || !$user->isAdmin()) {
//	Helper::redirect_err();
//}

$post = new Post();

$friend_relation = new Friend_relation();

	
	//$data = $receive->findAll();

	$data_sql = $friend_relation->return_select_sql(array(
		'conditions' => array(
			"user_account_1" => "LIKE 'dochu8@gmail.com'", 
			
			)
	));

	$data = $post->find(array(
		'joins' => array('friend_relation' => array(
			'type' => "LEFT",
			'on_join' => $data_sql,
			'main_key' =>  'user_account',
			'join_key' =>  'user_account_2',
			'alias_main' =>  'Post',
			'alias_sub' =>  'Friend_relation1',
		)),
		'conditions_or' => array(
			'condition1' => array('POST.publicity_state' => 1,
			"Friend_relation1.user_account_1" => "LIKE 'dochu8@gmail.com'", 
				),
			'condition2' => array('POST.publicity_state' => 2),
		)
	), 'all');
	
	//echo json_encode($data);

	foreach($data as $item){
		echo json_encode($item);
		echo "<br/>";
	}





?>