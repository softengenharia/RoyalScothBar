 <?php
header('Content-type: application/json; charset=utf-8'); 
include "bddata.php";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql= "UPDATE produto SET nome=?,preco_custo=?,margem=?,preco_final=?,quantidade=?,codigo_barras=?,observacao=?,".
	" idFornecedor=?,idForma_pagamento=? ".
	" WHERE idProduto=?";

$stmt=$conn->prepare($sql);

$stmt->bind_param("sssssssiii",$_POST["nome"],$_POST["precocusto"],$_POST["margem"],$_POST["precofinal"],$_POST["quantidade"],$_POST["codigobarras"],
			$_POST["observacao"],
			intval($_POST["id"]),intval($_POST["id"]),intval($_POST["id"]));
			
$success = $stmt->execute();
$stmt->close();

$result = ['success' => $success];

print json_encode($result);
$conn->close();
?> 