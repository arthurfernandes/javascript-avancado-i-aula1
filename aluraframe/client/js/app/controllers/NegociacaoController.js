class NegociacaoController {
	constructor() {
		let $ = document.querySelector.bind(document);

		this.inputData = $("#data");
		this.inputQuantidade = $("#quantidade");
		this.inputValor = $("#valor");

		this._mensagem = new Bind(
			new Mensagem(), new MensagemView($("#mensagemView")), 'texto');
			

		this._listaNegociacoes = new Bind(
			new ListaNegociacoes(), new NegociacoesView($("#negociacoesView")), 'adiciona', 'esvazia');
	}

	adiciona(event){
		event.preventDefault();
		let negociacao = this._criarNegociacao()

		this._listaNegociacoes.adiciona(negociacao);

		this._mensagem.texto = "Negociação criada com sucesso!";

		this._limparFormulario();
	}

	importaNegociacoes() {
		let service = new NegociacaoService();

		service.obterNegociacoesDaSemana( (erro, negociacoes) => {
			if (erro) {
				this._mensagem.texto = erro;
				return;
			}

			negociacoes.forEach( negociacao => this._listaNegociacoes.adiciona(negociacao));
			this._mensagem.texto = "Negociacoes importadas com Sucesso";
		});
	}

	apaga() {
		this._listaNegociacoes.esvazia();
		this._mensagem.texto = "Negociações apagadas com sucesso";
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