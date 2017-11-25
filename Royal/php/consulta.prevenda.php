 <?php
include "bddata.php";
header('Content-type: application/json; charset=utf-8'); 
 
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$comanda=$_POST["comanda"];
$nome=$_POST["nome"];
$datainicial=$_POST["datainicial"];
$datafinal=$_POST["datafinal"];

$sqlbase="SELECT vc.comanda, c.nome as cliente,vc.data, vc.valor_total, fc.nome as funcionario, vc.status FROM venda_capa AS vc, cliente as c, funcionario as fc WHERE vc.idCliente=c.idCliente AND fc.idFuncionario=vc.idFuncionario AND vc.status='A' AND vc.data BETWEEN '".$datainicial."' AND '".$datafinal."'";

if($comanda=="" && $nome==""){
	die("Nenhum parametro!");
}else if($comanda==""){
	$sql= "AND c.nome LIKE '%".$nome."%'";
}else if($nome==""){
	$sql= "AND vc.comanda='".$comanda."'";
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