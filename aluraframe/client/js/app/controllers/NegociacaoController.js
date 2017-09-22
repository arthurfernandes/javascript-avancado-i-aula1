class NegociacaoController {
	constructor() {
		let $ = document.querySelector.bind(document);
		this.inputData = $("#data");
		this.inputQuantidade = $("#quantidade");
		this.inputValor = $("#valor");

		this._listaNegociacoes = new ListaNegociacoes();
	}

	_criarNegociacao() {
		let data = DateHelper.textoParaData(this.inputData.value);

		return new Negociacao(
			data,
			this.inputQuantidade.value,
			this.inputValor.value
		);
	}

	_limparFormulario() {
		this.inputData.value = "";
		this.inputQuantidade.value = 1;
		this.inputValor.value = 0.0;

		this.inputData.focus();
	}

	adiciona(event){
		event.preventDefault();

		let negociacao = this._criarNegociacao()

		this._listaNegociacoes.adiciona(negociacao);

		console.log(this._listaNegociacoes.negociacoes);

		this._limparFormulario();
	}
}