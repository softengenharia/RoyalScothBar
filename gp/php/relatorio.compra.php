 <?php
include "bddata.php";
header('Content-type: application/json; charset=utf-8'); 

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$dataInicial=$_POST["datainicial"];
$dataFinal=$_POST["datafinal"];


if($dataInicial=="" && $dataFinal==""){
	die("Nenhum parametro!");
}else {
	$sql= "SELECT pc.idPlanoContas_Capa,pc.data, fp.nome AS pagamento,". 
	 " f.nome as nomeFornecedor,f.cnpj,pc.valor_total,pc.situacao ".
	 " FROM PlanoContas_Capa AS pc, fornecedor as f,forma_pagamento as fp ".
	 " WHERE pc.idForma_Pagamento=fp.idForma_Pagamento AND pc.idFornecedor=f.idFornecedor AND ".
	 " data BETWEEN '".$dataInicial."' AND '".$dataFinal."'";
}



$result=$conn->query($sql);
if($result){
	while($row=$result->fetch_assoc()){
		$json[]=$row;
	}
	$data["data"]=$json;
	$data["qtd"]=sizeof($data["data"]);
	
}else{
	$data["data"]=[];
	$data["qtd"]=0;
}

print json_encode($data);
$conn->close();
?> 



