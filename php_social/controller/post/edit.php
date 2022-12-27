<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/User.php';
require_once '../../model/Post.php';
require_once '../../model/Log_temp.php';
require_once '../../model/Notification.php';

if (!isset($user)) {
    $user = new User();
}

//if (!$user->isLoggedIn() || !$user->isAdmin()) {
//    Helper::redirect_err();
//}

$post = new Post();
$notification = new Notification();

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if ($contentType === "application/json") {
    //Receive the RAW post data.
    $content = trim(file_get_contents("php://input"));

    $decoded = json_decode($content, true);

    if (is_array($decoded)) {
        $id = $decoded['post_edit_id'];
        $dataSub = $post->findById($id);
        $dataSub['Post']['post_body'] = $decoded['post_body'];
        $dataSub['Post']['publicity_state'] = $decoded['publicity_state'] ?? $dataSub['Post']['publicity_state'];
		$dataSub['Post']['img_num'] = $decoded['img_num'] ?? $dataSub['Post']['img_num'];
        $dataSub['Post']['modified'] = date('Y-m-d H:i:s');

        if (strcmp($user->login_code($decoded['emailS']), $decoded['codeS']) == 0 && $user->is_admin($decoded['emailS']) == false) {
            //echo json_encode($dataSub);
            if ($post->save($dataSub)) {
				$response = array(
                    'id' => 1,
                    'code' => "POST_EDIT_OK",
                );
                $post->sendResponse(200, json_encode($response));

            } else {
                //header('Location: ' . CLIENT_URL . '/book/input?success=0');}
                $response = array(
                    'id' => 0,
                    'code' => "POST_EDIT_FAIL",
                );
                $post->sendResponse(200, json_encode($response));
            }
        } else {
            //header('Location: ' . CLIENT_URL . '/book/input?success=0');
            $response = array(
                'id' => 0,
                'code' => "POST_EDIT_FAIL",
            );
            $post->sendResponse(200, json_encode($response));
        }
    } else {
        //header('Location: ' . CLIENT_URL . '/book/input?success=0');
        $response = array(
            'id' => 0,
            'code' => "POST_EDIT_FAIL",
        );
        $post->sendResponse(200, json_encode($response));
    }
} else {
    //header('Location: ' . CLIENT_URL . '/book/input?success=0');
    $response = array(
        'id' => 0,
        'code' => "POST_EDIT_FAIL",
    );
    $post->sendResponse(200, json_encode($response));
}
