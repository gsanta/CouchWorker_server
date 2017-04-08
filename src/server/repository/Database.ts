import Mongoose = require("mongoose");

export class Database {
    private mongooseInstance: Mongoose.Mongoose;
    private mongooseConnection: Mongoose.Connection;

    constructor (connectionUrl: string) {
        this.connect(connectionUrl);
    }

    public getInstance() {
        return this.mongooseInstance;
    }

    public getConnection() {
        return this.mongooseConnection;
    }

    private connect(connectionUrl: string): void {
        this.mongooseConnection  = Mongoose.connection;
        this.mongooseConnection.once("open", () => {
            console.log("Conectado ao mongodb.");
        });

       this.mongooseInstance = Mongoose.connect(connectionUrl);
    }
}
