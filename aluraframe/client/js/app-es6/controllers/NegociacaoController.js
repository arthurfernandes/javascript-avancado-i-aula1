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

		this._service = new NegociacaoService();

		this._init();
	}

	_init() {
		let self = this;

		this._service.lista()
			.then(negociacoes => {
				negociacoes.forEach( negociacao => this._listaNegociacoes.adiciona(negociacao))
				this._mensagem.texto = "Negociações resgatadas do banco com sucesso";
			})
			.catch( erro => this._mensagem.texto = erro);

		(function recurse(){
			setTimeout(() => {
				self.importaNegociacoes();
				recurse();
			}, 4000);
		}());
	}

	adiciona(event){
		event.preventDefault();
		let negociacao;
		try{
			negociacao = this._criarNegociacao();
		}
		catch(e) {
			this._mensagem.texto = "Não foi possível incluir a negociação, erro de formatação";
			return;
		}

		this._service.carrega(negociacao)
			.then( mensagem => {
				this._listaNegociacoes.adiciona(negociacao);
				this._mensagem.texto = mensagem;
				this._limparFormulario();
			})
			.catch( erro => this._mensagem.texto = erro);
	}

	importaNegociacoes() {

		this._service.importa(this._listaNegociacoes.negociacoes)
			.then( negociacoes => {
				negociacoes.forEach( negociacao => this._listaNegociacoes.adiciona(negociacao));
				this._mensagem.texto = "Negociacoes importadas com Sucesso";
			})
			.catch( erro => this._mensagem.texto = erro);
	}

	apaga() {
		this._service.apaga()
			.then( mensagem => {
				this._listaNegociacoes.esvazia();
				this._mensagem.texto = mensagem;
			})
			.catch( erro => this._mensagem.texto = erro);
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
			parseInt(this.inputQuantidade.value),
			parseFloat(this.inputValor.value)
		);
	}

	_limparFormulario() {
		this.inputData.value = "";
		this.inputQuantidade.value = 1;
		this.inputValor.value = 0.0;

		this.inputData.focus();
	}
}