class DateHelper {
	constructor(){
		throw new Error("Você não pode criar uma instância dessa classe");
	}

	static textoParaData(texto) {
		if(! /^\d{2}\/\d{2}\/\d{4}$/.test(texto)){
			throw new Error("Deve estar no formato dd/mm/aaaa");
		}

		return new Date(
			...texto.split('/').reverse().map((item, indice) => indice == 1 ? (item - 1) : item)
		);
	}

	static dataParaTexto(data) {
		return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
	}
}