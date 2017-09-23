class NegociacaoController {
	constructor() {
		let $ = document.querySelector.bind(document);
		this.inputData = $("#data");
		this.inputQuantidade = $("#quantidade");
		this.inputValor = $("#valor");

		this._mensagem = new Mensagem();
		this._mensagemView = new MensagemView($("#mensagemView"));
		this._mensagemView.update(this._mensagem);

		this._listaNegociacoes = new ListaNegociacoes();
		this._negociacoesView = new NegociacoesView($("#negociacoesView"));
		this._negociacoesView.update(this._listaNegociacoes);
	}

	adiciona(event){
		event.preventDefault();
		let negociacao = this._criarNegociacao()

		this._listaNegociacoes.adiciona(negociacao);
		this._negociacoesView.update(this._listaNegociacoes);

		this._mensagem.texto = "Negociacao criada com sucesso!";
		this._mensagemView.update(this._mensagem);

		this._limparFormulario();
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
}