<?php
/**
* PHP Simple Model Driver (Tham khao tu thay Bui Trung)
* 
* @author BuiTrung<trungbq06@gmail.com>
* @version 1.0
*/

class MyMongoDriver {

    public function __construct($config = array())
    {
		$this->config = $config;
		
		return $this->connect();
	}

    public static function getInstance()
	{
		$config = array('host'=>DATABASE_HOST, "username" => DATABASE_USERNAME, "password" => DATABASE_PASSWORD);
		if (null === MysqlDriver::$instance) {
			MysqlDriver::$instance = new MysqlDriver($config);
		}
	
		return MysqlDriver::$instance;
	}

    /**
	 * Connects to the database using options in the given configuration array.
	 *
	 * @return boolean True if the database could be connected, else false
	 */
	function connect() {
		$config = $this->config;

        $this->connection = new MongoDB\Driver\Manager($config['host'],
            array("username" => $config['username'], "password" => $config['password'])
        );   
		
		return $this->connection;
	}

    function insert($myTable, $data) {
		$bulk = new MongoDB\Driver\BulkWrite();

        $bulk->insert($data);

        $namespace = DATABASE_NAME . "." . $myTable;

        $writeConcern = new MongoDB\Driver\WriteConcern(MongoDB\Driver\WriteConcern::MAJORITY, 100);
        $result = $this->connection->executeBulkWrite($namespace, $bulk, $writeConcern);

        if ($writeConcernError = $result->getWriteConcernError()) {
            printf("%s (%d): %s\n", $writeConcernError->getMessage(), $writeConcernError->getCode(), var_export($writeConcernError->getInfo(), true));
        }
        
        /* If a write could not happen at all */
        foreach ($result->getWriteErrors() as $writeError) {
            printf("Operation#%d: %s (%d)\n", $writeError->getIndex(), $writeError->getMessage(), $writeError->getCode());
        }

	}

    function select($myTable, $fitler = array(),  $options = array(), $isCount = false) {

        #constructing the querry
        $query = new MongoDB\Driver\Query($filter, $options);

        #executing
        $cursor = $manager->executeQuery('resultdb.test', $query);

        echo "dumping results<br>";
        foreach ($cursor as $document) {
          var_dump($document);	
        }

}