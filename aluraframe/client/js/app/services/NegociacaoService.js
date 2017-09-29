'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoService = function () {
	function NegociacaoService() {
		_classCallCheck(this, NegociacaoService);

		this._httpService = new HttpService();
	}

	_createClass(NegociacaoService, [{
		key: 'obterNegociacoes',
		value: function obterNegociacoes() {
			return Promise.all([this.obterNegociacoesDaSemana(), this.obterNegociacoesDaSemanaAnterior(), this.obterNegociacoesDaSemanaRetrasada()]).then(function (periodos) {
				var negociacoes = periodos.reduce(function (arrayAchatado, arr) {
					return arrayAchatado.concat(arr);
				}, []);
				return negociacoes;
			}).catch(function (erro) {
				throw new Error(erro);
			});
		}
	}, {
		key: 'obterNegociacoesDaSemana',
		value: function obterNegociacoesDaSemana() {
			return this._httpService.get('negociacoes/semana').then(function (negociacoes) {
				return negociacoes.map(function (n) {
					return new Negociacao(new Date(n.data), n.quantidade, n.valor);
				});
			}).catch(function (erro) {
				console.log(erro);
				throw new Error("Não foi possível obter as negociações da semana");
			});
		}
	}, {
		key: 'obterNegociacoesDaSemanaAnterior',
		value: function obterNegociacoesDaSemanaAnterior() {
			return this._httpService.get('negociacoes/anterior').then(function (negociacoes) {
				return negociacoes.map(function (n) {
					return new Negociacao(new Date(n.data), n.quantidade, n.valor);
				});
			}).catch(function (erro) {
				console.log(erro);
				throw new Error("Não foi possível obter as negociações da semana anterior");
			});
		}
	}, {
		key: 'obterNegociacoesDaSemanaRetrasada',
		value: function obterNegociacoesDaSemanaRetrasada() {
			return this._httpService.get('negociacoes/retrasada').then(function (negociacoes) {
				return negociacoes.map(function (n) {
					return new Negociacao(new Date(n.data), n.quantidade, n.valor);
				});
			}).catch(function (erro) {
				console.log(erro);
				throw new Error("Não foi possível obter as negociações da semana retrasada");
			});
		}
	}, {
		key: 'carrega',
		value: function carrega(negociacao) {
			return ConnectionFactory.getConnection().then(function (connection) {
				return new NegociacaoDao(connection);
			}).then(function (dao) {
				dao.adiciona(negociacao);
				return "Negociação incluida com sucesso";
			}).catch(function (erro) {
				console.log(erro);
				throw new Error("Não foi possível incluir a negociação");
			});
		}
	}, {
		key: 'lista',
		value: function lista() {
			return ConnectionFactory.getConnection().then(function (connection) {
				return new NegociacaoDao(connection);
			}).then(function (dao) {
				return dao.listaTodos();
			}).catch(function (erro) {
				console.log(erro);
				throw new Error("Não foi possível resgatar as negociações do banco");
			});
		}
	}, {
		key: 'importa',
		value: function importa(negociacoesExistentes) {
			return this.obterNegociacoes().then(function (negociacoes) {
				return negociacoes.filter(function (negociacao) {
					return !negociacoesExistentes.some(function (negociacaoExistente) {
						return negociacao.isEquals(negociacaoExistente);
					});
				});
			}).catch(function (erro) {
				console.log(erro);
				throw new Error("Não foi possível importar as negociações");
			});
		}
	}, {
		key: 'apaga',
		value: function apaga() {
			return ConnectionFactory.getConnection().then(function (connection) {
				return new NegociacaoDao(connection);
			}).then(function (dao) {
				return dao.apagaTodos();
			}).then(function () {
				return "Negociações apagadas com sucesso";
			}).catch(function (erro) {
				console.log(erro);
				throw new Error("Não foi possível apagar as Negociações");
			});
		}
	}]);

	return NegociacaoService;
}();
//# sourceMappingURL=NegociacaoService.js.map