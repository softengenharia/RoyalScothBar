$.getJSON("../php/busca.estoque.php", function(result) {
	var tag = $("#estoque");
	$.each(result.data, function(item,value) {
		$("<option />").val(value.idProduto).text(value.nome).appendTo(tag);
	});
});


$("#cadastrar").click(function(e){
	e.preventDefault();
	e.stopImmediatePropagation();
			
	var estoque=$("#estoque").val();
	var codigo_barras=$("#codigo_barras").val();
	var quantidade=$("#quantidade").val();
	
	
	if(codigo_barras=="" && estoque=="" && estoque==""){
		window.alert("Preencha os campos");
		return;
	}
	
	var dataFields="estoque="+estoque+"&codigo_barras="+codigo_barras+"&quantidade="+quantidade;
		
	console.log(dataFields);
	
	
	$.ajax({
		url: "../php/atualiza.estoque.php",
		type: "POST",
		data: dataFields,
		dataType: "json"

	}).done(function(data) {
		if(data.data.length>0){
			window.alert("Produto alterado com sucesso!");
			
		}else{
			window.alert("Produto nao encontrado !");
		}

	}).fail(function(jqXHR, textStatus ) {
		window.alert("Erro, tente novamente!");
		console.log(textStatus);

	}).always(function() {
		
	});
	
});






