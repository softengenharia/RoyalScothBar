function manageRow(data) {
	var	rows = '';
	$.each( data, function( key, value ) {
	  	rows = rows + '<tr class="odd gradeX">';
	  	rows = rows + '<td>'+value.idPlanoContas_Capa+'</td>';
		rows = rows + '<td>'+value.data+'</td>';
		rows = rows + '<td>'+value.pagamento+'</td>';
		rows = rows + '<td>'+value.nomeFornecedor+'</td>';
		rows = rows + '<td>'+value.cnpj+'</td>';
		rows = rows + '<td>'+value.valor_total+'</td>';
		rows = rows + '<td>'+value.situacao+'</td>';
		rows = rows + '</tr>';       
		
	});
	$("#compras tbody").html(rows);
}

$("#procurar").click(function(e){
	
	e.preventDefault();
	e.stopImmediatePropagation();
			
	var dataInicial=$("#dataInicial").val();
	var dataFinal=$("#dataFinal").val();
	
	
	
	if(dataInicial=="" && dataFinal==""){
		window.alert("Digite as datas");
		return;
	}
	
	var dataFields="datainicial="+dataInicial+"&datafinal="+dataFinal;
	console.log(dataFields)
	
	
	$.ajax({
		url: "../php/relatorio.compra.php",
		type: "POST",
		data: dataFields,
		dataType: "json"

	}).done(function(data) {
		if(data.qtd>0){
			manageRow(data.data);
			
		}else{
			window.alert("Nenhuma compra encontrada!");
		}

	}).fail(function(jqXHR, textStatus ) {
		window.alert("Erro, tente novamente!");
		console.log(textStatus);

	}).always(function() {
		
	});
	
});














