<?php
require_once '../../../config/const.php';
require_once '../../../config/database.php';
require_once '../../../lib/Helper.php';
require_once '../../../model/User.php';
require_once '../../../model/Post.php';
require_once '../../../model/Log_temp.php';
require_once '../../../model/Notification.php';
require_once '../../../model/Comment.php';

if (!isset($user)) {
    $user = new User();
}

//if (!$user->isLoggedIn() || !$user->isAdmin()) {
//    Helper::redirect_err();
//}

$post = new Post();
$notification = new Notification();
$comment = new Comment();
$emo_list =  ["like_list", "dislike_list", "love_list", "hate_list"];

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if ($contentType === "application/json") {
    //Receive the RAW post data.
    $content = trim(file_get_contents("php://input"));

    $decoded = json_decode($content, true);

    if (is_array($decoded)) {

        if (strcmp($user->login_code($decoded['emailS']), $decoded['codeS']) == 0 && $user->is_admin($decoded['emailS']) == false) {
            //echo("id: " . $decoded['id']);
            $share_num = $post->get_share_num($decoded['post_id']);
            $comment_num = $comment->get_comment_num($decoded['post_id']);

            $response = array(
                'id' => 1,
                'comment_num' => $comment_num,
                'share_num' => $share_num,
            );
            $post->sendResponse(200, json_encode($response));
        } else {
            //header('Location: ' . CLIENT_URL . '/book/input?success=0');
            $response = array(
                'id' => 0,
                'comment_num' => "null",
                'share_num' => "null",
            );
            $post->sendResponse(200, json_encode($response));
        }
    } else {
        //header('Location: ' . CLIENT_URL . '/book/input?success=0');
        $response = array(
            'id' => 0,
            'comment_num' => "null",
            'share_num' => "null",
        );
        $post->sendResponse(200, json_encode($response));
    }
} else {
	//header('Location: ' . CLIENT_URL . '/book/input?success=0');
    $response = array(
        'id' => 0,
        'comment_num' => "null",
        'share_num' => "null",
    );
    $post->sendResponse(200, json_encode($response));
}
