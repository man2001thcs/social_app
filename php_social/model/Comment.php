<?php
require_once dirname(__FILE__) . DS . "../lib/AppModel.php";
require_once dirname(__FILE__) . DS . "../lib/Helper.php";
require_once dirname(__FILE__) . DS . "../lib/Session.php";

class Comment extends AppModel
{
    protected $table = 'comment';
    protected $alias = 'Comment';

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
        "comment_body" => array(
            "form" => array(
                "type" => "text",
            ),
            "notEmpty" => array(
                "rule" => "notEmpty",
                "message" => MSG_ERR_NOTEMPTY,
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
        "rank" => array(
            "form" => array(
                "type" => "text",
            ),
            "isNumber" => array(
                "rule" => "isNumber",
                "message" => MSG_ERR_NUMER,
            ),
        ),
    );

    public function __construct()
    {

        parent::__construct();

        $this->session = new Session();
    }

    public function search_Lastest()
    {

        $results = $this->db->select($this->table, array(
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

    public function get_comment($account, $post_id, $limit = 0)
    {

        $friend_relation = new Friend_relation();

        $data_sql = $friend_relation->return_select_sql(
            array(
                'conditions' => array(
                    "user_account_1" => "LIKE " . "'" . $account . "'",
                    "type" => "IN (0,1,2)",
                ),
            )
        );

        if ($limit == 0)
            $mlimit = 10;
        $mlimit = $limit + 5;

        $data = $this->find(
            array(
                'joins' => array(
                    'friend_relation' => array(
                        'type' => "LEFT",
                        'on_join' => $data_sql,
                        'main_key' => 'user_account',
                        'join_key' => 'user_account_2',
                        'alias_main' => 'Comment',
                        'alias_sub' => 'Friend_relation1',
                    )
                ),
                'conditions' => array(
                    $this->alias . ".post_id" => $post_id,
                ),
                'orders' => $this->alias . '.modified' . ' DESC',
                'limit' => $mlimit,
            ), 'all');

        return $data;
    }

    public function number_all()
    {
        $data = $this->find(
            array(
                'fields' => array($this->alias . '.id'),
            ), 'all');

        $size = sizeof($data);
        $this->_total = $size;
        return $size;
    }

    public function get_comment_num($post_id)
    {
        $data = $this->find(
            array(
                'fields' => array($this->alias . '.user_id', $this->alias . '.post_id'),
                'conditions' => array(
                    $this->alias . ".post_id" => $post_id,
                ),
            ), 'all');
        $size = sizeof($data);
        $this->_total = $size;
        return $size;
    }
}