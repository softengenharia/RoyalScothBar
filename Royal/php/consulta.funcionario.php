 <?php
include "bddata.php";
header('Content-type: application/json; charset=utf-8'); 

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$nome=$_POST["nome"];
$cpf=$_POST["cpf"];

if($nome=="" && $cpf==""){
	die("Nenhum parametro!");
}else if($nome==""){
	$sql= "SELECT * FROM funcionario WHERE cpf='".$cpf."'";
}else if($cpf==""){
	$sql= "SELECT * FROM funcionario WHERE nome LIKE '%".$nome."%'";
}else{
	$sql= "SELECT * FROM funcionario WHERE cpf='".$cpf."' OR nome LIKE '%".$nome."%'";
}


$result=$conn->query($sql);
$json=[];

while($row=$result->fetch_assoc()){
	$json[]=$row;
}
$data["data"]=$json;

print json_encode($data);

$conn->close();
?> 