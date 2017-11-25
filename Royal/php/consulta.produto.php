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
$codigobarra=$_POST["codigobarras"];

$sqlbase="SELECT p.nome,p.preco_final,p.quantidade,p.codigo_barras,p.observacao,f.nome as fornecedor FROM `produto` AS p,fornecedor as f WHERE p.idFornecedor=f.idFornecedor ";

if($nome=="" && $codigobarra==""){
	$sql=" ";
}else if($nome==""){
	$sql= " AND  p.codigo_barras='".$codigobarra."'";
}else if($codigobarra==""){
	$sql= " AND p.nome LIKE '%".$nome."%'";
}
else{
	$sql= " AND ( p.codigo_barras='".$codigobarra."' OR p.nome LIKE '%".$nome."%') ";
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