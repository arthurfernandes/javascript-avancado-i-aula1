class NegociacaoController {
	constructor() {
		let $ = document.querySelector.bind(document);
		let self = this;

		this.inputData = $("#data");
		this.inputQuantidade = $("#quantidade");
		this.inputValor = $("#valor");

		this._mensagemView = new MensagemView($("#mensagemView"));
		this._mensagem = new Mensagem();

		this._negociacoesView = new NegociacoesView($("#negociacoesView"));
		this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {
			get(target, prop, receiver) {
				if (["adiciona", "apaga"].includes(prop) && (typeof(target[prop]) == typeof(Function))){
					return function(){
						let retorno = Reflect.apply(target[prop], target, arguments);
						self._negociacoesView.update(receiver);
						return retorno;
					}
				}

				return Reflect.get(target, prop, receiver);
			}
		});
		
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