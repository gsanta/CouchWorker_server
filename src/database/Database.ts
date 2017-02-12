import Mongoose = require("mongoose");

export class Database {
    public static DB_CONNECTION_URL = "mongodb://localhost/couchworker";
    public static mongooseInstance: Mongoose.Mongoose;
    public static mongooseConnection: Mongoose.Connection;

    constructor () {
        Database.connect();
    }

    public static connect(): void {
        this.mongooseConnection  = Mongoose.connection;
        this.mongooseConnection.once("open", () => {
            console.log("Conectado ao mongodb.");
        });

       this.mongooseInstance = Mongoose.connect(Database.DB_CONNECTION_URL);
    }

}

Database.connect();
