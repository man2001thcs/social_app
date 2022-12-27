<?php
if (!class_exists("MysqlDriver")) {
    require_once dirname(__FILE__) . DS . "MysqlDriver.php";
}

if (!class_exists("Form")) {
    require_once dirname(__FILE__) . DS . "Form.php";
}

/**
 * Base class for all model
 * @author TrungBQ
 *
 */
class AppModel
{
    /**
     * Database connection
     */
    protected $db = null;

    /**
     * Alias to return the data
     */
    protected $alias = null;

    /**
     * Name of the table in database
     */
    protected $table = '';

    //for get data, pagination
    private $_limit;
    private $_page;
    private $_total;

    /**
     * Current data this record is holding
     */
    protected $data = null;

    /**
     * Validation errors
     */
    protected $errors = null;

    /**
     * Form helper
     */
    public $form = null;

    /**
     * Rules to validate
     */
    protected $rules = null;

    public function __construct()
    {
        // Create db instance
        $this->db = MysqlDriver::getInstance();

        // Set log query file path
        $this->db->setLogFile(dirname(__FILE__) . '/../logs/queries.log');

        // Form object
        $this->form = new Form();
        $this->form->setModel($this->alias);
        $this->form->setRules($this->rules);
    }

    //save data
    public function save($data)
    {
        $this->data = $data;
        $this->form->data = $data;

        if (!$this->form->validate($this->data[$this->alias])) {
            return false;
        }

        if (isset($this->data[$this->alias]['id']) && !empty($this->data[$this->alias]['id'])) {
            $id = $this->data[$this->alias]['id'];
            return $this->db->update($this->table, $this->data[$this->alias], array('id' => $id));
        } else {
            unset($this->data[$this->alias]['id']);
            $saved = $this->db->insert($this->table, $this->data[$this->alias]);
            if ($saved) {
                $this->data[$this->alias]['id'] = $this->db->lastInsertId();
                return $saved;
            }
        }
    }

    public function find($conditions, $first = 'all')
    {
        $results = $this->db->select($this->table, $conditions);
        //echo json_encode($conditions);

        if (!empty($results) && $first == 'first') {
            return $results[0];
        }
        //echo json_encode($results);

        return $results;
    }

    public function return_select_sql($conditions)
    {
        $results = $this->db->select_sql($this->table, $conditions);
        //echo json_encode($conditions);

        return $results;
    }

    //find thing by id
    public function findById($id)
    {
        $data = $this->find(array(
            'conditions' => array($this->alias . '.id' => $id),
        ), 'first');
        $this->form->data = $data;
        return $data;
    }

    public function findByPostId($id)
    {
        $data = $this->find(array(
            'conditions' => array($this->alias . '.post_id' => $id),
        ), 'first');
        return $data;
    }

    //new id for next item
    public function findById_New()
    {
        $data = $this->find(array(
            'fields' => array($this->alias . '.id'),
            'orders' => $this->alias . '.id' . ' DESC',
        ), 'first');
        return intval($data[$this->alias]['id']) + 1;
    }

    //find by name part
    public function findByNamePart($name)
    {
        $temp = "LIKE '%";
        $temp .= $name . "%'";
        $data = $this->find(array(
            'conditions' => array($this->alias . '.name' => $temp),
        ), 'all');
        $this->form->data = $data;
        return $data;
    }

    //find author/user by name
    public function findByName($name)
    {
        $data = $this->find(array(
            'conditions' => array($this->alias . '.name' => $name),
        ), 'first');
        //echo json_encode($data);
        return $data[$this->alias]['id'];
    }

    //find user by id
    public function findById_User($id)
    {
        $data = $this->find(array(
            'fields' => array($this->alias . '.email', $this->alias . '.fullname'),
            'conditions' => array($this->alias . '.id' => $id),
        ), 'first');

        $this->form->data = $data;
        return $data;
    }
    //get number of row
    public function number_all()
    {
        $data = $this->find(array(
            'fields' => array($this->alias . '.id'),
        ), 'all');

        $size = sizeof($data);
        $this->_total = $size;
        return $size;
    }

    public function getNextId()
    {
        $results = $this->db->select($this->table, array(
            'orders' => $this->alias . '.id' . ' DESC',
            'fields' => array($this->alias . '.id'),
        ), 'first');
        return $results[$this->alias]['id'];
    }

    //delete by id
    public function deleteById($id)
    {
        $this->db->delete($this->table, array(
            $this->table . '.id' => $id,
        ));
        return true;
    }

    //delete by condition
    public function delete($conditions)
    {
        $this->db->delete($this->table, $conditions);
    }
    //get all for test
    public function findAll()
    {
        return $this->db->select($this->table);
    }

    public function getStatusCodeMessage($status)
    {
        $codes = array(
            100 => "Continue",
            101 => "Switching Protocols",
            200 => "OK",
            201 => "Created",
            202 => "Accepted",
            203 => "Non-Authoritative Information",
            204 => "No Content",
            205 => "Reset Content",
            206 => "Partial Content",
            300 => "Multiple Choices",
            301 => "Moved Permanently",
            302 => "Found",
            303 => "See Other",
            304 => "Not Modified",
            305 => "Use Proxy",
            306 => "(Unused)",
            307 => "Temporary Redirect",
            400 => "Bad Request",
            401 => "Unauthorized",
            402 => "Payment Required",
            403 => "Forbidden",
            404 => "Not Found",
            405 => "Method Not Allowed",
            406 => "Not Acceptable",
            407 => "Proxy Authentication Required",
            408 => "Request Timeout",
            409 => "Conflict",
            410 => "Gone",
            411 => "Length Required",
            412 => "Precondition Failed",
            413 => "Request Entity Too Large",
            414 => "Request-URI Too Long",
            415 => "Unsupported Media Type",
            416 => "Requested Range Not Satisfiable",
            417 => "Expectation Failed",
            500 => "Internal Server Error",
            501 => "Not Implemented",
            502 => "Bad Gateway",
            503 => "Service Unavailable",
            504 => "Gateway Timeout",
            505 => "HTTP Version Not Supported",
        );

        return (isset($codes[$status])) ? $codes[$status] : "";
    }

    public function sendResponse($status = 200, $body = "", $content_type = 'application/json')
    {
        $status_header = 'HTTP/1.1 ' . $status . ' ' . $this->getStatusCodeMessage($status);
        header($status_header);
        header('Content-type: ' . $content_type);
        echo $body;
		//echo $this->getStatusCodeMessage($status);
    }
}
