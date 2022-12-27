<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/Post.php';
require_once '../../model/User.php';
require_once '../../model/Friend_relation.php';
require_once '../../model/Log_temp.php';

if (!isset($user)) {
    $user = new User();
}

$post = new Post();

$limit = 5;

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if ($contentType === "application/json") {
    //Receive the RAW post data.
    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);

    if (is_array($decoded)) {
        $limit = $decoded['limit'];
        $emailS = $decoded['emailS'];
        //$emailG = $decoded['emailG'];
        $user_id = $decoded['user_id'];
        //echo "id: " . $user_id;
        $codeS = $decoded['codeS'];
        $getMore = $decoded['getMore'];

        if (strcmp($user->login_code($decoded['emailS']), $decoded['codeS']) == 0 && $user->is_admin($decoded['emailS']) == false) {
            $post_list = $post->get_post_personal($user_id, $limit);

            if (sizeof($post_list) > $limit || intval($getMore) == 0) {
                //echo json_encode($decoded);
                $response = array(
                    'id' => 1,
                    'data' => json_encode($post_list),
                );
                $post->sendResponse(200, json_encode($response));
                //echo json_encode($response);
            } else {
                $response = array(
                    'id' => 0,
                    'data' => 'null',
                );
                $post->sendResponse(200, json_encode($response));
            }

        } else {
            $response = array(
                'id' => 0,
                'data' => 'null',
            );
            $post->sendResponse(200, json_encode($response));
        }
    } else {
        $response = array(
            'id' => 0,
            'data' => 'null',
        );
        $post->sendResponse(200, json_encode($response));
    }
} else {
    $response = array(
        'id' => 0,
        'data' => 'null',
    );
    //echo 1;
    $post->sendResponse(200, json_encode($response));
    //echo json_encode($response);
}