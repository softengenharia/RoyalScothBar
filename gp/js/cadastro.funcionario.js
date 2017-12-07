$("#cadastrar").click(function(e){
	e.preventDefault();
	e.stopImmediatePropagation();
			
	var inputs=$("#form .control-group :input");
	
	var valuesFields={};
	inputs.each(function (){
		valuesFields[this.name]=$(this).val();
	});
	
	var dataFields="nome="+valuesFields["nome"];
	var nome=$("#nome").val();
	var cpf=$("#mask-cpf").val();
	var salario=$("#salario").val();
	var usuario=$("#usuario").val();
	var senha=$("#senha").val();
	var csenha=$("#csenha").val();
	
	
	if(nome == "" || cpf == "" || salario == "" || usuario == "" || senha == "" || csenha == ""){
			window.alert("Preencha todos os campos obrigatórios (*)");
			return;
	}
	
	$.each(valuesFields,function(field,key){
		if(field!="nome" && key!=""){
			dataFields+="&"+field+"="+key;
		}
	});
	
	//console.log(dataFields);
	//return;
	
	$.ajax({
		url: "../php/cadastro.funcionario.php",
		type: "POST",
		data: dataFields,
		dataType: "json"

	}).done(function(resposta) {
		if(resposta.success){
			window.alert("Funcionário inserido com sucesso!");
			var inputs=$("#form .control-group :input");
			inputs.each(function (){
				$(this).val("");
			});
		}else if(resposta.falha){
			window.alert("Funcionário já cadastrado!");
			var inputs=$("#form .control-group :input");
			inputs.each(function (){
				$(this).val("");
			});
		}else{
			window.alert("Erro, tente novamente!");
		}

	}).fail(function(jqXHR, textStatus ) {
		window.alert("Erro interno, tente novamente!");

	}).always(function() {
		
	});
	
});





