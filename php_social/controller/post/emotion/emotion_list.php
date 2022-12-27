<?php
require_once '../../../config/const.php';
require_once '../../../config/database.php';
require_once '../../../lib/Helper.php';
require_once '../../../model/User.php';
require_once '../../../model/Post.php';
require_once '../../../model/Log_temp.php';
require_once '../../../model/Notification.php';
require_once '../../../model/Emotion_post_list.php';

if (!isset($user)) {
    $user = new User();
}

//if (!$user->isLoggedIn() || !$user->isAdmin()) {
//    Helper::redirect_err();
//}

$post = new Post();
$notification = new Notification();
$emotion_post_list = new Emotion_post_list();
$emo_list =  ["like_list", "dislike_list", "love_list", "hate_list"];

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if ($contentType === "application/json") {
    //Receive the RAW post data.
    $content = trim(file_get_contents("php://input"));

    $decoded = json_decode($content, true);

    if (is_array($decoded)) {

        if (strcmp($user->login_code($decoded['emailS']), $decoded['codeS']) == 0 && $user->is_admin($decoded['emailS']) == false) {
            //echo("id: " . $decoded['id']);
            $post_data = $post->findById($decoded['id']);

            $emotion_post_list_data = $emotion_post_list->findById($decoded['id']);

			//echo json_encode($emotion_post_list_data);

            $user_id = $user->get_id($decoded['emailS'])['id'];

			//echo("user_id: " . $user_id);
            foreach($emo_list as $key => $emo){
                //echo $emo . ": " . $emotion_post_list_data['EmotionPostList'][strval($emo_list[$key])];
                $emotion_data_string = $emotion_post_list_data['EmotionPostList'][strval($emo)] ?? "";
                if ($emotion_data_string == null || $emotion_data_string == "" || !isset($emotion_data_string)){
                    $emotion_data_array = [];
                    $answer = 0;
                    //echo $answer;
                } else {
                    $emotion_data_array = explode(";", $emotion_data_string);
                    $key_search = array_search(intval($user_id), $emotion_data_array);
                    //echo("key search: " . $key_search);
                    if ($key_search !== false){
                        $answer = $key + 1;
                        //echo $answer;
                        break;
                    }
                }
            }

            $response = array(
                'response' => array(
                    'id' => 1,
                    'description' => 'success',     
                    'answer' => $answer,            
                ),
            );

            echo json_encode($response);
        } else {
            //header('Location: ' . CLIENT_URL . '/book/input?success=0');
            $response = array(
                'response' => array(
                    'id' => 0,
                    'description' => 'fail',
                ),
            );
            echo json_encode($response);
        }
    } else {
        //header('Location: ' . CLIENT_URL . '/book/input?success=0');
        $response = array(
            'response' => array(
                'id' => 0,
                'description' => 'fail',
            ),
        );
        echo json_encode($response);
    }
} else {
	//header('Location: ' . CLIENT_URL . '/book/input?success=0');
	$response = array(
		'response' => array(
			'id' => 0,
			'description' => 'fail',
		),
	);
	echo json_encode($response);
}
