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
$emo_list = ["none", "like_list", "dislike_list", "love_list", "hate_list"];

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if ($contentType === "application/json") {
    //Receive the RAW post data.
    $content = trim(file_get_contents("php://input"));

    $decoded = json_decode($content, true);

    if (is_array($decoded)) {

        if (strcmp($user->login_code($decoded['emailS']), $decoded['codeS']) == 0 && $user->is_admin($decoded['emailS']) == false) {
            //echo("id: " . $decoded['id']);
            $post_data = $post->findById($decoded['id']);
            $oldEmoState = intval($decoded['oldEmotionState']);
            echo ("oldEmoState: " . $oldEmoState);
            $newEmoState = intval($decoded['emotionState']);
            echo ("newEmoState: " . $newEmoState);

            $emotion_post_list_data = $emotion_post_list->findById($decoded['id']);
            echo json_encode($emotion_post_list_data);

            $user_id = $user->get_id($decoded['emailS'])['id'];

            echo ("user_id: " . $user_id);
            //like
            if ($decoded['emotionState'] == 1) {
                $this_list = "like_list";
                $this_num = "like_num";
            } else if ($decoded['emotionState'] == 2) {
                $this_list = "dislike_list";
                $this_num = "dislike_num";
            } else if ($decoded['emotionState'] == 3) {
                $this_list = "love_list";
                $this_num = "love_num";
            } else if ($decoded['emotionState'] == 4) {
                $this_list = "hate_list";
                $this_num = "hate_num";
            }

            $emotion_data_string = $emotion_post_list_data['EmotionPostList'][$this_list] ?? "";

            if ($emotion_data_string == null || $emotion_data_string == "" || !isset($emotion_data_string)) {
                $emotion_data_array = [];
                $key = 'none';
            } else {
                $emotion_data_array = explode(";", $emotion_data_string);
                $key = array_search(strval($user_id), $emotion_data_array);
            }

            echo ("key: " . $key);

            if ($key == 'none') {
                $emotion_data_array[] = $user_id;
                sort($emotion_data_array);
                $new_data_string = implode(";", $emotion_data_array);
                echo 1;

                if (($oldEmoState != $newEmoState) && $oldEmoState != 0) {
                    echo "old: " . $emo_list[$oldEmoState];
                    $old_emotion_data_string = $emotion_post_list_data['EmotionPostList'][strval($emo_list[$oldEmoState])] ?? "";
                    $old_emotion_data_array = explode(";", $old_emotion_data_string);
                    $key_old = array_search(strval($user_id), $old_emotion_data_array);
                    unset($old_emotion_data_array[$key_old]);
                    $new_data_string_for_old = implode(";", $old_emotion_data_array);
                    $emotion_post_list_data['EmotionPostList'][strval($emo_list[$oldEmoState])] = $new_data_string_for_old;
                }

                $data_emotion_sub = array(
                    'EmotionPostList' => array(
                        'id' => $decoded['id'],
                        'like_list' => $emotion_post_list_data['EmotionPostList']['like_list'] ?? "",
                        'dislike_list' => $emotion_post_list_data['EmotionPostList']['dislike_list'] ?? "",
                        'love_list' => $emotion_post_list_data['EmotionPostList']['love_list'] ?? "",
                        'hate_list' => $emotion_post_list_data['EmotionPostList']['hate_list'] ?? "",
                    )
                );

                $dataSub_notify = array(
                    'Notification' => array(
                        'user_account_1' => $decoded['emailS'],
                        'user_account_2' => $post_data['Post']['user_account'],
                        'type' => 10 + intval($decoded['emotionState']),
                        'message' => "Emotion",
                        'view' => 0,
                        'created' => date('Y-m-d H:i:s'),
                    ),
                );

                $data_emotion_sub['EmotionPostList'][$this_list] = $new_data_string;

                //$post_data['Post'][$this_num] = $post_data['Post'][$this_num] + 1;

                if ($emotion_post_list->save($data_emotion_sub)) {
                    if ($post->save($post_data)) {
                        $notification->save($dataSub_notify);
                        $response = array(
                            'response' => array(
                                'id' => 1,
                                'description' => 'success',
                            ),
                        );
                        echo json_encode($response);
                    } else {
                        $response = array(
                            'response' => array(
                                'id' => 1,
                                'description' => 'success, but number error',
                            ),
                        );
                        echo json_encode($response);
                    }
                } else {
                    $response = array(
                        'response' => array(
                            'id' => 0,
                            'description' => 'Failed',
                        ),
                    );
                    echo json_encode($response);
                }
            } else {
                unset($emotion_data_array[$key]);
                $new_data_string = implode(";", $emotion_data_array);
                $emotion_post_list_data['EmotionPostList'][$this_list] = $new_data_string;
                //$post_data['Post'][$this_num] = $post_data['Post'][$this_num] - 1;
                if ($emotion_post_list->save($emotion_post_list_data)) {

                    $response = array(
                        'response' => array(
                            'id' => 1,
                            'description' => 'success',
                        ),
                    );
                    echo json_encode($response);

                } else {
                    $response = array(
                        'response' => array(
                            'id' => 0,
                            'description' => 'Failed',
                        ),
                    );
                    echo json_encode($response);
                }
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