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
$datainicial=$_POST["datainicial"];
$datafinal=$_POST["datafinal"];

$sqlbase="SELECT c.nome as cliente,vc.data,fp.nome as pagamento, vc.valor_total, fc.nome as funcionario, vc.comanda, vc.status as status2 FROM `venda_capa` AS vc,cliente as c, forma_pagamento as fp, funcionario as fc WHERE vc.idCliente=c.idCliente AND vc.idForma_Pagamento=fp.idForma_Pagamento AND fc.idFuncionario=vc.idFuncionario AND vc.data BETWEEN '".$datainicial."' AND '".$datafinal."'";

if($nome==""){
	$sql=" ";
}
else{
	$sql= " AND c.nome LIKE '%".$nome."%'";
}

//echo $sqlbase.$sql;
$result=$conn->query($sqlbase.$sql);

$json=[];
while($row=$result->fetch_assoc()){
	$json[]=$row;
}

$data["data"]=$json;

print json_encode($data);

$conn->close();
?> 