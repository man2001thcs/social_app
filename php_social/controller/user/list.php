<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/Post.php';
require_once '../../model/User.php';
require_once '../../model/User.php';
require_once '../../model/Log_temp.php';
require_once '../../model/Friend_relation.php';

if (!isset($user)) {
    $user = new User();
}

$user = new User();

$limit = 5;

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if ($contentType === "application/json") {
    //Receive the RAW user data.
    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);

    if (is_array($decoded)) {
        $limit = $decoded['limit'];
        $emailS = $decoded['emailS'];
        $codeS = $decoded['codeS'];
        $getMore = $decoded['getMore'];

        if (strcmp($user->login_code($decoded['emailS']), $decoded['codeS']) == 0 && $user->is_admin($decoded['emailS']) == false) {
            $user_list = $user->get_friend_suggest($decoded['emailS'], $decoded['limit']);

            if (sizeof($user_list) > $limit || intval($getMore) == 0) {
                //echo json_encode($decoded);
                $response = array(
                    'id' => 1,
                    'data' => json_encode($user_list),
                );
				$user->sendResponse(200, json_encode($response));
                //echo json_encode($response);
            } else {
				$response = array(
                    'id' => 0,
                    'data' => 'null',
                );
				$user->sendResponse(200, json_encode($response));
            }
        } else {
            $response = array(
                'id' => 0,
				'data' => 'null',
			);
			$user->sendResponse(200, json_encode($response));
        }
    } else {
        $response = array(
            'id' => 0,
			'data' => 'null',
		);
		$user->sendResponse(200, json_encode($response));
    }
} else {
    $response = array(
        'id' => 0,
		'data' => 'null',
	);
	//echo 1;
	$user->sendResponse(200, json_encode($response));
    //echo json_encode($response);
}
