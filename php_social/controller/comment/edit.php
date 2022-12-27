<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/User.php';
require_once '../../model/Comment.php';
require_once '../../model/Log_temp.php';
require_once '../../model/Notification.php';

if (!isset($user)) {
    $user = new User();
}

//if (!$user->isLoggedIn() || !$user->isAdmin()) {
//    Helper::redirect_err();
//}

$comment = new Comment();
$notification = new Notification();

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if ($contentType === "application/json") {
    //Receive the RAW comment data.
    $content = trim(file_get_contents("php://input"));

    $decoded = json_decode($content, true);

    if (is_array($decoded)) {
        $id = $decoded['id'];
        $dataSub = $comment->findById($id);
        $dataSub['Comment']['comment_body'] = $decoded['comment_body'];
		$dataSub['Comment']['img_num'] = $decoded['img_num'] ?? $dataSub['Comment']['img_num'];
        $dataSub['Comment']['modified'] = date('Y-m-d H:i:s');

        if (strcmp($user->login_code($decoded['emailS']), $decoded['codeS']) == 0 && $user->is_admin($decoded['emailS']) == false) {
            //echo json_encode($dataSub);
            if ($comment->save($dataSub)) {
				$response = array(
                    'id' => 1,
                    'code' => "COMMENT_EDIT_OK",
                );
                $comment->sendResponse(200, json_encode($response));

            } else {
                //header('Location: ' . CLIENT_URL . '/book/input?success=0');}
                $response = array(
                    'id' => 0,
                    'code' => "COMMENT_EDIT_FAIL",
                );
                $comment->sendResponse(200, json_encode($response));
            }
        } else {
            //header('Location: ' . CLIENT_URL . '/book/input?success=0');
            $response = array(
                'id' => 0,
                'code' => "COMMENT_EDIT_FAIL",
            );
            $comment->sendResponse(200, json_encode($response));
        }
    } else {
        //header('Location: ' . CLIENT_URL . '/book/input?success=0');
        $response = array(
            'id' => 0,
            'code' => "COMMENT_EDIT_FAIL",
        );
        $comment->sendResponse(200, json_encode($response));
    }
} else {
    //header('Location: ' . CLIENT_URL . '/book/input?success=0');
    $response = array(
        'id' => 0,
        'code' => "COMMENT_EDIT_FAIL",
    );
    $comment->sendResponse(200, json_encode($response));
}
