class NegociacaoService {

	obterNegociacoesDaSemana(cb) {

		let xhr = new XMLHttpRequest();
		xhr.open('GET', 'negociacoes/semana', true);

		xhr.onreadystatechange = () => {
			if (xhr.readyState == XMLHttpRequest.DONE) {
				if (xhr.status == 200) { 
					cb(null, JSON.parse(xhr.responseText)
					  	       .map( n => new Negociacao(new Date(n.data), n.quantidade, n.valor)));
				}
				else {
					console.log(xhr.responseText);
					cb('Não foi possível obter as negociações da semana');
				}
			}
		}

		xhr.send();	
	}
}