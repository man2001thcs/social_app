<?php
require_once '../../config/const.php';
require_once '../../config/database.php';
require_once '../../lib/Helper.php';
require_once '../../model/Post.php';
require_once '../../model/User.php';
require_once '../../model/Log_temp.php';
require_once '../../model/Friend_relation.php';

if (!isset($user)) {
    $user = new User();
}

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if ($contentType === "application/json") {
    //Receive the RAW post data.
    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);

    if (is_array($decoded)) {

        $emailS_this = $decoded['emailS_this'];
        $emailS_visit = $decoded['emailS_visit'];

        if (strcmp($user->login_code($emailS_this), $decoded['codeS']) == 0 && $user->is_admin($emailS_this) == false) {
            $visit_info = $user->get_info($emailS_this, $emailS_visit);
            //echo json_encode($decoded);
            $response = array(
                'id' => 1,
                'info_data' => $visit_info,
            );
            $user->sendResponse(200, json_encode($response));
            //echo json_encode($response);


        } else {
            $response = array(
                'id' => 0,
                'info_data' => 'null',
            );
            $user->sendResponse(200, json_encode($response));
        }
    } else {
        $response = array(
            'id' => 0,
            'info_data' => 'null',
        );
        $user->sendResponse(200, json_encode($response));
    }
} else {
    $response = array(
        'id' => 0,
        'info_data' => 'null',
    );
    //echo 1;
    $user->sendResponse(200, json_encode($response));
    //echo json_encode($response);
}