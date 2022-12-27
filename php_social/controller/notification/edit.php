<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/User.php';
require_once '../../model/Notification.php';
require_once '../../model/Log_temp.php';
require_once '../../model/Notification.php';

if (!isset($user)) {
    $user = new User();
}

//if (!$user->isLoggedIn() || !$user->isAdmin()) {
//    Helper::redirect_err();
//}

$notification = new Notification();

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if ($contentType === "application/json") {
    //Receive the RAW post data.
    $content = trim(file_get_contents("php://input"));

    $decoded = json_decode($content, true);

    if (is_array($decoded)) {
        $id = $decoded['id'];
        //echo "id:" . $id;
        $dataSub = $notification->findById($id);
        //echo json_encode($dataSub);
        $dataSub['Notification']['showed'] = 1;
        $dataSub['Notification']['post_id'] = $dataSub['Notification']['post_id'] ?? 0;
        $dataSub['Notification']['comment_id'] = $dataSub['Notification']['comment_id'] ?? 0;

        if (strcmp($user->login_code($decoded['emailS']), $decoded['codeS']) == 0 && $user->is_admin($decoded['emailS']) == false) {
            //echo json_encode($dataSub);
            if ($notification->save($dataSub)) {
				$response = array(
                    'id' => 1,
                    'code' => "NOTIFY_EDIT_OK",
                );
                $notification->sendResponse(200, json_encode($response));

            } else {
                //header('Location: ' . CLIENT_URL . '/book/input?success=0');}
                $response = array(
                    'id' => 0,
                    'code' => "NOTIFY_EDIT_FAIL",
                );
                $notification->sendResponse(200, json_encode($response));
            }
        } else {
            //header('Location: ' . CLIENT_URL . '/book/input?success=0');
            $response = array(
                'id' => 0,
                'code' => "NOTIFY_EDIT_FAIL",
            );
            $notification->sendResponse(200, json_encode($response));
        }
    } else {
        //header('Location: ' . CLIENT_URL . '/book/input?success=0');
        $response = array(
            'id' => 0,
            'code' => "NOTIFY_EDIT_FAIL",
        );
        $notification->sendResponse(200, json_encode($response));
    }
} else {
    //header('Location: ' . CLIENT_URL . '/book/input?success=0');
    $response = array(
        'id' => 0,
        'code' => "NOTIFY_EDIT_FAIL",
    );
    $notification->sendResponse(200, json_encode($response));
}
