 <?php
header('Content-type: application/json; charset=utf-8'); 
include "bddata.php";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql= "UPDATE fornecedor SET nome=?,cnpj=?,endereco=?,".
	"cidade=?,estado=?,complemento=?,cep=?,telefone=?,idForma_Pagamento=? ".
	"WHERE idFornecedor=?";

$stmt=$conn->prepare($sql);

$stmt->bind_param("ssssssssii",$_POST["nome"],$_POST["cnpj"],$_POST["endereco"],
			$_POST["cidade"],
			$_POST["estado"],$_POST["complemento"],
			$_POST["cep"],$_POST["telefone"],intval($_POST["pagamento"]),intval($_POST["id"]));
			
$success = $stmt->execute();
$stmt->close();

$result = ['success' => $success];

print json_encode($result);
$conn->close();
?> 