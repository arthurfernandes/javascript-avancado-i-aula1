export class View {
	constructor (elemento) {
		this._elemento = elemento;
	}

	template(model) {
		throw new Error("Você deve subscrever esse método");
	}

	update(model) {
		this._elemento.innerHTML = this.template(model);
	}
}