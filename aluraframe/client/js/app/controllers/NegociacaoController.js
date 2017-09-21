class NegociacaoController {
	constructor() {
		let $ = document.querySelector.bind(document);
		this.inputData = $("#data");
		this.inputQuantidade = $("#quantidade");
		this.inputValor = $("#valor");
	}

	retornaNegociacao() {
		let data = new Date(
			...this.inputData.value.split('-')
			.map((item, indice) => indice == 1 ? (item - 1) : item)
		);

		return new Negociacao(
			data,
			this.inputQuantidade.value,
			this.inputValor.value
		);
	}

	limparCampos() {
		this.inputData.value = "";
		this.inputQuantidade.value = 1;
		this.inputValor.value = 0.0;

		this.inputData.focus();
	}

	adiciona(event){
		event.preventDefault();

		let negociacao = this.retornaNegociacao()

		console.log(negociacao);

		this.limparCampos();
	}
}