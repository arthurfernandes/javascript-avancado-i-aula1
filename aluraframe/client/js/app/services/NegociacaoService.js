class NegociacaoService {

	constructor() {
		this._httpService = new HttpService();
	}

	obterNegociacoes() {
		return Promise.all([
			this.obterNegociacoesDaSemana(),
			this.obterNegociacoesDaSemanaAnterior(),
			this.obterNegociacoesDaSemanaRetrasada()]
		).then( periodos => {
			let negociacoes = periodos.reduce((arrayAchatado, arr) => arrayAchatado.concat(arr), []);
			return negociacoes;
		}).catch( erro => {
			throw new Error(erro);
		});
	}

	obterNegociacoesDaSemana() {
		return this._httpService.get('negociacoes/semana')
				.then( negociacoes => {
					return negociacoes.map( n => new Negociacao(new Date(n.data), n.quantidade, n.valor));
				})
				.catch( erro => {
					console.log(erro);
					throw new Error("Não foi possível obter as negociações da semana");
				});
	}

	obterNegociacoesDaSemanaAnterior() {
		return this._httpService.get('negociacoes/anterior')
				.then( negociacoes => {
					return negociacoes.map( n => new Negociacao(new Date(n.data), n.quantidade, n.valor));
				})
				.catch( erro => {
					console.log(erro);
					throw new Error("Não foi possível obter as negociações da semana anterior");
				});
	}

	obterNegociacoesDaSemanaRetrasada() {
		return this._httpService.get('negociacoes/retrasada')
				.then( negociacoes => {
					return negociacoes.map( n => new Negociacao(new Date(n.data), n.quantidade, n.valor));
				})
				.catch( erro => {
					console.log(erro);
					throw new Error("Não foi possível obter as negociações da semana retrasada");
				});
	}
}