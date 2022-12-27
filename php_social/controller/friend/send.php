<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/User.php';
require_once '../../model/Log_temp.php';
require_once '../../model/Notification.php';
require_once '../../model/Friend_relation.php';

if (!isset($user)) {
    $user = new User();
}

//if (!$user->isLoggedIn() || !$user->isAdmin()) {
//    Helper::redirect_err();
//}

$friend_relation = new Friend_relation();
$notification = new Notification();

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if ($contentType === "application/json") {
    //Receive the RAW friend_relation data.
    $content = trim(file_get_contents("php://input"));

    $decoded = json_decode($content, true);

    if (is_array($decoded)) {

        $dataSub1 = array(
            'FriendRelation' => array(
                'user_account_1' => $decoded['emailS1'],
                'user_account_2' => $decoded['emailS2'],
                'type' => 0,
                'created' => date('Y-m-d H:i:s'),
                'modified' => date('Y-m-d H:i:s'),
            ),
        );

        $dataSub3 = array(
            'Notification' => array(
                'user_account_1' => $decoded['emailS2'],
                'user_account_2' => $decoded['emailS1'],
                'type' => 3,
                'message' => "New friend request receive",
                'created' => date('Y-m-d H:i:s'),
            ),
        );
        $dataSub4 = array(
            'Notification' => array(
                'user_account_1' => $decoded['emailS1'],
                'user_account_2' => $decoded['emailS2'],
                'type' => 4,
                'message' => "New friend request send",
                'created' => date('Y-m-d H:i:s'),
            ),
        );

        $old_data = $friend_relation->get_friend_request_single($decoded['emailS1'], $decoded['emailS2']);
        //echo "old data:" . json_encode($old_data);
        $dataSub = (isset($old_data) && sizeof($old_data) > 0) ? 
            $old_data
            : $dataSub1;
        //echo "Data:" . json_encode($dataSub);
        $command = $decoded['command'] ?? 0;

        if (intval($command) == 1) {
            $dataSub['FriendRelation']['type'] = 0;
            $dataSub2['Notification']['message'] = "Friend request accept";
        } else if (intval($command) == 2) {
            $dataSub['FriendRelation']['type'] = 2;
        }
        //echo json_encode($dataSub);

        if (strcmp($user->login_code($decoded['emailS1']), $decoded['codeS']) == 0 && $user->is_admin($decoded['emailS1']) == false) {

            //echo json_encode($dataSub);
            if ($friend_relation->save($dataSub)) {

                if ($command == 1) {
                    if ($notification->save($dataSub3) && $notification->save($dataSub4)) {
                        $response = array(
                            'id' => 1,
                            'code' => "REQUEST_CREATE_OK",
                        );
                        $friend_relation->sendResponse(200, json_encode($response));
                    } else {
                        //$friend_relation->deleteById($lastest_id);
                        $response = array(
                            'id' => 1,
                            'code' => "REQUEST_CREATE_FAIL",
                        );
                        $friend_relation->sendResponse(200, json_encode($response));
                    }
                } else if ($command == 2) {
                    $response = array(
                        'id' => 1,
                        'code' => "REQUEST_CREATE_OK",
                    );
                    $friend_relation->sendResponse(200, json_encode($response));
                }
            } else {
                //header('Location: ' . CLIENT_URL . '/book/input?success=0');}
                $response = array(
                    'id' => 0,
                    'code' => "REQUEST_CREATE_FAIL",
                );
                $friend_relation->sendResponse(200, json_encode($response));
            }
        } else {
            //header('Location: ' . CLIENT_URL . '/book/input?success=0');
            $response = array(
                'id' => 0,
                'code' => "REQUEST_CREATE_FAIL",
            );
            $friend_relation->sendResponse(200, json_encode($response));
        }
    } else {
        //header('Location: ' . CLIENT_URL . '/book/input?success=0');
        $response = array(
            'id' => 0,
            'code' => "REQUEST_CREATE_FAIL",
        );
        $friend_relation->sendResponse(200, json_encode($response));
    }
} else {
    //header('Location: ' . CLIENT_URL . '/book/input?success=0');
    $response = array(
        'id' => 0,
        'code' => "REQUEST_CREATE_FAIL",
    );
    $friend_relation->sendResponse(200, json_encode($response));
}