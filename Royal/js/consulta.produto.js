function manageRow(data) {
	var	rows = '';
	$.each( data, function( key, value ) {
	  	rows = rows + '<tr class="odd gradeX">';
	  	rows = rows + '<td>'+value.nome+'</td>';
		rows = rows + '<td>'+value.preco_final+'</td>';
		rows = rows + '<td>'+value.quantidade+'</td>';
		rows = rows + '<td>'+value.codigo_barras+'</td>';
		rows = rows + '<td>'+value.observacao+'</td>';
		rows = rows + '<td>'+value.fornecedor+'</td>';
		rows = rows + '</tr>';       
		
	});
	$("#clientes tbody").html(rows);
}

$("#consultar").click(function(e){
	e.preventDefault();
	e.stopImmediatePropagation();
			
	var nome=$("#nome").val();
	var codigobarras=$("#codigobarras").val();
	
	
	if(nome=="" && codigobarras==""){
		window.alert("Digite o nome ou codigo de barras");
		return;
	}
	
	var dataFields="nome="+nome+"&"+"codigobarras="+codigobarras;
		
	//console.log(dataFields);
	//return;
	
	$.ajax({
		url: "../php/consulta.produto.php",
		type: "POST",
		data: dataFields,
		dataType: "json"

	}).done(function(data) {
		if(data.data.length>0){
			manageRow(data.data);
			
		}else{
			window.alert("Nenhum produto encontrado!");
		}

	}).fail(function(jqXHR, textStatus ) {
		window.alert("Erro, tente novamente!");
		console.log(textStatus);

	}).always(function() {
		
	});
	
});