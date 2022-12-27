<?php
require_once 'database.php';
$stmt = $conn->prepare('select * from wp_medicine');
$stmt->execute();
$results = $stmt->fetchAll(PDO::FETCH_OBJ);
echo json_encode($results);
?>