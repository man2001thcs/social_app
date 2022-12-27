<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/User.php';
require_once '../../model/Log_temp.php';
require_once '../../model/Notification.php';

if (!isset($user)) {
	$user = new User();
}

//if (!$user->isLoggedIn() || !$user->isAdmin()) {
//    Helper::redirect_err();
//}

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if ($contentType === "application/json") {
	//Receive the RAW user data.
	$content = trim(file_get_contents("php://input"));

	$decoded = json_decode($content, true);

	if (is_array($decoded)) {

		$password = Helper::hash($decoded['oldpasswordS']);
		if (
			strcmp($user->login_code($decoded['emailS']), $decoded['codeS']) == 0
			&& $user->is_admin($decoded['emailS']) == false
		) {
			if (strcmp($user->get_pass($decoded['emailS']), $password) == 0) {
				$user_data = $user->find_by_email($decoded['emailS']);
				$user_data['User']['password'] = Helper::hash($decoded['passwordS']) ?? $user_data['User']['password'];

				if ($user->save($user_data)) {
					$response = array(
						'id' => 1,
						'code' => "USER_EDIT_OK",
					);
					$user->sendResponse(200, json_encode($response));

				} else {
					//header('Location: ' . CLIENT_URL . '/book/input?success=0');}
					$response = array(
						'id' => 0,
						'code' => "USER_EDIT_FAIL",
					);
					$user->sendResponse(200, json_encode($response));
				}

			} else {
				//header('Location: ' . CLIENT_URL . '/book/input?success=0');}
				$response = array(
					'id' => 0,
					'code' => "USER_PASSWORD_WRONG",
				);
				$user->sendResponse(200, json_encode($response));
			}
		} else {
			//header('Location: ' . CLIENT_URL . '/book/input?success=0');
			$response = array(
				'id' => 0,
				'code' => "USER_EDIT_FAIL",
			);
			$user->sendResponse(200, json_encode($response));
		}
	} else {
		//header('Location: ' . CLIENT_URL . '/book/input?success=0');
		$response = array(
			'id' => 0,
			'code' => "USER_EDIT_FAIL",
		);
		$user->sendResponse(200, json_encode($response));
	}
} else {
	//header('Location: ' . CLIENT_URL . '/book/input?success=0');
	$response = array(
		'id' => 0,
		'code' => "USER_EDIT_FAIL",
	);
	$user->sendResponse(200, json_encode($response));
}