var ConnectionFactory = (function() {

    const dbName = 'aluraframe';
    const stores = ['negociacoes'];
    let version = 4;
    let connection = null;
    let close = null;

    return class ConnectionFactory {
        constructor() {
            throw new Error("Essa classe nao pode ser instanciada");
        }
    
        static getConnection() {
            return new Promise( (resolve, reject) => {
                var openRequest = window.indexedDB.open(dbName, version);
    
                openRequest.onupgradeneeded = e => {
                    ConnectionFactory._createStores(e.target.result);
                }
    
                openRequest.onsuccess = e => {
                    if (!connection) {
                        connection = e.target.result;
                        close = connection.close.bind(connection);
                    }
    
                    connection.close  = () => {throw new Error("Nao pode fechar a conexao manualmente");}
    
                    resolve(connection);
                }
    
                openRequest.onerror = e => {
                    reject(e.target.error);
                }
            });
        }
    
        static closeConnection(){
            if (connection) {
                close();
                connection = null;
            }
        }

        static _createStores(connection) {
            stores.forEach( store => {
                if (connection.objectStoreNames.contains(store)) connection.deleteObjectStore(store);
    
                connection.createObjectStore(store);
            });
        }
    }
}());