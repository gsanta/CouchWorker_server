import * as sinon from 'sinon';
import * as proxyquire from 'proxyquire';

let {RepositoryBase} = proxyquire('./RepositoryBase', {
    'mongoose': {
        Types: {
            ObjectId: {
                createFromHexString: (hexString: any) => {
                    return hexString;
                }
            }
        }
    }
});

describe('RepositoryBase', () => {
    let schemaModel: any;
    let item: any;
    let error: any;
    let result: any;

    beforeEach(() => {
        schemaModel = {
            create: sinon.stub(),
            find: sinon.stub(),
            update: sinon.stub()
        };

        item = sinon.spy();
        error = sinon.spy();
        result = sinon.spy();
    });

    describe('create', () => {
        it('should call the create method of model with the correct parameters', () => {
            let repositoryBase = new RepositoryBase(schemaModel);
            repositoryBase.create(item);
            expect(schemaModel.create.getCall(0).args[0]).toBe(item);
        });

        it('should resolve the promise with the correct data if there is no error', (done) => {
            let repositoryBase = new RepositoryBase(schemaModel);
            repositoryBase.create(item)
                .then((data: any) => {
                    expect(data).toBe(result);
                    done();
                })
                .catch((err: any) => done.fail(err));

            schemaModel.create.callArgWith(1, null, result);
        });

        it('should reject the promise with error data if there is an error', (done) => {
            let repositoryBase = new RepositoryBase(schemaModel);
            repositoryBase.create(item)
                .then(() => done.fail('should reject the promise'))
                .catch((err: any) => {
                    expect(err).toEqual(error);
                    done();
                });

            schemaModel.create.callArgWith(1, error, result);
        });
    });

    describe('findAll', () => {
        it('should call the find method of model with the correct parameters', () => {
            let repositoryBase = new RepositoryBase(schemaModel);
            repositoryBase.findAll();
            expect(schemaModel.find.getCall(0).args[0]).toEqual({});
        });

        it('should resolve the promise with the correct data if there is no error', (done) => {
            let repositoryBase = new RepositoryBase(schemaModel);
            repositoryBase.findAll()
                .then((data: any) => {
                    expect(data).toBe(result);
                    done();
                })
                .catch((err: any) => done.fail(err));

            schemaModel.find.callArgWith(1, null, result);
        });

        it('should reject the promise with error data if there is an error', (done) => {
            let repositoryBase = new RepositoryBase(schemaModel);
            repositoryBase.findAll()
                .then(() => done.fail('should reject the promise'))
                .catch((err: any) => {
                    expect(err).toEqual(error);
                    done();
                });

            schemaModel.find.callArgWith(1, error, result);
        });
    });

    describe('update', () => {
        beforeEach(() => {
            item = {
                id: 1234
            }
        });

        it('should call the update method of model with the correct parameters', () => {
            item = {
                id: 1234
            }

            let repositoryBase = new RepositoryBase(schemaModel);
            repositoryBase.update(item);
            expect(schemaModel.update.getCall(0).args[0]).toEqual({
                _id: 1234
            });
        });

        it('should resolve the promise with the correct data if there is no error', (done) => {
            item = {
                id: 1234
            }

            let repositoryBase = new RepositoryBase(schemaModel);
            repositoryBase.update(item)
                .then((data: any) => {
                    expect(data).toBe(result);
                    done();
                })
                .catch((err: any) => done.fail(err));

            schemaModel.update.callArgWith(1, null, result);
        });

        it('should reject the promise with error data if there is an error', (done) => {
            item = {
                id: 1234
            }

            let repositoryBase = new RepositoryBase(schemaModel);
            repositoryBase.update(item)
                .then(() => done.fail('should reject the promise'))
                .catch((err: any) => {
                    expect(err).toEqual(error);
                    done();
                });

            schemaModel.update.callArgWith(1, error, result);
        });
    });
});
