 <?php
include "bddata.php";
header('Content-type: application/json; charset=utf-8'); 

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql= "SELECT f.idFornecedor,f.nome,f.cnpj,f.endereco,".
	"f.cidade,f.estado,f.complemento,f.cep,f.telefone,".
	"fp.nome AS pagamento ".
	"FROM fornecedor as f, forma_pagamento as fp ".
	"WHERE f.idForma_Pagamento=fp.idForma_Pagamento";
	
$result=$conn->query($sql) or die($conn->error);

if ($result) {
	while($row=$result->fetch_assoc()){
		$json[]=$row;
	}
	$data["data"]=$json;
	$data["qtd"]=sizeof($json);
} else {
	$data["qtd"]=0;
}

print json_encode($data);

$conn->close();
?> 