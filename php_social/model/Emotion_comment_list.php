<?php
require_once(dirname(__FILE__).DS. "../lib/AppModel.php");
require_once(dirname(__FILE__).DS. "../lib/Helper.php");
require_once(dirname(__FILE__).DS. "../lib/Session.php");

class Emotion_comment_list extends AppModel {
	protected $table = 'emotion_comment_list';
	protected $alias = 'EmotionCommentList';
	
	private $session = null;

	//private $cart = array();
	//private $cartNum = 0;
	
	protected $rules = array(
		"id" => array(
			"form" => array(
				"type" => "hidden"
			)
		),
		"like_list" => array(
			"form" => array(
				"type" => "text"
			),
		),
		"dislike_list" => array(
			"form" => array(
				"type" => "text"
			),
		),
		"love_list" => array(
			"form" => array(
				"type" => "text"
			),
		),
		"hate_list" => array(
			"form" => array(
				"type" => "text"
			),
		),
	);

		//Type: 0 chưa là gì, 1 là bạn, 2 là người yêu
		//, 3 là block
		
	public function __construct() {
		parent::__construct();
		
		$this->session = new Session();
	}

	public function findByCommentId($comment_id)
    {
        $data = $this->find(array(
            'conditions' => array($this->alias . '.comment_id' => $comment_id),
        ), 'first');
        return $data;
    }


}