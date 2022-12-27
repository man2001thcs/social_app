<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/User.php';
require_once '../../model/Log_temp.php';

if (!isset($user)) {
	$user = new User();
}

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if ($contentType === "application/json") {
  //Receive the RAW post data.
	$content = trim(file_get_contents("php://input"));

	$decoded = json_decode($content, true);

	if(is_array($decoded)) {
		$dataSub = array(
			'User' => array(
			'email' =>  $decoded['emailS'],
			'password' =>  $decoded['passwordS'],
			'code_login'=>  $decoded['codeS']
			)
		);
	
		if ($user->login($dataSub)) {				
			$response = array(
				'id' => 1,
				'code'=> "ACCOUNT_LOGIN_OK",
				'data' => json_encode($user->welcome($decoded['emailS'])),
			);
			$user->sendResponse(200, json_encode($response));		
		} else {
			$response = array(
				'id' => 0,
				'code'=> "ACCOUNT_LOGIN_FAIL",
			);
			$user->sendResponse(200, json_encode($response));
		}
	} else {
		$response = array(
			'id' => 0,
			'code'=> "ACCOUNT_LOGIN_FAIL",
		);
		$user->sendResponse(200, json_encode($response));
	}
} else {
	$response = array(
		'id' => 0,
		'code'=> "ACCOUNT_LOGIN_FAIL",
	);
	$user->sendResponse(200, json_encode($response));
}

?>
