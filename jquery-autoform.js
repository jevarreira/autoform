/**
* Plugin de criação de form dinâmico
* versão 0.1
*
* Author: Jéssica Oliveira Varreira
*/

(function ( $ ) {
	$.fn.autoForm = function( options ) {

		var html = '',
		obj = options,
		select = [],
		inputText = [];

		function _html(){
			if(obj.fields){
				var count = 0;
				for(i = 0; i < obj.fields.length; i++){
					count++;
					if(obj.fields[i]["type"] == "select"){
						var selectOptions = [];
						for(j = 0; j < obj.fields[i]["values"].length; j++){
							selectOptions.push([
								'<option value="'+ obj.fields[i]["values"][j] +'">'+ obj.fields[i]["values"][j] +'</option>'
							]);
						}
						select.push([
							'<tr><td>'+obj.fields[i]["nome"]+'</td>'+
							'<td><select name="' + obj.fields["nome"] + '" id="'+ obj.fields["nome"] +'">'+
							'<option>Selecione uma opção</option>'+selectOptions.join(" ")+
							'</select></td></tr>'
						]);
					} else if(obj.fields[i]["type"] == "text"){
						inputText.push([
							'<tr><td>'+obj.fields[i]["nome"]+'</td>'+
							'<td><input type="text" name="' + obj.fields[i]["nome"] + '" id="'+ obj.fields[i]["nome"] +'"></td></tr>'
						]);
					}
				}
				html = '<form action="" method="POST" id="autoform" name="autoform">'+
				'<table align="center">'+
				'<tr><td colspan="2"><h4>'+ obj.formTitle +'</h4></td></tr>'+
				inputText.join(" ")+select.join(" ")+
				'<tr><td colspan="2"><button type="button" id="botao">Enviar</button></td></tr>'+
				'</table>'+
				'</form>';

				$("#integration_form").html(html);
			}
		}

		function _post(){
			var dados = $('#autoform').serialize();
			dados.secret = obj.secret;
			dados.token = obj.token;

			$.ajax({
				type: "POST",
				url: obj.url,
				data: dados,
				dataType: 'text',
				success: function()
				{
					alert(obj.onSuccess);
				},
				error: function()
				{
					alert(obj.onError);
				}
			});
		}

		_html();
		$("#botao").on("click", _post);

	};

}( jQuery ));
