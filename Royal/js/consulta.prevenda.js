function manageRow(data) {
	var	rows = '';
	$.each( data, function( key, value ) {
	  	rows = rows + '<tr class="odd gradeX">';
	  	rows = rows + '<td>'+value.comanda+'</td>';
		rows = rows + '<td>'+value.cliente+'</td>';
		rows = rows + '<td>'+value.data+'</td>';
		rows = rows + '<td>'+value.valor_total+'</td>';
		rows = rows + '<td>'+value.funcionario+'</td>';
		rows = rows + '</tr>';       
		
	});
	$("#clientes tbody").html(rows);
}

$("#consultar").click(function(e){
	e.preventDefault();
	e.stopImmediatePropagation();
			
	var comanda=$("#comanda").val();		
	var nome=$("#nome").val();
	var datainicial=$("#datainicial").val();
	var datafinal=$("#datafinal").val();
	
	if(nome=="" && comanda==""){
		window.alert("Digite o nome do cliente ou número da comanda");
		return;
	}
	else if(nome != "" && comanda != ""){
		window.alert("Digite somente a comanda ou nome do cliente");
		return;
	}
	else if(datainicial=="" || datafinal==""){
		window.alert("Digite as datas de inicio e fim da pesquisa");
		return;
	}
	
	var dataFields="comanda="+comanda+"&nome="+nome+"&datainicial="+datainicial+"&datafinal="+datafinal;
		
	//console.log(dataFields);
	//return;
	
	$.ajax({
		url: "../php/consulta.prevenda.php",
		type: "POST",
		data: dataFields,
		dataType: "json"

	}).done(function(data) {
		if(data.data.length>0){
			manageRow(data.data);
			
		}else{
			window.alert("Nenhuma pré-venda encontrada!");
		}

	}).fail(function(jqXHR, textStatus ) {
		window.alert("Erro, tente novamente!");
		console.log(textStatus);

	}).always(function() {
		
	});
	
});