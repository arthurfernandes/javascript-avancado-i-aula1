"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoController = function () {
	function NegociacaoController() {
		_classCallCheck(this, NegociacaoController);

		var $ = document.querySelector.bind(document);

		this.inputData = $("#data");
		this.inputQuantidade = $("#quantidade");
		this.inputValor = $("#valor");

		this._mensagem = new Bind(new Mensagem(), new MensagemView($("#mensagemView")), 'texto');

		this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($("#negociacoesView")), 'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

		this._ordemAtual = '';

		this._service = new NegociacaoService();

		this._init();
	}

	_createClass(NegociacaoController, [{
		key: "_init",
		value: function _init() {
			var _this = this;

			var self = this;

			this._service.lista().then(function (negociacoes) {
				negociacoes.forEach(function (negociacao) {
					return _this._listaNegociacoes.adiciona(negociacao);
				});
				_this._mensagem.texto = "Negociações resgatadas do banco com sucesso";
			}).catch(function (erro) {
				return _this._mensagem.texto = erro;
			});

			(function recurse() {
				setTimeout(function () {
					self.importaNegociacoes();
					recurse();
				}, 4000);
			})();
		}
	}, {
		key: "adiciona",
		value: function adiciona(event) {
			var _this2 = this;

			event.preventDefault();
			var negociacao = void 0;
			try {
				negociacao = this._criarNegociacao();
			} catch (e) {
				this._mensagem.texto = "Não foi possível incluir a negociação, erro de formatação";
				return;
			}

			this._service.carrega(negociacao).then(function (mensagem) {
				_this2._listaNegociacoes.adiciona(negociacao);
				_this2._mensagem.texto = mensagem;
				_this2._limparFormulario();
			}).catch(function (erro) {
				return _this2._mensagem.texto = erro;
			});
		}
	}, {
		key: "importaNegociacoes",
		value: function importaNegociacoes() {
			var _this3 = this;

			this._service.importa(this._listaNegociacoes.negociacoes).then(function (negociacoes) {
				negociacoes.forEach(function (negociacao) {
					return _this3._listaNegociacoes.adiciona(negociacao);
				});
				_this3._mensagem.texto = "Negociacoes importadas com Sucesso";
			}).catch(function (erro) {
				return _this3._mensagem.texto = erro;
			});
		}
	}, {
		key: "apaga",
		value: function apaga() {
			var _this4 = this;

			this._service.apaga().then(function (mensagem) {
				_this4._listaNegociacoes.esvazia();
				_this4._mensagem.texto = mensagem;
			}).catch(function (erro) {
				return _this4._mensagem.texto = erro;
			});
		}
	}, {
		key: "ordena",
		value: function ordena(coluna) {
			if (this._ordemAtual == coluna) {
				this._listaNegociacoes.inverteOrdem();
			} else {
				this._listaNegociacoes.ordena(function (a, b) {
					return a[coluna] - b[coluna];
				});
			}
			this._ordemAtual = coluna;
		}
	}, {
		key: "_criarNegociacao",
		value: function _criarNegociacao() {
			var data = DateHelper.textoParaData(this.inputData.value);

			return new Negociacao(data, parseInt(this.inputQuantidade.value), parseFloat(this.inputValor.value));
		}
	}, {
		key: "_limparFormulario",
		value: function _limparFormulario() {
			this.inputData.value = "";
			this.inputQuantidade.value = 1;
			this.inputValor.value = 0.0;

			this.inputData.focus();
		}
	}]);

	return NegociacaoController;
}();