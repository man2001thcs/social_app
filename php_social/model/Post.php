<?php
require_once dirname(__FILE__) . DS . "../lib/AppModel.php";
require_once dirname(__FILE__) . DS . "../lib/Helper.php";
require_once dirname(__FILE__) . DS . "../lib/Session.php";

class Post extends AppModel
{
    protected $table = 'post';
    protected $alias = 'Post';

    private $session = null;

    protected $rules = array(
        "id" => array(
            "form" => array(
                "type" => "hidden",
            ),
        ),
        "user_id" => array(
            "form" => array(
                "type" => "text",
            ),
            "notEmpty" => array(
                "rule" => "notEmpty",
                "message" => MSG_ERR_NOTEMPTY,
            ),
        ),
        "post_body" => array(
            "form" => array(
                "type" => "text",
            ),
            "notEmpty" => array(
                "rule" => "notEmpty",
                "message" => MSG_ERR_NOTEMPTY,
            ),
        ),
        "publicity_state" => array(
            "form" => array(
                "type" => "text",
            ),
            "isNumber" => array(
                "rule" => "isNumber",
                "message" => MSG_ERR_NUMER,
            ),
        ),
        "img_num" => array(
            "form" => array(
                "type" => "text",
            ),
            "isNumber" => array(
                "rule" => "isNumber",
                "message" => MSG_ERR_NUMER,
            ),
        ),
        "like_num" => array(
            "form" => array(
                "type" => "text",
            ),
            "isNumber" => array(
                "rule" => "isNumber",
                "message" => MSG_ERR_NUMER,
            ),
        ),
        "dislike_num" => array(
            "form" => array(
                "type" => "text",
            ),
            "isNumber" => array(
                "rule" => "isNumber",
                "message" => MSG_ERR_NUMER,
            ),
        ),
        "love_num" => array(
            "form" => array(
                "type" => "text",
            ),
            "isNumber" => array(
                "rule" => "isNumber",
                "message" => MSG_ERR_NUMER,
            ),
        ),
        "hate_num" => array(
            "form" => array(
                "type" => "text",
            ),
            "isNumber" => array(
                "rule" => "isNumber",
                "message" => MSG_ERR_NUMER,
            ),
        ),
        "comment_num" => array(
            "form" => array(
                "type" => "text",
            ),
            "isNumber" => array(
                "rule" => "isNumber",
                "message" => MSG_ERR_NUMER,
            ),
        ),
    );

    //Publicity_state: 0 là private, 1 là friend_only, 2 là public

    public function __construct()
    {

        parent::__construct();

        $this->session = new Session();
    }

    public function search_Lastest()
    {

        $results = $this->db->select(
            $this->table,
            array(
                'orders' => array('id' . ' DESC'),
            )
        );
        //echo json_encode($results);
        if (!empty($results)) {
            return $results[0];
        }
        //echo json_encode($results);

        return $results;
    }

    public function get_post($account, $limit = 0)
    {
        $friend_relation = new Friend_relation();
        $user_this = new User();
        $emotion_list_this = new Emotion_post_list();
        $comment_this = new Comment();

        $data_sql_1 = $friend_relation->return_select_sql(
            array(
                'conditions' => array(
                    "user_account_1" => "LIKE " . "'" . $account . "'",
                    "type" => "IN(0,1,2)",
                ),
            )
        );
        /*
        $data_sql_2 = $emotion_list_this->return_select_sql(
        array(
        'fields' => array("post_id", "like_list", "dislike_list", "love_list", "hate_list"),
        )
        );
        */
        $mlimit = $limit + 5;

        $data = $this->find(
            array(
                'joins' => array(
                    'friend_relation' => array(
                        'type' => "LEFT",
                        'on_join' => $data_sql_1,
                        'main_key' => 'user_account',
                        'join_key' => 'user_account_2',
                        'alias_main' => 'Post',
                        'alias_sub' => 'Friend_relation1',
                    ),
                    /*
                    'EmotionPostList' => array(
                    'type' => "LEFT",
                    'on_join' => $data_sql_2,
                    'main_key' => 'id',
                    'join_key' => 'post_id',
                    'alias_main' => 'Post',
                    'alias_sub' => 'EmotionPostList',
                    ),
                    */
                ),
                'conditions_or' => array(
                    'condition1' => array(
                        'POST.publicity_state' => 1,
                        "Friend_relation1.user_account_1" => "LIKE " . "'" . $account . "'",
                    ),
                    'condition2' => array('POST.publicity_state' => 2),
                    'condition3' => array($this->alias . '.user_id' => $user_this->get_id($account)['id']),
                ),
                'orders' => $this->alias . '.modified' . ' DESC',
                'limit' => $mlimit,
            ),
            'all'
        );

        return $data;
    }

    public function get_post_personal($id, $limit = 0)
    {
        $mlimit = $limit + 5;
        $data = $this->find(
            array(
                'conditions' => array(
                    $this->alias . '.user_id' => $id,
                ),
                'orders' => $this->alias . '.modified' . ' DESC',
                'limit' => $mlimit,
            ),
            'all'
        );

        return $data;
    }

    public function number_all()
    {
        $data = $this->find(
            array(
                'fields' => array($this->alias . '.id'),
            ),
            'all'
        );

        $size = sizeof($data);
        $this->_total = $size;
        return $size;
    }

    public function get_share_num($post_id)
    {
        $data = $this->find(array(
            'fields' => array($this->alias . '.id', $this->alias . '.share_id'),
            'conditions' => array(
                $this->alias . ".share_id" => $post_id,
            ),
        ), 'all');
        $size = sizeof($data);
        $this->_total = $size;
        return $size;
    }
}