 <?php
header('Content-type: application/json; charset=utf-8'); 
include "bddata.php";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$sql= "INSERT INTO funcionario(nome,cpf,rg,endereco,complemento,cidade,estado,cep,telefone,usuario,senha,salario) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
$stmt=$conn->prepare($sql);

$stmt->bind_param("sssssssssssd",$_POST["nome"],$_POST["cpf"],$_POST["rg"],
		$_POST["endereco"],$_POST["complemento"],$_POST["cidade"],$_POST["estado"],
			$_POST["cep"],$_POST["telefone"],$_POST["usuario"],$_POST["senha"],floatval($_POST["salario"]));
			
$success = $stmt->execute();
$stmt->close();

$result = ['success' => $success];

print json_encode($result);
$conn->close();
?> 