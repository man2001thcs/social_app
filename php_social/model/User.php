<?php
require_once dirname(__FILE__) . DS . "../lib/AppModel.php";
require_once dirname(__FILE__) . DS . "../lib/Helper.php";
require_once dirname(__FILE__) . DS . "../lib/Session.php";

date_default_timezone_set('Asia/Ho_Chi_Minh');

class User extends AppModel
{
    protected $table = 'user';
    protected $alias = 'User';

    private $session = null;

    //private $cart = array();
    //private $cartNum = 0;

    protected $rules = array(
        "id" => array(
            "form" => array(
                "type" => "hidden",
            ),
        ),
        "email" => array(
            "form" => array(
                "type" => "text",
            ),
            "notEmpty" => array(
                "rule" => "notEmpty",
                "message" => MSG_ERR_NOTEMPTY,
            ),
            "isEmail" => array(
                "rule" => "email",
                "message" => MSG_ERR_EMAIL,
            ),
        ),
        "password" => array(
            "form" => array(
                "type" => "password",
            ),
            "notEmpty" => array(
                "rule" => "notEmpty",
                "message" => MSG_ERR_NOTEMPTY,
            ),
        ),
        "passwordNew" => array(
            "form" => array(
                "type" => "password",
            ),
            "notEmpty" => array(
                "rule" => "notEmpty",
                "message" => MSG_ERR_NOTEMPTY,
            ),
        ),
        "re_passwordNew" => array(
            "form" => array(
                "type" => "password",
            ),
            "notEmpty" => array(
                "rule" => "notEmpty",
                "message" => MSG_ERR_NOTEMPTY,
            ),
        ),
        "fullname" => array(
            "form" => array(
                "type" => "text",
            ),
            "notEmpty" => array(
                "rule" => "notEmpty",
                "message" => MSG_ERR_NOTEMPTY,
            ),
        ),
        "phone_number" => array(
            "form" => array(
                "type" => "textarea",
            ),
            "notEmpty" => array(
                "rule" => "notEmpty",
                "message" => MSG_ERR_NOTEMPTY,
            ),
        ),
        "address" => array(
            "form" => array(
                "type" => "textarea",
            ),
            "notEmpty" => array(
                "rule" => "notEmpty",
                "message" => MSG_ERR_NOTEMPTY,
            ),
        ),
    );

    public function __construct()
    {
        parent::__construct();

        $this->session = new Session();
    }

    public function saveLogin($data)
    {
        $data[$this->alias]['password'] = Helper::hash($data[$this->alias]['password']);

        return parent::save($data);
    }

    public function login($data)
    {
        $exists = $this->find(
            array(
                'conditions' => array(
                    'email' => $data[$this->alias]['email'],
                    'password' => Helper::hash($data[$this->alias]['password']),
                ),
            ),
            'first'
        );

        if (!empty($exists)) {
            $log_temp = new Log_temp();
            $log_number = $log_temp->number_all();
            while (intval($log_number) - 7 > 0) {
                $first_id = $log_temp->search_First($data[$this->alias]['email']);
                if ($first_id) {
                    $log_temp->deleteById($first_id);
                }
            }
            $new_log_data = array(
                'LogTemp' => array(
                    'id_user' => $exists[$this->alias]['id'],
                    'email' => $exists[$this->alias]['email'],
                    'code_login' => $data[$this->alias]['code_login'],
                    'log_time' => date('Y-m-d H:i:s'),
                ),
            );
            //echo json_encode($new_log_data);
            if ($log_temp->save($new_log_data)) {
                return true;
            } else {
                return false;
            }

        }
        return false;
    }

    //check if exist
    public function check($data)
    {
        $exists = $this->find(
            array(
                'conditions' => array(
                    'email' => $data[$this->alias]['email'],
                    'password' => Helper::hash($data[$this->alias]['password']),
                ),
            ),
            'first'
        );

        if (!empty($exists)) {
            return true;
        }
        return false;
    }

    //check if exist
    public function checkUser($data)
    {

        $exists = $this->find(
            array(
                'conditions' => array(
                    'email' => $data[$this->alias]['email'],
                ),
            ),
            'first'
        );

        if (!empty($exists)) {
            return true;
        }

        return false;
    }

    public function logout($account)
    {
        $exists = $this->find(
            array(
                'conditions' => array(
                    'email' => $account,
                ),
            ),
            'first'
        );

        $exists['User']['code_login'] = "";

        if (parent::save($exists)) {
            return true;
        }
        ;
    }

    public function login_code($account)
    {
        $log_temp = new Log_temp();

        $log_data = $log_temp->search_Lastest($account);

        return $log_data['LogTemp']['code_login'];
    }

    public function is_admin($email)
    {
        $exists = $this->find(
            array(
                'conditions' => array(
                    'email' => $email,
                ),
            ),
            'first'
        );

        if ($exists['User']['is_admin'] != 0 || $exists['User']['is_admin'] != "0") {
            return true;
        } else {
            return false;
        }
    }

    public function find_by_email($email)
    {
        $exists = $this->find(
            array(
                'conditions' => array(
                    'email' => $email,
                ),
            ),
            'first'
        );
                
        return $exists;
    }

    public function welcome($email)
    {
        $exists = $this->find(
            array(
                'fields' => array(
                    $this->alias . '.id', $this->alias . '.fullname', $this->alias . '.address',
                    $this->alias . '.phone_number', $this->alias . '.is_admin', $this->alias . '.created'
                ),
                'conditions' => array(
                    'email' => $email,
                ),
            ),
            'first'
        );
        return $exists['User'];
    }

    public function get_id($email)
    {
        $exists = $this->find(
            array(
                'fields' => array($this->alias . '.id'),
                'conditions' => array(
                    'email' => $email,
                ),
            ),
            'first'
        );
        return $exists['User'];
    }

    public function get_full_name($email)
    {
        $exists = $this->find(
            array(
                'fields' => array($this->alias . '.fullname'),
                'conditions' => array(
                    'email' => $email,
                ),
            ),
            'first'
        );
        return $exists['User'];
    }

    public function get_pass($email)
    {
        $exists = $this->find(
            array(
                'fields' => array($this->alias . '.password'),
                'conditions' => array(
                    'email' => $email,
                ),
            ),
            'first'
        );
        return $exists['User']['password'];
    }

    public function get_friend_suggest($account, $limit = 0)
    {
        $friend_relation = new Friend_relation();

        $data_sql = $friend_relation->return_select_sql(
            array(
                'conditions' => array(
                    "user_account_1" => "LIKE " . "'" . $account . "'",
                ),
            )
        );

        $mlimit = $limit + 10;

        $data = $this->find(
            array(
                'joins' => array(
                    'user' => array(
                        'type' => "LEFT",
                        'on_join' => $data_sql,
                        'main_key' => 'email',
                        'join_key' => 'user_account_2',
                        'alias_main' => 'User',
                        'alias_sub' => 'FriendRelation',
                    )
                ),
                'conditions' => array(
                    "FriendRelation.type" => "is null",
                    $this->alias . ".email" => "NOT LIKE " . "'" . $account . "'",
                ),
                'limit' => $mlimit,
            ),
            'all'
        );

        return $data;
    }

    public function get_info($account_this, $account_visit)
    {
        $friend_relation = new Friend_relation();

        $friend_relation_data = $friend_relation->find(
            array(
                'conditions' => array(
                    "user_account_1" => "LIKE " . "'" . $account_visit . "'",
                    "user_account_2" => "LIKE " . "'" . $account_this . "'",
                ),
            ),
            "first"
        );

        if (
            isset($friend_relation_data) || $friend_relation_data["FriendRelation"]['type'] == 0
            || $friend_relation_data["FriendRelation"]['type'] == 0
        ) {

            $data_user = $this->find(
                array(

                    'conditions' => array(
                        $this->alias . ".email" => "LIKE " . "'" . $account_visit . "'",
                    ),
                    'fields' => array(
                        $this->alias . '.id', $this->alias . '.fullname', $this->alias . '.address',
                        $this->alias . '.phone_number', $this->alias . '.is_admin', $this->alias . '.created'
                    ),
                ),
                'first'
            );
        } else {
            $data_user = $this->find(
                array(

                    'conditions' => array(
                        $this->alias . ".email" => "LIKE " . "'" . $account_visit . "'",
                    ),
                    'fields' => array(
                        $this->alias . '.id', $this->alias . '.fullname',
                        $this->alias . '.is_admin', $this->alias . '.created'
                    ),
                ),
                'first'
            );
        }
        return $data_user;
    }
}