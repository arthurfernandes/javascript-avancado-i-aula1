//Caching DOM

var data$ = document.querySelector("#data");
var quantidade$ = document.querySelector("#quantidade");
var valor$ = document.querySelector("#valor");

var form$ = document.querySelector("form");
var table$ = document.querySelector("table tbody");

//Binding Events

form$.addEventListener("submit", function(event){
	event.preventDefault();

	var data = data$.value;
	var quantidade = quantidade$.value;
	var valor = valor$.value;

	var row$ =createNegociacaoElement$(data, quantidade, valor);

	table$.appendChild(row$);

	data$.value = "";
	quantidade$.value = 1;
	valor$.value = 0;

	data$.focus();
});

//Auxiliary Functions

function createNegociacaoElement$(data, quantidade, valor) {

	var row$ = document.createElement("tr");

	function createColumn(value) {
		var column$ = document.createElement("td");
		column$.textContent = value;

		return column$;
	}

	row$.appendChild(createColumn(data));
	row$.appendChild(createColumn(quantidade));
	row$.appendChild(createColumn(valor));

	var volume = quantidade * valor;

	row$.appendChild(createColumn(volume));

	return row$;
}