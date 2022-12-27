<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/User.php';


if (!isset($user)) {
	$user = new User();
}


$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if ($contentType === "application/json") {
  //Receive the RAW post data.
	$content = trim(file_get_contents("php://input"));

	$decoded = json_decode($content, true);

	if(is_array($decoded)) {

		$dataS = array(
			'User' => array(
				'email' => $decoded['emailS'],
				'passwordS' => $decoded['passwordS'],
				'fullname' => $decoded['fullname'],
				'address' => $decoded['address'],
				'phone_number' => $decoded['phone_number'],
				'is_admin' => "0",
				'created' => date('Y-m-d H:i:s'),
				'modified' => date('Y-m-d H:i:s')
			)
		);

		if ($user->checkUser($dataS)){
			$response = array(
				'response' => array(
				'id' =>  0,
				'description' =>  'fail'
				)
			);
			echo json_encode($response);		
		} else{		
			if ($user->saveLogin($dataS)) {
				$response = array(
					'response' => array(
					'id' =>  1,
					'description' =>  'Success'
					)
				);
				echo json_encode($response);
			} else {
				$response = array(
					'response' => array(
					'id' =>  0,
					'description' =>  'fail'
					)
				);
				echo json_encode($response);
			}
				
		}	
	}

	if(! is_array($decoded)) {
		$response = array(
			'response' => array(
			'id' =>  0,
			'description' =>  'fail'
			)
		);
		echo json_encode($response);
	}
}

?>
