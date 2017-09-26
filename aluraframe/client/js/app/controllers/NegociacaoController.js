class NegociacaoController {
	constructor() {
		let $ = document.querySelector.bind(document);
		this.inputData = $("#data");
		this.inputQuantidade = $("#quantidade");
		this.inputValor = $("#valor");

		this._mensagemView = new MensagemView($("#mensagemView"));
		this._mensagem = new Mensagem();

		this._negociacoesView = new NegociacoesView($("#negociacoesView"));
		this._listaNegociacoes = new ListaNegociacoes( model => 
			this._negociacoesView.update(model));
		
		this._mensagemView.update(this._mensagem);
		this._negociacoesView.update(this._listaNegociacoes);
	}

	adiciona(event){
		event.preventDefault();
		let negociacao = this._criarNegociacao()

		this._listaNegociacoes.adiciona(negociacao);

		this._mensagem.texto = "Negociação criada com sucesso!";
		this._mensagemView.update(this._mensagem);

		this._limparFormulario();
	}

	apaga() {
		this._listaNegociacoes.apaga();
		this._mensagem.texto = "Negociações apagadas com sucesso";
		this._mensagemView.update(this._mensagem);
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