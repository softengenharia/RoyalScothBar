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
	$sql= "SELECT v.idVenda_Capa,v.data, fp.nome AS pagamento,". 
	 " c.nome as nomeCliente,c.cpf,v.valor_total,v.status,v.pre_venda,v.comanda,f.nome AS nomeFuncionario ".
	 " FROM venda_capa AS v, cliente as c,funcionario as f,forma_pagamento as fp ".
	 " WHERE v.idCliente=c.idCliente AND v.idForma_Pagamento=fp.idForma_Pagamento AND v.idFuncionario=f.idFuncionario AND ".
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



