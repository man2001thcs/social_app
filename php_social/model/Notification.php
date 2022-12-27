<?php
require_once(dirname(__FILE__) . DS . "../lib/AppModel.php");
require_once(dirname(__FILE__) . DS . "../lib/Helper.php");
require_once(dirname(__FILE__) . DS . "../lib/Session.php");

class Notification extends AppModel
{
	protected $table = 'notification';
	protected $alias = 'Notification';

	private $session = null;

	//private $cart = array();
	//private $cartNum = 0;

	protected $rules = array(
		"id" => array(
			"form" => array(
				"type" => "hidden"
			)
		),
		"user_account_1" => array(
			"form" => array(
				"type" => "text"
			),
			"notEmpty" => array(
				"rule" => "notEmpty",
				"message" => MSG_ERR_NOTEMPTY
			),
			"isEmail" => array(
				"rule" => "email",
				"message" => MSG_ERR_EMAIL
			)
		),
		"type" => array(
			"form" => array(
				"type" => "text"
			),
			"isNumber" => array(
				"rule" => "isNumber",
				"message" => MSG_ERR_NUMER
			)
		),
		"message" => array(
			"form" => array(
				"type" => "text"
			),
			"notEmpty" => array(
				"rule" => "notEmpty",
				"message" => MSG_ERR_NOTEMPTY
			)
		),
	);

	//Publicity_state: 0 là private, 1 là friend_only, 2 là public
	//Type: 0 là bài viết mới, 1 là comment trong bài viết của bạn, 2 là comment nhắc tới bạn
	//, 3 là friend request nhận, 4 là friend request send, 5 là friend request accept, 6 là friend request declined
	//11,12,13,14 là các thông báo về like, dislike, ... post
	//21,22,23,24 là các thông báo về like, dislike, ... comment
	public function __construct()
	{
		parent::__construct();

		$this->session = new Session();
	}

	public function get_notification($account, $limit = 0)
	{
		$user_this = new User();
		$friend_relation = new Friend_relation();

		$data_sql_1 = $user_this->return_select_sql(
			array(
				'fields' => array('User.email', 'User.id', 'User.fullname'),
			)
		);

		$data_sql_2 = $friend_relation->return_select_sql(
			array(
				'conditions' => array(
					"user_account_2" => "LIKE " . "'" . $account . "'",
				),
			)
		);

		$mlimit = $limit + 10;

		$data = $this->find(
			array(
				'joins' => array(
					'User' => array(
						'type' => "LEFT",
						'on_join' => $data_sql_1,
						'main_key' => 'user_account_1',
						'join_key' => 'email',
						'alias_main' => $this->alias,
						'alias_sub' => 'User',
					),
					'Friend_relation' => array(
						'type' => "LEFT",
						'on_join' => $data_sql_2,
						'main_key' => 'user_account_2',
						'join_key' => 'user_account_1',
						'alias_main' => $this->alias,
						'alias_sub' => 'Friend_relation',
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
						$this->alias . '.user_account_2' => $account,
						"Friend_relation.type" => 1,
						$this->alias . '.type' => 0,
					),
					'condition2' => array(
						$this->alias . '.user_account_2' => $account,
						//"Friend_relation1.type" => 1,
						$this->alias . '.type' => "IN(1,2,3,5,6,11,12,13,14)",
					),
				),
				'orders' => $this->alias . '.created' . ' DESC',
				'limit' => $mlimit,
			),
			'all'
		);

		return $data;
	}

}