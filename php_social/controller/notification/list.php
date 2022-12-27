<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/Notification.php';
require_once '../../model/Comment.php';
require_once '../../model/User.php';
require_once '../../model/Friend_relation.php';
require_once '../../model/Log_temp.php';


if (!isset($user)) {
    $user = new User();
}

$notification = new Notification();

$limit = 5;

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if ($contentType === "application/json") {
    //Receive the RAW notification data.
    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);

    if (is_array($decoded)) {
        $limit = $decoded['limit'];
        $emailS = $decoded['emailS'];
        $codeS = $decoded['codeS'];
        $getMore = $decoded['getMore'];

        if (strcmp($user->login_code($decoded['emailS']), $decoded['codeS']) == 0 && $user->is_admin($decoded['emailS']) == false) {
            $notification_list = $notification->get_notification($emailS, $limit);

            if (sizeof($notification_list) > $limit || intval($getMore) == 0) {
                //echo json_encode($decoded);
                $response = array(
                    'id' => 1,
                    'data' => json_encode($notification_list),
                );
				$notification->sendResponse(200, json_encode($response));
                //echo json_encode($response);
            } else {
				$response = array(
                    'id' => 0,
                    'data' => 'null',
                );
				$notification->sendResponse(200, json_encode($response));
            }
        } else {
            $response = array(
                'id' => 0,
				'data' => 'null',
			);
			$notification->sendResponse(200, json_encode($response));
        }
    } else {
        $response = array(
            'id' => 0,
			'data' => 'null',
		);
		$notification->sendResponse(200, json_encode($response));
    }
} else {
    $response = array(
        'id' => 0,
		'data' => 'null',
	);
	//echo 1;
	$notification->sendResponse(200, json_encode($response));
    //echo json_encode($response);
}
