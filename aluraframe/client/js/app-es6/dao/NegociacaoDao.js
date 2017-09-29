import {Negociacao} from '../models/Negociacao';

export class NegociacaoDao {
    constructor(connection) {
        this._connection = connection;
        this._store = 'negociacoes';
    }

    adiciona(negociacao) {
        return new Promise((resolve, reject) => {
            let request = this._connection
                .transaction([this._store], "readwrite")
                .objectStore(this._store)
                .add(negociacao);
            
            request.onsuccess = e => {
                resolve();
            }

            request.onerror = e => {
                console.log(e.target.error);
                reject("Não foi possível adicionar a negociação");
            }
        });
    }

    listaTodos() {
        return new Promise((resolve, reject) => {
            let cursor = this._connection
                .transaction([this._store], "readonly")
                .objectStore(this._store)
                .openCursor();

            let negociacoes = [];

            cursor.onsuccess = e => {
                let atual = e.target.result;
                if(atual) {
                    let n = atual.value;
                    negociacoes.push(new Negociacao(n._data, n._quantidade, n._valor)); 
                    atual.continue();
                }
                else {
                    resolve(negociacoes);
                }
            }

            cursor.onerror = e => {
                reject(e.target.error);
            }
        });
    }

    apagaTodos() {
        return new Promise( (resolve,reject) => {
            let request = this._connection
                .transaction([this._store], "readwrite")
                .objectStore(this._store)
                .clear();

                request.onsuccess = e => {
                    resolve();
                }

                request.onerror = e => {
                    console.log(e.target.error);
                    reject("Não foi possível apagar as negociações");
                }
        });
    }
}