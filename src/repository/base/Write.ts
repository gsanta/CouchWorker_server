import mongoose = require("mongoose");
export interface Write<T> {
    create: (item: T, callback: (error: any, result: any ) => void) => void;
    update:(item:T, callback: (error: any, result: any)=> void) => void ;
    delete: (item: T, callback: (error: any, result: any) => void) => void;
}
