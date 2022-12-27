<?php
/**
 * Session management
 * Write, read, delete from session
 */
class Session {

	private $name = null;

	public function __construct() {
		if (!isset($_SESSION)) {
			session_start();
		}
		
		
	}
	
	public function write($key, $value) {
		$_SESSION[$key] = $value;
	}

	public function setLogName($name) {
		$this->name = $name;
	}

	public function getLogName() {
		return $this->name;
	}
	
	public function read($key) {
		$value = isset($_SESSION[$key]) ? $_SESSION[$key] : null;
		
		return $value;
	}
	
	public function delete($key) {
		if (isset($_SESSION[$key])) {
			unset($_SESSION[$key]);
		}
	}
	
	public function destroy() {
		session_destroy();
	}
}