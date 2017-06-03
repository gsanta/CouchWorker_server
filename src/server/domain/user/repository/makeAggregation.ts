import * as Mongoose from 'mongoose';

export const makeAggregation = <T>(aggr1: any[], aggr2: any[]) => {
    return (model: Mongoose.Model<any>): Promise<T[]> => {
        return model.aggregate(...aggr1)
            .then((result: any[]) => result.length ? result : model.aggregate(...aggr2))
            .then((result: any[]) => result.length ? result : null);
    };
};

export const takeOne = <T>(results: Promise<T[]>) => results.then(data => data.length ? data[0] : null);

