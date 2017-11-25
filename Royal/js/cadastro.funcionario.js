$("#cadastrar").click(function(e){
	e.preventDefault();
	e.stopImmediatePropagation();
			
	var inputs=$("#form .control-group :input");
	
	var valuesFields={};
	inputs.each(function (){
		valuesFields[this.name]=$(this).val();
	});
	
	var dataFields="nome="+valuesFields["nome"];
	
	
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
			window.alert("Funcionario Inserido com Sucesso!");
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





