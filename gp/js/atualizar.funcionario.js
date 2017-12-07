function inicializarForm(data){
	$("#nome").val(data["nomeFuncionario"]);
	$("#mask-cpf").val(data["cpf"]);
	$("#rg").val(data["rg"]);
	$("#endereco").val(data["endereco"]);
	$("#complemento").val(data["complemento"]);
	$("#cidade").val(data["cidade"]);
	$("#estado").val(data["estado"]).change();
	$("#mask-cep").val(data["cep"]);
	$("#salario").val(data["salario"]);
	$("#usuario").val(data["usuario"]);
	$("#senha").val(data["senha"]);
	$("#csenha").val(data["csenha"]);
	$("#mask-celular").val(data["telefone"]).change();	
}

$.urlParam = function(name){  
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);  
    return results[1] || 0;  
}

id=$.urlParam("id");
dataFields="id="+id;

$.ajax({
	url: "../php/get.funcionario.php",
	type: "GET",
	data: dataFields,
	dataType: "json"

}).done(function(data) {
	//console.log(data)
	inicializarForm(data)

}).fail(function(jqXHR, textStatus ) {
	window.alert("Erro, tente novamente!");
	console.log(textStatus);

}).always(function() {
	
});

$("#cadastrar").click(function(e){
	e.preventDefault();
	e.stopImmediatePropagation();
	
	var dataFields="nome="+$("#nome").val()+"&";
	dataFields+="cpf="+$("#mask-cpf").val()+"&";
	dataFields+="rg="+$("#rg").val()+"&";
	dataFields+="endereco="+$("#endereco").val()+"&";
	dataFields+="complemento="+$("#complemento").val()+"&";
	dataFields+="cidade="+$("#cidade").val()+"&";
	dataFields+="estado="+$("#estado").val()+"&";
	dataFields+="cep="+$("#mask-cep").val()+"&";
	dataFields+="salario="+$("#salario").val()+"&";
	dataFields+="usuario="+$("#usuario").val()+"&";
	dataFields+="senha="+$("#senha").val()+"&";
	dataFields+="csenha="+$("#csenha").val()+"&";
	dataFields+="telefone="+$("#mask-celular").val()+"&";
	dataFields+="id="+id;
	
	//console.log("Beep");
	console.log(dataFields);
	//return;
	
	$.ajax({
		url: "../php/atualizar.funcionario.php",
		type: "POST",
		data: dataFields,
		dataType: "json"

	}).done(function(resposta) {
		if(resposta.success){
			window.alert("Funcionário atualizado com sucesso!");
		}else{
			window.alert("Erro, tente novamente!");
		}

	}).fail(function(jqXHR, textStatus ) {
		window.alert("Erro interno, tente novamente!");
		console.log(textStatus);

	}).always(function() {
		
	});
	
});



