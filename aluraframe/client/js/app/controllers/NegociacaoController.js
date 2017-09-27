class NegociacaoController {
	constructor() {
		let $ = document.querySelector.bind(document);

		this.inputData = $("#data");
		this.inputQuantidade = $("#quantidade");
		this.inputValor = $("#valor");

		this._mensagem = new Bind(
			new Mensagem(), new MensagemView($("#mensagemView")), 'texto');

		this._listaNegociacoes = new Bind(
			new ListaNegociacoes(), new NegociacoesView($("#negociacoesView")), 
				'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

		this._ordemAtual = '';
	}

	adiciona(event){
		event.preventDefault();
		try {
			this._listaNegociacoes.adiciona(this._criarNegociacao());
			this._mensagem.texto = "Negociação criada com sucesso!";
			this._limparFormulario();
		}
		catch(erro){
			this._mensagem.texto = erro;
		}
	}

	importaNegociacoes() {
		let service = new NegociacaoService();

		service
		  .obterNegociacoes()
			.then( negociacoes => {
					negociacoes.forEach( negociacao => this._listaNegociacoes.adiciona(negociacao));
					this._mensagem.texto = "Negociacoes importadas com Sucesso";
			})
			.catch( erro => this._mensagem.texto = erro);
	}

	apaga() {
		this._listaNegociacoes.esvazia();
		this._mensagem.texto = "Negociações apagadas com sucesso";
	}

	ordena(coluna) {
		if (this._ordemAtual == coluna){
			this._listaNegociacoes.inverteOrdem();
		}
		else{
			this._listaNegociacoes.ordena( (a,b) => a[coluna] - b[coluna]);
		}
		this._ordemAtual = coluna;
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