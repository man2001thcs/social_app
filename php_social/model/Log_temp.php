<?php
require_once(dirname(__FILE__).DS. "../lib/AppModel.php");
require_once(dirname(__FILE__).DS. "../lib/Helper.php");
require_once(dirname(__FILE__).DS. "../lib/Session.php");

class Log_temp extends AppModel {
	protected $table = 'log_temp';
	protected $alias = 'LogTemp';
	
	private $session = null;

	//private $cart = array();
	//private $cartNum = 0;
	
	protected $rules = array(
		"id" => array(
			"form" => array(
				"type" => "hidden"
			)
		),
		"id_user" => array(
			"form" => array(
				"type" => "text"
			),
			"notEmpty" => array(
				"rule" => "notEmpty",
				"message" => MSG_ERR_NOTEMPTY
			),
		),
		"email" => array(
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
		"code_login" => array(
			"form" => array(
				"type" => "text"
			),
			"notEmpty" => array(
				"rule" => "notEmpty",
				"message" => MSG_ERR_NOTEMPTY
			)
		),
	);
	
	public function __construct() {
		parent::__construct();
		
		$this->session = new Session();
	}

	public function search_Lastest($email){
		$results = $this->db->select($this->table, array(
			'conditions' => array(
				'email' => $email
			),
			'orders' => array('log_time' . ' DESC')
		));
		//echo json_encode($results);
		if (!empty($results)) {
			return $results[0];
		}
		//echo json_encode($results);

		return $results;
	}

	public function search_First($email){
		$results = $this->db->select($this->table, array(
			'conditions' => array(
				'email' => $email
			),
			'orders' => array('log_time' . ' ASC')
		));
		//echo json_encode($results);
		if (!empty($results)) {
			return $results[0][$this->alias]['id'];
		}
		//echo json_encode($results);

		return false;
	}

}