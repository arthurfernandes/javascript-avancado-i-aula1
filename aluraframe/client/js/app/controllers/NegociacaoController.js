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

		ConnectionFactory.getConnection()
			.then( connection => new NegociacaoDao(connection))
			.then( dao => dao.listaTodos())
			.then( negociacoes => {
				negociacoes.forEach( negociacao => this._listaNegociacoes.adiciona(negociacao));
				this._mensagem.texto = "Negociações resgatadas do banco com sucesso";
			})
			.catch( erro => {
				console.log(erro);	
				this._mensagem.texto = "Não foi possível obter as negociações do banco"}
			);
	}

	adiciona(event){
		event.preventDefault();
		
		ConnectionFactory.getConnection()
			.then(connection => new NegociacaoDao(connection))
			.then(dao => {
				let negociacao = this._criarNegociacao()
				dao.adiciona(negociacao)
				return negociacao;
			})
			.then( negociacao => {
				this._listaNegociacoes.adiciona(negociacao);
				this._mensagem.texto = "Negociação criada com sucesso!";
				this._limparFormulario();
			})
			.catch( erro => this._mensagem.texto = "Não foi possível incluir a negociação");
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
		ConnectionFactory.getConnection()
			.then(connection => new NegociacaoDao(connection))
			.then(dao => dao.apagaTodos())
			.then( () => {
				this._listaNegociacoes.esvazia();
				this._mensagem.texto = "Negociações apagadas com sucesso";
			})
			.catch( erro => {
				console.log(erro);
				this._mensagem.texto = "Não foi possível apagar as Negociações";
			})
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