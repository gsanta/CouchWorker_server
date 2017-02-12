import mongoose = require("mongoose");

export interface UserDocument extends mongoose.Document {
    name: string;
    age: number;
    profession: string;
}
