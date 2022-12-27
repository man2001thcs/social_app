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
        //1 la accept, 0 la declined
        $command = $decoded['command'] ?? 0;
        $dataSub_a = $friend_relation->get_friend_request_single($decoded['emailS1'], $decoded['emailS2']);
        $dataSub_b = $friend_relation->get_friend_request_single($decoded['emailS2'], $decoded['emailS1']);

        $dataSub2 = array(
            'Notification' => array(
                'user_account_1' => $decoded['emailS1'],
                'user_account_2' => $decoded['emailS2'],
                'type' => 0,
                'message' => "Request failed",
            ),
        );

        if (intval($command) == 1) {
            $dataSub_a['FriendRelation']['type'] = 1;
            $dataSub_b['FriendRelation']['type'] = 1;
            $dataSub2['Notification']['type'] = 4;
            $dataSub2['Notification']['message'] = "Friend request accept";
        } else if (intval($command) == 2) {
            $dataSub_a['FriendRelation']['type'] = 2;
            $dataSub_b['FriendRelation']['type'] = 2;
        } else {
            $dataSub_a['FriendRelation']['type'] = 0;
            $dataSub_b['FriendRelation']['type'] = 0;
            $dataSub2['Notification']['type'] = 5;
            $dataSub2['Notification']['message'] = "Friend request declined";
        }

        $dataSub['FriendRelation']['modified'] = date('Y-m-d H:i:s');

        if (strcmp($user->login_code($decoded['emailS1']), $decoded['codeS']) == 0 && $user->is_admin($decoded['emailS1']) == false) {

            //echo json_encode($dataSub);
            if ($friend_relation->save($dataSub_a) && $friend_relation->save($dataSub_b)) {
                $lastest_id = $friend_relation->getNextId();
                if ($notification->save($dataSub2)) {
                    $response = array(
                        'id' => 1,
                        'code' => "REQUEST_CREATE_OK",
                    );
                    $friend_relation->sendResponse(200, json_encode($response));
                } else {
                    //$dataSub_a['FriendRelation']['type'] = 0;
                    //$friend_relation->save($dataSub);
                    $response = array(
                        'id' => 1,
                        'code' => "REQUEST_CREATE_FAIL",
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