<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/User.php';
require_once '../../model/Post.php';
require_once '../../model/Log_temp.php';
require_once '../../model/Notification.php';
require_once '../../model/Emotion_post_list.php';

if (!isset($user)) {
    $user = new User();
}

//if (!$user->isLoggedIn() || !$user->isAdmin()) {
//    Helper::redirect_err();
//}

$post = new Post();
$notification = new Notification();
$emo_list = new Emotion_post_list();

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if ($contentType === "application/json") {
    //Receive the RAW post data.
    $content = trim(file_get_contents("php://input"));

    $decoded = json_decode($content, true);

    if (is_array($decoded)) {
        $dataSub = array(
            'Post' => array(
                'user_account' => $decoded['emailS'],
                'user_id' => $user->get_id($decoded['emailS'])['id'],
                'user_name' => $user->get_full_name($decoded['emailS'])['fullname'],
                'post_body' => $decoded['post_body'],
                'publicity_state' => $decoded['publicity_state'],
                'share_id' => 0,
                'img_num' => $decoded['img_num'],
                'created' => date('Y-m-d H:i:s'),
                'modified' => date('Y-m-d H:i:s'),
            ),
        );

        //echo json_encode($dataSub);

        if (strcmp($user->login_code($decoded['emailS']), $decoded['codeS']) == 0 && $user->is_admin($decoded['emailS']) == false) {
            //echo json_encode($dataSub);
            if ($post->save($dataSub)) {
                $lastest_id = $post->getNextId();

                $dataSub1 = array(
                    'EmotionPostList' => array(
                        'post_id' => $lastest_id,
                        'like_list' => "",
                        'dislike_list' => "",
                        'love_list' => "",
                        'hate_list' => "",
                    ),
                );

                $dataSub2 = array(
                    'Notification' => array(
                        'user_account_1' => $decoded['emailS'],
                        'user_account_2' => "none",
                        'type' => 0,
                        'message' => "New post",
                        'view' => 0,
                    ),
                );

                if ($notification->save($dataSub2) && $emo_list->save($dataSub1)) {
                    $response = array(
                        'id' => 1,
                        'code' => "POST_CREATE_OK",
                    );
                    $post->sendResponse(200, json_encode($response));
                } else {
                    $post->deleteById($lastest_id);
                    $response = array(
                        'id' => 1,
                        'code' => "POST_CREATE_FAIL",
                    );
                    $post->sendResponse(200, json_encode($response));
                }

            } else {
                //header('Location: ' . CLIENT_URL . '/book/input?success=0');}
                $response = array(
                    'id' => 0,
                    'code' => "POST_CREATE_FAIL",
                );
                $post->sendResponse(200, json_encode($response));
            }
        } else {
            //header('Location: ' . CLIENT_URL . '/book/input?success=0');
            $response = array(
                'id' => 0,
                'code' => "POST_CREATE_FAIL",
            );
            $post->sendResponse(200, json_encode($response));
        }
    } else {
        //header('Location: ' . CLIENT_URL . '/book/input?success=0');
        $response = array(
            'id' => 0,
            'code' => "POST_CREATE_FAIL",
        );
        $post->sendResponse(200, json_encode($response));
    }
} else {
    //header('Location: ' . CLIENT_URL . '/book/input?success=0');
    $response = array(
        'id' => 0,
        'code' => "POST_CREATE_FAIL",
    );
    $post->sendResponse(200, json_encode($response));
}
