<?php

$manager = new MongoDB\Driver\Manager("mongodb://localhost:27017");

// Query Class
# setting your options and filter
$filter  = [];
$options = ['sort'=>array('_id'=>-1),'limit'=>3]; # limit -1 from newest to oldest

#constructing the querry
$query = new MongoDB\Driver\Query($filter, $options);

// Output of the executeQuery will be object of MongoDB\Driver\Cursor class
$cursor = $manager->executeQuery('mydb.users', $query);

foreach ($cursor as $document) {
	print_r(json_encode($document));
  }